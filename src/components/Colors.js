import React from 'react';

function ColorItem({ name }) {
    return <div className={`box box-${name}`} />;
}

function Colors() {
    const colors = [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
    ];
    return (
        <div className='box__wrapper'>
            {colors.map((color, idx) => (
                <ColorItem name={color} key={idx} />
            ))}
        </div>
    );
}

export default Colors;
