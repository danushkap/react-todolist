import React from 'react'
import { useState, useRef } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useStoreActions } from 'easy-peasy';

const AddItem = () => {
    const [newItem, setNewItem] = useState('')
    const inputRef = useRef();
    const addItem = useStoreActions((actions) => actions.items.addItem);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newItem) return;
        addItem(newItem);
        setNewItem('');
    }

    return (
        <form className='addForm' onSubmit={handleSubmit}>
            <label htmlFor='addItem'>Add Item</label>
            <input
                autoFocus
                ref={inputRef}
                id='addItem'
                type='text'
                placeholder='Add Item'
                required
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
            />
            <button
                type='submit'
                aria-label='Add Item'
                onClick={() => inputRef.current.focus()}
            >
                <FaPlus />
            </button>
        </form>
    )
}

export default AddItem
