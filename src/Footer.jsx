import React from 'react'
import { useContext } from "react";
import ItemContext from './context/DataProvider'

const Footer = () => {
    const { items } = useContext(ItemContext);

    return (
        <footer>
            <p>{items.length} List {items.length === 1 ? "item" : "items"}</p>
        </footer>
    )
}

export default Footer
