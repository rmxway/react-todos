import styled, { css, keyframes } from 'styled-components';

const pulse = keyframes`
	0%, 100% {
		opacity: 1;
	}
	50% {
		opacity: 0.5;
	}
`;

export const SkeletonBase = styled.div<{ $width?: string; $height?: string }>`
	${({ theme, $width, $height }) => css`
		background-color: ${theme.borderColor};
		border-radius: ${theme.radius.border};
		animation: ${pulse} 1.5s ease-in-out infinite;
		width: ${$width ?? '100%'};
		height: ${$height ?? '20px'};
	`}
`;
