import { ImContrast } from "react-icons/im";
import { Link } from "react-router-dom";

export function Header(){
    function changeDarkMode(){
        document.documentElement.classList.toggle('dark')
      }
    return(
        <div className="sm:text-xl dark:bg-white bg-gray-800 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white dark:text-gray-800 font-bold"><Link to="/">ArtWorld</Link></div>
                <nav>
                    <ul className="flex space-x-6 font-semibold">
                        <button onClick={changeDarkMode} className="h-7 w-7 bg-white dark:bg-gray-800 rounded-md shadow-lg" aria-hidden="true">
                            <ImContrast className='w-full dark:text-white text-gray-800'/>
                        </button>
                        <li><Link to="/" className="text-white dark:text-gray-800 dark:hover:text-gray-400 hover:text-gray-400 hover:scale-x-105 hover:scale-y-105 transition duration-150 underline underline-offset-4 shadow-xl hover:shadow-lg">Home</Link></li>
                        <li><Link to="/sculptures" className="text-white dark:text-gray-800 dark:hover:text-gray-400 hover:text-gray-400 hover:scale-x-105 hover:scale-y-105 transition duration-150 shadow-lg hover:shadow-xl hover:shadow-white/50 shadow-white/50 dark:hover:shadow-gray-800/50 dark:shadow-gray-800/50">Sculptures</Link></li>
                        <li><Link to="/paintings" className="text-white dark:text-gray-800 dark:hover:text-gray-400 hover:text-gray-400 hover:scale-x-105 hover:scale-y-105 transition duration-150 shadow-lg hover:shadow-xl hover:shadow-white/50 shadow-white/50 dark:hover:shadow-gray-800/50 dark:shadow-gray-800/50">Paintings</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}