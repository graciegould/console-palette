# Console Palette

**Console Palette** is a lightweight Node.js library that simplifies working with ANSI color codes in terminal output. Customize your terminal text with colors, backgrounds, and styles using easy-to-use utility functions.

## Features

- Predefined ANSI color and style methods for foreground and background. These can be passed as a string in the `custom` method — See section **Available ANSI Codes** below.
- Custom color conversion from HEX and RGB values to ANSI.
- Chaining and combining styles for complex output customization.

## Installation

```bash
npm install console-palette
```

## Usage

### Import the library

```jsx
const cp = require('./console-palette.js'); // for Common JS
// or
import cp from './console-palette.js'; // for ES6
```

### Basic Provided Color Usage

```jsx
console.log(cp.red('This text is red!'));
console.log(cp.bgBlue('This text has a blue background!'));
console.log(cp.brightYellow('This is bright yellow!'));
```

### Applying Styles

```jsx
let bold = cp.bold('Bold Text');
let italic = cp.italic('Italic and');
let underlined = cp.underline('Underlined Text');
console.log(bold + " " + italic + " " + underlined);

// **Bold** *Italic* and Underlined Text
```

### Using the `custom` method for colors and style

You can also use custom HEX or RGB colors for more flexibility.

### Provided color strings (see list below)

```jsx
console.log(cp.custom('hello world', { color: 'brightYellow' }));
```

### HEX color codes

```jsx
console.log(cp.custom('Custom HEX color', { color: '#FF5733' }));
```

### RGB string or object inputs

```jsx
console.log(cp.custom('This text should be red', { color: { r: 255, g: 0, b: 0 } }));
console.log(cp.custom('This text should be red', { color: 'rgb(255, 0, 0)' }));
```

### Custom Background Colors

```jsx
console.log(cp.custom('Custom Background Color using hex', { background: '#34c3ff' }));
console.log(cp.custom('Custom Background Color RGB', { background: 'rgb(255, 0, 0)' }));
console.log(cp.custom('Custom Background with provided colors', { background: 'pink' }));
```

### Custom styles

Separate multiple styles with the custom method by commas.

```jsx
console.log(cp.custom('Hello World', {
    style: 'bold,underline,invert'
}));
```

### Combining Styles, Colors, and Backgrounds

You can combine styles, foreground colors, and backgrounds for advanced formatting:

```jsx
console.log(cp.custom('Styled Text', {
    color: 'green',
    background: 'pink',
    style: 'bold,underline'
}));
```

### Chain Styles and Colors

You can combine multiple styles, colors, and backgrounds by nesting them or chaining directly through the `custom` function.

### Chaining with Predefined Colors and Styles

```jsx
console.log(cp.red(cp.bold('This text is bold and red!')));
console.log(cp.bgBlue(cp.underline(cp.white('This text is underlined and has a blue background!'))));
```

## Utility Functions

- **`hexToAnsi(hex)`**: Converts HEX color to ANSI code for foreground.
- **`rgbToAnsi(rgb)`**: Converts an RGB object to ANSI code for foreground.
- **`rgbStringToAnsi(rgbString)`**: Converts an RGB string to ANSI code for foreground.
- **`hexToAnsiBackground(hex)`**: Converts HEX color to ANSI background.
- **`rgbToAnsiBackground(rgb)`**: Converts RGB object to ANSI background.
- **`rgbStringToAnsiBackground(rgbString)`**: Converts RGB string to ANSI background.
- **`randomEmoji()`**: generates a random emoji
- **`generateRandomArt({rows : int, cols : int})`**: Generates random structured art with random symbols and emojis.

### Example Usage of `generateRandomArt`

```jsx
const cp = require('./console-palette');

// example 1 defalts to generates random symbols and emojis with 20 rows and 30 columns
const art = cp.generateRandomArt();
console.log(art);
// output:
// 🉑🉑🉑⬛🐜🛉🛉▫▫▫▫🛉🐜⬛⬛🉑🉑🉑🉑⬛🐜🐜🛉▫▫▫▫🛉🐜⬛
// 🔔🔔🔔🉑⬛🐜🛉🛉🛉🛉🛉🐜⬛🉑🉑🔔🔔🔔🔔🉑⬛🐜🐜🛉🛉🛉🛉🐜⬛⬛
// ⏏⏏🔔🔔🉑⬛🐜🐜🐜🐜🐜⬛🉑🉑🔔⏏⏏⏏⏏🔔🉑⬛🐜🐜🐜🐜🐜⬛⬛🉑
// 🉑🉑⏏⏏🔔🉑⬛⬛🐜🐜⬛⬛🉑🔔⏏⏏🉑🉑⏏⏏🔔🉑⬛⬛🐜🐜⬛⬛🉑🔔
// 🉑🉑🉑⏏🔔🉑🉑⬛⬛⬛⬛🉑🔔⏏⏏🉑🉑🉑🉑⏏🔔🉑🉑⬛⬛⬛⬛🉑🔔⏏
// 🉑🉑🉑⏏🔔🔔🉑⬛⬛⬛🉑🉑🔔⏏🉑🉑🉑🉑🉑⏏⏏🔔🉑⬛⬛⬛⬛🉑🔔⏏
// 🉑🉑🉑⏏🔔🉑🉑⬛⬛⬛⬛🉑🔔⏏🉑🉑🉑🉑🉑⏏🔔🔔🉑⬛⬛⬛⬛🉑🔔⏏
// 🉑🉑⏏⏏🔔🉑⬛⬛🐜⬛⬛🉑🉑🔔⏏🉑🉑🉑🉑⏏🔔🉑⬛⬛⬛⬛⬛🉑🉑🔔
// ⏏⏏⏏🔔🉑⬛⬛🐜🐜🐜🐜⬛🉑🔔🔔⏏⏏⏏⏏🔔🉑⬛⬛🐜🐜🐜🐜⬛🉑🔔
// 🔔🔔🔔🉑⬛⬛🐜🛉🛉🛉🐜🐜⬛🉑🔔🔔🔔🔔🔔🉑🉑⬛🐜🛉🛉🛉🛉🐜⬛🉑
// 🔔🔔🉑⬛⬛🐜🛉▫▫▫🛉🛉🐜⬛🉑🉑🔔🔔🉑🉑⬛🐜🛉▫▫▫🛉🛉🐜⬛
// 🉑🉑⬛⬛🐜🛉▫▫🟣🟣▫🛉🛉🐜⬛🉑🉑🉑⬛⬛🐜🛉▫▫🟣🟣▫▫🛉🐜
// ⬛⬛⬛🐜🛉▫▫🟣🟣🟣🟣▫🛉🐜🐜⬛⬛⬛⬛🐜🛉▫▫🟣🟣🟣🟣▫🛉🐜
// ⬛⬛🐜🐜🛉▫🟣🟣🟣🟣🟣▫🛉🛉🐜⬛⬛⬛⬛🐜🛉▫🟣🟣🟣🟣🟣▫▫🛉
// ⬛⬛⬛🐜🛉▫🟣🟣🟣🟣🟣▫🛉🛉🐜⬛⬛⬛⬛🐜🛉▫🟣🟣🟣🟣🟣▫▫🛉
// ⬛⬛⬛🐜🛉▫▫🟣🟣🟣🟣▫🛉🐜⬛⬛⬛⬛⬛🐜🛉🛉▫🟣🟣🟣🟣▫🛉🐜
// 🉑🉑⬛⬛🐜🛉▫▫▫▫▫🛉🐜🐜⬛🉑🉑🉑🉑⬛🐜🛉▫▫▫▫▫🛉🛉🐜
// 🔔🔔🉑🉑⬛🐜🛉🛉▫▫🛉🛉🐜⬛🉑🔔🔔🔔🉑🉑⬛🐜🛉🛉▫▫🛉🛉🐜⬛
// ⏏⏏🔔🉑🉑⬛🐜🛉🛉🛉🐜🐜⬛🉑🔔🔔⏏⏏🔔🔔🉑⬛🐜🛉🛉🛉🐜🐜⬛🉑
// ⏏⏏⏏🔔🉑🉑⬛🐜🐜🐜🐜⬛🉑🔔⏏⏏⏏⏏⏏🔔🔔🉑⬛🐜🐜🐜🐜⬛🉑🔔


// example 2 generates random symbols and emojis with 10 rows and 10 columns
const art2 = cp.generateRandomArt({
    rows: 10,
    cols: 10
});
// console.log(art2);
// output:
// ™™™🜂🤅🤅🜂🜂™™
// ™™™🜂🜂🜂🜂™™™
// ™™🜂🜂🤅🤅🜂🜂™™
// 🜂🜂🤅🤅🀏🀏🤅🤅🜂🜂
// 🤅🤅🤅🀏🀏🀏🀏🤅🤅🤅
// 🜂🜂🜂🤅🀏🀏🤅🤅🜂🜂
// ™™™🜂🤅🤅🜂🜂™™
// ™™™🜂🜂🜂🜂™™™
// ™™🜂🜂🤅🤅🜂🜂™™
// 🜂🜂🤅🤅🀏🀏🤅🤅🜂🜂

const art3 = cp.generateRandomArt({
    rows: 10,
    cols: 50
});
console.log(art3);
// output:
// 🮀⏺⏺⏺⏺🮀⏺🮀⏺🮀⏺🮀⏺⏺⏺⏺🮀⏺🮀⏺🮀⏺🮀⏺🮀⏺⏺⏺⏺🮀⏺🮀⏺🮀⏺🮀⏺🮀⏺⏺🮀⏺🮀⏺🮀⏺🮀⏺🮀⏺
// 🮀⏺⏺🮀⏺🮀⏺🮀⏺🮀⏺🮀⏺🮀⏺⏺🮀⏺🮀⏺🮀⏺🮀⏺🮀⏺⏺🮀⏺🮀⏺🮀⏺🮀⏺🮀⏺🮀⏺⏺🮀⏺🮀⏺🮀⏺🮀⏺🮀⏺
// 🮀🮀🮀🮀⏺🮀⏺⭐⏺⭐⏺🮀⏺🮀🮀🮀🮀⏺🮀⏺⭐⏺🮀⏺🮀🮀🮀🮀⏺🮀⏺⭐⏺⭐⏺🮀⏺🮀🮀🮀🮀⏺🮀⏺⭐⏺🮀⏺🮀🮀
// ⭐🮀🮀🮀🮀⭐🮀⭐⏺⭐🮀⭐🮀🮀🮀🮀⭐🮀⭐🮀⭐⏺⭐🮀⭐🮀🮀🮀🮀⭐🮀⭐⏺⭐🮀⭐🮀🮀🮀🮀⭐🮀⭐🮀⭐⏺⭐🮀⭐🮀
// ⭐🮀⭐⭐🮀⭐🮀⭐🮀⭐🮀⭐🮀⭐⭐🮀⭐🮀⭐🮀⭐🮀⭐🮀⭐🮀⭐⭐🮀⭐🮀⭐🮀⭐🮀⭐🮀⭐⭐🮀⭐🮀⭐🮀⭐🮀⭐🮀⭐🮀
// ⭐⭐⭐⭐🮀⭐🮀⭐🮀⭐🮀⭐🮀⭐⭐⭐⭐🮀⭐🮀⭐🮀⭐🮀⭐⭐⭐⭐🮀⭐🮀⭐🮀⭐🮀⭐🮀⭐⭐⭐⭐🮀⭐🮀⭐🮀⭐🮀⭐🮀
// ⭐🮀⭐⭐🮀⭐🮀⭐🮀⭐🮀⭐🮀⭐⭐⭐⭐🮀⭐🮀⭐🮀⭐🮀⭐🮀⭐⭐🮀⭐🮀⭐🮀⭐🮀⭐🮀⭐⭐⭐⭐🮀⭐🮀⭐🮀⭐🮀⭐🮀
// ⭐🮀🮀⭐🮀⭐🮀⭐🮀⭐🮀⭐🮀⭐🮀🮀⭐🮀⭐🮀⭐🮀⭐🮀⭐🮀🮀⭐🮀⭐🮀⭐🮀⭐🮀⭐🮀⭐🮀🮀⭐🮀⭐🮀⭐🮀⭐🮀⭐🮀
// 🮀🮀🮀🮀🮀⭐⏺⭐⏺⭐⏺⭐🮀🮀🮀🮀🮀⏺⭐⏺⭐⏺⭐⏺🮀🮀🮀🮀🮀🮀⏺⭐⏺⭐⏺⭐🮀🮀🮀🮀🮀🮀⭐⏺⭐⏺⭐⏺🮀🮀
// 🮀⏺🮀🮀⏺🮀⏺🮀⏺🮀⏺🮀⏺🮀🮀⏺🮀⏺🮀⏺🮀⏺🮀⏺🮀⏺🮀🮀⏺🮀⏺🮀⏺🮀⏺🮀⏺🮀🮀⏺🮀⏺🮀⏺🮀⏺🮀⏺🮀⏺

```
## Available ANSI Codes

- **Foreground Colors**: `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, and bright variants (`brightRed`, `brightGreen`, etc.).
- **Background Colors**: `bgBlack`, `bgRed`, `bgGreen`, `bgYellow`, `bgBlue`, `bgMagenta`, `bgCyan`, `bgWhite`, and bright variants.
- **Styles**: `bold`, `underline`, `italic`, `strikethrough`, `inverse`.
