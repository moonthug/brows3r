declare global {
  interface Window {
    BROWS3R: {
      S3_BUCKET: string;
      S3_BUCKET_REGION: string;
      S3_BUCKET_URL: string;
    }
  }
}

export {}
