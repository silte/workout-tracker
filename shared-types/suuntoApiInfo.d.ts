interface ISuuntoApiInfo {
  apiToken: string | null;
  previousFetchTime?: number;
  isFetching?: boolean;
  fetchMessage?: string[];
}
