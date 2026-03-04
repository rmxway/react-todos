import type { Metadata } from 'next';

import { SelectPage } from '@/views/SelectPage';

export const metadata: Metadata = {
	title: 'Select',
};

export default function Page() {
	return <SelectPage />;
}
