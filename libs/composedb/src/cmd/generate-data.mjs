import { randomBytes } from 'crypto';
import KeyDIDResolver, { getResolver } from 'key-did-resolver';
import { DID } from 'dids';
import { Ed25519Provider } from 'key-did-provider-ed25519';
import { fromString } from 'uint8arrays/from-string';
import { ComposeClient } from '@composedb/client';
import { definition } from '../../lib/runtime-definition.js';
import { faker } from '@faker-js/faker';
import gql from 'graphql-tag';
import pkg from '@apollo/client';

const { ApolloClient, ApolloLink, InMemoryCache, Observable } = pkg;

let appVersionID = '';
const profiles = [];
const getComposeDIDClient = async (did) => {
  const compose = new ComposeClient({ ceramic: process.env.CERAMIC_API_ENDPOINT, definition });
  compose.setDID(did);

  const link = new ApolloLink((operation) => {
    return new Observable((observer) => {
      compose.execute(operation.query, operation.variables).then(
        (result) => {
          observer.next(result);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  });

  return new ApolloClient({ cache: new InMemoryCache(), link });
};

const didKey = async () => {
  const seed = new Uint8Array(randomBytes(32));
  const keyResolver = KeyDIDResolver.getResolver();
  const did = new DID({
    provider: new Ed25519Provider(seed),
    resolver: {
      ...keyResolver
    }
  });
  await did.authenticate();
  return did;
};

const loadAdminDID = async () => {
  const privateKey = fromString(process.env.DID_ADMIN_PRIVATE_KEY, 'base16');

  const adminDID = new DID({
    resolver: getResolver(),
    provider: new Ed25519Provider(privateKey)
  });
  await adminDID.authenticate();
  return adminDID;
};

const generateAntennaAPP = async () => {
  const adminDID = await loadAdminDID();
  // Generate App data
  const app = {
    applicationType: 'APP',
    createdAt: new Date().toISOString(),
    licence: 'MIT',
    name: 'example-app',
    displayName: 'Simple Antenna',
    description: 'Example app for publishing content'
  };
  const CreateAppDocument = gql`
    mutation CreateApp($i: CreateAkashaAppInput!) {
      createAkashaApp(input: $i) {
        document {
          id
        }
        clientMutationId
      }
    }`;
  const client = await getComposeDIDClient(adminDID);
  const appDoc = await client.mutate({
    mutation: CreateAppDocument,
    variables: {
      i: {
        content: app
      }
    }
  });
  const appID = appDoc.data.createAkashaApp.document.id;

  const CreateAppReleaseDocument = gql`
    mutation CreateAppRelease($i: CreateAkashaAppReleaseInput!) {
      createAkashaAppRelease(input: $i) {
        document {
          id
        }
        clientMutationId
      }
    }`;
  const appRelease = {
    applicationID: appID,
    version: '0.1dev',
    createdAt: new Date().toISOString(),
    source: 'bafybeifx7yeb55armcsxwwitkymga5xf53dxiarykms3ygqic223w5sk3m'
  };

  const appReleaseDoc = await client.mutate({
    mutation: CreateAppReleaseDocument,
    variables: {
      i: {
        content: appRelease
      }
    }
  });

  console.info(`=== add to .env file ===`);
  console.info(`ANTENNA_RELEASE_ID=${appReleaseDoc.data.createAkashaAppRelease.document.id}`);
  appVersionID = appReleaseDoc.data.createAkashaAppRelease.document.id;
};

const generateProfileData = async () => {
  const did = await didKey();
  const profile = {
    avatar: {
      default: {
        src: faker.image.urlLoremFlickr({ category: 'animals', width: 200, height: 200 }),
        width: 200,
        height: 200
      }
    },
    background: { default: { src: faker.image.url({ height: 320, width: 520 }), width: 520, height: 320 } },
    createdAt: new Date().toISOString(),
    description: faker.person.bio(),
    links: [
      { href: 'https://github.com/AKASHAorg/akasha-core' },
      { href: 'https://twitter.com/AKASHAorg' }
    ],
    name: faker.person.fullName()
  };
  return { did, profile };
};

const generateBeams = async () => {
  const CreateBeamDocument = /*#__PURE__*/ gql`
    mutation CreateBeam($i: CreateAkashaBeamInput!) {
      createAkashaBeam(input: $i) {
        document {
          id
        }
        clientMutationId
      }
    }`;
  const CreateContentBlockDocument = gql`
    mutation CreateContentBlock($i: CreateAkashaContentBlockInput!) {
      createAkashaContentBlock(input: $i) {
        document {
          id
        }
        clientMutationId
      }
    }`;
  for (let p of profiles) {
    const content = [
      {
        label: 'example-app:title',
        propertyType: 'text-block',
        value: faker.lorem.word({ length: { min: 8, max: 11 }, strategy: 'fail' })
      },
      {
        label: 'example-app:body',
        propertyType: 'text-block',
        value: faker.lorem.sentence({ min: 10, max: 30 })
      }
    ];
    const block = await p.client.mutate({
      mutation: CreateContentBlockDocument,
      variables: {
        i: {
          content: {
            active: true,
            appVersionID: appVersionID,
            content: content,
            createdAt: new Date().toISOString(),
            kind: 'TEXT'
          }
        }
      }
    });

    await p.client.mutate({
      mutation: CreateBeamDocument,
      variables: {
        i: {
          content: {
            content: [{ blockID: block.data.createAkashaContentBlock.document.id, order: 0 }],
            active: true,
            createdAt: new Date().toISOString()
          }
        }
      }
    });
  }
};

const generateProfiles = async () => {
  const CreateProfileDocument = gql`
    mutation CreateProfile($i: CreateAkashaProfileInput!) {
      createAkashaProfile(input: $i) {
        document {
          id
        }
        clientMutationId
      }
    }`;
  for (let i = 0; i < 15; i++) {
    const { did, profile } = await generateProfileData();
    const client = await getComposeDIDClient(did);

    const profileDoc = await client.mutate({
      mutation: CreateProfileDocument,
      variables: {
        i: {
          content: profile
        }
      }
    });
    profiles.push({ did, client });
  }
};


await generateAntennaAPP();
await generateProfiles();
await generateBeams();
