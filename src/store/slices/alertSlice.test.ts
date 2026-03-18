import { describe, expect, it } from 'vitest';

import alertReducer, { hideAlert, showAlert } from './alertSlice';

describe('alertSlice', () => {
	it('should return initial state', () => {
		expect(alertReducer(undefined, { type: 'unknown' })).toEqual({
			visible: false,
			type: 'warning',
			text: '',
		});
	});

	it('showAlert should set visible, type and text', () => {
		const state = alertReducer(
			undefined,
			showAlert({ text: 'Test message', type: 'success' }),
		);
		expect(state).toEqual({
			visible: true,
			type: 'success',
			text: 'Test message',
		});
	});

	it('showAlert should use warning as default type', () => {
		const state = alertReducer(undefined, showAlert({ text: 'Warning' }));
		expect(state.type).toBe('warning');
	});

	it('hideAlert should set visible to false', () => {
		const state = alertReducer(
			{ visible: true, type: 'danger', text: 'Error' },
			hideAlert(),
		);
		expect(state.visible).toBe(false);
	});
});
