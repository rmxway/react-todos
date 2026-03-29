import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/** В продакшене доступны вместе с главной (SEO, иконка). */
const PRODUCTION_PUBLIC_PATHS = new Set([
	'/robots.txt',
	'/sitemap.xml',
	'/icon.svg',
]);

export function middleware(request: NextRequest) {
	if (process.env.NODE_ENV !== 'production') {
		return NextResponse.next();
	}

	const { pathname } = request.nextUrl;

	if (pathname === '/' || PRODUCTION_PUBLIC_PATHS.has(pathname)) {
		return NextResponse.next();
	}

	const url = request.nextUrl.clone();
	url.pathname = '/';
	return NextResponse.redirect(url);
}

export const config = {
	matcher: [
		'/',
		/*
		 * Все пути, кроме API, статики Next и favicon — middleware не должен
		 * гонять каждый chunk из _next.
		 */
		'/((?!api/|_next/static|_next/image|favicon.ico).*)',
	],
};
