enum MediaType {
  Stickers = 'stickers',
  Gifs = 'gifs',
}

/**
 * Factory for creating a key group.
 * @see https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
 */
export const createKeyGroup = (prefix: string): KeyGroup => {
  const key: KeyGroup = {
    prefix,
    all: [prefix],
    lists: () => [...key.all, 'list'] as const,
    list: (filters: string) => [...key.lists(), { filters }] as const,
    details: () => [...key.all, 'detail'] as const,
    detail: (...id: unknown[]) => [...key.details(), ...id] as const,
  };

  return key;
};

export const QUERY_KEYS = {
  ...(Object.fromEntries(
    Object.values(MediaType).map((type) => [type, createKeyGroup(type)]),
  ) as Record<MediaType, KeyGroup>),
};

export interface KeyGroup {
  prefix: string;
  all: string[];
  lists: () => readonly string[];
  list: (filters: string) => readonly [...string[], { filters: string }];
  details: () => readonly string[];
  detail: (...id: unknown[]) => readonly unknown[];
}
