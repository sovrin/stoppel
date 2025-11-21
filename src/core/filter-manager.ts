import { Config } from '../types';

export const applyFilters = (
    raw: any,
    filterNames: string[],
    config: Config,
): string => {
    return filterNames.reduce((val, fname) => {
        const filter = config.filters?.[fname];
        return filter ? filter(val) : val;
    }, raw);
};

export const parseFilters = (
    tag: string,
): { key: string; filters: string[] } => {
    const parts = tag.split('|').map((p) => p.trim());

    return {
        key: parts[0],
        filters: parts.slice(1),
    };
};
