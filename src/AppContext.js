import * as React from 'react'

const AppContext = React.createContext()

export const AppContextProvider = (props) => {
  const accountList = [
    {id: 1, titulo: 'Gmail', descripcion: 'Gmail.com', type: 'pass', usuario: 'email@gmail.com', password: 'contraseña123', comentario: 'gmail principal', url: 'http://link'},
    {id: 2, titulo: 'Binance', descripcion: 'Virtual Wallet', type: 'wallet', usuario: 'email@gmail.com', password: 'strongpass2', comentario: 'gmail principal', url: 'http://link'},
    {id: 3, titulo: 'Nota', descripcion: '', type: 'note', comentario: 'gmail principal'}
  ];
  const [accounts, setAccounts] = React.useState(accountList);
  const [topbar, setTopbar] = React.useState(false);
  const [filterButton, setFilterButton] = React.useState(true);
  const [showUserName, setShowUserName] = React.useState(true);

  return (
    <AppContext.Provider value={{ accounts, setAccounts, topbar, setTopbar, filterButton, setFilterButton, showUserName, setShowUserName }}>
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContext