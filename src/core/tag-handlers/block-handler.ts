import { TagHandler, TagRenderer } from './base-handler';
import { TemplateContext, Blocks, Config } from '../../types';

/**
 * {{>blockName}}
 */
export class BlockHandler implements TagHandler {
    canHandle(tag: string): boolean {
        return tag.startsWith('>');
    }

    handle(
        tag: string,
        context: TemplateContext,
        blocks: Blocks,
        config: Config,
        renderFn: TagRenderer,
    ): string {
        const blockName = tag.slice(1);
        const blockTemplate = blocks[blockName];
        if (!blockTemplate) {
            return '';
        }

        return renderFn(blockTemplate, context, blocks, config);
    }
}
