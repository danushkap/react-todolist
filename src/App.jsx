import React from 'react'
import { useState } from 'react';
import Header from './Header';
import ItemList from './ItemList';
import Footer from './Footer';

const App = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      checked: true,
      item: "One half pound bag of Cocoa Covered Almonds Unsalted"
    },
    {
      id: 2,
      checked: false,
      item: "Item 2"
    },
    {
      id: 3,
      checked: false,
      item: "Item 3"
    }
  ]);

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

  return (
    <div className="App">
      <Header />
      <ItemList
        items={items}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </div>
  )
}

export default App
