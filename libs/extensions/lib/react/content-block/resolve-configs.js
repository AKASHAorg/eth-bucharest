import getSDK from '@akashaorg/awf-sdk';
import { hasOwn } from '@akashaorg/ui-awf-hooks';
const sdk = getSDK();
const uiStash = sdk.services.stash.getUiStash();
export const resolveConfigs = async ({ matchingBlocks, mode }) => {
    const newBlocks = [];
    for (const block of matchingBlocks) {
        let id = null;
        if (block?.blockData && hasOwn(block.blockData, 'id')) {
            id = `${block.blockInfo.appName}-${block.blockData.id}`;
        }
        if (!uiStash.has(id)) {
            const config = await block.blockInfo.loadingFn({
                blockInfo: { ...block.blockInfo, mode },
                blockData: block.blockData,
            })();
            uiStash.set(id, config);
        }
        const config = uiStash.get(id);
        newBlocks.push({ ...block, config });
    }
    return newBlocks;
};
//# sourceMappingURL=resolve-configs.js.map