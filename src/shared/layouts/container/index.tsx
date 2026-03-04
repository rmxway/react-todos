import type { ContainerProps } from './styled';
import { StyledContainer } from './styled';

export type { ContainerProps } from './styled';

export const Container = ({
	$maxWidth = 'xl',
	$padding,
	$centered = false,
	children,
	className,
	...rest
}: ContainerProps) => {
	return (
		<StyledContainer
			{...{ $maxWidth, $padding, $centered, className }}
			{...rest}
		>
			{children}
		</StyledContainer>
	);
};
