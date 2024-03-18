import React from 'react';
import singleSpaReact from 'single-spa-react';
import {RootExtensionProps} from '@akashaorg/typings/lib/ui';
import ReactDOMClient from 'react-dom/client';
import ErrorLoader from '@akashaorg/design-system-core/lib/components/ErrorLoader';
import Button from '@akashaorg/design-system-core/lib/components/Button';
import {useRootComponentProps, withProviders} from '@akashaorg/ui-awf-hooks';

const SaveToFavsExtension: React.FC<RootExtensionProps> = (props) => {
  const {extensionData} = props;
  const { plugins } = useRootComponentProps();

  const saveLocalDataPlugin = React.useMemo(() => {
    return plugins['@akashaorg/example-app'] ?? {}
  }, [plugins]);

  const handleRatingClick = () => {
    console.log('saving to favs', extensionData.itemId);
  }

  if (!extensionData.itemId) {
    console.error('SaveToFavsExtension requires beamId');
    return null;
  }

  return (
    <>
      <Button label={`+1`} onClick={handleRatingClick} />
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
