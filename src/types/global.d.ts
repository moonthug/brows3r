import { GetExtensionIconSrcFunction } from '../components/FileItem';

declare global {
  interface Window {
    BROWS3R: {
      s3bucketName: string;
      s3BucketRegion: string;
      s3BucketUrl: string;
      getExtensionIconSrcFn?: GetExtensionIconSrcFunction;
    }
  }
}

export {}
