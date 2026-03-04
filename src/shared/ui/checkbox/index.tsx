import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useId } from 'react';

import { CheckboxSC, LabelText } from './styled';

export interface CheckboxProps {
	checked: boolean;
	onChange: () => void;
	label?: string;
	className?: string;
}

export const Checkbox = ({
	checked,
	onChange,
	label,
	className,
}: CheckboxProps) => {
	const checkName = useId();

	return (
		<CheckboxSC {...{ className }}>
			<input id={checkName} type="checkbox" {...{ checked, onChange }} />
			<FontAwesomeIcon className="checkboxIcon" icon={faCheck} />
			<label htmlFor={checkName} />
			{label && <LabelText onClick={onChange}>{label}</LabelText>}
		</CheckboxSC>
	);
};
