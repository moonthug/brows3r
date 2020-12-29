import React from 'react';
import { Route, BrowserRouter as Router, HashRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import FileBrowser from './components/FileBrowser';
import { FetchS3DirectoryContentsFunction } from './helpers/fetchS3DirectoryContents';
import './App.scss';

interface AppProps {
  s3BaseURL: string;
  fetchS3DirectoryContents: FetchS3DirectoryContentsFunction;
}

function App({ s3BaseURL, fetchS3DirectoryContents }: AppProps) {
  return (
    <div className="App">
      <HashRouter>
        <Route path='/:dir?' component={(route: RouteComponentProps) => {
          return <FileBrowser
            s3BaseURL={s3BaseURL}
            fetchS3DirectoryContents={fetchS3DirectoryContents}
            route={route}
          />
        }}/>
      </HashRouter>
    </div>
  );
}

export default App;
