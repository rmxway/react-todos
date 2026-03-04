import type { ButtonProps } from './styled';
import { StyledButton } from './styled';

export type { ButtonProps } from './styled';

export const Button = ({
	$variant,
	$size = 'medium',
	$disabled = false,
	type = 'button',
	onClick,
	children,
	className,
	variants,
}: ButtonProps) => {
	return (
		<StyledButton
			{...{
				$variant,
				$size,
				$disabled,
				variants,
				type,
				onClick,
				className,
			}}
			disabled={$disabled}
		>
			{children}
		</StyledButton>
	);
};
