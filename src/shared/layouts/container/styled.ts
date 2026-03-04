import { motion } from 'framer-motion';
import type { ComponentProps } from 'react';
import styled, { css } from 'styled-components';

import { breakpoints } from '@/shared/config';

type MotionSectionProps = ComponentProps<typeof motion.section>;

export type ContainerProps = Omit<MotionSectionProps, 'ref'> & {
	$maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
	$padding?: string;
	$centered?: boolean;
};

const maxWidthMap = {
	sm: '640px',
	md: '768px',
	lg: '1030px',
	xl: '1330px',
	full: '100%',
};

export const StyledContainer = styled(motion.section)<ContainerProps>`
	position: relative;
	margin: 0 auto;
	width: 100%;
	${({ $padding, $maxWidth, $centered }) => {
		const width = $maxWidth ?? 'xl';
		return css`
			padding: ${$padding ?? '0 15px'};
			${breakpoints.greaterThan('lg')`
				max-width: ${maxWidthMap[width === 'full' ? 'xl' : width]};
			`}
			${breakpoints.lessThan('lg')`
				max-width: ${maxWidthMap.lg};
			`}
			${breakpoints.lessThan('md')`
				max-width: 100%;
			`}
			${$centered &&
			css`
				display: flex;
				justify-content: center;
				align-items: center;
			`}
		`;
	}}
`;
