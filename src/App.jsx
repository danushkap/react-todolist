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
import apiRequest from './apiRequest';

const App = () => {
    const API_URL = 'http://localhost:3500/items'

    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('')
    const [search, setSearch] = useState('')
    const [apiError, setApiError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getItems = async () => {
            const apiOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const [response, err] = await apiRequest(API_URL, apiOptions)
            if (err) {
                setApiError(err)
            }
            else {
                const listItems = await response.json()
                setItems(listItems)
                setApiError(null)
                setIsLoading(false)
            }
        }
        getItems();
    }, [])

    const addItem = async (item) => {
        const id = items.length ? items[items.length - 1].id + 1 : 1;
        const myNewItem = { id, checked: false, item };
        const listItems = [...items, myNewItem];
        setItems(listItems);

        const apiOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(myNewItem)
        }
        const [_, err] = await apiRequest(API_URL, apiOptions);
        if (err) setApiError(err);
    }

    const handleCheck = async (id) => {
        const listItems = items.map((item) => {
            return item.id === id
                ? { ...item, checked: !item.checked }
                : item
        });
        setItems(listItems);

        const myItem = listItems.filter((item) => item.id === id)[0];
        const apiOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ checked: myItem.checked })
        };
        const reqUrl = `${API_URL}/${id}`;
        const [_, err] = await apiRequest(reqUrl, apiOptions);
        if (err) setApiError(err);
    }

    const handleDelete = async (id) => {
        const listItems = items.filter((item) => {
            return item.id !== id
        });
        setItems(listItems);

        const apiOptions = { method: 'DELETE' };
        const reqUrl = `${API_URL}/${id}`;
        const [_, err] = await apiRequest(reqUrl, apiOptions);
        if (err) setApiError(err);
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
