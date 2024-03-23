import React from 'react';
import type { ContentBlockRootProps } from '@akashaorg/typings/lib/ui';
import Stack from '@akashaorg/design-system-core/lib/components/Stack';
import Text from '@akashaorg/design-system-core/lib/components/Text';
import { hasOwn } from '@akashaorg/ui-awf-hooks';

const TextBlockRenderer: React.FC<ContentBlockRootProps> = (props) => {
  return (
    <Stack direction="column" spacing="gap-2">
      <Text
        variant={props.content.label === 'example-app:title' ? 'h5' : 'body1'}
      >
        {props.content.value}
      </Text>
    </Stack>
  );
};

export default TextBlockRenderer;
