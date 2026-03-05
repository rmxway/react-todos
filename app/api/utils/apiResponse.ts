import { NextResponse } from 'next/server';

type ApiSuccessResponse<T = unknown> = {
	success: true;
} & T;

type ApiErrorResponse = {
	success: false;
	error?: string;
	errors?: Record<string, string>;
};

/** Успешный JSON-ответ: { success: true, ...data } */
export function apiSuccess<T = unknown>(
	data: T,
	status = 200,
): NextResponse<ApiSuccessResponse<T>> {
	return NextResponse.json(
		{ success: true, ...data } as ApiSuccessResponse<T>,
		{ status },
	);
}

/** Ошибка: { success: false, error } или { success: false, errors } для полей */
export function apiError(
	error: string | Record<string, string>,
	status = 400,
): NextResponse<ApiErrorResponse> {
	if (typeof error === 'string') {
		return NextResponse.json({ success: false, error }, { status });
	}
	return NextResponse.json({ success: false, errors: error }, { status });
}

/** 401 — не авторизован */
export function apiUnauthorized(
	message = 'Не авторизован',
): NextResponse<ApiErrorResponse> {
	return apiError(message, 401);
}

/** 404 — не найдено */
export function apiNotFound(
	message = 'Не найдено',
): NextResponse<ApiErrorResponse> {
	return apiError(message, 404);
}

/** 500 — внутренняя ошибка сервера */
export function apiServerError(
	message = 'Произошла внутренняя ошибка сервера',
): NextResponse<ApiErrorResponse> {
	return apiError(message, 500);
}
