import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import { Home } from './views/Home';
import { Sculptures } from './views/Sculptures';
import { Paintings } from './views/Paintings';
import { Users } from './views/Users';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { Footer } from './components/Footer';
import { useGlobalContext } from './context/GlobalContext';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const { isAdmin } = useGlobalContext();
    return isAdmin ? children : <Navigate to="/" />;
};

export default function App() {
    return (
        <div className="dark:bg-blue-gray-900 min-h-screen">
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/sculptures' element={<Sculptures />} />
                <Route path='/paintings' element={<Paintings />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signUp' element={<SignUp />} />
                <Route path='/users' element={<AdminRoute><Users /></AdminRoute>} />
            </Routes>
            <Footer />
        </div>
    );
}