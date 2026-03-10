import type { Theme, ThemeColorKey } from '@/types';

export const getThemeColor = (
	theme: Theme,
	colorKey?: ThemeColorKey,
): string => {
	if (!colorKey) {
		return 'currentColor';
	}

	if (colorKey in theme.colors) {
		return theme.colors[colorKey as keyof Theme['colors']];
	}

	const themeValue = theme[colorKey as keyof Theme];
	if (typeof themeValue === 'string') {
		return themeValue;
	}

	return 'currentColor';
};
