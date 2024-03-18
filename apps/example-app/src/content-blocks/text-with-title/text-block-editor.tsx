import React, { useState, useImperativeHandle, useCallback } from 'react';
import type { RefObject, ChangeEvent } from 'react';
import type { BlockInstanceMethods, ContentBlockRootProps } from '@akashaorg/typings/lib/ui';

/**
 * This component is used in the editor.
 */
const TextBlockEditor: React.FC<
  ContentBlockRootProps & { blockRef?: RefObject<BlockInstanceMethods> }
> = props => {
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

  /**
   * Exposing the following api is required by the editor.
   * The basic flow of publishing a Beam is:
   *  - create a content block
   *    - if the call fails user will be presented an option to retry
   *  - create a Beam whose content will include the blockID created in the previous step.
   */
  useImperativeHandle(
    props.blockRef,
    () => ({
      createBlock,
      retryBlockCreation,
    }),
    [createBlock, retryBlockCreation],
  );

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        className="w-full p-2 mb-2 dark:text-white rounded"
        placeholder="Write a title"
        onChange={handleTitleChange}
      />
      <textarea
        className="mb-2 dark:text-white w-full p-2 rounded"
        placeholder="Write something"
        onChange={handleContentChange}
      />
    </div>
  );
};

export default TextBlockEditor;
