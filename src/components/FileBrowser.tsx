import React from 'react';
import { RouteComponentProps } from 'react-router';
import { FetchS3DirectoryContentsFunction, DirectoryContents } from '../helpers/fetchS3DirectoryContents';
import FileList from './FileList';
import { GetExtensionIconSrcFunction } from './FileItem';
import './FileBrowser.scss';

interface FileBrowserProps {
  s3BaseURL: string;
  fetchS3DirectoryContents: FetchS3DirectoryContentsFunction;
  getExtensionIconSrc: GetExtensionIconSrcFunction;
  route: RouteComponentProps
}

interface FileBrowserState {
  directoryContents: DirectoryContents;
  currentDirectory: string;
  isLoading: boolean;
}

class FileBrowser extends React.Component<FileBrowserProps, FileBrowserState> {

  constructor(props: FileBrowserProps) {
    super(props);

    this.state = {
      directoryContents: {
        directories: [],
        files: []
      },
      currentDirectory: this.props.route.location.pathname,
      isLoading: false
    };
  }

  async componentWillReceiveProps(nextProps: Readonly<FileBrowserProps>, nextContext: any) {
    this.setState({ currentDirectory: nextProps.route.location.pathname }, () => {
      this.fetchDirectoryContents();
    })
  }

  async componentDidMount() {
    await this.fetchDirectoryContents();
  }

  async fetchDirectoryContents() {
    const { fetchS3DirectoryContents } = this.props;

    await this.setState({ isLoading: true })

    const prefix = this.state.currentDirectory === '/'
      ? ''
      : this.state.currentDirectory + '/';

    const directoryContents = await fetchS3DirectoryContents(prefix);
    this.setState({ directoryContents });

    await this.setState({ isLoading: false })
  }

  render() {
    const { s3BaseURL, getExtensionIconSrc } = this.props;
    const { currentDirectory, directoryContents, isLoading, } = this.state;

    return (
      <div>
        <h2>Path: {currentDirectory}</h2>
        <FileList
          s3BaseURL={s3BaseURL}
          directories={directoryContents.directories}
          files={directoryContents.files}
          getExtensionIconSrc={getExtensionIconSrc}
          isLoading={isLoading}
        />
      </div>
    );
  }
}

export default FileBrowser;
