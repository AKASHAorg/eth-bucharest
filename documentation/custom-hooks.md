# Hooks

Most of the SDK's methods are also implemented as React hooks.
Currently we have the following hooks:

## Available Custom Hooks

- [useGlobalLogin](#usegloballogin)
- [useLogin](#uselogin)
- [useLogout](#uselogout)
- [useConnectWallet](#useconnectwallet)
- [useCurrentNetwork](#usecurrentnetwork)
- [useNetworkChangeListener](#usenetworkchangelistener)
- [useNetworkState](#usenetworkstate)
- [useGetLoginProfile](#usegetloginprofile)
- [useProfileStats](#useprofilestats)
- [useMarkAsRead](#usemarkasread)
- [useCheckNewNotifications](#usechecknewnotifications)
- [useListenForMutationEvents](#uselistenformutationevents)
- [useGetSettings](#usegetsettings)
- [useSaveSettings](#usesavesettings)
- [useBeams](#usebeams)
- [useBeamsByTags](#usebeamsbytags)
- [useMentions](#usementions)
- [useNsfwToggling](#usensfwtoggling)
- [usePlaformHealthCheck](#useplaformhealthcheck)
- [useLegalDoc](#uselegaldoc)
___

### useGlobalLogin

▸ **useGlobalLogin**(`props`): `void`

Hook that will fire an action when the sign in is called

**`Example`**

useGlobalLogin hook
```typescript
useGlobalLogin({
onLogin: payload => {},
onLogout: () => {},
waitForAuth: payload => {}.
onReady: payload => {},
onLoadFromCache: payload => {},
onError: payload => {},
})
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`UseGlobalLoginProps`](interfaces/UseGlobalLoginProps.md) |

#### Returns

`void`

#### Defined in

[ui/hooks/src/use-global-login.ts:34](https://github.com/AKASHAorg/akasha-core/blob/a8a8c5427/ui/hooks/src/use-global-login.ts#L34)

___

### useConnectWallet

▸ **useConnectWallet**(): `Object`

Hook for connecting to a user's wallet (through Metamask or any other compatible applications)

**`Example`**

useConnectWallet hook
```typescript
const connectWalletCall = useConnectWallet();
// make the call to the connect function when appropriate:
 connectWalletCall.connect();
```
Consult the statuses of the call to know whether the connection has been successful or not
(connectWalletCall.isSuccess, connectWalletCall.isLoading, connectWalletCall.isError)

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `connect` | () => `void` |
| `data` | `string` |
| `error` | `Error` |
| `isError` | `boolean` |
| `isLoading` | `boolean` |
| `isSuccess` | `boolean` |

#### Defined in

[ui/hooks/src/use-login.new.ts:22](https://github.com/AKASHAorg/akasha-core/blob/a8a8c5427/ui/hooks/src/use-login.new.ts#L22)

___

### useCurrentNetwork

▸ **useCurrentNetwork**(`enabler?`): `Object`

Hook to check the user's current web3 network

**`Example`**

useCurrentNetwork hook
```typescript
const currentNetworkQuery = useCurrentNetwork(true);

const network = currentNetworkQuery.data;
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabler?` | `boolean` |

#### Returns

`Object`

network name

| Name | Type |
| :------ | :------ |
| `data` | `string` |
| `error` | `Error` |
| `isLoading` | `boolean` |

#### Defined in

[ui/hooks/src/use-network-state.ts:85](https://github.com/AKASHAorg/akasha-core/blob/a8a8c5427/ui/hooks/src/use-network-state.ts#L85)

___

### useGetLogin

▸ **useGetLogin**(`onError?`): `Object`

Hook for retrieving the current authentication state of the user

**`Example`**

useGetLogin hook
```typescript
const loginQuery = useGetLogin();
// can be used with useGetProfile hook to get the logged profile data
const profileDataQuery = useGetProfile(loginQuery.data?.id);

const authenticatedProfile = profileDataQuery.data;
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `onError?` | (`error`: `Error`) => `void` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `data` | { `ethAddress?`: `string` ; `id?`: `string`  } |
| `data.ethAddress?` | `string` |
| `data.id?` | `string` |
| `error` | `any` |
| `loading` | `boolean` |

#### Defined in

[ui/hooks/src/use-login.new.ts:73](https://github.com/AKASHAorg/akasha-core/blob/a8a8c5427/ui/hooks/src/use-login.new.ts#L73)

___

### useGetLoginProfile

▸ **useGetLoginProfile**(): `Object`

Hook that automatically fetches the profile data of the logged in user
when it logs in

**`Example`**

useGetLoginProfile hook
```typescript
 const authenticatedProfileReq = useGetLoginProfile();
 const authenticatedProfile = authenticatedProfileReq?.akashaProfile;
```

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `akashaProfile?` | { `avatar?`: { `alternatives?`: { `height`: `number` ; `src`: `any` ; `width`: `number`  }[] ; `default`: { `height`: `number` ; `src`: `any` ; `width`: `number`  }  } ; `background?`: { `alternatives?`: { `height`: `number` ; `src`: `any` ; `width`: `number`  }[] ; `default`: { `height`: `number` ; `src`: `any` ; `width`: `number`  }  } ; `createdAt`: `any` ; `description?`: `string` ; `did`: { `id`: `string` ; `isViewer`: `boolean`  } ; `followers`: { `pageInfo`: { `endCursor?`: `string` ; `hasNextPage`: `boolean` ; `hasPreviousPage`: `boolean` ; `startCursor?`: `string`  }  } ; `id`: `string` ; `links?`: { `href`: `any` ; `label?`: `string`  }[] ; `name`: `string` ; `nsfw?`: `boolean`  } |
| `akashaProfile.avatar?` | { `alternatives?`: { `height`: `number` ; `src`: `any` ; `width`: `number`  }[] ; `default`: { `height`: `number` ; `src`: `any` ; `width`: `number`  }  } |
| `akashaProfile.avatar.alternatives?` | { `height`: `number` ; `src`: `any` ; `width`: `number`  }[] |
| `akashaProfile.avatar.default` | { `height`: `number` ; `src`: `any` ; `width`: `number`  } |
| `akashaProfile.avatar.default.height` | `number` |
| `akashaProfile.avatar.default.src` | `any` |
| `akashaProfile.avatar.default.width` | `number` |
| `akashaProfile.background?` | { `alternatives?`: { `height`: `number` ; `src`: `any` ; `width`: `number`  }[] ; `default`: { `height`: `number` ; `src`: `any` ; `width`: `number`  }  } |
| `akashaProfile.background.alternatives?` | { `height`: `number` ; `src`: `any` ; `width`: `number`  }[] |
| `akashaProfile.background.default` | { `height`: `number` ; `src`: `any` ; `width`: `number`  } |
| `akashaProfile.background.default.height` | `number` |
| `akashaProfile.background.default.src` | `any` |
| `akashaProfile.background.default.width` | `number` |
| `akashaProfile.createdAt` | `any` |
| `akashaProfile.description?` | `string` |
| `akashaProfile.did` | { `id`: `string` ; `isViewer`: `boolean`  } |
| `akashaProfile.did.id` | `string` |
| `akashaProfile.did.isViewer` | `boolean` |
| `akashaProfile.followers` | { `pageInfo`: { `endCursor?`: `string` ; `hasNextPage`: `boolean` ; `hasPreviousPage`: `boolean` ; `startCursor?`: `string`  }  } |
| `akashaProfile.followers.pageInfo` | { `endCursor?`: `string` ; `hasNextPage`: `boolean` ; `hasPreviousPage`: `boolean` ; `startCursor?`: `string`  } |
| `akashaProfile.followers.pageInfo.endCursor?` | `string` |
| `akashaProfile.followers.pageInfo.hasNextPage` | `boolean` |
| `akashaProfile.followers.pageInfo.hasPreviousPage` | `boolean` |
| `akashaProfile.followers.pageInfo.startCursor?` | `string` |
| `akashaProfile.id` | `string` |
| `akashaProfile.links?` | { `href`: `any` ; `label?`: `string`  }[] |
| `akashaProfile.name` | `string` |
| `akashaProfile.nsfw?` | `boolean` |
| `isViewer` | `boolean` |

#### Defined in

[ui/hooks/src/use-login.new.ts:123](https://github.com/AKASHAorg/akasha-core/blob/a8a8c5427/ui/hooks/src/use-login.new.ts#L123)

___

### useGetSettings

▸ **useGetSettings**(`app`): `Object`

Hook to get saved settings for an app

**`Example`**

useGetSettings hook
```typescript
const savedSettingsQuery = useGetSettings('@akashaorg/app-akasha-verse');

const savedSettings = savedSettingsQuery.data;
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `app` | `string` | The app's name for example @akashaorg/app-akasha-verse |

#### Returns

`Object`

The statuses of the request { isLoading, data, error }

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `error` | { `message`: `string`  } |
| `error.message` | `string` |
| `isLoading` | `boolean` |

#### Defined in

[ui/hooks/src/use-settings.ts:90](https://github.com/AKASHAorg/akasha-core/blob/a8a8c5427/ui/hooks/src/use-settings.ts#L90)

___

### useGlobalLogin

▸ **useGlobalLogin**(`props`): `void`

Hook that will fire an action when the sign in is called

**`Example`**

useGlobalLogin hook
```typescript
useGlobalLogin({
onLogin: payload => {},
onLogout: () => {},
waitForAuth: payload => {}.
onReady: payload => {},
onLoadFromCache: payload => {},
onError: payload => {},
})
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`UseGlobalLoginProps`](interfaces/UseGlobalLoginProps.md) |

#### Returns

`void`

#### Defined in

[ui/hooks/src/use-global-login.ts:34](https://github.com/AKASHAorg/akasha-core/blob/a8a8c5427/ui/hooks/src/use-global-login.ts#L34)

___

### useLegalDoc

▸ **useLegalDoc**(`docName`): `Object`

Hook to get legal docs stored on ipfs

**`Example`**

useLegalDoc hook
```typescript
const termsOfUseDocQuery = useLegalDoc('TermsOfUse');

const termsOfUseDoc = termsOfUseDocQuery.data;
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `docName` | `LEGAL_DOCS` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `data` | `string` |
| `error` | `Error` |
| `isFetched` | `boolean` |
| `isLoading` | `boolean` |

#### Defined in

[ui/hooks/src/use-legal.ts:20](https://github.com/AKASHAorg/akasha-core/blob/a8a8c5427/ui/hooks/src/use-legal.ts#L20)

___


### useLogin

▸ **useLogin**(`onError?`): `Object`

Hook to sign in a user

**`Example`**

useLogin hook
```typescript
const { signIn, signInErrors } = useLogin();
// To actually sign in, call the `signIn` function. The signIn function take a `selectedProvider` parameter:
signIn({ selectedProvider: provider });
```
`signInErrors` contains possible errors that might occur during the sign-in process.

#### Parameters

| Name | Type |
| :------ | :------ |
| `onError?` | (`err`: `Error`) => `void` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `data` | { `ethAddress?`: `string` ; `id?`: `string`  } & { `isNewUser`: `boolean`  } |
| `isError` | `boolean` |
| `isLoading` | `boolean` |
| `isSuccess` | `boolean` |
| `signIn` | (`__namedParameters`: { `checkRegistered?`: `boolean` ; `selectedProvider`: `EthProviders`  }) => `void` |
| `signInErrors` | `Error` |

#### Defined in

[ui/hooks/src/use-login.new.ts:155](https://github.com/AKASHAorg/akasha-core/blob/a8a8c5427/ui/hooks/src/use-login.new.ts#L155)

___

### useLogout

▸ **useLogout**(): `Object`

Hook to sign out the current user

**`Example`**

useLogout hook
```typescript
const { logout } = useLogout();

// Make the function call to log the user out when appropriate:
 logout();
```

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `data` | `unknown` |
| `isLoading` | `boolean` |
| `logOut` | () => `void` |
| `logOutErrors` | `Error` |

#### Defined in

[ui/hooks/src/use-login.new.ts:217](https://github.com/AKASHAorg/akasha-core/blob/a8a8c5427/ui/hooks/src/use-login.new.ts#L217)

___

### useMarkAsRead

▸ **useMarkAsRead**(): `Object`

Hook to mark a notification as read
pass the messageId to the markAsRead function

**`Example`**

useMarkAsRead hook
```typescript
const { markAsRead } = useMarkAsRead();

markAsRead('message id');
```

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `data` | `boolean` |
| `error` | `Error` |
| `isError` | `boolean` |
| `isLoading` | `boolean` |
| `isSuccess` | `boolean` |
| `markAsRead` | (`messageId`: `string`) => `void` |

#### Defined in

[ui/hooks/src/use-notifications.ts:16](https://github.com/AKASHAorg/akasha-core/blob/a8a8c5427/ui/hooks/src/use-notifications.ts#L16)

___

### useMentions

▸ **useMentions**(`authenticatedDID`): `Object`

Hook to get a list of users a person can mention by checking the person's following
list and search for the names that match the keyword entered after the @ symbol.
Note: Users cannot mention people they don't already follow.

**`Example`**

useMentions hook
```typescript
  const { setMentionQuery, mentions } = useMentions(authenticatedDID);

// set the handler to start searching after a user enter the @ symbol and then a keyword:
  const handleGetMentions = (query: string) => {
       setMentionQuery(query);
    };
```
The list of possible mentions is returned through the `mentions` variable.

#### Parameters

| Name | Type |
| :------ | :------ |
| `authenticatedDID` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `mentions` | { `avatar?`: { `alternatives?`: { `height`: `number` ; `src`: `any` ; `width`: `number`  }[] ; `default`: { `height`: `number` ; `src`: `any` ; `width`: `number`  }  } ; `background?`: { `alternatives?`: { `height`: `number` ; `src`: `any` ; `width`: `number`  }[] ; `default`: { `height`: `number` ; `src`: `any` ; `width`: `number`  }  } ; `createdAt`: `any` ; `description?`: `string` ; `did`: { `id`: `string` ; `isViewer`: `boolean`  } ; `followers`: { `pageInfo`: { `endCursor?`: `string` ; `hasNextPage`: `boolean` ; `hasPreviousPage`: `boolean` ; `startCursor?`: `string`  }  } ; `id`: `string` ; `links?`: { `href`: `any` ; `label?`: `string`  }[] ; `name`: `string` ; `nsfw?`: `boolean`  }[] |
| `setMentionQuery` | `Dispatch`<`SetStateAction`<`string`\>\> |

#### Defined in

[ui/hooks/src/use-mentions.ts:20](https://github.com/AKASHAorg/akasha-core/blob/a8a8c5427/ui/hooks/src/use-mentions.ts#L20)

___

### useNetworkChangeListener

▸ **useNetworkChangeListener**(): `any`[]

A hook used to detect changes when a user switches from one network to another.

**`Example`**

useRequiredNetwork hook
```typescript
const [changedNetwork, changedNetworkUnsubscribe] = useNetworkChangeListener();
```
`changedNetwork` contains data of the network the user changes to.

#### Returns

`any`[]

#### Defined in

[ui/hooks/src/use-network-state.ts:169](https://github.com/AKASHAorg/akasha-core/blob/a8a8c5427/ui/hooks/src/use-network-state.ts#L169)

___

### useNetworkState

▸ **useNetworkState**(`enabler?`): `Object`

Hook to check if the web3 provider is set to function on the Sepolia test network

**`Example`**

useNetworkState hook
```typescript
const networkStateQuery = useNetworkState(true);

const networkNotSupported = networkStateQuery.data.networkNotSupported;
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabler?` | `boolean` |

#### Returns

`Object`

networkNotSupported: true if web3 provider is not on the specified network

| Name | Type |
| :------ | :------ |
| `data` | { `networkNotSupported`: `boolean`  } |
| `data.networkNotSupported` | `boolean` |
| `error` | `Error` |
| `isFetched` | `boolean` |
| `isLoading` | `boolean` |

#### Defined in

[ui/hooks/src/use-network-state.ts:36](https://github.com/AKASHAorg/akasha-core/blob/a8a8c5427/ui/hooks/src/use-network-state.ts#L36)

___

### useNsfwToggling

▸ **useNsfwToggling**(): `Object`

Hook to get and set user's choice for showing/hiding nsfw content

**`Example`**

useNsfwToggling hook
```typescript
const {showNsfw, toggleShowNsfw} = useNsfwToggling();
```
To toggle the nsfw state, pass a boolean value to the toggleShowNsfw function,
 e.g. `toggleShowNsfw(true)`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `showNsfw` | `boolean` |
| `toggleShowNsfw` | (`showNsfw`: `boolean`) => `void` |

#### Defined in

[ui/hooks/src/use-nsfw.ts:13](https://github.com/AKASHAorg/akasha-core/blob/a8a8c5427/ui/hooks/src/use-nsfw.ts#L13)

___

### usePlaformHealthCheck

▸ **usePlaformHealthCheck**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `data` | { `statusCode`: `number` ; `success`: `boolean`  } |
| `data.statusCode` | `number` |
| `data.success` | `boolean` |
| `isLoading` | `boolean` |

#### Defined in

[ui/hooks/src/use-health-check.ts:11](https://github.com/AKASHAorg/akasha-core/blob/a8a8c5427/ui/hooks/src/use-health-check.ts#L11)

___

### useProfileStats

▸ **useProfileStats**(`profileId`, `readCache?`): `Object`

Hook to get profile stats

**`Example`**

useProfileStats hook
```typescript
const profileStatsQuery = useProfileStats('did:pkh:eip155:5:0xadc81c169...');

console.log(profileStatsQuery.data)
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `profileId` | `string` |
| `readCache?` | `boolean` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `data` | { `totalBeams`: `number` = 0; `totalFollowers`: `number` = 0; `totalFollowing`: `number` = 0; `totalReflections`: `number` = 0; `totalTopics`: `number` = 0 } |
| `data.totalBeams` | `number` |
| `data.totalFollowers` | `number` |
| `data.totalFollowing` | `number` |
| `data.totalReflections` | `number` |
| `data.totalTopics` | `number` |
| `error` | `any` |
| `loading` | `boolean` |

#### Defined in

[ui/hooks/src/use-profile-stats.ts:25](https://github.com/AKASHAorg/akasha-core/blob/a8a8c5427/ui/hooks/src/use-profile-stats.ts#L25)

___

### useRequiredNetwork

▸ **useRequiredNetwork**(): `Object`

A hook to get required network name from the SDK

**`Example`**

```ts
useRequiredNetwork hook
```

#### Returns

`Object`

An object containing the data and statuses of the request:
{ data, isLoading, error, isSuccess }
```typescript
const requiredNetworkQuery = useRequiredNetwork();

const requiredNetworkName = requiredNetworkQuery.data;
```

| Name | Type |
| :------ | :------ |
| `data` | { `chainId`: ``11155111`` ; `name`: `string`  } |
| `data.chainId` | ``11155111`` |
| `data.name` | `string` |
| `error` | `Error` |
| `isLoading` | `boolean` |
| `isSuccess` | `boolean` |

#### Defined in

[ui/hooks/src/use-network-state.ts:130](https://github.com/AKASHAorg/akasha-core/blob/a8a8c5427/ui/hooks/src/use-network-state.ts#L130)

___

### useRootComponentProps

▸ **useRootComponentProps**<`T`\>(): { `getContext`: () => `T` ; `getExtensionsPlugin`: () => `IPluginsMap` ; `getRoutingPlugin`: (`ns`: `string`) => `any` ; `getTranslationPlugin`: (`ns`: `string`) => { `i18n`: `i18n`  }  } & `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `RootComponentProps` |

#### Returns

{ `getContext`: () => `T` ; `getExtensionsPlugin`: () => `IPluginsMap` ; `getRoutingPlugin`: (`ns`: `string`) => `any` ; `getTranslationPlugin`: (`ns`: `string`) => { `i18n`: `i18n`  }  } & `T`

#### Defined in

[ui/hooks/src/use-root-props.tsx:21](https://github.com/AKASHAorg/akasha-core/blob/a8a8c5427/ui/hooks/src/use-root-props.tsx#L21)

___

### useSaveSettings

▸ **useSaveSettings**(): `Object`

Hook to save app's settings using sdk settings service

**`Example`**

useSaveSettings hook
```typescript
const { saveNotificationSettings } = useSaveSettings();
saveNotificationSettings(JSON.stringify({ app: '@akashaorg/app-akasha-verse', options: [['key', 'value']] }))
```

#### Returns

`Object`

The saveNotificationSettings function and the statuses of the request { isLoading, data, error }

| Name | Type |
| :------ | :------ |
| `data` | `unknown` |
| `error` | { `message`: `string`  } |
| `error.message` | `string` |
| `isLoading` | `boolean` |
| `saveNotificationSettings` | (`params`: { `app`: `string` ; `options`: `Record`<`string`, `string` \| `number` \| `boolean`\>  }, `callback?`: { `onComplete`: () => `void`  }) => `void` |

#### Defined in

[ui/hooks/src/use-settings.ts:38](https://github.com/AKASHAorg/akasha-core/blob/a8a8c5427/ui/hooks/src/use-settings.ts#L38)

___

### useCheckNewNotifications

▸ **useCheckNewNotifications**(`did`): `Object`

Hook to check for new notifications

**`Example`**

useCheckNewNotifications hook
```typescript
const { data, isLoading, error } = useCheckNewNotifications('logged-in-user-eth-address');

```

#### Parameters

| Name | Type |
| :------ | :------ |
| `did` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `data` | `boolean` |
| `error` | `Error` |
| `isFetched` | `boolean` |
| `isLoading` | `boolean` |

#### Defined in

[ui/hooks/src/use-notifications.ts:58](https://github.com/AKASHAorg/akasha-core/blob/a8a8c5427/ui/hooks/src/use-notifications.ts#L58)

___

### useListenForMutationEvents

▸ **useListenForMutationEvents**(): `any`

Hook to listen for mutation events

**`Example`**

useListenForMutationEvents hook
```typescript
const mutationEvent = useListenForMutationEvents();

const { messageObj, appid, success, pending } = mutationEvent;
```

#### Returns

`any`

#### Defined in

[ui/hooks/src/use-notifications.ts:95](https://github.com/AKASHAorg/akasha-core/blob/a8a8c5427/ui/hooks/src/use-notifications.ts#L95)

___

### useGetIndexingDID

> handles the retrieval of the indexing DID used by the SDK's GraphQL client.

___

### usePendingReflections

▸ **usePendingReflections**(`pendingReflectionsReactiveVar`): `ReactiveVar<ReflectEntryData[]>`

Hook that handle the adding, removing and returning of pending Reflections by first providing a reactive variable parameter to the hook as the initial state of the
pending reflections. The updated pending reflections returned can be used to update/re-render the
components directly without the need to use `useQuery`.

**`Example`**
usePendingReflections hook
```typescript
  // createReactiveVar is another function that makes use of the `makeVar` method
  from Apollo Client to create a reactive variable.
    const pendingReflectionsVar = createReactiveVar<ReflectEntryData[]>([]);
  const { pendingReflections } = usePendingReflections(pendingReflectionsVar);

```

#### Parameters

| Name | Type |
| :------ | :------ |
| `pendingReflectionsReactiveVar` | `ReactiveVar<ReflectEntryData[]>` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `addPendingReflection` | `Function` |
| `removePendingReflection` | `Function` |
| `removePendingReflections` | `Function` |
| `pendingReflections` | `ReflectEntryData[]` |

#### Defined in

[ui/hooks/src/use-pending-reflections.ts](https://github.com/AKASHAorg/akasha-core/blob/a8a8c5427/ui/hooks/src/use-pending-reflections.ts)

___

### useBeams

▸ **useBeams**(`UseBeamsOptions`): `Object`

Hook that retrieves all the beams created in general or by a certain DID (when
a `did` param is provided).

**`Example`**

useBeams hook
```typescript
const {
     beams,
     fetchNextPage,
     fetchPreviousPage,
     hasNextPage,
     hasPreviousPage,
     fetchInitialData,
     onReset,
     called,
     isLoading,
     hasErrors,
     errors,
   } = useBeams({
     overscan: 10,
     sorting: { createdAt: SortOrder.Desc },
     filters: { where: { status: { equalTo: AkashaBeamStreamModerationStatus.Ok } } },
   });
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `overscan` | `number` |
| `filters?` | `AkashaBeamStreamFiltersInput` |
| `sorting?` | `AkashaBeamStreamSortingInput` |
| `did?` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `beams` | `any` |
| `called` | `boolean` |
| `errors` | `string`[] |
| `fetchInitialData` | (`restoreItem?`: { `key`: `string` ; `offsetTop`: `number`  }) => `Promise`<`void`\> |
| `fetchNextPage` | (`lastCursor`: `string`) => `Promise`<`void`\> |
| `fetchPreviousPage` | (`firstCursor`: `string`) => `Promise`<`void`\> |
| `hasErrors` | `boolean` |
| `hasNextPage` | `any` |
| `hasPreviousPage` | `any` |
| `isLoading` | `boolean` |
| `onReset` | () => `Promise`<`void`\> |

#### Defined in

[ui/hooks/src/use-beams.ts:61](https://github.com/AKASHAorg/akasha-core/blob/a8a8c5427/ui/hooks/src/use-beams.ts#L61)

___

### useBeamsByTags

▸ **useBeamsByTags**(`tag`): `Object`

Hook that retrieves all the beams created with a specific tag or an array of tags

**`Example`**

useBeamsByTags hook
```typescript
  const {
   beams,
   called,
   fetchNextPage,
   fetchPreviousPage,
   hasNextPage,
   hasPreviousPage,
   fetchInitialData,
   onReset,
   isLoading,
   hasErrors,
   errors,
 } = useBeamsByTags('akasha');
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tag` | `string` \| `string`[] | One tag or an array of tags. |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `beams` | { `cursor`: `string` ; `node?`: { `active`: `boolean` ; `createdAt`: `any` ; `indexType`: `string` ; `indexValue`: `string` ; `moderationID?`: `any` ; `status?`: `AkashaIndexedStreamModerationStatus` ; `stream`: `any` ; `streamType?`: `AkashaIndexedStreamStreamType`  }  }[] |
| `called` | `boolean` |
| `errors` | `string`[] |
| `fetchInitialData` | (`newTag?`: `boolean`, `restoreItem?`: { `key`: `string` ; `offsetTop`: `number`  }) => `Promise`<`void`\> |
| `fetchNextPage` | (`lastCursor`: `string`) => `Promise`<`void`\> |
| `fetchPreviousPage` | (`firstCursor`: `string`) => `Promise`<`void`\> |
| `hasErrors` | `boolean` |
| `hasNextPage` | `boolean` |
| `hasPreviousPage` | `boolean` |
| `isLoading` | `boolean` |
| `onReset` | () => `Promise`<`void`\> |

#### Defined in

[ui/hooks/src/use-beams-by-tags.ts:36](https://github.com/AKASHAorg/akasha-core/blob/a8a8c5427/ui/hooks/src/use-beams-by-tags.ts#L36)



