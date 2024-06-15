import { useEffect, useState } from 'react';
import { supabase } from '../bd/supaBase';
import { useGlobalContext } from '../context/globalContext';
import { Button, Card, CardBody, CardFooter, Typography } from '@material-tailwind/react';

export function Usuarios() {
  const { isAdmin } = useGlobalContext();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase.auth.admin.listUsers();
        if (error) {
          throw error;
        }
        setUsers(data.users);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const { error } = await supabase.auth.admin.deleteUser(userId);
      if (error) {
        throw error;
      }
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  const handleTogglePermission = async (userId, permission) => {
    // Function to update user's permission (can_view_sculptures or can_view_paintings)
    // Currently, Supabase Auth doesn't support custom attributes in the user metadata,
    // You will need to manage permissions in a separate table.
  };

  if (!isAdmin) {
    return <div>Access denied</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      {users.length === 0 ? (
        <div>No users found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map(user => (
            <Card key={user.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col h-full">
              <CardBody className="flex flex-col gap-4">
                <Typography variant="h4" className="dark:text-white">{user.email}</Typography>
                <div className="flex flex-col space-y-2">
                  {/* Add buttons to manage permissions if using a separate table */}
                  {/* <Button onClick={() => handleTogglePermission(user.id, 'can_view_sculptures')}>
                    {user.can_view_sculptures ? 'Revoke Sculptures Access' : 'Grant Sculptures Access'}
                  </Button>
                  <Button onClick={() => handleTogglePermission(user.id, 'can_view_paintings')}>
                    {user.can_view_paintings ? 'Revoke Paintings Access' : 'Grant Paintings Access'}
                  </Button> */}
                </div>
              </CardBody>
              <CardFooter className="pt-0">
                <Button variant="gradient" color="red" onClick={() => handleDeleteUser(user.id)}>
                  Delete User
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}