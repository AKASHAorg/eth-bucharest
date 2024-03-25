# Hooks

Most of the SDK's methods are also implemented as React hooks.
Currently we have the following hooks:

## Available Custom Hooks

- [useLogin](#uselogin)
- [useLogout](#uselogout)
- [useConnectWallet](#useconnectwallet)
- [useCurrentNetwork](#usecurrentnetwork)
- [useNetworkChangeListener](#usenetworkchangelistener)
- [useNetworkState](#usenetworkstate)
- [useGetLoginProfile](#usegetloginprofile)
- [useProfileStats](#useprofilestats)
- [useRootComponentProps](#userootcomponentprops)
- [useListenForMutationEvents](#uselistenformutationevents)
- [useGetSettings](#usegetsettings)
- [useSaveSettings](#usesavesettings)


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


| Name | Type | Description |
| :------ | :------ |:------ |
| `data` | `string` | The network name |
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
when he/she logs in

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

▸ **useGetSettings**(`appName`): `Object`

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
| `appName` | `string` | The app's name for example @akashaorg/app-akasha-verse |

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

networkNotSupported will return true if web3 provider is not on the specified network

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

useRequiredNetwork hook
```typescript
const requiredNetworkQuery = useRequiredNetwork();

const requiredNetworkName = requiredNetworkQuery.data;
```

#### Returns

`Object`

An object containing the data and statuses of the request:
{ data, isLoading, error, isSuccess }


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

Hook that allows you to access the routing plugin, extension plugins, worldConfig information, logger, etc.

**`Example`**

useRootComponentProps hook
```typescript
  const { baseRouteName, getRoutingPlugin, getTranslationPlugin, logger } = useRootComponentProps();
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `RootComponentProps` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `getContext` | () => `T` |
| `getExtensionsPlugin` | () => `IPluginsMap` |
| `getRoutingPlugin` | (`ns`: `string`) => `any` |
| `getTranslationPlugin` | (`ns`: `string`) => { `i18n`: `i18n`  }  } & `T` |


#### Defined in

[ui/hooks/src/use-root-props.tsx:21](https://github.com/AKASHAorg/akasha-core/blob/a8a8c5427/ui/hooks/src/use-root-props.tsx#L21)

___

### useSaveSettings

▸ **useSaveSettings**(): `Object`

Hook to save an app's settings using the SDK's settings service

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

Hook that handles the adding, removing and returning of the pending Reflections by making use of Apollo's reactive variables. The updated pending reflections returned can be used to update/re-render the
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



