import 'systemjs-webpack-interop/auto-public-path';
import { IntegrationRegistrationOptions, WidgetInterface } from '@akashaorg/typings/lib/ui';
/**
 * Optional method that will be called for every app and widget right after the
 * layout config and plugins are loaded but before the `register` function
 * Useful to interact with the plugins before registering the app (ex. fire notification events)
 * @returns void
 */
export declare const initialize: (props: IntegrationRegistrationOptions) => void;
/**
 * The register function is called right after the `initialize` function
 * This method is required for apps and widgets
 * @returns WidgetInterface
 */
export declare const register: (props: IntegrationRegistrationOptions) => WidgetInterface;
/**
 * Applications and widgets can provide additional functionalities via plugins.
 * As an example, the ENS app can provide additional functionalities like address lookup via plugins.
 * Plugins are namespaced with the widget's or app's name.
 * Warning: plugins cannot use other plugins
 */
export declare const getPlugin: () => Promise<{
    saveLocalData(key: string, data: string): void;
    getLocalData(key: string): string;
}>;
