import React from 'react';
import ReactDOM from 'react-dom';
import { S3 } from 'aws-sdk';
import { fetchS3DirectoryContentsFactory } from './helpers/fetchS3DirectoryContents';
import App from './App';

import './index.scss';

const CONFIG = {
  S3_BUCKET: 'hero-swagger-documentation',
  S3_BUCKET_REGION: 'eu-west-1',
  S3_BUCKET_URL: 'http://swagger.qa.usehero.com'
}

const s3Client = new S3({
  region: CONFIG.S3_BUCKET_REGION
});

ReactDOM.render(
  <React.StrictMode>
    <App
      s3BaseURL={CONFIG.S3_BUCKET_URL}
      fetchS3DirectoryContents={fetchS3DirectoryContentsFactory(s3Client, CONFIG.S3_BUCKET)}
    />
  </React.StrictMode>,
  document.getElementById('root')
);
