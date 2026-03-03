import type { Theme } from './types';

declare module 'styled-components' {
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- augmentation
	export interface DefaultTheme extends Theme {}
}
