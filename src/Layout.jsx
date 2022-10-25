import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = ({ length }) => {
    return (
        <div className="App">
            <Header />
            <Nav />
            <Outlet />
            <Footer length={length} />
        </div>
    )
}

export default Layout
