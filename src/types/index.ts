import type { lightTheme } from '@/shared/config/theme/lightTheme';

export type Theme = typeof lightTheme;

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
