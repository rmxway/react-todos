import type { Metadata } from 'next';

import { APP_TITLE } from '@/shared/config';
import { NotePage } from '@/views/NotePage';

export const metadata: Metadata = {
	title: `Notes | ${APP_TITLE}`,
};

export default function Page() {
	return <NotePage />;
}
