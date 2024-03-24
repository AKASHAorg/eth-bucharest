import React from 'react';
import ReactDOMClient from 'react-dom/client';
import type { RootComponentProps } from '@akashaorg/typings/lib/ui';
import singleSpaReact from 'single-spa-react';
import { withProviders } from '@akashaorg/ui-awf-hooks';
import ErrorLoader from '@akashaorg/design-system-core/lib/components/ErrorLoader';
import ExampleApp from './App';

export const { bootstrap, mount, unmount } = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: withProviders(ExampleApp),
  errorBoundary: (error, errorInfo, props: RootComponentProps) => {
    if (props.logger) {
      props.logger.error(`${error.message} - ${errorInfo.componentStack}`);
    }
    return (
      <ErrorLoader
        type="script-error"
        title="Error in example app"
        details={error.message}
      />
    );
  },
});
