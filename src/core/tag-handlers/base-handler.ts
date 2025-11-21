import { TemplateContext, Blocks, Config } from '../../types';

export type TagRenderer = (
    template: string,
    context: TemplateContext,
    blocks: Blocks,
    config: Config,
) => string;

export interface TagHandler {
    canHandle(tag: string): boolean;
    handle(
        tag: string,
        context: TemplateContext,
        blocks: Blocks,
        config: Config,
        renderFn: TagRenderer,
    ): string;
}
