import React from 'react';
import { Provider } from 'react-redux';
import store from './state/store';

import AppHeader from './components/header';
import AppPosts from './components/posts';
import AppFooter from './components/footer';

const App = () => (
  <div className="main">
    <Provider store={store}>
      {/* Page Header */}
      <AppHeader />
      {/* Main Content */}
      <AppPosts />
      {/* Footer  */}
      <AppFooter />
    </Provider>
  </div>
);

export default App;
