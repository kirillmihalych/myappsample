import React, { useContext, useEffect, useState } from 'react'

const AppContext = React.createContext()

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [drinks, setDrinks] = useState([])

  const fetchDrinks = async (url) => {
    setIsLoading(true)
    try {
      const response = await fetch(url)
      const data = await response.json()
      setDrinks(data.drinks)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDrinks(`${url}${query}`)
  }, [query])

  return (
    <AppContext.Provider value={{ isLoading, drinks, query, setQuery }}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppProvider }
