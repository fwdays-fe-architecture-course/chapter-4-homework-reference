import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cognito from "aws-cdk-lib/aws-cognito";
import * as iam from "aws-cdk-lib/aws-iam";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import * as rum from "aws-cdk-lib/aws-rum";
import { Construct } from "constructs";

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

 const websiteBucket = new s3.Bucket(this, "WebsiteBucket", {
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
      publicReadAccess: true, // Required for CloudFront to access the website
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicPolicy: false,
      }),
    });

    // Create CloudFront distribution
    const distribution = new cloudfront.Distribution(this, "Distribution", {
      defaultBehavior: {
        origin: new origins.S3Origin(websiteBucket, {
          originPath: "/", // Use the root of the bucket
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: "index.html",
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
        },
      ],
    });

    // Deploy website content to S3
    new BucketDeployment(this, "StaticWebsiteBucketDeployment", {
      sources: [Source.asset("../web-app/public")],
      destinationBucket: websiteBucket,
      distribution,
      distributionPaths: ["/*"],
    });

    const applicationName = `cvWebsite`;

    const cwRumIdentityPool = new cognito.CfnIdentityPool(
      this,
      "cw-rum-identity-pool",
      {
        allowUnauthenticatedIdentities: true,
      }
    );

    const cwRumUnauthenticatedRole = new iam.Role(
      this,
      "cw-rum-unauthenticated-role",
      {
        assumedBy: new iam.FederatedPrincipal(
          "cognito-identity.amazonaws.com",
          {
            StringEquals: {
              "cognito-identity.amazonaws.com:aud": cwRumIdentityPool.ref,
            },
            "ForAnyValue:StringLike": {
              "cognito-identity.amazonaws.com:amr": "unauthenticated",
            },
          },
          "sts:AssumeRoleWithWebIdentity"
        ),
      }
    );

    cwRumUnauthenticatedRole.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ["rum:PutRumEvents"],
        resources: [
          `arn:aws:rum:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:appmonitor/${applicationName}`,
        ],
      })
    );

    const cwRumIdentityPoolRoleAttachment =
      new cognito.CfnIdentityPoolRoleAttachment(
        this,
        "cw-rum-identity-pool-role-attachment",
        {
          identityPoolId: cwRumIdentityPool.ref,
          roles: {
            unauthenticated: cwRumUnauthenticatedRole.roleArn,
          },
        }
      );

    const cwRumAppMonitor = new rum.CfnAppMonitor(this, "cw-rum-app-monitor", {
      domain: distribution.distributionDomainName,
      name: applicationName,
      appMonitorConfiguration: {
        allowCookies: true,
        enableXRay: false,
        sessionSampleRate: 1,
        telemetries: ["errors", "performance", "http"],
        identityPoolId: cwRumIdentityPool.ref,
        guestRoleArn: cwRumUnauthenticatedRole.roleArn,
      },
      cwLogEnabled: true,
    });
  }
}
