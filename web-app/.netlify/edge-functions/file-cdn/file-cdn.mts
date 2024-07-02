
    const allowedUrlPatterns = []

    export default async (req: Request): Promise<Response> => {
      const url = new URL(req.url)
      const remoteUrl = url.searchParams.get("url")
      
      const isAllowed = allowedUrlPatterns.some(allowedUrlPattern => allowedUrlPattern.test(remoteUrl))
      if (isAllowed) {
        return fetch(remoteUrl);
      } else {
        console.error(`URL not allowed: ${remoteUrl}`)
        return new Response("Bad request", { status: 500 })
      }
    }
  