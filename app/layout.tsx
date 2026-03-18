import '@/styles/global.css';

import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { StyledComponentsRegistry } from '@/lib/registry';
import { APP_TITLE, BASE_URL, THEME_COOKIE_NAME } from '@/shared/config';

import { AppShell } from './AppShell';
import { StoreProvider } from './StoreProvider';

export const metadata: Metadata = {
	title: {
		default: APP_TITLE,
		template: `%s | ${APP_TITLE}`,
	},
	description: 'TodoList, Animations',
	keywords: ['todo', 'react', 'next.js', 'заметки', 'задачи'],
	openGraph: {
		title: APP_TITLE,
		description: 'TodoList, Animations',
		url: BASE_URL,
		siteName: APP_TITLE,
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: APP_TITLE,
		description: 'TodoList, Animations',
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const cookieStore = await cookies();
	const themeCookie = cookieStore.get(THEME_COOKIE_NAME)?.value;
	const initialTheme =
		themeCookie === 'dark' || themeCookie === 'light'
			? themeCookie
			: 'light';

	return (
		<html lang="ru">
			<head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
				/>
			</head>
			<body>
				<StyledComponentsRegistry>
					<StoreProvider {...{ initialTheme }}>
						<AppShell>{children}</AppShell>
					</StoreProvider>
				</StyledComponentsRegistry>
			</body>
		</html>
	);
}
