import styled, { css } from 'styled-components';

export const ErrorFallbackWrapper = styled.div`
	${({ theme }) => css`
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 40px 20px;
		text-align: center;
		color: ${theme.textColor};
		background-color: ${theme.bg};
	`}
`;

export const ErrorTitle = styled.h2`
	${({ theme }) => css`
		margin-bottom: 16px;
		font-size: 20px;
		color: ${theme.textColor};
	`}
`;

export const ErrorMessage = styled.p`
	${({ theme }) => css`
		margin-bottom: 24px;
		font-size: 14px;
		color: ${theme.textColor};
		opacity: 0.8;
	`}
`;
