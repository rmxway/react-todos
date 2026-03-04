import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
	login: Yup.string()
		.min(3, 'Логин должен быть не короче 3 символов')
		.max(50, 'Длинный логин')
		.required('Обязательно для ввода'),
	password: Yup.string()
		.min(5, 'Пароль должен быть не меннее из 5 символов')
		.required('Обязательно для ввода'),
});
