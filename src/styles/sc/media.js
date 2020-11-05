import { generateMedia } from 'styled-media-query';

export const breakpoints = generateMedia({
    xs: '450px',
    sm: '700px',
    md: '1000px',
    lg: '1350px',
});
