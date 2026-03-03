import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useId } from 'react';

import { CheckboxSC } from './styled';

interface CheckboxProps {
	checked: boolean;
	onChange: () => void;
}

export const Checkbox = ({ checked, onChange }: CheckboxProps) => {
	const checkName = useId();

	return (
		<CheckboxSC>
			<input
				id={checkName}
				type="checkbox"
				checked={checked}
				onChange={onChange}
			/>
			<FontAwesomeIcon className="checkboxIcon" icon={faCheck} />
			<label htmlFor={checkName} />
		</CheckboxSC>
	);
};
