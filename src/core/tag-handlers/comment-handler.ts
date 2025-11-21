import { TagHandler, TagRenderer } from './base-handler';
import { TemplateContext, Blocks, Config } from '../../types';

/**
 * {{- some comment}}
 */
export class CommentHandler implements TagHandler {
    canHandle(tag: string): boolean {
        return tag.startsWith('-');
    }

    handle(
        tag: string,
        context: TemplateContext,
        blocks: Blocks,
        config: Config,
        renderFn: TagRenderer,
    ): string {
        // we do nothing
        return '';
    }
}
