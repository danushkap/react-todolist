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

const App = () => {

    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('')
    const [search, setSearch] = useState('')
    const [apiError, setApiError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getItems = async () => {
        }
        getItems();
    }, [])

    const addItem = async (item) => {
    }

    const handleCheck = async (id) => {
    }

    const handleDelete = async (id) => {
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newItem) return;
        addItem(newItem);
        setNewItem('');
    }

    return (
        <Routes>
            <Route path='/' element={<Layout length={items.length} />}>
                <Route index element={
                    <main>
                        <AddItem
                            newItem={newItem}
                            setNewItem={setNewItem}
                            handleSubmit={handleSubmit}
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
                                handleCheck={handleCheck}
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
