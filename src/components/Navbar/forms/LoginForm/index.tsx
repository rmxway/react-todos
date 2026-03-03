import {
	ErrorForm,
	FormBlock,
	Label,
} from '@/components/Navbar/forms/NavbarForms';
import { item, mainVariant } from '@/styles/animations';
import { Div, Input, MotionButton } from '@/styles/base';
import { Formik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
	login: Yup.string()
		.min(3, 'Логин должен быть не короче 3 символов')
		.max(50, 'Длинный логин')
		.required('Обязательно для ввода'),
	password: Yup.string()
		.min(5, 'Пароль должен быть не меннее из 5 символов')
		.required('Обязательно для ввода'),
});

interface LoginFormProps {
	onSubmit: (values: { login: string; password: string }) => void;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
	return (
		<motion.div variants={item}>
			<Formik
				initialValues={{
					login: '',
					password: '',
				}}
				validationSchema={LoginSchema}
				onSubmit={(values, { resetForm }) => {
					onSubmit(values);
					resetForm({});
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
							<Div variants={item} key="login">
								<Label htmlFor="login">Логин *</Label>
								<Input
									autoComplete="off"
									name="login"
									id="login"
									placeholder="Введите логин"
									value={values.login}
									onChange={handleChange}
									onBlur={handleBlur}
									$error={!!(errors.login && touched.login)}
								/>

								{errors.login && touched.login ? (
									<ErrorForm>{errors.login}</ErrorForm>
								) : null}
							</Div>
							<Div variants={item} key="password">
								<Label htmlFor="password">Пароль *</Label>
								<Input
									autoComplete="off"
									name="password"
									type="password"
									id="password"
									placeholder="Введите пароль"
									value={values.password}
									onChange={handleChange}
									onBlur={handleBlur}
									$error={
										!!(errors.password && touched.password)
									}
								/>

								{errors.password && touched.password ? (
									<ErrorForm>{errors.password}</ErrorForm>
								) : null}
							</Div>
							<Div variants={item} key="button">
								<MotionButton
									disabled={!isValid || !dirty}
									layout
									type="submit"
								>
									Войти
								</MotionButton>
							</Div>
							<Div comment variants={item} key="comment">
								* - обязательное поле
							</Div>
						</AnimatePresence>
					</FormBlock>
				)}
			</Formik>
		</motion.div>
	);
};
