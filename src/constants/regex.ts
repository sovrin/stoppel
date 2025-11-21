/**
 * Regex to match template tags like {{...}}
 */
export const TAG_REGEX = /{{([^}]+)}}/g;

/**
 * Regex to match block definitions like {{#block}}...{{/block}}
 */
export const BLOCK_REGEX = /{{#([^}]*)}}([\s\S]*?){{\/\1}}/g;
