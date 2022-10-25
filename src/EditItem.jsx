import React from 'react'
import { Link, useParams, useLocation, useHistory } from 'react-router-dom'

const EditItem = ({ handleDelete }) => {
    const { id } = useParams();
    const item = useLocation().state?.item
    const history = useHistory()

    const handleLocalDelete = (id) => {
        handleDelete(id)
        history.push('/')
    }

    return (
        <main className="edit-item">
            {item &&
                <>
                    <h2>{`Item# ${id}`}</h2>
                    <h3>{item.item}</h3>
                    <button onClick={() => handleLocalDelete(item.id)}>Delete Item</button>
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
