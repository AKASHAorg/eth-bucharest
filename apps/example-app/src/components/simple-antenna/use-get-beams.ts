import React, { useState } from 'react';
import getSDK from '@akashaorg/awf-sdk';

export const useGetBeams = () => {
  const sdk = getSDK();
  const [beams, setBeams] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const beamsQuery = await sdk.services.gql.client.GetBeams({
        last: 10,
      });
      setLoading(false);
      const edges = beamsQuery?.akashaBeamIndex?.edges;

      setBeams(edges);
      const currentPageInfo = beamsQuery?.akashaBeamIndex?.pageInfo;
      setPageInfo(currentPageInfo);
    } catch (error) {
      setError(error);
    }
  };

  const fetchNextBatch = async () => {
    if (pageInfo && pageInfo.hasNextPage) {
      try {
        setLoading(true);
        const beamsQuery = await sdk.services.gql.client.GetBeams({
          last: 10,
          before: pageInfo.endCursor,
        });
        setLoading(false);
        const edges = beamsQuery?.akashaBeamIndex?.edges;
        setBeams((prev) => [...prev, edges]);
      } catch (error) {
        setError(error);
      }
    }
  };

  return {
    beams,
    fetchInitialData,
    fetchNextBatch,
    loading,
    error,
  };
};
