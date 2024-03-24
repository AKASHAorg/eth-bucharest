import React, { useMemo } from 'react';
import Card from '@akashaorg/design-system-core/lib/components/Card';
import { useGetContentBlockByIdQuery } from '@akashaorg/ui-awf-hooks/lib/generated/apollo';
import { ContentBlockExtension } from '@akashaorg/ui-lib-extensions/lib/react/content-block';
import { hasOwn } from '@akashaorg/ui-awf-hooks';

type ContentBlockRendererProps = {
  blockID: string;
  onContentClick?: () => void;
};

const ContentBlockRenderer: React.FC<ContentBlockRendererProps> = (props) => {
  const { blockID, onContentClick } = props;

  /**
   * fetch the actual content of a beam, which is saved as content blocks
   * for this example there is only one content block per beam
   * but you can add more
   */
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

export default ContentBlockRenderer;
