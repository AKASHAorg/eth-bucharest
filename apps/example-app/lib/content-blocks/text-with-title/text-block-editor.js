import React, { useState, useImperativeHandle, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
/**
 * This component is used in the editor.
 */
const TextBlockEditor = props => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const createBlock = useCallback(async () => {
        return {
            response: {
                blockID: '0',
                error: 'not implemented',
            },
            blockInfo: props.blockInfo,
        };
    }, [props.blockInfo]);
    const retryBlockCreation = useCallback(async () => {
        return {
            response: {
                blockID: '0',
                error: 'not implemented',
            },
            blockInfo: props.blockInfo,
        };
    }, [props.blockInfo]);
    const handleBlockFocus = useCallback((isFocused) => {
        return;
    }, []);
    /**
     * Exposing the following api is required by the editor.
     * The basic flow of publishing a Beam is:
     *  - create a content block
     *    - if the call fails user will be presented an option to retry
     *  - create a Beam whose content will include the blockID created in the previous step.
     */
    useImperativeHandle(props.blockRef, () => ({
        createBlock,
        retryBlockCreation,
        handleFocusBlock: handleBlockFocus,
    }), [createBlock, retryBlockCreation, handleBlockFocus]);
    const { t } = useTranslation();
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleContentChange = (event) => {
        setContent(event.target.value);
    };
    return (React.createElement("div", null,
        React.createElement("input", { type: "text", className: "w-full p-2 mb-2 dark:text-white rounded", placeholder: t('Write a title'), onChange: handleTitleChange }),
        React.createElement("textarea", { className: "mb-2 dark:text-white w-full p-2 rounded", placeholder: t('Write something'), onChange: handleContentChange })));
};
export default TextBlockEditor;
//# sourceMappingURL=text-block-editor.js.map