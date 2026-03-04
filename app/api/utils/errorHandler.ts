import { NextResponse } from 'next/server';

import { apiError, apiServerError, apiUnauthorized } from './apiResponse';

export function handleApiError(
	error: unknown,
	defaultMessage: string,
): NextResponse {
	if (error instanceof Error && error.message === 'UNAUTHORIZED') {
		return apiUnauthorized();
	}
	if (error instanceof Error && error.name === 'ValidationError') {
		return apiError(error.message, 400);
	}
	if (error instanceof Error) {
		return apiError(error.message, 400);
	}
	return apiServerError(defaultMessage);
}
