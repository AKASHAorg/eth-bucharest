import React, { useMemo, useRef } from 'react';
import { hasOwn, useRootComponentProps } from '@akashaorg/ui-awf-hooks';
import { useGetContentBlockByIdQuery } from '@akashaorg/ui-awf-hooks/lib/generated/apollo';
import { ContentBlockExtension } from '@akashaorg/ui-lib-extensions/lib/react/content-block';
import Card from '@akashaorg/design-system-core/lib/components/Card';

type ContentBlockType = {
  blockID: string;
  onContentClick?: () => void;
};

const ContentBlock: React.FC<ContentBlockType> = (props) => {
  const { blockID, onContentClick } = props;

  const contentBlockReq = useGetContentBlockByIdQuery({
    variables: { id: blockID },
    fetchPolicy: 'cache-first',
  });

  const blockData = useMemo(() => {
    return contentBlockReq.data?.node && hasOwn(contentBlockReq.data.node, 'id')
      ? contentBlockReq.data.node
      : null;
  }, [contentBlockReq.data]);

  return (
    <Card
      type="plain"
      onClick={() => {
        if (typeof onContentClick === 'function') {
          onContentClick();
        }
      }}
      customStyle="w-full"
    >
      <ContentBlockExtension
        blockData={blockData}
        error={contentBlockReq.error?.message ?? ''}
        fetchError={{
          errorTitle: 'Network error occurred',
          errorDescription: 'Click on refresh to try reloading the block.',
        }}
        contentLoadError={{
          errorTitle: 'Content not loaded correctly',
          errorDescription: 'Unable to load content, please try again later.',
        }}
        notInstalledTitle={'not installed'}
        notInstalledDescription1={'Please install'}
        notInstalledDescription2={'to view this content.'}
        refreshLabel={'Refresh'}
        onRefresh={() => {
          contentBlockReq.refetch({ id: blockID });
        }}
      />
    </Card>
  );
};

export default ContentBlock;
