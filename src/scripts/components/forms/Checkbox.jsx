import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const CheckboxSC = styled.div`
    position: relative;

    .checkboxIcon {
        position: absolute;
        top: 4px;
        font-size: 11px;
        color: ${(props) => props.theme.textColor};
        left: 14px;
        pointer-events: none;
        transition: 0.2s;
        opacity: 0;
    }

    input {
        display: none;
    }

    input ~ label {
        display: block;
        margin: 0 10px;
        border-radius: 40px;
        width: 20px;
        height: 20px;
        cursor: pointer;
        border: 1px solid ${(props) => props.theme.borderColor};
    }

    input:checked + .checkboxIcon {
        opacity: 1;
    }
`;

export const Checkbox = ({ checked, onChange }) => {
    const checkName = Date.now();
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
