import { DirectoryData, FileData } from '../helpers/fetchS3DirectoryContents';
import { FileItem, GetExtensionIconSrcFunction } from './FileItem';

interface FileListProps {
  s3BaseURL: string;
  directories: DirectoryData[];
  files: FileData[];
  getExtensionIconSrc: GetExtensionIconSrcFunction;
  isLoading: boolean;
}

function FileList({ s3BaseURL, directories, files, getExtensionIconSrc, isLoading }: FileListProps) {
  const items = [...directories, ...files];
  const className = isLoading ? 'FileList isLoading' : 'FileList'
  return (
    <div className={className}>
        { items.map((item: DirectoryData | FileData, index) =>
          <FileItem
            s3BaseURL={s3BaseURL}
            itemData={item}
            getExtensionIconSrc={getExtensionIconSrc}
            key={index}
          />)
        }
    </div>
  );
}

export default FileList;
