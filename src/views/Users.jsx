import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/globalContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../bd/supaBase';

export const Users = () => {
    const { token, isAdmin, fetchUserRole } = useGlobalContext();
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [newName, setNewName] = useState('');
    const [newRole, setNewRole] = useState('');
    const [newCanAccessPaintings, setNewCanAccessPaintings] = useState(false);
    const [newCanAccessSculptures, setNewCanAccessSculptures] = useState(false);
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

    const handleEditUser = (user) => {
        setEditingUser(user.id);
        setNewName(user.name_user);
        setNewRole(user.role);
        setNewCanAccessPaintings(user.can_access_paintings);
        setNewCanAccessSculptures(user.can_access_sculptures);
    };

    const handleSaveUser = async (userId) => {
        try {
            let { error } = await supabase
                .from('Profiles')
                .update({ 
                    name_user: newName, 
                    role: newRole, 
                    can_access_paintings: newCanAccessPaintings, 
                    can_access_sculptures: newCanAccessSculptures 
                })
                .eq('id', userId);
            if (error) throw error;
            setUsers(users.map(user => user.id === userId ? { 
                ...user, 
                name_user: newName, 
                role: newRole, 
                can_access_paintings: newCanAccessPaintings, 
                can_access_sculptures: newCanAccessSculptures 
            } : user));
            setEditingUser(null);
            setNewName('');
            setNewRole('');
            setNewCanAccessPaintings(false);
            setNewCanAccessSculptures(false);

            const session = supabase.auth.session();
            if (session && session.user.id === userId) {
                fetchUserRole(session.user.email);
            }
        } catch (error) {
            console.error("Error updating user:", error);
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
                        <th className="py-2">Can Access Paintings</th>
                        <th className="py-2">Can Access Sculptures</th>
                        <th className="py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="py-2">
                                {editingUser === user.id ? (
                                    <input 
                                        type="text" 
                                        value={newName} 
                                        onChange={(e) => setNewName(e.target.value)} 
                                    />
                                ) : (
                                    user.name_user
                                )}
                            </td>
                            <td className="py-2">
                                {editingUser === user.id ? (
                                    <select 
                                        value={newRole} 
                                        onChange={(e) => setNewRole(e.target.value)}
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                ) : (
                                    user.role
                                )}
                            </td>
                            <td className="py-2">
                                {editingUser === user.id ? (
                                    <input 
                                        type="checkbox" 
                                        checked={newCanAccessPaintings} 
                                        onChange={(e) => setNewCanAccessPaintings(e.target.checked)} 
                                    />
                                ) : (
                                    user.can_access_paintings ? 'Yes' : 'No'
                                )}
                            </td>
                            <td className="py-2">
                                {editingUser === user.id ? (
                                    <input 
                                        type="checkbox" 
                                        checked={newCanAccessSculptures} 
                                        onChange={(e) => setNewCanAccessSculptures(e.target.checked)} 
                                    />
                                ) : (
                                    user.can_access_sculptures ? 'Yes' : 'No'
                                )}
                            </td>
                            <td className="py-2">
                                {editingUser === user.id ? (
                                    <button onClick={() => handleSaveUser(user.id)}>Save</button>
                                ) : (
                                    <>
                                        <button onClick={() => handleEditUser(user)}>Edit</button>
                                        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};