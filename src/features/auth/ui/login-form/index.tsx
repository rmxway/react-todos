import { Formik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { item, mainVariant } from '@/shared/lib/animations';
import { Button, ErrorMessage, Input } from '@/shared/ui';

import { LoginSchema } from './schema';
import { Comment, FieldWrapper, FormBlock } from './styled';

interface LoginFormProps {
	onSubmit: (values: {
		login: string;
		password: string;
	}) => void | Promise<void>;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	return (
		<motion.div variants={item}>
			<Formik
				initialValues={{
					login: '',
					password: '',
				}}
				validationSchema={LoginSchema}
				onSubmit={async (values, { resetForm }) => {
					setIsSubmitting(true);
					try {
						await onSubmit(values);
						resetForm({});
					} finally {
						setIsSubmitting(false);
					}
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isValid,
					dirty,
				}) => (
					<FormBlock variants={mainVariant} onSubmit={handleSubmit}>
						<AnimatePresence>
							<FieldWrapper variants={item} key="login">
								<Input
									label="Логин *"
									autoComplete="off"
									name="login"
									id="login"
									placeholder="Введите логин"
									value={values.login}
									onChange={handleChange}
									onBlur={handleBlur}
									error={!!(errors.login && touched.login)}
								/>
								{errors.login && touched.login && (
									<ErrorMessage>{errors.login}</ErrorMessage>
								)}
							</FieldWrapper>
							<FieldWrapper variants={item} key="password">
								<Input
									label="Пароль *"
									autoComplete="off"
									name="password"
									type="password"
									id="password"
									placeholder="Введите пароль"
									value={values.password}
									onChange={handleChange}
									onBlur={handleBlur}
									error={
										!!(errors.password && touched.password)
									}
								/>
								{errors.password && touched.password && (
									<ErrorMessage>
										{errors.password}
									</ErrorMessage>
								)}
							</FieldWrapper>
							<FieldWrapper variants={item} key="button">
								<Button
									$disabled={
										!isValid || !dirty || isSubmitting
									}
									type="submit"
								>
									{isSubmitting ? 'Отправка...' : 'Войти'}
								</Button>
							</FieldWrapper>
							<Comment variants={item} key="comment">
								* - обязательное поле
							</Comment>
						</AnimatePresence>
					</FormBlock>
				)}
			</Formik>
		</motion.div>
	);
};
