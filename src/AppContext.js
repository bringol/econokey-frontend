import * as React from 'react'

const AppContext = React.createContext()

export const AppContextProvider = (props) => {

  const [topbar, setTopbar] = React.useState(false);
  const [filterButton, setFilterButton] = React.useState(true);
  const [filter, setFilter] = React.useState('none');
  const [showUserName, setShowUserName] = React.useState(true);
  const [accounts, setAccountsList] = React.useState([]);

  return (
    <AppContext.Provider value={{ topbar, setTopbar, filterButton, setFilterButton, filter, setFilter, showUserName, setShowUserName, accounts, setAccountsList}}>
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContext