import React from 'react'
import { useState } from 'react';
import Header from './Header';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import ItemList from './ItemList';
import Footer from './Footer';

const App = () => {
    const [items, setItems] = useState(JSON.parse(localStorage.getItem('todo-list')) ?? []);
    const [newItem, setNewItem] = useState('')
    const [search, setSearch] = useState('')

    const setAndSaveItems = (newItems) => {
        setItems(newItems);
        localStorage.setItem('todo-list', JSON.stringify(newItems));
    }

    const addItem = (item) => {
        const id = items.length ? items[items.length - 1].id + 1 : 1;
        const myNewItem = { id, checked: false, item };
        const listItems = [...items, myNewItem];
        setAndSaveItems(listItems);
    }

    const handleCheck = (id) => {
        const listItems = items.map((item) => {
            return item.id === id
                ? { ...item, checked: !item.checked }
                : item
        });
        setAndSaveItems(listItems);
    }

    const handleDelete = (id) => {
        const listItems = items.filter((item) => {
            return item.id !== id
        });
        setAndSaveItems(listItems);
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
            <AddItem
                newItem={newItem}
                setNewItem={setNewItem}
                handleSubmit={handleSubmit}
            />
            <SearchItem
                search={search}
                setSearch={setSearch}
            />
            <ItemList
                items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
                handleCheck={handleCheck}
                handleDelete={handleDelete}
            />
            <Footer length={items.length} />
        </div>
    )
}

export default App
