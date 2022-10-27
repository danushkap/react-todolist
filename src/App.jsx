import React from 'react'
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import EditItem from './EditItem';
import About from './About';
import Missing from './Missing';
import apiClient from './api/apiClient';

const App = () => {

    const [items, setItems] = useState([]);
    const [apiError, setApiError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

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
                    <Home
                        items={items}
                        setItems={setItems}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        apiError={apiError}
                        setApiError={setApiError}
                        handleDelete={handleDelete}
                    />}
                />
                <Route path='edit/:id' element={<EditItem handleDelete={handleDelete} />} />
                <Route path="about" element={<About />} />
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    )
}

export default App
