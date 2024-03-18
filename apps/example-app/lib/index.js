import 'systemjs-webpack-interop/auto-public-path';
import { LogoTypeSource, MenuItemAreaType, MenuItemType, } from '@akashaorg/typings/lib/ui';
import React from 'react';
import { GlobeAltIcon } from '@akashaorg/design-system-core/lib/components/Icon/hero-icons-outline';
/**
 * Optional method that will be called for every app right after the layout config and plugins are loaded
 * but before the `register` function
 * Useful to interact with the plugins before registering the app (ex. fire notification events)
 * @returns void
 */
export const initialize = (options) => {
    return;
};
/**
 * The register function is called right after the `initialize` function
 * This method is required for apps and widgets
 * @returns IAppConfig
 */
export const register = opts => {
    return {
        loadingFn: () => import('./components'),
        mountsIn: opts.layoutConfig?.applicationSlotId,
        i18nNamespace: ['app-example'],
        logo: { type: LogoTypeSource.ICON, value: React.createElement(GlobeAltIcon, null) },
        menuItems: {
            label: 'Example App',
            type: MenuItemType.App,
            logo: { type: LogoTypeSource.ICON, value: React.createElement(GlobeAltIcon, null) },
            area: [MenuItemAreaType.AppArea],
            subRoutes: [],
        },
        contentBlocks: [
            {
                propertyType: 'text-block',
                displayName: 'Text Block',
                icon: React.createElement(GlobeAltIcon, null),
                loadingFn: () => {
                    return () => import('./content-blocks/text-with-title');
                },
            },
        ],
    };
};
/**
 * Applications and widgets can provide additional functionalities via plugins.
 * Plugins are namespaced with the widget's or app's name.
 * Warning: plugins cannot use other plugins
 */
export const getPlugin = (props) => {
    return {
        saveLocalData(key, data) {
            localStorage.setItem(key, data);
        },
        getLocalData(key) {
            return localStorage.getItem(key);
        },
    };
};
//# sourceMappingURL=index.js.map