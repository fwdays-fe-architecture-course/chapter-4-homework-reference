import { AwsRum } from "aws-rum-web";

export const useCloudWatchRum = () => {
  try {
    const config = {
      sessionSampleRate: 1,
      identityPoolId: "eu-central-1:46ef9721-12a2-4752-bea2-9797586e0ea2",
      endpoint: "https://dataplane.rum.eu-central-1.amazonaws.com",
      telemetries: ["errors", "performance", "http"],
      allowCookies: true,
      enableXRay: false,
    };

    const APPLICATION_ID = "97718db3-1eec-44dd-b641-92c648827860";
    const APPLICATION_VERSION = "1.0.0";
    const APPLICATION_REGION = "eu-central-1";

    const awsRum = new AwsRum(
      APPLICATION_ID,
      APPLICATION_VERSION,
      APPLICATION_REGION,
      config
    );

    return awsRum;
  } catch (error) {
    // Ignore errors thrown during CloudWatch RUM web client initialization
  }
};


export default useCloudWatchRum;
