import { S3 } from 'aws-sdk';
import { ListObjectsV2Output } from 'aws-sdk/clients/s3';

export interface DirectoryContents {
  files: FileData[];
  directories: DirectoryData[]
}

export interface DirectoryData {
  name: string;
  path?: string;
  parent?: boolean;
}

export interface FileData {
  name: string;
  path: string;
  extension: string;
  bytes: number;
  lastModified: Date;
}

async function fetchS3DirectoryContents (s3Client: S3, bucket: string, prefix: string = ''): Promise<DirectoryContents> {
  prefix = prefix.charAt(0) === '/' ? prefix.substring(1, prefix.length) : prefix;

  const params = {
    Bucket: bucket,
    Delimiter: '/',
    Prefix: prefix
  }

  // @TODO: Make this paged?
  const response: ListObjectsV2Output = await s3Client
    .makeUnauthenticatedRequest('listObjectsV2', params)
    .promise();

  let files = new Array<FileData>();
  let directories = new Array<DirectoryData>();


  if (prefix) {
    const path = prefix.split('/')
      .slice(0,-2)
      .join('/');

    directories.push({
      name: '..',
      parent: true,
      path
    });
  }

  if (response.Contents) {
    files = response.Contents
      .map(content => {
        if (content.Key === prefix) {
          return undefined;
        }

        if (!prefix && content.Key === 'index.html') {
          return undefined;
        }

        return {
          extension: content.Key?.split('.')[1] || '',
          name: content.Key?.replace(prefix, '') || 'Unknown Name',
          path: content.Key,
          bytes: content.Size,
          lastModified: content.LastModified,
        }
      })
      .filter(content => !!content) as FileData[];
  }

  if (response.CommonPrefixes) {
    directories = directories
      .concat(response.CommonPrefixes
        .map(commonPrefix => {
          const path = commonPrefix.Prefix?.substring(0, commonPrefix.Prefix?.length - 1);
          return {
            name: path ? path.replace(prefix, '') : 'Unknown Name',
            path: path || ''
          };
        })
      );
  }

  return { files, directories };
}

export type FetchS3DirectoryContentsFunction = (prefix: string) => Promise<DirectoryContents>;

export function fetchS3DirectoryContentsFactory(s3Client: S3, bucket: string): FetchS3DirectoryContentsFunction {
  return (prefix: string = '') => {
    return fetchS3DirectoryContents(s3Client, bucket, prefix);
  }
}
