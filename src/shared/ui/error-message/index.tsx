import { StyledErrorMessage } from './styled';

export interface ErrorMessageProps {
	children?: React.ReactNode;
	className?: string;
}

export const ErrorMessage = ({ children, className }: ErrorMessageProps) => {
	return (
		<StyledErrorMessage {...{ className }}>{children}</StyledErrorMessage>
	);
};
