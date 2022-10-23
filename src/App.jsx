import React from 'react'
import { useState, useEffect } from 'react';
import Header from './Header';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import ItemList from './ItemList';
import Footer from './Footer';

const App = () => {
    const API_URL = 'http://localhost:3500/items'

    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('')
    const [search, setSearch] = useState('')
    const [apiError, setApiError] = useState(null)

    useEffect(() => {
        const getItems = async () => {
            try {
                const response = await fetch(API_URL)
                if (!response.ok) throw Error('Did not receive expected data')
                const listItems = await response.json()
                setItems(listItems)
                setApiError(null)
            } catch (err) {
                setApiError(err)
            }
        }
        getItems();
    }, [])

    const addItem = (item) => {
        const id = items.length ? items[items.length - 1].id + 1 : 1;
        const myNewItem = { id, checked: false, item };
        const listItems = [...items, myNewItem];
        setItems(listItems);
    }

    const handleCheck = (id) => {
        const listItems = items.map((item) => {
            return item.id === id
                ? { ...item, checked: !item.checked }
                : item
        });
        setItems(listItems);
    }

    const handleDelete = (id) => {
        const listItems = items.filter((item) => {
            return item.id !== id
        });
        setItems(listItems);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newItem) return;
        addItem(newItem);
        setNewItem('');
    }

    return (
        <div className="App">
            <Header />
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
                {apiError && <p style={{ color: 'red' }}>{`Error: ${apiError.message}`}</p>}
                {!apiError &&
                    <ItemList
                        items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
                        handleCheck={handleCheck}
                        handleDelete={handleDelete}
                    />}
            </main>
            <Footer length={items.length} />
        </div>
    )
}

export default App
