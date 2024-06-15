import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/globalContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../bd/supaBase';

export const Users = () => {
    const { token, isAdmin } = useGlobalContext();
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin) {
            navigate('/');
            return;
        }
        fetchUsers();
    }, [isAdmin, navigate]);

    const fetchUsers = async () => {
      try {
          let { data, error } = await supabase
              .from('Profiles')
              .select('*')
              .neq('email', 'henareshidalgoruben@fpllefia.com'); // Excluir el usuario con el correo específico
          if (error) throw error;
          setUsers(data);
      } catch (error) {
          console.error("Error fetching users:", error);
      }
  };

    const handleDeleteUser = async (userId) => {
        try {
            let { error } = await supabase
                .from('Profiles')
                .delete()
                .eq('id', userId);
            if (error) throw error;
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleEditUser = async (userId, updatedUser) => {
        try {
            let { error } = await supabase
                .from('Profiles')
                .update(updatedUser)
                .eq('id', userId);
            if (error) throw error;
            setUsers(users.map(user => user.id === userId ? { ...user, ...updatedUser } : user));

            // Si el usuario actualizó su propio rol, refrescar el contexto global
            const session = supabase.auth.session();
            if (session && session.user.id === userId) {
                fetchUserRole(userId);
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const fetchUserRole = async (userId) => {
        const { data, error } = await supabase
            .from('Profiles')
            .select('role')
            .eq('id', userId)
            .single();
        if (data) {
            setIsAdmin(data.role === 'admin');
        } else if (error) {
            console.error('Error fetching user role:', error);
        }
    };

    if (!isAdmin) return null;

    return (
        <div className="container mx-auto py-6">
            <h2 className="text-2xl font-bold mb-4">User Management</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Name</th>
                        <th className="py-2">Role</th>
                        <th className="py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="py-2">
                                <input 
                                    type="text" 
                                    value={user.name_user} // Asegúrate de usar name_user
                                    onChange={(e) => handleEditUser(user.id, { name_user: e.target.value })} 
                                />
                            </td>
                            <td className="py-2">
                                <select 
                                    value={user.role} 
                                    onChange={(e) => handleEditUser(user.id, { role: e.target.value })}>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </td>
                            <td className="py-2">
                                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};