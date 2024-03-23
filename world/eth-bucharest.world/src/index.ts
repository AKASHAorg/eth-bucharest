import '@akashaorg/design-system-core/src/twind/main.css';
import '@akashaorg/design-system-core/src/twind/globals.css';

import { WorldConfig, INTEGRATION_TYPES } from '@akashaorg/typings/lib/ui';
import { missingRequiredFields } from './registry-overrides';

console.time('AppLoader:firstMount');

declare const __DEV__: boolean;
declare const __LOAD_LOCAL_SOURCES__: boolean;

(async function bootstrap(System) {
  const { default: AppLoader } = await System.import('@akashaorg/ui-app-loader');
  const { default: getSDK } = await System.import('@akashaorg/awf-sdk');

  let registryOverrides = [
    {
      name: '@akashaorg/app-routing',
      integrationType: INTEGRATION_TYPES.APPLICATION,
      sources: ['https://eth-bucharest.akasha-world-framework.pages.dev/apps/routing/index.js'],
      ...missingRequiredFields,
    },
    {
      name: '@akashaorg/ui-widget-layout',
      integrationType: INTEGRATION_TYPES.WIDGET,
      sources: ['https://eth-bucharest.akasha-world-framework.pages.dev/widgets/layout/index.js'],
      ...missingRequiredFields,
    },
    {
      name: '@akashaorg/ui-widget-sidebar',
      integrationType: INTEGRATION_TYPES.WIDGET,
      sources: ['https://eth-bucharest.akasha-world-framework.pages.dev/widgets/sidebar/index.js'],
      ...missingRequiredFields,
    },
    {
      name: '@akashaorg/ui-widget-topbar',
      integrationType: INTEGRATION_TYPES.WIDGET,
      sources: ['https://eth-bucharest.akasha-world-framework.pages.dev/widgets/topbar/index.js'],
      ...missingRequiredFields,
    },
  ];

  if (__DEV__ || __LOAD_LOCAL_SOURCES__) {
    registryOverrides = (await import('./registry-overrides')).default;
  }

  const loaderConfig: WorldConfig = {
    title: 'ETHBucharest World',
    // main layout (shell)
    layout: '@akashaorg/ui-widget-layout',
    // define an app that will load at root '/' path
    homepageApp: 'example-app',
    // define pre-installed apps,
    // homepageApp is always loaded by default
    defaultApps: [
      '@akashaorg/app-routing',
      '@akashaorg/app-auth-ewa',
      '@akashaorg/app-profile',
      '@akashaorg/app-settings-ewa',
      '@akashaorg/app-extensions',
    ],
    // pre-installed widgets;
    // layout widget is always loaded by default
    defaultWidgets: [
      'example-widget',
      '@akashaorg/ui-widget-topbar',
      '@akashaorg/ui-widget-sidebar',
    ],
    analytics: {
      trackerUrl: "",
      siteId: "",
    },
    registryOverrides,
    socialLinks: [
      { icon: 'Github', link: 'https://github.com/AKASHAorg' },
      { icon: 'Twitter', link: 'https://twitter.com/AKASHAworld' },
    ],
  };

  const sdk = getSDK();
  const appLoader = new AppLoader(loaderConfig);
  appLoader.start();
  // startLoader(loaderConfig);

  // tslint:disable-next-line:no-console
  console.log('initial sdk instance', sdk);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
})(globalThis.System);
