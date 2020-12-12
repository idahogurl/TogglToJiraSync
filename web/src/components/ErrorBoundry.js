/* global Rollbar */
import React, { Component } from 'react';

const wrapper = {
  backgroundColor: 'gainsboro',
  padding: 10,
  border: 1,
};

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    });
    // You can also log error messages to an error reporting service here
    Rollbar.error(error); // Send it to Rollbar!
  }

  render() {
    const { error, errorInfo } = this.state;
    if (errorInfo) {
      return (
        <div style={wrapper}>
          <h2 style={{ textAlign: 'center' }}>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
          <p style={{ marginTop: 20 }}>
            <a href="index.html">Back</a>
          </p>
        </div>
      );
    }
    // Normally, just render children
    const { children } = this.props;
    return children;
  }
}
