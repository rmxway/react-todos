import styled from 'styled-components';
import { breakpoints } from 'styles/sc/media';
import { darken } from 'polished';
<<<<<<< HEAD
import { Container } from 'styles/sc/base';
=======
import { Container, MotionButton } from 'styles/sc/base';
>>>>>>> 6d1c2a99aecc7a2a06d8ab6a513df2ecff646d1d
import { motion } from 'framer-motion';

export const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
<<<<<<< HEAD
    z-index: ${(props) => props.theme.z.menu};
    background-color: ${(props) => props.theme.primary};
    padding: 10px 0;
=======
    min-height: 60px;
    z-index: ${(props) => props.theme.z.menu};
    background-color: ${(props) => props.theme.primary};
    padding: 10px 0;
    display: flex;
    align-items: center;
>>>>>>> 6d1c2a99aecc7a2a06d8ab6a513df2ecff646d1d
    box-shadow: 0 5px 30px #fff4;
    transition: ${(props) => props.theme.transitions.default};

    ${Container} {
<<<<<<< HEAD
        width: auto;
=======
>>>>>>> 6d1c2a99aecc7a2a06d8ab6a513df2ecff646d1d
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

<<<<<<< HEAD
    img {
        height: 35px;
        max-height: 100%;
        max-width: 100%;
        margin-right: 20px;
=======
    ${MotionButton} {
        ${breakpoints.lessThan('sm')`
            margin-right: auto;
        `}
    }

    .logo {
        height: 35px;
        max-height: 100%;
        max-width: 100%;
        margin-right: 15px;

        ${breakpoints.lessThan('sm')`
            display: none;
        `}
>>>>>>> 6d1c2a99aecc7a2a06d8ab6a513df2ecff646d1d
    }

    .desktop-menu {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        flex-grow: 1;

        ${breakpoints.lessThan('sm')`
            display: none;
        `}

        li {
            position: relative;
            display: block;
            margin: 0;
<<<<<<< HEAD
            margin: 0 15px;
=======
            margin: 0 10px;
>>>>>>> 6d1c2a99aecc7a2a06d8ab6a513df2ecff646d1d

            a {
                display: block;
                color: #fff;
                font-weight: 600;
                opacity: 0.6;
                transition: 0.2s;
                height: 100%;
                padding: 5px 0 8px;
                text-decoration: none;

                &.active {
                    opacity: 1;
                }

                &:hover {
                    text-decoration: none;
                }
            }

            .underline {
                width: 100%;
                height: 3px;
                border-radius: 4px;
                background: #fff;
                position: absolute;
                bottom: 0px;
            }
        }
    }
`;

export const MenuButton = styled(motion.button)`
    display: none;

    width: 35px;
    height: 22px;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;

    span {
        display: inline-block;
        height: 2px;
        width: 100%;
        border-radius: 5px;
        background-color: white;
    }

    ${breakpoints.lessThan('sm')`
        display: flex;        
        flex-direction: column;
        justify-content: space-between;
<<<<<<< HEAD
        margin-right: auto;
=======
        margin-right: 15px;
>>>>>>> 6d1c2a99aecc7a2a06d8ab6a513df2ecff646d1d
    `}
`;

export const MobileMenu = styled(motion.div)`
    flex-grow: 1;
    position: absolute;
    background-color: ${({ theme }) => darken(0.05, theme.bg)};
    top: 45px;
    box-shadow: 0 10px 10px #0004;
<<<<<<< HEAD
    left: 10px;
    right: 10px;
=======
    left: 0;
    min-width: 300px;
>>>>>>> 6d1c2a99aecc7a2a06d8ab6a513df2ecff646d1d
    padding: 20px;
    z-index: 100;

    .mobile-menu {
        list-style: none;
        margin: 0;
        padding: 0;
        font-size: 16px;

        li {
            margin: 10px 0;
        }

        a {
            text-decoration: none;
            color: ${({ theme }) => theme.textColor};

            &.active {
<<<<<<< HEAD
                border-bottom: 2px solid white;
=======
                font-weight: 900;
                color: ${(props) => props.theme.primary};
>>>>>>> 6d1c2a99aecc7a2a06d8ab6a513df2ecff646d1d
            }
        }
    }
`;
