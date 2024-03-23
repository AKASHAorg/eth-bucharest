import 'systemjs-webpack-interop/auto-public-path';
import {
  IAppConfig,
  IntegrationRegistrationOptions,
  LogoTypeSource,
  MenuItemAreaType,
  MenuItemType,
  RootComponentProps,
} from '@akashaorg/typings/lib/ui';
import React from 'react';
import { GlobeAltIcon } from '@akashaorg/design-system-core/lib/components/Icon/hero-icons-outline';

/**
 * Optional method that will be called for every app right after the layout config and plugins are loaded
 * but before the `register` function
 * Useful to interact with the plugins before registering the app (ex. fire notification events)
 * @returns void
 */
export const initialize = (options: IntegrationRegistrationOptions): void => {
  return;
};

/**
 * The register function is called right after the `initialize` function
 * This method is required for apps and widgets
 */

export const register = (opts: IntegrationRegistrationOptions): IAppConfig => {
  return {
    loadingFn: () => import('./components'),
    mountsIn: opts.layoutConfig?.applicationSlotId,
    i18nNamespace: ['app-example'],
    menuItems: {
      label: 'Example App',
      type: MenuItemType.App,
      logo: { type: LogoTypeSource.ICON, value: <GlobeAltIcon /> },
      area: [MenuItemAreaType.AppArea],
      subRoutes: [],
    },
    extensions: [
      {
        /**
         *  This extension will be mounted in the EntryCard component.
         */
        mountsIn: 'example-app-fav_*',
        loadingFn: () => import('./extension-points/save-favourites'),
      },
    ],
    contentBlocks: [
      {
        propertyType: 'text-block',
        displayName: 'Text Block',
        icon: <GlobeAltIcon />,
        loadingFn: () => () => import('./content-blocks/text-with-title'),
      },
    ],
  };
};

/**
 * Applications and widgets can provide additional functionalities via plugins.
 * Plugins are namespaced with the widget's or app's name.
 * Warning: plugins cannot use other plugins
 */

export const getPlugin = (props: RootComponentProps) => {
  /**
   * This plugin will be available as `plugins['example-app'].saveLocalData()` and
   *    `plugins['example-app'].getLocalData()`.
   */
  let changeListeners = [];
  const onChange = (
    ev: Pick<
      StorageEvent,
      'key' | 'oldValue' | 'newValue' | 'storageArea' | 'url'
    >
  ) => {
    changeListeners.forEach((listener) => listener(ev));
  };
  let mainSubscribed = false;

  return {
    subscribe(onChangeCb: () => void) {
      if (!mainSubscribed) {
        window.addEventListener('storage', onChange);
        mainSubscribed = true;
      }
      changeListeners.push(onChangeCb);
      return () => {
        changeListeners = changeListeners.filter(
          (listener) => listener !== onChangeCb
        );
        if (!changeListeners.length) {
          window.removeEventListener('storage', onChange);
        }
      };
    },
    saveLocalData(key: string, data: string) {
      const oldValue = this.getLocalData(key);
      localStorage.setItem(key, data);
      onChange({
        key,
        newValue: data,
        oldValue,
        storageArea: localStorage,
        url: location.href,
      });
    },
    removeLocaData(key) {
      const oldValue = this.getLocalData(key);
      localStorage.removeItem(key);
      onChange({
        key,
        newValue: null,
        oldValue,
        storageArea: localStorage,
        url: location.href,
      });
    },
    getLocalData(key: string) {
      return localStorage.getItem(key);
    },
  };
};
