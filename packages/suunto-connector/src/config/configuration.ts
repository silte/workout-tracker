import { getMemoryDbUri } from './memoryDatabaseServer';

const isNotEmptyString = (value: string) => value && value.length > 0;

export const isNodeEnvInTest = () => process.env.NODE_ENV === 'test';

export const isGithubAuthEnabled = () =>
  !isNodeEnvInTest() &&
  isNotEmptyString(process.env.GITHUB_CLIENT_ID) &&
  isNotEmptyString(process.env.GITHUB_CLIENT_SECRET);

export const isAuth0AuthEnabled = () =>
  !isNodeEnvInTest() &&
  isNotEmptyString(process.env.AUTH0_DOMAIN) &&
  isNotEmptyString(process.env.AUTH0_CLIENT_ID) &&
  isNotEmptyString(process.env.AUTH0_CLIENT_SECRET);

const parseMongoDbUri = async (): Promise<string> => {
  if (!isNodeEnvInTest()) {
    return `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;
  }
  return getMemoryDbUri();
};

export const configuration = async () => ({
  mongodbConnectionString: await parseMongoDbUri(),
  githubKeys: isGithubAuthEnabled()
    ? {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }
    : undefined,
  auth0Keys: isAuth0AuthEnabled()
    ? {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
      }
    : undefined,
  workoutFetchChunkSize: parseInt(process.env.FETCH_WORKOUT_CHUNK_SIZE || '1'),
  workoutBuildCacheChunkSize: parseInt(
    process.env.BUILD_WORKOUT_CACHE_CHUNK_SIZE || '5',
  ),
});
