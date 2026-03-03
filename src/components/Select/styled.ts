import { breakpoints } from '@/styles/media';
import { motion } from 'framer-motion';
import { darken } from 'polished';
import styled, { css } from 'styled-components';

export const SelectSC = styled(motion.div)<{ noItems?: boolean }>`
	position: relative;
	display: block;
	flex: 1;
	margin: 20px 10px;
	cursor: pointer;

	${(props) =>
		props.noItems &&
		css`
			opacity: 0.4;
			cursor: default;
		`}

	${breakpoints.lessThan('sm')`
        flex: auto;
        width: 45%;
    `}

    .select {
		&-label {
			position: absolute;
			left: 2px;
			top: -20px;
			font-size: 10px;
			font-family: 'Roboto Condensed', sans-serif;
			letter-spacing: 1px;
			opacity: 0.7;
			text-transform: uppercase;
		}
		&-block {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 15px;
			background-color: ${(props) => darken(0.02, props.theme.bg)};
			border-radius: 4px;
			border: 1px solid ${(props) => props.theme.borderColor};
			transition: 0.2s;

			&.open {
				border-color: ${(props) => props.theme.primary};
				.select-icon {
					transform: scale(1, -1);
				}
			}
		}

		&-icon {
			transition: 0.2s;
		}
	}

	ul {
		position: absolute;
		top: calc(100% + 2px);
		left: 0;
		width: 100%;
		max-height: 250px;
		list-style: none;
		padding: 0;
		margin: 0;
		overflow: hidden;
		overflow-y: auto;
		z-index: 1;
		border-radius: 0 0 4px 4px;
		box-shadow: 0 7px 20px #2227;
		background-color: ${(props) => darken(0.05, props.theme.bg)};

		li {
			cursor: pointer;
			padding: 15px;
			border-bottom: 1px solid
				${(props) => darken(0.1, props.theme.borderColor)};
			transition: 0.1s;

			&.selected,
			&.selected:hover {
				background-color: ${(props) => darken(0.1, props.theme.bg)};
			}

			&:last-child {
				border-bottom: none;
			}

			&:hover {
				background-color: ${(props) => props.theme.bg};
			}
		}
	}
`;
