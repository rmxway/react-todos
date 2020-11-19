import styled from 'styled-components';
import { breakpoints } from 'styles/sc/media';
import { darken } from 'polished';
import { Container } from 'styles/sc/base';
import { motion } from 'framer-motion';

export const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: ${(props) => props.theme.z.menu};
    background-color: ${(props) => props.theme.primary};
    padding: 10px 0;
    box-shadow: 0 5px 30px #fff4;
    transition: ${(props) => props.theme.transitions.default};

    ${Container} {
        width: auto;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    img {
        height: 35px;
        max-height: 100%;
        max-width: 100%;
        margin-right: 20px;
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
            margin: 0 15px;

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
        margin-right: auto;
    `}
`;

export const MobileMenu = styled(motion.div)`
    flex-grow: 1;
    position: absolute;
    background-color: ${({ theme }) => darken(0.05, theme.bg)};
    top: 45px;
    box-shadow: 0 10px 10px #0004;
    left: 10px;
    right: 10px;
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
                border-bottom: 2px solid white;
            }
        }
    }
`;
