import React from 'react';
import type { ContentBlockRootProps } from '@akashaorg/typings/lib/ui';
import Stack from '@akashaorg/design-system-core/lib/components/Stack';
import Text from '@akashaorg/design-system-core/lib/components/Text';

const TextBlockRenderer: React.FC<ContentBlockRootProps> = (props) => {
  const body = props.content[1].value;
  const title = props.content[0].value;
  return (
    <Stack direction="column" spacing="gap-2">
      <Text variant="h5">{title}</Text>
      <Text>{body}</Text>
    </Stack>
  );
};

export default TextBlockRenderer;
