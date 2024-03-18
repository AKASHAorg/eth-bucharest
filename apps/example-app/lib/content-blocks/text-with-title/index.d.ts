/// <reference types="single-spa" />
import { ContentBlockModes, RootComponentProps } from '@akashaorg/typings/lib/ui';
export declare const bootstrap: import("single-spa").LifeCycleFn<RootComponentProps & {
    blockInfo: Omit<import("@akashaorg/typings/lib/ui").ContentBlock, "loadingFn"> & {
        mode: ContentBlockModes;
    };
    blockData: {} | {
        id: string;
        active: boolean;
        appVersionID: any;
        createdAt: any;
        kind?: import("@akashaorg/typings/lib/sdk/graphql-types-new").AkashaContentBlockBlockDef;
        version: any;
        nsfw?: boolean;
        content: {
            propertyType: string;
            value: string;
            label: string;
        }[];
        appVersion?: {
            applicationID: any;
            id: string;
            version: string;
            application?: {
                name: string;
                displayName: string;
                id: string;
            };
        };
        author: {
            id: string;
            isViewer: boolean;
        };
    };
    content: import("@akashaorg/typings/lib/sdk/graphql-types-new").AkashaContentBlockLabeledValue;
}>, mount: import("single-spa").LifeCycleFn<RootComponentProps & {
    blockInfo: Omit<import("@akashaorg/typings/lib/ui").ContentBlock, "loadingFn"> & {
        mode: ContentBlockModes;
    };
    blockData: {} | {
        id: string;
        active: boolean;
        appVersionID: any;
        createdAt: any;
        kind?: import("@akashaorg/typings/lib/sdk/graphql-types-new").AkashaContentBlockBlockDef;
        version: any;
        nsfw?: boolean;
        content: {
            propertyType: string;
            value: string;
            label: string;
        }[];
        appVersion?: {
            applicationID: any;
            id: string;
            version: string;
            application?: {
                name: string;
                displayName: string;
                id: string;
            };
        };
        author: {
            id: string;
            isViewer: boolean;
        };
    };
    content: import("@akashaorg/typings/lib/sdk/graphql-types-new").AkashaContentBlockLabeledValue;
}>, unmount: import("single-spa").LifeCycleFn<RootComponentProps & {
    blockInfo: Omit<import("@akashaorg/typings/lib/ui").ContentBlock, "loadingFn"> & {
        mode: ContentBlockModes;
    };
    blockData: {} | {
        id: string;
        active: boolean;
        appVersionID: any;
        createdAt: any;
        kind?: import("@akashaorg/typings/lib/sdk/graphql-types-new").AkashaContentBlockBlockDef;
        version: any;
        nsfw?: boolean;
        content: {
            propertyType: string;
            value: string;
            label: string;
        }[];
        appVersion?: {
            applicationID: any;
            id: string;
            version: string;
            application?: {
                name: string;
                displayName: string;
                id: string;
            };
        };
        author: {
            id: string;
            isViewer: boolean;
        };
    };
    content: import("@akashaorg/typings/lib/sdk/graphql-types-new").AkashaContentBlockLabeledValue;
}>;
