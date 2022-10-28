import React from 'react'
import { createContext, useState } from 'react';
import apiClient from '../api/apiClient';

const ItemContext = createContext({});

export const DataProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [apiError, setApiError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const deleteItem = async (id) => {
        const listItems = items.filter((item) => {
            return item.id !== id
        });

        setIsLoading(true)
        try {
            const _ = await apiClient.delete(`/items/${id}`);
            setItems(listItems)
            setApiError(null)
        } catch (err) {
            setApiError(`Error: ${err.message}`)
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <ItemContext.Provider value={{
            items, setItems,
            isLoading, setIsLoading,
            apiError, setApiError,
            deleteItem
        }}>
            {children}
        </ItemContext.Provider>
    )
}

export default ItemContext
