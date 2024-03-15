import { INTEGRATION_TYPES } from '@akashaorg/typings/lib/ui';
export declare const missingRequiredFields: {
    version: string;
    integrationID: string;
    author: string;
    enabled: boolean;
    manifestData: {
        mainFile: string;
    };
};
declare const overrides: {
    version: string;
    integrationID: string;
    author: string;
    enabled: boolean;
    manifestData: {
        mainFile: string;
    };
    name: string;
    integrationType: INTEGRATION_TYPES;
    sources: string[];
}[];
export default overrides;
