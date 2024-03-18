import * as React from 'react';
import { WidgetInterface } from '@akashaorg/typings/lib/ui';
export type WidgetExtensionProps = {
    name: string;
    loadingIndicator?: React.ReactNode;
    onError?: (widget: WidgetInterface & {
        appName: string;
    }, message?: string) => void;
    customStyle?: string;
    fullHeight?: boolean;
};
export declare const Widget: React.FC<WidgetExtensionProps>;
