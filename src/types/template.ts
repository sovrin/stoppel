export type TemplateContext = Record<string, any>;
export type BlockName = '(main)' | ({} & string);
export type Blocks = Record<BlockName, string>;
export type BlockMap = Record<string, string>;
