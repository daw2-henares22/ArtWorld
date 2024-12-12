import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../bd/supaBase';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setSession(session);
                fetchUserRole(session.user.email);
            } else {
                setSession(null);
                setIsAdmin(false);
            }
        };

        checkSession();

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setSession(session);
                fetchUserRole(session.user.email);
            } else {
                setSession(null);
                setIsAdmin(false);
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const fetchUserRole = async (userEmail) => {
        if (userEmail === 'henareshidalgoruben@fpllefia.com') {
            setIsAdmin(true);
            return;
        }
        const { data, error } = await supabase
            .from('Profiles')
            .select('role')
            .eq('email', userEmail)
            .single();
        if (data) {
            setIsAdmin(data.role === 'admin');
        } else if (error) {
            console.error('Error fetching user role:', error);
        }
    };

    return (
        <GlobalContext.Provider value={{ session, isAdmin, setSession, setIsAdmin }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);