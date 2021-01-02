import { Link } from 'react-router-dom';
import { DirectoryData, FileData } from '../helpers/fetchS3DirectoryContents';
import Icon from './Icon';

import './FileItem.scss';
import upDirectoryLogoSrc from './icons/back.svg';
import directoryLogoSrc from './icons/directory.svg';

export type GetExtensionIconSrcFunction = (extension: string) => string;

interface FileItemProps {
  s3BaseURL: string;
  itemData: DirectoryData | FileData;
  getExtensionIconSrc: GetExtensionIconSrcFunction;
}

function bytesToSize(bytes: number) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Bytes';
  const ii = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, ii)) + ' ' + sizes[ii];
}

function getDirectoryIconSrc(directoryData: DirectoryData) {
  return directoryData.parent === true
    ? upDirectoryLogoSrc
    : directoryLogoSrc;
}

function isFile(item: DirectoryData | FileData): item is FileData {
  return (item as FileData).bytes !== undefined;
}

export function FileItem({ s3BaseURL, itemData, getExtensionIconSrc }: FileItemProps) {
  const item = isFile(itemData)
    ? (
      <>
        <Icon icon={getExtensionIconSrc(itemData.extension)} />
        <a className='FileName' href={`${s3BaseURL}/${itemData.path}`} target='_blank' rel="noreferrer">{itemData.name}</a>
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
