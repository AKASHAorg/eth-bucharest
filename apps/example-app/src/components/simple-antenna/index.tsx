import React from 'react';
import Stack from '@akashaorg/design-system-core/lib/components/Stack';
import BeamResolver from './beam-resolver';
import useIntersectionObserver from '@akashaorg/design-system-core/lib/utils/intersection-observer';
// import { useGetBeams } from './use-get-beams';
import { useGetBeamsQuery } from '@akashaorg/ui-awf-hooks/lib/generated/apollo';

export type SimpleAntennaProps = {};

const SimpleAntenna: React.FC<SimpleAntennaProps> = () => {
  // const { beams, fetchInitialData, fetchNextBatch } = useGetBeams();
  // React.useEffect(() => {
  //   fetchInitialData();
  // }, []);

  const { data, loading, error, fetchMore } = useGetBeamsQuery({
    variables: { last: 10 },
  });

  const beams = React.useMemo(() => {
    return data.akashaBeamIndex?.edges;
  }, [data]);

  const handleFetchMore = () => {
    fetchMore({
      variables: {
        before: data.akashaBeamIndex?.pageInfo?.endCursor,
        last: 10,
      },
      updateQuery(previousResult, { fetchMoreResult }) {
        const previousEdges = previousResult.akashaBeamIndex.edges;
        const newEdges = fetchMoreResult.akashaBeamIndex?.edges;
        const newPageInfo = fetchMoreResult.akashaBeamIndex?.pageInfo;
        return {
          pageInfo: newPageInfo,
          edges: [...previousEdges, ...newEdges],
        };
      },
    });
  };

  const loadMoreRef = React.createRef<HTMLDivElement>();

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: handleFetchMore,
    threshold: 0,
  });

  return (
    <Stack direction="column" spacing="gap-4" customStyle="overflow-auto">
      {beams.length > 0 &&
        beams.map((edge, idx) => (
          <BeamResolver key={idx} beamId={edge.node?.id} />
        ))}
      <Stack padding="p-2" ref={loadMoreRef} />
    </Stack>
  );
};

export default SimpleAntenna;
