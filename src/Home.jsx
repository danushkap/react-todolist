import React from 'react'
import { useState, useEffect } from 'react';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import ItemList from './ItemList';
import apiClient from './api/apiClient';

function Home({ items, setItems, isLoading, setIsLoading, apiError, setApiError, handleDelete }) {
    const [search, setSearch] = useState('')

    useEffect(() => {
        const getItems = async () => {
            setIsLoading(true)
            try {
                const response = await apiClient.get('/items');
                setItems(response.data)
                setApiError(null)
            } catch (err) {
                setApiError(`Error: ${err.message}`)
            }
            finally {
                setIsLoading(false)
            }
        }
        getItems();
    }, [])

    return (
        <main>
            <AddItem
                items={items}
                setItems={setItems}
                setIsLoading={setIsLoading}
                setApiError={setApiError}
            />
            <SearchItem
                search={search}
                setSearch={setSearch}
            />
            {isLoading && <p>Loading Items...</p>}
            {apiError && <p style={{ color: 'red' }}>{`Error: ${apiError.message}`}</p>}
            {!apiError && !isLoading &&
                <ItemList
                    items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
                    setItems={setItems}
                    setIsLoading={setIsLoading}
                    setApiError={setApiError}
                    handleDelete={handleDelete}
                />}
        </main>
    )
}

export default Home
