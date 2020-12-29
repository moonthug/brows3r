import React from 'react';
import ReactDOM from 'react-dom';
import { S3 } from 'aws-sdk';
import { fetchS3DirectoryContentsFactory } from './helpers/fetchS3DirectoryContents';
import App from './App';

import './index.scss';

let S3_BUCKET;
let S3_BUCKET_REGION;
let S3_BUCKET_URL;

if (window.BROWS3R) {
  S3_BUCKET = window.BROWS3R.S3_BUCKET;
  S3_BUCKET_REGION = window.BROWS3R.S3_BUCKET_REGION;
  S3_BUCKET_URL = window.BROWS3R.S3_BUCKET_URL;
} else {
  S3_BUCKET = process.env.BROWS3R_S3_BUCKET;
  S3_BUCKET_REGION = process.env.BROWS3R_S3_BUCKET_REGION;
  S3_BUCKET_URL = process.env.BROWS3R_S3_BUCKET_URL;
}

if (!S3_BUCKET || !S3_BUCKET_URL) {
  throw new Error('Config values missing');
}

const s3Client = new S3({
  region: S3_BUCKET_REGION
});

ReactDOM.render(
  <React.StrictMode>
    <App
      s3BaseURL={S3_BUCKET_URL}
      fetchS3DirectoryContents={fetchS3DirectoryContentsFactory(s3Client, S3_BUCKET)}
    />
  </React.StrictMode>,
  document.getElementById('root')
);
