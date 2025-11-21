import { Blocks } from '../types';
import { BLOCK_REGEX } from '../constants';

export class Compiler {
    public compile(template: string): Blocks {
        const matches = [...template.matchAll(BLOCK_REGEX)];

        return Array.from(matches).reduce<Blocks>((acc, [, head, body]) => {
            const blockName = head || '(main)';
            acc[blockName] = body.replace(/^\n|\n$/g, '');

            return acc;
        }, {} as Blocks);
    }
}
