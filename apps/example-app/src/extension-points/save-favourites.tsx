import React, { useState, useEffect } from 'react';
import singleSpaReact from 'single-spa-react';
import {RootExtensionProps} from '@akashaorg/typings/lib/ui';
import ReactDOMClient from 'react-dom/client';
import ErrorLoader from '@akashaorg/design-system-core/lib/components/ErrorLoader';
import Button from '@akashaorg/design-system-core/lib/components/Button';
import { withProviders } from '@akashaorg/ui-awf-hooks';

/**
 * This is just a simple template for an extension point.
 * Extension points are elements inserted at predefined areas.
 * This example is inserted into the beam card by using the <Extension name="example-app-fav_${someUniqueId}" />
 * Note: the extension name should match the pattern of the `mountsIn` property of this extension.
 * For more details please consult the docs.
 */

const SaveToFavsExtension: React.FC<RootExtensionProps> = (props) => {
  const {extensionData} = props;

  const handleRatingClick = () => {
    console.log('Starring item with id:', extensionData.itemId);
  }

  if (!extensionData.itemId) {
    console.error('SaveToFavsExtension requires itemId');
    return null;
  }

  return (
    <>
      <Button label={`Star`} onClick={handleRatingClick} />
    </>
  );
}

export const {bootstrap, mount, unmount} = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: withProviders(SaveToFavsExtension),
  errorBoundary: (err, errorInfo, props: RootExtensionProps) => {
    if (props.logger) {
      props.logger.error(`${JSON.stringify(errorInfo)}, ${errorInfo}`);
    }

    return <ErrorLoader type="script-error" title="Error in text-block" details={err.message} />;
  }
});
