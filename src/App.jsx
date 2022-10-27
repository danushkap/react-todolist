import React from 'react'
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import ItemList from './ItemList';
import EditItem from './EditItem';
import About from './About';
import Missing from './Missing';
import apiClient from './api/apiClient';

const App = () => {

    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('')
    const [apiError, setApiError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

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

    const handleDelete = async (id) => {
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
        <Routes>
            <Route path='/' element={<Layout length={items.length} />}>
                <Route index element={
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
                    </main>}
                />
                <Route path='edit/:id' element={<EditItem handleDelete={handleDelete} />} />
                <Route path="about" element={<About />} />
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    )
}

export default App
