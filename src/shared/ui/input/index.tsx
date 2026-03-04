import { HelperText, InputWrapper, Label, StyledInput } from './styled';

export interface InputProps {
	type?: 'text' | 'password' | 'email';
	value?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	placeholder?: string;
	name?: string;
	id?: string;
	autoComplete?: string;
	error?: boolean;
	label?: string;
	helperText?: string;
	className?: string;
}

export const Input = ({
	type = 'text',
	value,
	onChange,
	onBlur,
	placeholder,
	name,
	id,
	autoComplete,
	error = false,
	label,
	helperText,
	className,
}: InputProps) => {
	return (
		<InputWrapper {...{ className }}>
			{label && <Label htmlFor={id}>{label}</Label>}
			<StyledInput
				{...{
					type,
					value,
					onChange,
					onBlur,
					placeholder,
					name,
					id,
					autoComplete,
				}}
				$error={error}
			/>
			{helperText && <HelperText>{helperText}</HelperText>}
		</InputWrapper>
	);
};
