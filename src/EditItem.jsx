import React from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useStoreActions } from 'easy-peasy';

const EditItem = () => {
    const { id } = useParams();
    const item = useLocation().state?.item
    const navigate = useNavigate()
    const deleteItem = useStoreActions((actions) => actions.items.deleteItem);

    const handleDelete = (id) => {
        deleteItem(id)
        navigate('/')
    }

    return (
        <main className="edit-item">
            {item &&
                <>
                    <h2>{`Item# ${id}`}</h2>
                    <h3>{item.item}</h3>
                    <button onClick={() => handleDelete(item.id)}>Delete Item</button>
                </>
            }
            {!item &&
                <h2>Item Not Found</h2>
            }
            <p>
                <Link to='/'>Back</Link>
            </p>
        </main>
    )
}

export default EditItem
