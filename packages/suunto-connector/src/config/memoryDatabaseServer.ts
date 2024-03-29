import { MongoMemoryServer } from 'mongodb-memory-server';

// Extend the default timeout so MongoDB binaries can download
// jest.setTimeout(60000);

export const memoryDatabaseServer = new MongoMemoryServer({
  binary: {
    version: '5.0.7',
  },
});

export const startMemoryDb = async (): Promise<void> => {
  console.log('Starting memory db');
  return memoryDatabaseServer.start();
};

export const stopMemoryDb = async (): Promise<void> => {
  console.log('Stopping memory db');
  await memoryDatabaseServer.stop();
};

export const getMemoryDbUri = async (): Promise<string> => {
  await memoryDatabaseServer.ensureInstance();
  return memoryDatabaseServer.getUri();
};
