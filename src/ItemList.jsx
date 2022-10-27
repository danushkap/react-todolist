import React from 'react'
import LineItem from './LineItem';

const ItemList = ({ items, setItems, setIsLoading, setApiError, handleDelete }) => {
    return (
        items.length ? (
            <ul>
                {items.map((item) => (
                    <LineItem
                        key={item.id}
                        item={item}
                        items={items}
                        setItems={setItems}
                        setIsLoading={setIsLoading}
                        setApiError={setApiError}
                        handleDelete={handleDelete}
                    />
                ))}
            </ul>
        ) : (
            <p style={{ marginTop: '2rem' }}>Your list is empty.</p>
        )
    )
}

export default ItemList
