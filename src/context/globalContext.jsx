import { createContext, useEffect, useState } from 'react';

export const GlobalContext = createContext();

export function GlobalProvider ({ children }) {
    
    const [api, setApi]= useState([])
    const [dataApi, setDataApi]= useState({})

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://api.artic.edu/api/v1/artworks');
            const dataFetch = await response.json();
            setApi(dataFetch.api);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
        fetchData();
      }, []);

    return(
        <GlobalContext.Provider value={{ api, dataApi, setDataApi }}>
            {children}
        </GlobalContext.Provider>
    )
}