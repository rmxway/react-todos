import type { lightTheme } from '@/shared/config/theme/lightTheme';

export type Theme = typeof lightTheme;

export interface Note {
	id: number;
	title: string;
	completed: boolean;
	date: string;
}

export interface User {
	id: number;
	name: string;
	login: string;
	password: string;
	notes: Note[];
}
