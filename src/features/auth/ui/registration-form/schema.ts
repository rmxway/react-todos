import * as Yup from 'yup';

const stringPattern = /^[а-яА-ЯёЁ a-zA-Z]+$/;

export const RegistrationSchema = Yup.object().shape({
	name: Yup.string()
		.matches(stringPattern, 'Недопустимый символ')
		.max(50, 'Длинное имя')
		.required('Обязательно для ввода'),
	login: Yup.string()
		.min(3, 'Логин должен быть не короче 3 символов')
		.max(50, 'Длинный логин')
		.required('Обязательно для ввода'),
	password: Yup.string()
		.min(5, 'Пароль должен быть не меннее из 5 символов')
		.required('Обязательно для ввода'),
	repassword: Yup.string()
		.min(5, 'Пароль должен быть не меннее из 5 символов')
		.oneOf([Yup.ref('password')], 'Пароли не совпадают')
		.required('Обязательно для ввода'),
});
