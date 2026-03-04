import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

export interface GridProps {
	columns?: number | string;
	rows?: number | string;
	gap?: string | number;
	columnGap?: string | number;
	rowGap?: string | number;
	areas?: string;
	children?: React.ReactNode;
	className?: string;
}

export const StyledGrid = styled(motion.div)<GridProps>`
	display: grid;

	${(props) =>
		props.columns &&
		css`
			grid-template-columns: ${typeof props.columns === 'number'
				? `repeat(${props.columns}, 1fr)`
				: props.columns};
		`}

	${(props) =>
		props.rows &&
		css`
			grid-template-rows: ${typeof props.rows === 'number'
				? `repeat(${props.rows}, 1fr)`
				: props.rows};
		`}

    ${(props) =>
		props.gap &&
		css`
			gap: ${typeof props.gap === 'number'
				? `${props.gap}px`
				: props.gap};
		`}

    ${(props) =>
		props.columnGap &&
		css`
			column-gap: ${typeof props.columnGap === 'number'
				? `${props.columnGap}px`
				: props.columnGap};
		`}

    ${(props) =>
		props.rowGap &&
		css`
			row-gap: ${typeof props.rowGap === 'number'
				? `${props.rowGap}px`
				: props.rowGap};
		`}

    ${(props) =>
		props.areas &&
		css`
			grid-template-areas: ${props.areas};
		`}
`;
