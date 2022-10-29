import React from 'react'
import { useStoreState } from 'easy-peasy';

const Footer = () => {
    const length = useStoreState((state) => state.items.itemCount);

    return (
        <footer>
            <p>{length} List {length === 1 ? "item" : "items"}</p>
        </footer>
    )
}

export default Footer
