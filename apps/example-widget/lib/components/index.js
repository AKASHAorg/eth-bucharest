import React from 'react';
import singleSpaReact from 'single-spa-react';
import ReactDOMClient from 'react-dom/client';
import { withProviders } from '@akashaorg/ui-awf-hooks';
import ErrorLoader from '@akashaorg/design-system-core/lib/components/ErrorLoader';
import ExampleWidget from './example-widget';
export const { bootstrap, mount, unmount } = singleSpaReact({
    React,
    ReactDOMClient,
    rootComponent: withProviders(ExampleWidget),
    errorBoundary: (error, errorInfo, props) => {
        if (props.logger) {
            props.logger.error(`${error.message} -> ${errorInfo.componentStack}`);
        }
        return (React.createElement(ErrorLoader, { type: "script-error", title: "Error in layout widget", details: error.message }));
    },
});
//# sourceMappingURL=index.js.map