import React from 'react';
import ReactDOM from 'react-dom';
import { S3 } from 'aws-sdk';
import { fetchS3DirectoryContentsFactory } from './helpers/fetchS3DirectoryContents';
import App from './App';

import './index.scss';

let s3bucketName;
let s3BucketRegion;
let s3BucketUrl;
let getExtensionIconSrc = (extension: string) => '/icons/file.svg';

if (window.BROWS3R) {
  s3bucketName = window.BROWS3R.s3bucketName;
  s3BucketRegion = window.BROWS3R.s3BucketRegion;
  s3BucketUrl = window.BROWS3R.s3BucketUrl;
  getExtensionIconSrc = window.BROWS3R.getExtensionIconSrcFn || getExtensionIconSrc;
} else {
  s3bucketName = process.env.BROWS3R_s3NameBucket;
  s3BucketRegion = process.env.BROWS3R_s3BucketRegion;
  s3BucketUrl = process.env.BROWS3R_s3BucketUrl;
}

if (!s3bucketName || !s3BucketUrl) {
  throw new Error('Config values missing');
}

const s3Client = new S3({
  region: s3BucketRegion
});

ReactDOM.render(
  <React.StrictMode>
    <App
      s3BaseURL={s3BucketUrl}
      fetchS3DirectoryContents={fetchS3DirectoryContentsFactory(s3Client, s3bucketName)}
      getExtensionIconSrc={getExtensionIconSrc}
    />
  </React.StrictMode>,
  document.getElementById('root')
);
