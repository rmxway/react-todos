import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/test/utils';

import { NoteForm } from './index';

const mockMutate = vi.fn(
	(_title: string, opts?: { onSuccess?: () => void }) => {
		opts?.onSuccess?.();
	},
);

vi.mock('@/features/notes/api/hooks', () => ({
	useAddNote: () => ({
		mutate: mockMutate,
		isPending: false,
	}),
}));

describe('NoteForm', () => {
	it('should render input with placeholder', () => {
		renderWithProviders(<NoteForm />);
		expect(
			screen.getByPlaceholderText('Введите название задачи'),
		).toBeInTheDocument();
	});

	it('should show validation error for empty submit', async () => {
		renderWithProviders(<NoteForm />);
		const input = screen.getByPlaceholderText('Введите название задачи');
		fireEvent.change(input, { target: { value: '   ' } });
		fireEvent.submit(input.closest('form')!);
		await waitFor(() => {
			expect(
				screen.getByText('Введите название заметки'),
			).toBeInTheDocument();
		});
	});

	it('should call mutate on valid submit', async () => {
		mockMutate.mockClear();
		renderWithProviders(<NoteForm />);
		const input = screen.getByPlaceholderText('Введите название задачи');
		fireEvent.change(input, { target: { value: 'New task' } });
		fireEvent.submit(input.closest('form')!);

		await waitFor(() => {
			expect(mockMutate).toHaveBeenCalledWith(
				'New task',
				expect.any(Object),
			);
		});
	});
});
