'use client';

import { motion } from 'framer-motion';
import styled from 'styled-components';

import { AlertWrapper } from '@/features/alert';
import { Navbar } from '@/features/auth';
import { ErrorBoundary } from '@/shared/ui';

const AppStyled = styled(motion.section)`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	flex: 1;
	padding-top: 65px;
	padding-bottom: 40px;
	color: ${(props) => props.theme.textColor};
	background-color: ${(props) => props.theme.bg};
	transition: 0.5s;
	align-items: center;
`;

export function AppShell({ children }: { children: React.ReactNode }) {
	return (
		<AppStyled>
			<AlertWrapper />
			<Navbar />
			<ErrorBoundary>{children}</ErrorBoundary>
		</AppStyled>
	);
}
