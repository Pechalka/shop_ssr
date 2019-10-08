import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';

import withReduxStore from '../lib/with-redux-store';
import Header from './components/Header';
import { appInit, initializeStore } from '../store';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if (ctx.req) {
      await ctx.reduxStore.dispatch(appInit(ctx.req.headers.cookie));
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Provider store={reduxStore}>
        <link href="http://localhost:5000/styles.css" rel="stylesheet" />
        <Header />
        <div className="content">
          <Component {...pageProps} />
        </div>
      </Provider>
    );
  }
}

export default withReduxStore(MyApp, initializeStore);
