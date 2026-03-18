import * as Yup from 'yup';

export const NoteFormSchema = Yup.object().shape({
	title: Yup.string()
		.trim()
		.min(3, 'Введите название заметки')
		.max(200, 'Заголовок не более 200 символов'),
});
