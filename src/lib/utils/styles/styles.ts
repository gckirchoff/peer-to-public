export const rgbToHex = (r: number, g: number, b: number): string => {
	// Ensure the values are within the 0-255 range
	if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
		throw new Error('RGB values must be between 0 and 255');
	}

	const hexR = r.toString(16).padStart(2, '0');
	const hexG = g.toString(16).padStart(2, '0');
	const hexB = b.toString(16).padStart(2, '0');

	return `#${hexR}${hexG}${hexB}`;
};

export const parseRgbString = (rgbString: string): { r: number; g: number; b: number } => {
	// Use a regular expression to match the numbers in the string
	const match = rgbString.match(/rgb\((\d+(\.\d+)?),\s*(\d+(\.\d+)?),\s*(\d+(\.\d+)?)\)/);

	if (!match) {
		throw new Error('Invalid RGB string format');
	}

	// Parse the matched numbers and round them to the nearest integer
	const r = Math.round(parseFloat(match[1]));
	const g = Math.round(parseFloat(match[3]));
	const b = Math.round(parseFloat(match[5]));

	return { r, g, b };
};
