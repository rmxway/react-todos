import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { renderWithProviders } from '@/test/utils';

import { Select } from './index';

const list = [
	{ id: 'all', title: 'Все' },
	{ id: 'active', title: 'Незавершенные' },
	{ id: 'completed', title: 'Завершенные' },
];

describe('Select', () => {
	it('should render placeholder when closed', () => {
		renderWithProviders(<Select list={list} placeholder="Выберите" />);
		expect(screen.getByText('Выберите')).toBeInTheDocument();
	});

	it('should open dropdown on click', () => {
		renderWithProviders(<Select list={list} placeholder="Выберите" />);
		fireEvent.click(screen.getByText('Выберите'));
		expect(screen.getByText('Все')).toBeInTheDocument();
		expect(screen.getByText('Незавершенные')).toBeInTheDocument();
		expect(screen.getByText('Завершенные')).toBeInTheDocument();
	});

	it('should call onChange with selectedId when item clicked', () => {
		const onChange = vi.fn();
		renderWithProviders(
			<Select list={list} placeholder="Выберите" onChange={onChange} />,
		);
		fireEvent.click(screen.getByText('Выберите'));
		fireEvent.click(screen.getByText('Незавершенные'));
		expect(onChange).toHaveBeenCalledWith(
			expect.objectContaining({ selectedId: 'active' }),
		);
	});
});
