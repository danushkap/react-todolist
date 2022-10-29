import React from 'react'
import { Link } from 'react-router-dom'
import { FaTrashAlt } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';
import { useStoreActions } from 'easy-peasy';

const LineItem = ({ item }) => {
    const editItem = useStoreActions((actions) => actions.items.editItem);
    const deleteItem = useStoreActions((actions) => actions.items.deleteItem);

    const handleCheck = () => {
        item.checked = !item.checked
        editItem(item)
    }

    return (
        <li className="item">
            <input
                type="checkbox"
                onChange={handleCheck}
                checked={item.checked}
            />
            <label
                style={(item.checked) ? { textDecoration: 'line-through' } : null}
                onClick={handleCheck}
            >{item.item}</label>
            <Link to={`edit/${item.id}`} state={{ item: item }}>
                <FaPen />
            </Link>
            <FaTrashAlt
                onClick={() => deleteItem(item.id)}
                role="button"
                tabIndex="0"
            />
        </li>
    )
}

export default LineItem
