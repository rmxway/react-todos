import React from 'react';

const ColorItem = ({ name }) => {
    return <div className={`box box-${name}`} title={name} />;
};

export const Colors = () => {
    const colors = [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
    ];
    return (
        <div className="box__wrapper">
            {colors.map((color, idx) => (
                <ColorItem name={color} key={idx} />
            ))}
        </div>
    );
};
