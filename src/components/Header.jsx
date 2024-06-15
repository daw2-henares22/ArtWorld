import { useTranslation } from "react-i18next";
import { ImContrast } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { LanguageToggleButton } from "./LanguageToggleButton";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { Button } from "@material-tailwind/react";
import { useGlobalContext } from '../context/globalContext';

export const Header = () => {
  const { t } = useTranslation();
  const { token, setToken, isAdmin } = useGlobalContext();
  let navigate = useNavigate();

  function changeDarkMode() {
    document.documentElement.classList.toggle('dark');
  }

  function handleLogout() {
    setToken(null);
    navigate('/');
  }

  return (
    <div className="sm:text-xl dark:bg-white bg-blue-gray-900 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white dark:text-blue-gray-800 font-bold"><Link to="/">ArtWorld</Link></div>
        {token && token.user && token.user.user_metadata && (
          <div className="text-white dark:text-blue-gray-800 font-bold">{t('Welcome')} {token.user.user_metadata.name}</div>
        )}
        <nav>
          <ul className="flex space-x-6 font-semibold">
            <button onClick={changeDarkMode} className="h-7 w-7 bg-white dark:bg-blue-gray-800 rounded-md shadow-lg" aria-hidden="true">
              <ImContrast className='w-full dark:text-white text-blue-gray-800' />
            </button>
            <li><Link to="/" className="text-white dark:text-blue-gray-800 dark:hover:text-blue-gray-400 hover:text-blue-gray-400 hover:scale-x-105 hover:scale-y-105 transition duration-150 underline underline-offset-4 shadow-xl hover:shadow-lg">{t('Home')}</Link></li>
            {token && (
              <>
                <li><Link to="/sculptures" className="text-white dark:text-blue-gray-800 dark:hover:text-blue-gray-400 hover:text-blue-gray-400 hover:scale-x-105 hover:scale-y-105 transition duration-150 shadow-lg hover:shadow-xl hover:shadow-white/50 shadow-white/50 dark:hover:shadow-blue-gray-800/50 dark:shadow-blue-gray-800/50">{t('Sculptures')}</Link></li>
                <li><Link to="/paintings" className="text-white dark:text-blue-gray-800 dark:hover:text-blue-gray-400 hover:text-blue-gray-400 hover:scale-x-105 hover:scale-y-105 transition duration-150 shadow-lg hover:shadow-xl hover:shadow-white/50 shadow-white/50 dark:hover:shadow-blue-gray-800/50 dark:shadow-blue-gray-800/50">{t('Paintings')}</Link></li>
                {isAdmin && (
                  <li><Link to="/users" className="text-white dark:text-blue-gray-800 dark:hover:text-blue-gray-400 hover:text-blue-gray-400 hover:scale-x-105 hover:scale-y-105 transition duration-150 shadow-lg hover:shadow-xl hover:shadow-white/50 shadow-white/50 dark:hover:shadow-blue-gray-800/50 dark:shadow-blue-gray-800/50">{t('Users')}</Link></li>
                )}
              </>
            )}
            <li><LanguageToggleButton /></li>
            {!token && (
              <>
                <li><SignUp /></li>
                <li><Login /></li>
              </>
            )}
            {token && (
              <li><Button onClick={handleLogout}>Logout</Button></li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};