import React, { useState, useEffect } from 'react';
import singleSpaReact from 'single-spa-react';
import {RootExtensionProps} from '@akashaorg/typings/lib/ui';
import ReactDOMClient from 'react-dom/client';
import ErrorLoader from '@akashaorg/design-system-core/lib/components/ErrorLoader';
import Button from '@akashaorg/design-system-core/lib/components/Button';
import { useRootComponentProps, withProviders } from '@akashaorg/ui-awf-hooks';

const LOCAL_DATA_KEY = 'example-app_favs';

const SaveToFavsExtension: React.FC<RootExtensionProps> = (props) => {
  const {extensionData} = props;
  const { plugins } = useRootComponentProps();
  const [favs, setFavs] = useState([]);

  /**
   * when a new app is installed the plugins will change
   */
  const localDataPlugin = React.useMemo(() => {
    return plugins['example-app'] ?? {}
  }, [plugins]);

  /**
   * This is a more generic pattern. Normally you would want to move this
   * logic into the state initialization, however you should handle the case
   * when the plugin is provided by another app which might not be installed
   * or the app is installed after this extension loaded.
   */
  useEffect(() => {
    let unsub;
    if (localDataPlugin) {
      setFavs(localDataPlugin.getLocalData(LOCAL_DATA_KEY));
      unsub = localDataPlugin.subscribe((event) => {
        if (event.key === LOCAL_DATA_KEY) {
          if (event.newValue && JSON.parse(event.newValue).length !== favs.length) {
            setFavs(JSON.parse(event.newValue));
          }
        }
      });
    }

    return unsub?.();
  }, [localDataPlugin]);

  const handleRatingClick = () => {
    const currentFavs = localDataPlugin.getLocalData(LOCAL_DATA_KEY);
    // toggle favs
    if (extensionData.itemId && !currentFavs.includes(extensionData.itemId)) {
      localDataPlugin.saveLocalData('example-app_favourites', JSON.stringify([...currentFavs, extensionData.itemId]));
    } else {
      localDataPlugin.saveLocalData('example-app_favourites', JSON.stringify(currentFavs.filter((fav) => fav !== extensionData.itemId)));
    }
  }

  if (!extensionData.itemId) {
    console.error('SaveToFavsExtension requires beamId');
    return null;
  }

  return (
    <>
      <Button label={favs.includes(extensionData.itemId) ? `Starred` : `Star`} onClick={handleRatingClick} />
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
