import { DirectoryData, FileData } from '../helpers/fetchS3DirectoryContents';

import './FileList.scss';
import FileItem from './FileItem';

interface FileListProps {
  s3BaseURL: string;
  directories: DirectoryData[];
  files: FileData[];
}

function FileList({ s3BaseURL, directories, files }: FileListProps) {
  const items = [...directories, ...files];
  return (
    <div className="FileList">
        { items.map((item: DirectoryData | FileData) =>
          <FileItem
            s3BaseURL={s3BaseURL}
            itemData={item}
          />)
        }
    </div>
  );
}

export default FileList;
