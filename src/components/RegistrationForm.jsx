import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { motion, AnimatePresence } from 'framer-motion';
import { item, fadein } from '../styles/animations';
import styled from 'styled-components';
import { Input, MotionButton } from '../styles/sc/base';

const FormBlock = styled(motion.form)`
    max-width: 400px;
    margin: 0 auto;
`;

const Label = styled(motion.label)`
    display: block;
`;

const ErrorForm = styled(motion.div).attrs(() => ({
    variants: fadein,
    initial: 'hidden',
    animate: 'visible',
    exit: 'exit',
}))`
    color: ${(props) => props.theme.colors.danger};
    margin: -10px 0 10px;
`;

const RegistrationSchema = Yup.object().shape({
    name: Yup.string().max(50, 'Длинное имя').required('Обязательно для ввода'),
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
        <>
            <motion.div variants={item}>
                <Formik
                    initialValues={{
                        name: '',
                        login: '',
                        password: '',
                        repassword: '',
                    }}
                    validationSchema={RegistrationSchema}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        isValid,
                        dirty,
                    }) => (
                        <FormBlock onSubmit={handleSubmit}>
                            <AnimatePresence>
                                <Label key="labelName" htmlFor="name">
                                    Введите ваше имя:
                                </Label>
                                <Input
                                    autoComplete="off"
                                    name="name"
                                    id="name"
                                    key="inputName"
                                    placeholder="Введите ваше имя"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.name && touched.name}
                                />

                                {errors.name && touched.name ? (
                                    <ErrorForm key="errorName">
                                        {errors.name}
                                    </ErrorForm>
                                ) : null}

                                <Label key="labelLogin" htmlFor="login">
                                    Введите логин:
                                </Label>
                                <Input
                                    autoComplete="off"
                                    name="login"
                                    id="login"
                                    key="inputLogin"
                                    placeholder="Введите логин"
                                    value={values.login}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.login && touched.login}
                                />

                                {errors.login && touched.login ? (
                                    <ErrorForm key="errorLogin">
                                        {errors.login}
                                    </ErrorForm>
                                ) : null}

                                <Label key="labelPassword" htmlFor="password">
                                    Введите пароль:
                                </Label>
                                <Input
                                    autoComplete="off"
                                    name="password"
                                    type="password"
                                    id="password"
                                    key="inputPassword"
                                    placeholder="Введите пароль"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.password && touched.password}
                                />

                                {errors.password && touched.password ? (
                                    <ErrorForm key="errorPassword">
                                        {errors.password}
                                    </ErrorForm>
                                ) : null}

                                <Label
                                    key="labelRePassword"
                                    htmlFor="repassword"
                                >
                                    Введите пароль еще раз:
                                </Label>
                                <Input
                                    autoComplete="off"
                                    name="repassword"
                                    type="password"
                                    id="repassword"
                                    key="inputRePassword"
                                    placeholder="Введите пароль еще раз"
                                    value={values.repassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                        errors.repassword && touched.repassword
                                    }
                                />

                                {errors.repassword && touched.repassword ? (
                                    <ErrorForm key="errorRePassword">
                                        {errors.repassword}
                                    </ErrorForm>
                                ) : null}
                            </AnimatePresence>

                            <MotionButton layout key="button" type="submit">
                                Отправить
                            </MotionButton>
                        </FormBlock>
                    )}
                </Formik>
            </motion.div>
        </>
    );
};
