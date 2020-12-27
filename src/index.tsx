import React from 'react';
import ReactDOM from 'react-dom';
import { S3 } from 'aws-sdk';
import { fetchS3DirectoryContentsFactory } from './helpers/fetchS3DirectoryContents';
import App from './App';

import './index.scss';


const {
  REACT_APP_S3_BUCKET,
  REACT_APP_S3_BUCKET_REGION,
  REACT_APP_S3_BUCKET_URL
} = process.env;

if (!REACT_APP_S3_BUCKET || !REACT_APP_S3_BUCKET_URL) {
  throw new Error('Config values missing');
}

const s3Client = new S3({
  region: REACT_APP_S3_BUCKET_REGION
});

ReactDOM.render(
  <React.StrictMode>
    <App
      s3BaseURL={REACT_APP_S3_BUCKET_URL}
      fetchS3DirectoryContents={fetchS3DirectoryContentsFactory(s3Client, REACT_APP_S3_BUCKET)}
    />
  </React.StrictMode>,
  document.getElementById('root')
);
