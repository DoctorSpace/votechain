import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setContactData } from './contactSlice';

const Contract = () => {
    const dispatch = useDispatch()

    dispatch(setContactData({ name: 'John', email: 'john@example.com' }));

    const contact = useSelector(state => state.contact.data);

    return (
        <div>
            
        </div>
    );
};

export default Contract;