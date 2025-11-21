import { TAG_REGEX } from '../constants';
import { Config, TemplateContext, Blocks } from '../types';
import { DEFAULT_CONFIG } from '../types';
import {
    VariableHandler,
    MapHandler,
    BlockHandler,
    CommentHandler,
} from './tag-handlers';
import { Compiler } from './compiler';

export class TemplateRenderer {
    private compiler = new Compiler();
    private handlers = [
        new VariableHandler(),
        new MapHandler(),
        new BlockHandler(),
        new CommentHandler(),
    ];

    render(template: string, context: TemplateContext, config: Config): string {
        const mergedConfig = { ...DEFAULT_CONFIG, ...config };
        const blocks = this.compiler.compile(template);
        const mainBlock = blocks['(main)'] || template;

        return this.processTemplate(mainBlock, context, blocks, mergedConfig);
    }

    private processTemplate(
        template: string,
        context: TemplateContext,
        blocks: Blocks,
        config: Config,
    ): string {
        return template.replace(TAG_REGEX, (fullMatch, inner) => {
            const tag = String(inner).trim();

            return this.processTag(tag, fullMatch, context, blocks, config);
        });
    }

    private processTag(
        tag: string,
        fullMatch: string,
        context: TemplateContext,
        blocks: Blocks,
        config: Config,
    ): string {
        for (const handler of this.handlers) {
            if (handler.canHandle(tag)) {
                return handler.handle(
                    tag,
                    context,
                    blocks,
                    config,
                    this.processTemplate.bind(this),
                );
            }
        }

        return fullMatch;
    }
}

const defaultRenderer = new TemplateRenderer();

export function render(
    template: string,
    context: TemplateContext,
    config: Config = DEFAULT_CONFIG,
): string {
    return defaultRenderer.render(template, context, config);
}
