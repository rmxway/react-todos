import React from 'react';

export const Form = () => {
    return (
        <form>
            <div className='form-group'>
                <input
                    type='text'
                    placeholder='Введите название задачи'
                    className='form-control'
                />
            </div>
        </form>
    );
};
