import { Link } from 'react-router-dom';
import { DirectoryData, FileData } from '../helpers/fetchS3DirectoryContents';
import Icon from './Icon';

import './FileItem.scss';
import apiIconSrc from './icons/api.svg'
import fileIconSrc from './icons/file.svg'
import upDirectoryLogoSrc from './icons/back.svg';
import directoryLogoSrc from './icons/directory.svg';

interface FileItemProps {
  s3BaseURL: string;
  itemData: DirectoryData | FileData;
}

function bytesToSize(bytes: number) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Bytes';
  const ii = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, ii)) + ' ' + sizes[ii];
}

function getExtensionIconSrc(extension: string) {
  switch (extension) {
    case 'html':
      return apiIconSrc;
    default:
      return fileIconSrc;
  }
}

function getDirectoryIconSrc(directoryData: DirectoryData) {
  return directoryData.parent === true
    ? upDirectoryLogoSrc
    : directoryLogoSrc;
}

function isFile(item: DirectoryData | FileData): item is FileData {
  return (item as FileData).bytes !== undefined;
}

function FileItem({ s3BaseURL, itemData }: FileItemProps) {
  const item = isFile(itemData)
    ? (
      <>
        <Icon icon={getExtensionIconSrc(itemData.extension)} />
        <a className='FileName' href={`${s3BaseURL}/${itemData.path}`} target='_blank'>{itemData.name}</a>
        <p className='FileSize'>{bytesToSize(itemData.bytes)}</p>
        <p className='FileLastModified'>{itemData.lastModified.toISOString()}</p>
      </>
    )
    : (
      <>
        <Icon icon={getDirectoryIconSrc(itemData)} />
        <Link to={`/${itemData.path}`}>{itemData.name}</Link>
      </>
    );

  return (
    <div className="FileItem">
      {item}
    </div>
  );
}

export default FileItem;
