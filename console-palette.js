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
    return _cp;
})();

module.exports = cp;
