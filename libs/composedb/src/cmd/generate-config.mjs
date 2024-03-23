// https://github.com/ceramicstudio/composite-deploy-boilerplate

import KeyDIDResolver from 'key-did-resolver';
import { randomBytes } from 'crypto';
import { toString } from 'uint8arrays/to-string';
import { writeFile } from 'fs';
import { DID } from 'dids';
import { Ed25519Provider } from 'key-did-provider-ed25519';


const generateAdminKeyDid = async () => {
  const seed = new Uint8Array(randomBytes(32));
  const keyResolver = KeyDIDResolver.getResolver();
  const did = new DID({
    provider: new Ed25519Provider(seed),
    resolver: {
      ...keyResolver
    }
  });
  await did.authenticate();
  return {
    seed: toString(seed, 'base16'),
    did
  };
};

const generateLocalConfig = async (adminSeed, adminDid) => {
  const configData = {
    anchor: {},
    'http-api': {
      'cors-allowed-origins': ['.*'],
      'admin-dids': [adminDid.id]
    },
    ipfs: {
      mode: 'bundled'
    },
    logger: {
      'log-level': 2,
      'log-to-files': false
    },
    metrics: {
      'metrics-exporter-enabled': false,
      'metrics-port': 9090
    },
    network: {
      name: 'inmemory'
    },
    node: {},
    'state-store': {
      mode: 'fs',
      'local-directory': `${process.cwd()}/.ceramic/statestore/`
    },
    indexing: {
      db: `sqlite://${process.cwd()}/.ceramic/indexing.sqlite`,
      'allow-queries-before-historical-sync': true,
      models: []
    }
  };
  writeFile(
    `${process.cwd()}/composedb.config.json`,
    JSON.stringify(configData),
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
};
const { seed, did } = await generateAdminKeyDid();
console.info('=====Add to the .env file=====\n');
console.info(`DID_ADMIN_PRIVATE_KEY=${seed}`);
console.info(`INDEXING_DID=${did.id}\n`);
console.info('==============================');
await generateLocalConfig(seed, did);
