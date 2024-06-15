import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../bd/supaBase';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [canAccessPaintings, setCanAccessPaintings] = useState(false);
    const [canAccessSculptures, setCanAccessSculptures] = useState(false);

    useEffect(() => {
        const session = supabase.auth.getSession();
        if (session?.data?.session) {
            const userEmail = session.data.session.user.email;
            setToken(session.data.session.access_token);
            fetchUserRole(userEmail);
        }

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setToken(session.access_token);
                fetchUserRole(session.user.email);
            } else {
                setToken(null);
                setIsAdmin(false);
                setIsUser(false);
                setCanAccessPaintings(false);
                setCanAccessSculptures(false);
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const fetchUserRole = async (userEmail) => {
        if (userEmail === 'henareshidalgoruben@fpllefia.com') {
            setIsAdmin(true);
            setIsUser(false);
            setCanAccessPaintings(true);
            setCanAccessSculptures(true);
            return;
        }
        const { data, error } = await supabase
            .from('Profiles')
            .select('role, can_access_paintings, can_access_sculptures')
            .eq('email', userEmail)
            .single();
        if (data) {
            setIsAdmin(data.role === 'admin');
            setIsUser(data.role === 'user');
            setCanAccessPaintings(data.can_access_paintings);
            setCanAccessSculptures(data.can_access_sculptures);
        } else if (error) {
            console.error('Error fetching user role:', error);
        }
    };

    return (
        <GlobalContext.Provider value={{ token, isAdmin, isUser, canAccessPaintings, canAccessSculptures, setToken, setIsAdmin, setIsUser }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);