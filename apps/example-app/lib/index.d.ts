import 'systemjs-webpack-interop/auto-public-path';
import { IAppConfig, IntegrationRegistrationOptions, type RootComponentProps } from '@akashaorg/typings/lib/ui';
/**
 * Optional method that will be called for every app right after the layout config and plugins are loaded
 * but before the `register` function
 * Useful to interact with the plugins before registering the app (ex. fire notification events)
 * @returns void
 */
export declare const initialize: (options: IntegrationRegistrationOptions) => void;
/**
 * The register function is called right after the `initialize` function
 * This method is required for apps and widgets
 * @returns IAppConfig
 */
export declare const register: (opts: IntegrationRegistrationOptions) => IAppConfig;
/**
 * Applications and widgets can provide additional functionalities via plugins.
 * Plugins are namespaced with the widget's or app's name.
 * Warning: plugins cannot use other plugins
 */
export declare const getPlugin: (props: RootComponentProps) => {
    saveLocalData(key: string, data: string): void;
    getLocalData(key: string): string;
};
