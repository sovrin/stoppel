import { FilterFn } from './filter';

export type Config = {
    strict?: boolean;
    filters?: Record<string, FilterFn>;
};

export const DEFAULT_CONFIG: Config = {
    strict: false,
    filters: {},
};
