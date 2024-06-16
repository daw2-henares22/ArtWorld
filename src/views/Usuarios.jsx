<div className="container mx-auto py-6">
    <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Gestión de Usuarios</h2>
    <div className="overflow-x-auto bg-white dark:bg-gray-900 shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
            <thead>
                <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                        Nombre
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                        Rol
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm">
                            <input 
                                type="text" 
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:border-indigo-500" 
                                value={user.name_user}
                                onChange={(e) => handleEditUser(user.id, { name_user: e.target.value })} 
                            />
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm">
                            <select 
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:border-indigo-500" 
                                value={user.role} 
                                onChange={(e) => handleEditUser(user.id, { role: e.target.value })}>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm">
                            <button 
                                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 dark:hover:bg-red-500 focus:outline-none"
                                onClick={() => handleDeleteUser(user.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>












<div className="container mx-auto py-6">
    <h2 className="text-2xl font-bold mb-4 dark:text-white">User Management</h2>
    <div className="shadow overflow-hidden border-b border-gray-200 dark:border-gray-700 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">Role</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {users.map(user => (
                    <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <input 
                                type="text" 
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={user.name_user}
                                onChange={(e) => handleEditUser(user.id, { name_user: e.target.value })} 
                            />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <select 
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={user.role}
                                onChange={(e) => handleEditUser(user.id, { role: e.target.value })}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <button 
                                className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-600"
                                onClick={() => handleDeleteUser(user.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>