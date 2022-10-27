import React from 'react'
import { useState, useRef } from 'react';
import { FaPlus } from 'react-icons/fa';
import apiClient from './api/apiClient';

const AddItem = ({ items, setItems, setIsLoading, setApiError }) => {
    const [newItem, setNewItem] = useState('')
    const inputRef = useRef();

    const addItem = async (item) => {
        const id = items.length ? items[items.length - 1].id + 1 : 1;
        const myNewItem = { id, checked: false, item };

        setIsLoading(true)
        try {
            const response = await apiClient.post('/items', myNewItem);
            const listItems = [...items, response.data];
            setItems(listItems)
            setApiError(null)
        } catch (err) {
            setApiError(`Error: ${err.message}`)
        }
        finally {
            setIsLoading(false)
        }
    }

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
