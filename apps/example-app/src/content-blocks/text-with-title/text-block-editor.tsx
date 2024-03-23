import React, { useState, useImperativeHandle, useCallback } from 'react';
import type { RefObject, ChangeEvent } from 'react';
import type {
  BlockInstanceMethods,
  ContentBlockRootProps,
} from '@akashaorg/typings/lib/ui';
import getSdk from '@akashaorg/awf-sdk';
import {
  AkashaContentBlockBlockDef,
  AkashaContentBlockLabeledValueInput,
} from '@akashaorg/typings/lib/sdk/graphql-types-new';

const createContentBlock = async (
  titleBlock: AkashaContentBlockLabeledValueInput,
  bodyBlock: AkashaContentBlockLabeledValueInput
) => {
  const sdk = getSdk();

  return sdk.services.gql.client.CreateContentBlock({
    i: {
      content: {
        active: true,
        appVersionID: APP_VERSION_ID,
        content: [titleBlock, bodyBlock],
        createdAt: new Date().toISOString(),
        kind: AkashaContentBlockBlockDef.Text,
      },
    },
  });
};

/**
 * To keep things simple we are hardcoding the appVersionId.
 * this property will be available through props.
 */
const APP_VERSION_ID = process.env.ANTENNA_RELEASE_ID;

/**
 * This component is used in the editor.
 */
const TextBlockEditor: React.FC<
  ContentBlockRootProps & { blockRef?: RefObject<BlockInstanceMethods> }
> = (props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const retryCount = React.useRef(0);

  const createBlock = useCallback(async () => {
    const titleBlockValue: AkashaContentBlockLabeledValueInput = {
      label: `${props.blockInfo.appName}:title`,
      propertyType: props.blockInfo.propertyType,
      value: title,
    };

    const bodyBlockValue: AkashaContentBlockLabeledValueInput = {
      label: `${props.blockInfo.appName}:body`,
      propertyType: props.blockInfo.propertyType,
      value: content,
    };
    try {
      const response = await createContentBlock(
        titleBlockValue,
        bodyBlockValue
      );
      return {
        response: {
          blockID: response.createAkashaContentBlock.document.id,
        },
        blockInfo: props.blockInfo,
        retryCount: retryCount.current,
      };
    } catch (err) {
      return {
        response: {
          blockID: null,
          error: err.message,
        },
        blockInfo: props.blockInfo,
        retryCount: retryCount.current,
      };
    }
  }, [props.blockInfo, content, title]);

  const retryBlockCreation = useCallback(async () => {
    retryCount.current += 1;
    return createBlock();
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
    [createBlock, retryBlockCreation]
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
