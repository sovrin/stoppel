# About
yet another custom templating engine 😐


## Features
- **Variables**: `{{$variableName}}`
- **Filters**: `{{$variableName | filter1 | filter2}}`
- **Blocks**: `{{>blockName}}`
- **Array Iteration**: `{{[>arrayProperty]}}`

## Example

```typescript
import {render} from 'stoppel';

const template = `
{{#}}


`;

const result = render(template, data, config)

```

## Installation

```bash
npm install stoppel
```
