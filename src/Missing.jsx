import React from 'react'
import { Link } from 'react-router-dom'

const Missing = () => {
    return (
        <main className="missing">
            <h2>404 Page Not Found</h2>
            <Link to='/'>Back</Link>
        </main>
    )
}

export default Missing
