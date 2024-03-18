import React from 'react';
import singleSpaReact from 'single-spa-react';
import {RootExtensionProps} from '@akashaorg/typings/lib/ui';
import ReactDOMClient from 'react-dom/client';
import ErrorLoader from '@akashaorg/design-system-core/lib/components/ErrorLoader';
import Button from '@akashaorg/design-system-core/lib/components/Button';

const BeamRatingExtension: React.FC<RootExtensionProps> = (props) => {
  const {extensionData} = props;

  const handleRatingClick = () => {
    console.log('rating beam', extensionData.beamId);
  }

  return (
    <>
      <Button label={'+1'} onClick={handleRatingClick} />
    </>
  );
}

export const {bootstrap, mount, unmount} = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: BeamRatingExtension,
  errorBoundary: (err, errorInfo, props: RootExtensionProps) => {
    if (props.logger) {
      props.logger.error(`${JSON.stringify(errorInfo)}, ${errorInfo}`);
    }

    return <ErrorLoader type="script-error" title="Error in text-block" details={err.message} />;
  }
});
