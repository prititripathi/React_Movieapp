import React, { useContext, useEffect, useState } from "react"

// Context (warehouse)
// Provider ()
// Consumer useContext()


const AppContext = React.createContext();

const API_URL = `https://www.omdbapi.com/?i=tt3896198&apikey=${process.env.REACT_APP_API_KEY}`;
//provider fun
const AppProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [isError, setIsError] = useState({show:"false", msg: ""})
    const [query, setQuery] = useState();

    const getMovies = async(url) => {
        try{
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            if(data.Response === "True") {
                setIsLoading(false);
                setIsError({
                    show: false,
                    msg: "",
                })
                setMovie(data.Search);
            }else {
                setIsError({
                    show: true,
                    msg: data.Error,
                })
            }
        }catch (error){
            console.log(error);
        }
    };

    useEffect(() => {

        let timerOut = setTimeout(() => {
            getMovies(`${API_URL}&s=${query}`);
        },800)

        return () => clearTimeout(timerOut);

    }, [query]);

    return <AppContext.Provider value={{isLoading, movie, isError, query, setQuery}}>
        {children}
    </AppContext.Provider>
}


//global custom hooks

const useGlobalContext = () => {
    return useContext(AppContext)
}


export { AppContext, AppProvider, useGlobalContext }