import { INTEGRATION_TYPES } from '@akashaorg/typings/lib/ui';

export const missingRequiredFields = {
  version: '0.0.1',
  integrationID: '1',
  author: '@akashaorg',
  enabled: true,
  manifestData: {
    mainFile: 'index.js',
  },
};

// config for integrations config overrides
const overrides = [

  {
    name: '@akashaorg/app-akasha-integration',
    integrationType: INTEGRATION_TYPES.APPLICATION,
    sources: [`https://next.akasha-world-framework.pages.dev/apps/akasha/index.js`],
    ...missingRequiredFields,
  },
  {
    name: '@akashaorg/app-auth-ewa',
    integrationType: INTEGRATION_TYPES.APPLICATION,
    sources: [`https://next.akasha-world-framework.pages.dev/apps/auth-app/index.js`],
    ...missingRequiredFields,
  },
  {
    name: '@akashaorg/app-profile',
    integrationType: INTEGRATION_TYPES.APPLICATION,
    sources: [`https://next.akasha-world-framework.pages.dev/apps/profile/index.js`],
    ...missingRequiredFields,
  },
  {
    name: '@akashaorg/app-notifications',
    integrationType: INTEGRATION_TYPES.APPLICATION,
    sources: [`https://next.akasha-world-framework.pages.dev/apps/notifications/index.js`],
    ...missingRequiredFields,
  },
  {
    name: '@akashaorg/app-settings-ewa',
    integrationType: INTEGRATION_TYPES.APPLICATION,
    sources: [`https://next.akasha-world-framework.pages.dev/apps/settings-app/index.js`],
    ...missingRequiredFields,
  },
  {
    name: '@akashaorg/app-articles',
    integrationType: INTEGRATION_TYPES.APPLICATION,
    sources: [`https://next.akasha-world-framework.pages.dev/apps/articles/index.js`],
    ...missingRequiredFields,
  },
  {
    name: '@akashaorg/app-routing',
    integrationType: INTEGRATION_TYPES.APPLICATION,
    sources: [`https://next.akasha-world-framework.pages.dev/apps/routing/index.js`],
    ...missingRequiredFields,
  },
  {
    name: '@akashaorg/ui-widget-sidebar',
    integrationType: INTEGRATION_TYPES.WIDGET,
    sources: [`https://next.akasha-world-framework.pages.dev/widgets/sidebar/index.js`],
    ...missingRequiredFields,
  },
  {
    name: '@akashaorg/ui-widget-topbar',
    integrationType: INTEGRATION_TYPES.WIDGET,
    sources: [`https://next.akasha-world-framework.pages.dev/widgets/topbar/index.js`],
    ...missingRequiredFields,
  },
  {
    name: '@akashaorg/ui-widget-layout',
    integrationType: INTEGRATION_TYPES.WIDGET,
    sources: [`https://next.akasha-world-framework.pages.dev/widgets/layout/index.js`],
    ...missingRequiredFields,
  },
  {
    name: '@akashaorg/ui-widget-mini-profile',
    integrationType: INTEGRATION_TYPES.WIDGET,
    sources: ['https://next.akasha-world-framework.pages.dev/widgets/mini-profile/index.js'],
    ...missingRequiredFields,
  },
];

export default overrides;
