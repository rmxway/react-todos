import { forwardRef } from 'react';

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
	disabled?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
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
			disabled = false,
		},
		ref,
	) => {
		return (
			<InputWrapper {...{ className }}>
				{label && <Label htmlFor={id}>{label}</Label>}
				<StyledInput
					ref={ref}
					{...{
						type,
						value,
						onChange,
						onBlur,
						placeholder,
						name,
						id,
						autoComplete,
						disabled,
					}}
					$error={error}
				/>
				{helperText && <HelperText>{helperText}</HelperText>}
			</InputWrapper>
		);
	},
);
