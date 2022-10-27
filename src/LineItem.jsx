import React from 'react'
import { Link } from 'react-router-dom'
import { FaTrashAlt } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';
import apiClient from './api/apiClient';

const LineItem = ({ item, items, setItems, setIsLoading, setApiError, handleDelete }) => {

    const handleCheck = async (id) => {
        const listItems = items.map((item) => {
            return item.id === id
                ? { ...item, checked: !item.checked }
                : item
        });
        const myItem = listItems.filter((item) => item.id === id)[0];

        setIsLoading(true)
        try {
            const _ = await apiClient.patch(`/items/${id}`, myItem);
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
        <li className="item">
            <input
                type="checkbox"
                onChange={() => handleCheck(item.id)}
                checked={item.checked}
            />
            <label
                style={(item.checked) ? { textDecoration: 'line-through' } : null}
                onClick={() => handleCheck(item.id)}
            >{item.item}</label>
            <Link to={`edit/${item.id}`} state={{ item: item }}>
                <FaPen />
            </Link>
            <FaTrashAlt
                onClick={() => handleDelete(item.id)}
                role="button"
                tabIndex="0"
            />
        </li>
    )
}

export default LineItem
