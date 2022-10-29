import React from 'react'
import { useState, useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import ItemList from './ItemList';

function Home() {
    const [search, setSearch] = useState('')

    const items = useStoreState((state) => state.items.items);
    const isLoading = useStoreState((state) => state.items.isLoading);
    const apiError = useStoreState((state) => state.items.apiError);

    const getItems = useStoreActions((actions) => actions.items.getItems);

    useEffect(() => {
        getItems();
    }, [])

    return (
        <main>
            <AddItem />
            <SearchItem
                search={search}
                setSearch={setSearch}
            />
            {isLoading && <p>Loading Items...</p>}
            {apiError && <p style={{ color: 'red' }}>{`Error: ${apiError.message}`}</p>}
            {!apiError && !isLoading &&
                <ItemList
                    items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
                />}
        </main>
    )
}

export default Home
