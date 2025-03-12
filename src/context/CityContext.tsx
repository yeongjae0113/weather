import React, { createContext, useContext, useState } from 'react';

const CityContext = createContext<any>(null);

export const useCity = () => useContext(CityContext);

export const CityProvider = ({ children }: { children: React.ReactNode }) => {
  const [city, setCity] = useState<string>('Seoul')

  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  )
}