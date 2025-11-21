import { TemplateContext } from '../types';

export const getPath = (context: any, path: string): any => {
    return path.split('.').reduce((acc, key) => acc?.[key], context);
};

export const getValue = (
    key: string,
    context: TemplateContext,
    strict?: boolean,
): string => {
    const value = getPath(context, key);
    if (value === undefined) {
        if (strict) {
            throw new Error(`Missing value for key: ${key}`);
        }

        return '';
    }

    return String(value);
};
