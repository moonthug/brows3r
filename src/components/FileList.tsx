import { DirectoryData, FileData } from '../helpers/fetchS3DirectoryContents';
import FileItem from './FileItem';

interface FileListProps {
  s3BaseURL: string;
  directories: DirectoryData[];
  files: FileData[];
  isLoading: boolean;
}

function FileList({ s3BaseURL, directories, files, isLoading }: FileListProps) {
  const items = [...directories, ...files];

  const className = isLoading ? 'FileItemContainer isLoading' : 'FileItemContainer'
  return (
    <div className={className}>
        { items.map((item: DirectoryData | FileData, index) =>
          <FileItem
            s3BaseURL={s3BaseURL}
            itemData={item}
            key={index}
          />)
        }
    </div>
  );
}

export default FileList;
