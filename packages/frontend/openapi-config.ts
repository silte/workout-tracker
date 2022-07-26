import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: './api-spec.json',
  apiFile: './src/redux/emptyApi.ts',
  apiImport: 'emptyApi',
  outputFile: './src/redux/generated/api.ts',
  exportName: 'api',
  hooks: true,
}

export default config

