import React from 'react'
import { Link } from 'react-router-dom'
import { FaTrashAlt } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';

const LineItem = ({ item, handleCheck, handleDelete }) => {
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
