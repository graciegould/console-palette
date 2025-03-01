// Usage: const cp = require('./console-palette.js');
// or import cp from './console-palette.js';

const STYLE_CODES = {
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    underline: '\x1b[4m',
    italic: '\x1b[3m',
    strikethrough: '\x1b[9m',
    inverse: '\x1b[7m',
};

const COLOR_CODES = {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',

    brightBlack: '\x1b[90m',
    brightRed: '\x1b[91m',
    brightGreen: '\x1b[92m',
    brightYellow: '\x1b[93m',
    brightBlue: '\x1b[94m',
    brightMagenta: '\x1b[95m',
    brightCyan: '\x1b[96m',
    brightWhite: '\x1b[97m',
};

const BACKGROUND_CODES = {
    bgBlack: '\x1b[40m',
    bgRed: '\x1b[41m',
    bgGreen: '\x1b[42m',
    bgYellow: '\x1b[43m',
    bgBlue: '\x1b[44m',
    bgMagenta: '\x1b[45m',
    bgCyan: '\x1b[46m',
    bgWhite: '\x1b[47m',
    bgBlack: '\x1b[40m',

    bgBrightRed: '\x1b[101m',
    bgBrightGreen: '\x1b[102m',
    bgBrightYellow: '\x1b[103m',
    bgBrightBlue: '\x1b[104m',
    bgBrightMagenta: '\x1b[105m',
    bgBrightCyan: '\x1b[106m',
    bgBrightWhite: '\x1b[107m'
};
const EMOJI_RANGES = [
    // Single-code-point emoji and symbols
    [0x00A9, 0x00A9],     // ©
    [0x00AE, 0x00AE],     // ®
    [0x20E3, 0x20E3],     // Combining Enclosing Keycap
    [0x2122, 0x2122],     // ™
    [0x2139, 0x2139],     // ℹ
    [0x2194, 0x2199],     // Left/rightwards arrows
    [0x21A9, 0x21AA],     // ↩, ↪
    [0x231A, 0x231B],     // Watch, hourglass
    [0x2328, 0x2328],     // Keyboard
    [0x23CF, 0x23CF],     // Eject symbol
    [0x23E9, 0x23F3],     // Fast forward, rewind, hourglass etc.
    [0x23F8, 0x23FA],     // Pause, stop, record
    [0x24C2, 0x24C2],     // Circled M
    [0x25AA, 0x25AB],     // Small squares
    [0x25B6, 0x25C0],     // Play and reverse play
    [0x25FB, 0x25FE],     // White medium squares
    [0x2B05, 0x2B07],     // Arrows
    [0x2B1B, 0x2B1C],     // Black/white large squares
    [0x2B50, 0x2B50],     // Star
    [0x2B55, 0x2B55],     // Heavy large circle
    [0x2600, 0x27EF],     // Miscellaneous Symbols & Dingbats (covers ☀–✯…)
    [0x2934, 0x2935],     // Arrow-like symbols
    [0x1F000, 0x1F02F],   // Mahjong Tiles
    [0x1F0A0, 0x1F0FF],   // Playing Cards
    [0x1F100, 0x1F64F],   // Additional symbols & Emoticons (combines parts of 1F300–1F5FF and 1F600–1F64F)
    [0x1F680, 0x1F6FF],   // Transport and Map Symbols
    [0x1F1E6, 0x1F1FF],   // Regional Indicator Symbols (for flags)

    // Other emoji blocks defined by Unicode
    [0x1F700, 0x1F77F],   // Alchemical Symbols
    [0x1F780, 0x1F7FF],   // Geometric Shapes Extended
    [0x1F800, 0x1F8FF],   // Supplemental Arrows-C
    [0x1F900, 0x1F9FF],   // Supplemental Symbols and Pictographs
    [0x1FA70, 0x1FAFF],   // Symbols and Pictographs Extended-A
    [0x1FB00, 0x1FBFF],    // Symbols for Legacy Computing
    [0x1F300, 0x1F5FF],   // Miscellaneous Symbols and Pictographs
    [0x1F600, 0x1F64F],   // Emoticons
    [0x1F680, 0x1F6FF],   // Transport and Map Symbols
    [0x1F700, 0x1F77F],   // Alchemical Symbols
    [0x1F780, 0x1F7FF],   // Geometric Shapes Extended
    [0x1F800, 0x1F8FF],   // Supplemental Arrows-C
    [0x1F900, 0x1F9FF],   // Supplemental Symbols and Pictographs
    [0x1FA70, 0x1FAFF],   // Symbols and Pictographs Extended-A
    [0x1FB00, 0x1FBFF],    // Symbols for Legacy Computing  
    // Enclosed Alphanumerics & Related symbols (many of these are used as emoji)
    [0x1F170, 0x1F171], // 🅰, 🅱
    [0x1F17E, 0x1F17F], // 🅾, 🅿 (often rendered as colored emoji)
    [0x1F18E, 0x1F18E], // 🆎
    [0x1F191, 0x1F19A], // 🆑, 🆒, 🆓, … (various enclosed letters/numbers)
    [0x1F201, 0x1F202], // 🈁, 🈂
    [0x1F21A, 0x1F21A], // 🈚
    [0x1F22F, 0x1F22F], // 🈯
    [0x1F232, 0x1F23A], // 🈲 … 🈺
    [0x1F250, 0x1F251], // 🉐, 🉑

    // Primary emoticons (faces)
    [0x1F600, 0x1F64F],

    // Miscellaneous Symbols and Pictographs
    [0x1F300, 0x1F5FF],

    // Transport and Map Symbols
    [0x1F680, 0x1F6FF],

    // Regional Indicator Symbols (for flag sequences)
    [0x1F1E6, 0x1F1FF]


];
const ANSI_CODES = {
    ...STYLE_CODES,
    ...COLOR_CODES,
    ...BACKGROUND_CODES
};

// Utility functions for converting HEX and RGB to ANSI codes
/**
 * Converts a HEX color code to an ANSI color code.
 *
 * @param {string} hex - The HEX color code in the format '#RRGGBB'.
 * @returns {string} The ANSI color code.
 */
const hexToAnsi = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `\x1b[38;2;${r};${g};${b}m`;
};

/**
 * Converts an RGB object to an ANSI color code.
 *
 * @param {Object} rgb - The RGB object.
 * @param {number} rgb.r - The red component (0-255).
 * @param {number} rgb.g - The green component (0-255).
 * @param {number} rgb.b - The blue component (0-255).
 * @returns {string} The ANSI color code.
 */
const rgbToAnsi = ({ r, g, b }) => {
    return `\x1b[38;2;${r};${g};${b}m`;
};

/**
 * Converts an RGB string to an ANSI color code.
 *
 * @param {string} rgbString - The RGB string in the format 'rgb(r, g, b)'.
 * @returns {string} The ANSI color code.
 * @throws {Error} If the RGB string format is invalid.
 */
const rgbStringToAnsi = (rgbString) => {
    const regex = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;
    const match = rgbString.match(regex);
    if (match) {
        const [_, r, g, b] = match;
        return `\x1b[38;2;${r};${g};${b}m`;
    }
    throw new Error("Invalid RGB string format");
};

/**
 * Converts a HEX color code to an ANSI background color code.
 *
 * @param {string} hex - The HEX color code in the format '#RRGGBB'.
 * @returns {string} The ANSI background color code.
 */
const hexToAnsiBackground = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `\x1b[48;2;${r};${g};${b}m`;
};

/**
 * Converts an RGB object to an ANSI background color code.
 *
 * @param {Object} rgb - The RGB object.
 * @param {number} rgb.r - The red component (0-255).
 * @param {number} rgb.g - The green component (0-255).
 * @param {number} rgb.b - The blue component (0-255).
 * @returns {string} The ANSI background color code.
 */
const rgbToAnsiBackground = ({ r, g, b }) => {
    return `\x1b[48;2;${r};${g};${b}m`;
};

/**
 * Converts an RGB string to an ANSI background color code.
 *
 * @param {string} rgbString - The RGB string in the format 'rgb(r, g, b)'.
 * @returns {string} The ANSI background color code.
 * @throws {Error} If the RGB string format is invalid.
 */
const rgbStringToAnsiBackground = (rgbString) => {
    const regex = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;
    const match = rgbString.match(regex);
    if (match) {
        const [_, r, g, b] = match;
        return `\x1b[48;2;${r};${g};${b}m`;
    }
    throw new Error("Invalid RGB string format");
};

/**
 * Generates a random Unicode character code within a specified range.
 *
 * @param {number} start - The start of the Unicode range.
 * @param {number} end - The end of the Unicode range.
 * @returns {string} The random Unicode character.
 */
const randomUnicodeChar = () => {
    const start = 0x0020; // Start of printable characters (space)
    const end = 0x1FAFF;  // End of Symbols and Pictographs Extended-A
    const randomCodePoint = start + Math.floor(Math.random() * (end - start + 1));
    let char = String.fromCodePoint(randomCodePoint);
    if (char.trim() === '' || char.codePointAt(0) === '0x1176C') {
        return randomUnicodeChar();
    }
    return char;
};

function randomEmoji() {
    const range = EMOJI_RANGES[Math.floor(Math.random() * EMOJI_RANGES.length)];
    const [start, end] = range;
    const randomCodePoint = start + Math.floor(Math.random() * (end - start + 1));
    let emoji = String.fromCodePoint(randomCodePoint);
    if (emoji.trim() === '' || emoji.codePointAt(0) === '0x1176C') {
        return randomEmoji();
    }
    return emoji;
}

/**
 * Customizes the text with specified color, background, and style.
 *
 * @param {string} text - The text to be customized.
 * @param {Object} [options] - The options for customization.
 * @param {string} [options.color] - The color of the text. Can be a hex code, RGB string, or a predefined ANSI color.
 * @param {string} [options.background] - The background color of the text. Can be a hex code, RGB string, or a predefined ANSI color.
 * @param {string} [options.style] - The style of the text. Can be a comma-separated list of predefined ANSI styles.
 * @returns {string} The customized text with ANSI codes.
 */
function custom(text, { color, background, style } = {}) {
    let colorCode = '';
    let backgroundCode = '';
    let styleCode = '';

    if (color) {
        if (typeof color === 'object' && color.r !== undefined) {
            colorCode = rgbToAnsi(color);
        } else if (color.startsWith('#')) {
            colorCode = hexToAnsi(color);
        } else if (color.startsWith('rgb')) {
            colorCode = rgbStringToAnsi(color);
        } else if (ANSI_CODES.hasOwnProperty(color)) {
            colorCode = ANSI_CODES[color];
        }
    }

    if (background) {
        if (typeof background === 'object' && background.r !== undefined) {
            backgroundCode = rgbToAnsiBackground(background);
        } else if (background.startsWith('#')) {
            backgroundCode = hexToAnsiBackground(background);
        } else if (background.startsWith('rgb')) {
            backgroundCode = rgbStringToAnsiBackground(background);
        } else if (ANSI_CODES.hasOwnProperty(background)) {
            if (background.startsWith('bg') && ANSI_CODES[background]) {
                backgroundCode = ANSI_CODES[ANSI_CODES[background.remove('bg').toLowerCase()]];
            } else if (ANSI_CODES['bg' + background.charAt(0).toUpperCase() + background.slice(1)]) {
                backgroundCode = ANSI_CODES['bg' + background.charAt(0).toUpperCase() + background.slice(1)];
            }
        }
    }
    if (style) {
        const styles = style.split(',').map(s => s.trim());
        styles.forEach((s) => {
            if (ANSI_CODES[s]) {
                styleCode += ANSI_CODES[s];
            }
        });
    }
    return `${styleCode}${colorCode}${backgroundCode}${text}${ANSI_CODES.reset}`;
}

/**
 * Generates random structured art with emojis.
 *
 * @param {number} width - The width of the art.
 * @param {number} height - The height of the art.
 * @param {Array<string>} emojis - The list of emojis to use.
 * @returns {string} The generated art.
 */
function generateRandomArt(rows = 50, cols = 50, characters = null) {
    let len = 0;
    if (!characters) {
        len = Math.floor(Math.random() * 10) + 1;
        characters = Array.from({ length: len }, () => randomEmoji());
    } else {
        if (typeof characters === 'string') {
            characters = characters.split('');
        }
        len = characters.length;
    }
    const freqX = Math.random() * len * Math.PI;
    const freqY = Math.random() * len * Math.PI;
    const phaseX = Math.random() * len * Math.PI;
    const phaseY = Math.random() * len * Math.PI;
    let art = '';
    for (let y = 0; y < rows; y++) {
        let rowStr = '';
        for (let x = 0; x < cols; x++) {
            const nx = x / cols;
            const ny = y / rows;
            const value = Math.sin(nx * freqX + phaseX) + Math.cos(ny * freqY + phaseY);
            const index = Math.floor(((value + 2) / 4) * len);
            rowStr += characters[index % len];
        }
        art += rowStr + '\n';
    }
    return art;
}

const cp = (() => {
    let _cp = {};
    Object.keys(ANSI_CODES).forEach((key) => {
        if (key.startsWith('bg')) {
            const baseColor = key.slice(2).charAt(0).toLowerCase() + key.slice(3);
            _cp[key] = (text) => custom(text, { background: baseColor });
        } else {
            _cp[key] = (text) => custom(text, { color: key });
        }
    });
    _cp.reset = (text) => custom(text, { color: 'reset' });
    _cp.custom = custom;
    _cp.STYLE_CODES = STYLE_CODES;
    _cp.COLOR_CODES = COLOR_CODES;
    _cp.BACKGROUND_CODES = BACKGROUND_CODES
    _cp.ANSI_CODES = ANSI_CODES;
    _cp.hexToAnsi = hexToAnsi;
    _cp.rgbToAnsi = rgbToAnsi;
    _cp.rgbStringToAnsi = rgbStringToAnsi;
    _cp.hexToAnsiBackground = hexToAnsiBackground;
    _cp.rgbToAnsiBackground = rgbToAnsiBackground;
    _cp.rgbStringToAnsiBackground = rgbStringToAnsiBackground;
    _cp.generateStructuredArt = generateRandomArt;
    return _cp;
})();

module.exports = cp;
