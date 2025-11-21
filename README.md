# About

yet another custom templating engine 😐

## Features

- **Variables**: `{{$variableName}}`
- **Filters**: `{{$variableName | filter1 | filter2}}`
- **Blocks**: `{{>blockName}}`
- **Array Iteration**: `{{[>arrayProperty]}}`
- **CommenT**: `{{-comment}}`

## Example

```typescript
import { render } from 'stoppel';

const template = `
{{- this is a comment}}

{{#banner}}
Hello, {{$value | upper}}!
  {{>bear}}
{{/banner}}

{{#bear}}
ฅʕ•ᴥ•ʔ
{{/bear}}

{{#fruits}}
  - {{$name}}
{{/fruits}}


{{#}}
{{>banner}}

{{[>fruits]}}
{{/}}
`;

const context = {
    value: 'World',
    fruits: [
        { name: "Apple" },
        { name: "Banana" },
        { name: "Pear" }
    ]
};

const config = {
    filters: {
        upper: (val: string) => val.toUpperCase(),
    },
};

const result = render(template, context, config);
console.log(result)
```

```
 Hello, WORLD!
   ฅʕ•ᴥ•ʔ

  - Apple
  - Banana
  - Pear
```

## Installation

```bash
npm install stoppel
```
