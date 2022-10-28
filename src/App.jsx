import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import EditItem from './EditItem';
import About from './About';
import Missing from './Missing';

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='edit/:id' element={<EditItem />} />
                <Route path="about" element={<About />} />
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    )
}

export default App
