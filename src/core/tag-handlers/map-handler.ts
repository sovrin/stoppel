import { TagHandler, TagRenderer } from './base-handler';
import { TemplateContext, Blocks, Config } from '../../types';

/**
 * {{[>arrayProperty]}}
 */
export class MapHandler implements TagHandler {
    canHandle(tag: string): boolean {
        return tag.startsWith('[>') && tag.endsWith(']');
    }

    handle(
        tag: string,
        context: TemplateContext,
        blocks: Blocks,
        config: Config,
        renderFn: TagRenderer,
    ): string {
        const propertyName = tag.slice(2, -1);
        const array = context[propertyName];
        if (!Array.isArray(array)) {
            return '';
        }

        const blockTemplate = blocks[propertyName];
        if (!blockTemplate) {
            return '';
        }

        return array
            .map((item) => renderFn(blockTemplate, item, blocks, config))
            .join('\n');
    }
}
