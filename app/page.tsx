import type { Metadata } from 'next';

import { normalizeAuthMode } from '@/features/auth/lib/normalizeAuthMode';
import { APP_TITLE } from '@/shared/config';
import { NotePage } from '@/views/NotePage';

export const metadata: Metadata = {
	title: `Notes | ${APP_TITLE}`,
};

type PageProps = {
	searchParams: { auth?: string | string[] };
};

export default function Page({ searchParams }: PageProps) {
	const raw = searchParams.auth;
	const authParam = Array.isArray(raw) ? raw[0] : raw;
	const authMode = normalizeAuthMode(authParam);

	return <NotePage authMode={authMode} />;
}
