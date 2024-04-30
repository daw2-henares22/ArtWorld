import { Link } from "react-router-dom";

export function Header(){
    return(
        <div className="bg-gray-800 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-xl"><Link to="/">ArtWorld</Link></div>
                <nav>
                    <ul className="flex space-x-6 text-white">
                        <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
                        <li><Link to="/sculptures" className="hover:text-gray-300">Sculptures</Link></li>
                        <li><Link to="/paintings" className="hover:text-gray-300">Paintings</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}