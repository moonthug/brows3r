import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import FileBrowser from './components/FileBrowser';
import { FetchS3DirectoryContentsFunction } from './helpers/fetchS3DirectoryContents';
import { GetExtensionIconSrcFunction } from './components/FileItem';

import './App.scss';

interface AppProps {
  s3BaseURL: string;
  fetchS3DirectoryContents: FetchS3DirectoryContentsFunction;
  getExtensionIconSrc: GetExtensionIconSrcFunction;
}

function App({ s3BaseURL, fetchS3DirectoryContents, getExtensionIconSrc }: AppProps) {
  return (
    <div className="App">
      <HashRouter>
        <Route path='/:dir?' component={(route: RouteComponentProps) => {
          return <FileBrowser
            s3BaseURL={s3BaseURL}
            fetchS3DirectoryContents={fetchS3DirectoryContents}
            getExtensionIconSrc={getExtensionIconSrc}
            route={route}
          />
        }}/>
      </HashRouter>
    </div>
  );
}

export default App;
