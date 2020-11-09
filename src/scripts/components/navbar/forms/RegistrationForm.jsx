import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { motion, AnimatePresence } from 'framer-motion';
import { item, mainVariant } from 'styles/animations';
import { Input, MotionButton, Div } from 'styles/sc/base';
import {
    ErrorForm,
    FormBlock,
    Label,
    stringPattern,
} from 'components/navbar/forms/NavbarForms';

const RegistrationSchema = Yup.object().shape({
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

export const RegistrationForm = ({ onSubmit }) => {
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
                            <Div variants={item} key="name">
                                <Label htmlFor="name">Имя *</Label>
                                <Input
                                    autoComplete="off"
                                    name="name"
                                    id="name"
                                    placeholder="Введите ваше имя"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.name && touched.name}
                                />
                                {errors.name && touched.name ? (
                                    <ErrorForm>{errors.name}</ErrorForm>
                                ) : null}
                            </Div>

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
                                    error={errors.login && touched.login}
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
                                    error={errors.password && touched.password}
                                />

                                {errors.password && touched.password ? (
                                    <ErrorForm>{errors.password}</ErrorForm>
                                ) : null}
                            </Div>
                            <Div variants={item} key="repassword">
                                <Label htmlFor="repassword">
                                    Пароль еще раз *
                                </Label>
                                <Input
                                    autoComplete="off"
                                    name="repassword"
                                    type="password"
                                    id="repassword"
                                    placeholder="Введите пароль еще раз"
                                    value={values.repassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                        errors.repassword && touched.repassword
                                    }
                                />

                                {errors.repassword && touched.repassword ? (
                                    <ErrorForm>{errors.repassword}</ErrorForm>
                                ) : null}
                            </Div>
                            <Div variants={item} key="button">
                                <MotionButton
                                    disabled={!isValid || !dirty}
                                    layout
                                    type="submit"
                                >
                                    Регистрация
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
