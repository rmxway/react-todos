import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

export interface GridProps {
	$columns?: number | string;
	$rows?: number | string;
	$gap?: string | number;
	$columnGap?: string | number;
	$rowGap?: string | number;
	$areas?: string;
	children?: React.ReactNode;
	className?: string;
}

const toGridValue = (v: number | string) =>
	typeof v === 'number' ? `repeat(${v}, 1fr)` : v;
const toGapValue = (v: number | string) =>
	typeof v === 'number' ? `${v}px` : v;

export const StyledGrid = styled(motion.div)<GridProps>`
	display: grid;
	${({ $columns, $rows, $gap, $columnGap, $rowGap, $areas }) => css`
		${$columns != null &&
		css`
			grid-template-columns: ${toGridValue($columns)};
		`}
		${$rows != null &&
		css`
			grid-template-rows: ${toGridValue($rows)};
		`}
		${$gap != null &&
		css`
			gap: ${toGapValue($gap)};
		`}
		${$columnGap != null &&
		css`
			column-gap: ${toGapValue($columnGap)};
		`}
		${$rowGap != null &&
		css`
			row-gap: ${toGapValue($rowGap)};
		`}
		${$areas &&
		css`
			grid-template-areas: ${$areas};
		`}
	`}
`;
