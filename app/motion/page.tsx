import type { Metadata } from 'next';

import { MotionPage } from '@/views/MotionPage';

export const metadata: Metadata = {
	title: 'Motion',
};

export default function Page() {
	return <MotionPage />;
}
