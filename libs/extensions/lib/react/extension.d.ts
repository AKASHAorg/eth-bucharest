import * as React from 'react';
import { ExtensionInterface } from '@akashaorg/typings/lib/ui';
export type ExtensionComponentProps<D> = {
    name: string;
    loadingIndicator?: React.ReactNode;
    emptyIndicator?: React.ReactNode;
    onError?: (extension: ExtensionInterface & {
        appName: string;
    }, message?: string) => void;
    customStyle?: string;
    extensionData?: D;
};
export declare const Extension: <D>(props: ExtensionComponentProps<D>) => JSX.Element;
