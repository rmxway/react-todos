import type { GridProps } from './styled';
import { StyledGrid } from './styled';

export type { GridProps } from './styled';

export const Grid = ({ children, ...props }: GridProps) => {
	return <StyledGrid {...props}>{children}</StyledGrid>;
};
