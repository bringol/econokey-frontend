import * as React from 'react'

const AppContext = React.createContext()

export const AppContextProvider = (props) => {

  const [topbar, setTopbar] = React.useState(false);
  const [filterButton, setFilterButton] = React.useState(true);
  const [showUserName, setShowUserName] = React.useState(true);

  return (
    <AppContext.Provider value={{ topbar, setTopbar, filterButton, setFilterButton, showUserName, setShowUserName }}>
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContext