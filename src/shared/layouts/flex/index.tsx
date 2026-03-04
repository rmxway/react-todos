import type { FlexProps } from './styled';
import { StyledFlex } from './styled';

export type { FlexProps } from './styled';

export const Flex = ({
	$direction = 'row',
	$justify = 'flex-start',
	$align = 'stretch',
	$gap,
	$wrap = 'nowrap',
	children,
	className,
}: FlexProps) => {
	return (
		<StyledFlex
			{...{ $direction, $justify, $align, $gap, $wrap, className }}
		>
			{children}
		</StyledFlex>
	);
};
