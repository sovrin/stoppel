import { TagHandler } from './base-handler';
import { TemplateContext, Blocks, Config } from '../../types';
import { getValue } from '../path-resolver';
import { applyFilters, parseFilters } from '../filter-manager';

/**
 * {{$variable | filter1 | filter2}}
 */
export class VariableHandler implements TagHandler {
    canHandle(tag: string): boolean {
        return tag.startsWith('$');
    }

    handle(
        tag: string,
        context: TemplateContext,
        blocks: Blocks,
        config: Config,
    ): string {
        const { key, filters } = parseFilters(tag.slice(1));
        const raw = getValue(key, context, config.strict);

        return applyFilters(raw, filters, config);
    }
}
