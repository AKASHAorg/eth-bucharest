import React from 'react';
import EntryCardLoading from '@akashaorg/design-system-components/lib/components/Entry/EntryCardLoading';
import EntryCard from '@akashaorg/design-system-components/lib/components/Entry/EntryCard';
import { EntityTypes } from '@akashaorg/typings/lib/ui';
import {
  hasOwn,
  mapBeamEntryData,
  useRootComponentProps,
  sortByKey,
  transformSource,
  useGetLogin,
} from '@akashaorg/ui-awf-hooks';
import {
  useGetBeamByIdQuery,
  useGetProfileByDidQuery,
} from '@akashaorg/ui-awf-hooks/lib/generated/apollo';
import { Extension } from '@akashaorg/ui-lib-extensions/lib/react/extension';

import ContentBlock from './content-block';

export type BeamResolverProps = {
  beamId: string;
};
const BeamResolver: React.FC<BeamResolverProps> = (props) => {
  const { beamId } = props;

  /*
   *
   *
   *
   */
  const { data } = useGetLogin();
  const authenticatedDID = data?.id;

  /*
   *
   *
   *
   */
  const beamReq = useGetBeamByIdQuery({
    variables: {
      id: beamId,
    },
    fetchPolicy: 'cache-first',
    skip: !beamId,
  });

  const entryData =
    beamReq.data?.node && hasOwn(beamReq.data.node, 'id')
      ? beamReq.data.node
      : null;

  const processedEntryData = mapBeamEntryData(entryData);

  /*
   *
   *
   *
   */
  const {
    data: profileDataReq,
    error,
    loading,
  } = useGetProfileByDidQuery({
    variables: { id: processedEntryData?.authorId },
    fetchPolicy: 'cache-first',
  });

  const { akashaProfile: profileData }: any =
    profileDataReq?.node && hasOwn(profileDataReq.node, 'akashaProfile')
      ? profileDataReq.node
      : { akashaProfile: null };

  /*
   *
   *
   *
   */
  const sortedEntryContent = React.useMemo(() => {
    if (processedEntryData?.content) {
      return sortByKey(processedEntryData?.content, 'order');
    }
    return [];
  }, [processedEntryData?.content]);

  /*
   *
   *
   *
   */
  const { getRoutingPlugin } = useRootComponentProps();
  const navigateTo = getRoutingPlugin().navigateTo;
  const onAvatarClick = (id: string) => {
    navigateTo({
      appName: '@akashaorg/app-profile',
      getNavigationUrl: (routes) => `${routes.rootRoute}/${id}`,
    });
  };

  const handleContentClick = () => {
    return;
  };

  if (beamReq.loading) return <EntryCardLoading />;

  return (
    <EntryCard
      entryData={processedEntryData}
      authorProfile={{ data: profileData, loading, error }}
      locale={'en'}
      profileAnchorLink="/@akashaorg/app-profile"
      sortedContents={sortedEntryContent}
      isViewer={authenticatedDID === processedEntryData?.authorId}
      showHiddenContent={true}
      isLoggedIn={!!authenticatedDID}
      itemType={EntityTypes.BEAM}
      transformSource={transformSource}
      onAvatarClick={onAvatarClick}
      actionsRight={
        <Extension
          name={`example-app-fav_${beamId}`}
          extensionData={{
            itemId: beamId,
          }}
        />
      }
    >
      {({ blockID }) => (
        <React.Suspense fallback={<></>}>
          <ContentBlock blockID={blockID} onContentClick={handleContentClick} />
        </React.Suspense>
      )}
    </EntryCard>
  );
};

export default BeamResolver;
