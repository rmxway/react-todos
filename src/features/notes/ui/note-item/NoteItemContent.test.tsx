import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/test/utils';

import { NoteItemContent } from './index';

describe('NoteItemContent', () => {
	it('should render title and date', () => {
		const onToggle = vi.fn();
		const onDelete = vi.fn();
		renderWithProviders(
			<NoteItemContent
				id="1"
				title="Test note"
				date="2024-01-01"
				completed={false}
				onToggle={onToggle}
				onDelete={onDelete}
			/>,
		);
		expect(screen.getByText('Test note')).toBeInTheDocument();
		expect(screen.getByText('2024-01-01')).toBeInTheDocument();
	});

	it('should call onToggle when checkbox clicked', () => {
		const onToggle = vi.fn();
		const onDelete = vi.fn();
		const { container } = renderWithProviders(
			<NoteItemContent
				id="1"
				title="Test"
				date="2024-01-01"
				completed={false}
				onToggle={onToggle}
				onDelete={onDelete}
			/>,
		);
		const checkbox = container.querySelector('input[type="checkbox"]');
		expect(checkbox).toBeInTheDocument();
		fireEvent.click(checkbox!);
		expect(onToggle).toHaveBeenCalledWith('1');
	});

	it('should call onDelete when close button clicked', () => {
		const onToggle = vi.fn();
		const onDelete = vi.fn();
		renderWithProviders(
			<NoteItemContent
				id="1"
				title="Test"
				date="2024-01-01"
				completed={false}
				onToggle={onToggle}
				onDelete={onDelete}
			/>,
		);
		fireEvent.click(screen.getByRole('button', { name: '×' }));
		expect(onDelete).toHaveBeenCalledWith('1');
	});
});
