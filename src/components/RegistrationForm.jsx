import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { motion, AnimatePresence } from 'framer-motion';
import { item, fadein, mainVariant } from '../styles/animations';
import styled from 'styled-components';
import { Input, MotionButton, Div } from '../styles/sc/base';

const FormBlock = styled(motion.form)`
    max-width: 400px;

    ${MotionButton} {
        width: 100%;
        margin-top: 10px;
    }

    ${Input} {
        padding: 10px;
        margin-bottom: 10px;
        font-size: 12px;
    }
`;

const stringPattern = RegExp(/^[а-яА-ЯёЁ a-zA-Z]+$/);

const Label = styled(motion.label)`
    position: relative;
    left: 2px;
    margin-bottom: 5px;
    font-size: 10px;
    opacity: 0.7;
    text-transform: uppercase;
`;

const ErrorForm = styled(motion.div).attrs(() => ({
    variants: fadein,
    initial: 'hidden',
    animate: 'visible',
    exit: 'exit',
}))`
    color: ${(props) => props.theme.colors.danger};

    margin: -5px 0 5px;
    font-size: 11px;
`;

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

export const RegistrationForm = () => {
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
                onSubmit={(values) => console.log(values)}
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
                                <Label htmlFor="name">Введите ваше имя *</Label>
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
                                <Label htmlFor="login">Введите логин *</Label>
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
                                <Label htmlFor="password">
                                    Введите пароль *
                                </Label>
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
                                    Введите пароль еще раз *
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
                                    disabled={isValid && !dirty}
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
