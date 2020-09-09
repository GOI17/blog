import React from 'react';
import AppPostForm from './postform';

const AppHeader = () => (
  <header className="masthead">
    <div className="overlay" />
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto">
          <div className="site-heading">
            <h1>Blog</h1>
            <span className="subheading">
              <AppPostForm action="create" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default AppHeader;
