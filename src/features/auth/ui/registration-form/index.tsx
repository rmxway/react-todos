import { Formik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { item, mainVariant } from '@/shared/lib/animations';
import { Button, ErrorMessage, Input } from '@/shared/ui';

import { RegistrationSchema } from './schema';
import { Comment, FieldWrapper, FormBlock } from './styled';

interface RegistrationFormProps {
	onSubmit: (values: {
		name: string;
		login: string;
		password: string;
		repassword?: string;
		id?: number;
	}) => void | Promise<void>;
}

export const RegistrationForm = ({ onSubmit }: RegistrationFormProps) => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	return (
		<motion.div variants={item}>
			<Formik
				initialValues={{
					name: '',
					login: '',
					password: '',
					repassword: '',
				}}
				validationSchema={RegistrationSchema}
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
							<FieldWrapper variants={item} key="name">
								<Input
									label="Имя *"
									autoComplete="off"
									name="name"
									id="name"
									placeholder="Введите ваше имя"
									value={values.name}
									onChange={handleChange}
									onBlur={handleBlur}
									error={!!(errors.name && touched.name)}
								/>
								{errors.name && touched.name && (
									<ErrorMessage>{errors.name}</ErrorMessage>
								)}
							</FieldWrapper>

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
							<FieldWrapper variants={item} key="repassword">
								<Input
									label="Пароль еще раз *"
									autoComplete="off"
									name="repassword"
									type="password"
									id="repassword"
									placeholder="Введите пароль еще раз"
									value={values.repassword}
									onChange={handleChange}
									onBlur={handleBlur}
									error={
										!!(
											errors.repassword &&
											touched.repassword
										)
									}
								/>
								{errors.repassword && touched.repassword && (
									<ErrorMessage>
										{errors.repassword}
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
									{isSubmitting
										? 'Отправка...'
										: 'Регистрация'}
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
