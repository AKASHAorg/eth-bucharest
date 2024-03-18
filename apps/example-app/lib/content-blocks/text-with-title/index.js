import * as React from 'react';
import singleSpaReact from 'single-spa-react';
import ReactDOMClient from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { useRootComponentProps, withProviders } from '@akashaorg/ui-awf-hooks';
import ErrorLoader from '@akashaorg/design-system-core/lib/components/ErrorLoader';
import TextBlockEditor from './text-block-editor';
import TextBlockRenderer from './text-block-renderer';
const TextBlock = (props) => {
    const { getTranslationPlugin } = useRootComponentProps();
    return (React.createElement(I18nextProvider, { i18n: getTranslationPlugin().i18n },
        props.blockInfo.mode === "edit-mode" /* ContentBlockModes.EDIT */ && React.createElement(TextBlockEditor, { ...props }),
        props.blockInfo.mode === "read-only-mode" /* ContentBlockModes.READONLY */ && React.createElement(TextBlockRenderer, { ...props })));
};
export const { bootstrap, mount, unmount } = singleSpaReact({
    React,
    ReactDOMClient,
    rootComponent: withProviders(TextBlock),
    errorBoundary: (err, errorInfo, props) => {
        if (props.logger) {
            props.logger.error(`${JSON.stringify(errorInfo)}, ${errorInfo}`);
        }
        return React.createElement(ErrorLoader, { type: "script-error", title: "Error in text-block", details: err.message });
    },
});
//# sourceMappingURL=index.js.map