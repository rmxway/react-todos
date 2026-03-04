import type { GridProps } from './styled';
import { StyledGrid } from './styled';

export type { GridProps } from './styled';

export const Grid = ({
	columns,
	rows,
	gap,
	columnGap,
	rowGap,
	areas,
	children,
	className,
}: GridProps) => {
	return (
		<StyledGrid
			{...{ columns, rows, gap, columnGap, rowGap, areas, className }}
		>
			{children}
		</StyledGrid>
	);
};
