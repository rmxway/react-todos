import type { lightTheme } from '@/shared/config/theme/lightTheme';

export type Theme = typeof lightTheme;

type ThemeStringKeys<T> = {
	[K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

export type ThemeColorKey =
	| keyof Theme['colors']
	| ThemeStringKeys<
			Omit<
				Theme,
				'colors' | 'gaps' | 'z' | 'transitions' | 'radius' | 'shadows'
			>
	  >;

export interface IconProps {
	size?: number;
	color?: ThemeColorKey;
}

export interface Note {
	id: string;
	title: string;
	completed: boolean;
	date: string;
	_optimisticId?: string;
}

export interface User {
	id: string;
	name: string;
	login: string;
	password?: string;
	notes: Note[];
}
