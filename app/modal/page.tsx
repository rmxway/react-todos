import type { Metadata } from 'next';

import { ModalPage } from '@/views/ModalPage';

export const metadata: Metadata = {
	title: 'Modal',
};

export default function Page() {
	return <ModalPage />;
}
