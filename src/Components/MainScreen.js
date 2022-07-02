import { useEffect, useState, useContext } from 'react';
import AppContext from '../AppContext';
import MainScreenCard from './MainScreenCard';
import { getAllElementosBoveda } from '../Controllers/WebService.controller';

import { SpeedDial, SpeedDialAction, SpeedDialIcon, Backdrop, Typography, Box } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { FaDiceD20 } from "react-icons/fa";

const actions = [
    { icon: <ArticleIcon />, name: 'Nota', target: "../new-note" },
    { icon: <AccountBoxIcon />, name: 'Cuenta', target: "../new-account" },
    { icon: <CurrencyBitcoinIcon />, name: 'CryptoWallet', target: "../new-wallet" },
    { icon: <FaDiceD20 />, name: 'Contraseña', target: "../new-password" },
    { icon: <FaDiceD20 />, name: 'Passphrase', target: "../new-passphrase" }
];

const MainScreen = ({ navigate }) => {

    const { setTopbar, setFilterButton, accounts, setAccountsList, filter} = useContext(AppContext)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    useEffect(() => {
        setTopbar(true);
        setFilterButton(true);
        if (accounts == undefined || accounts.length == 0)
        {
            getAllElementosBoveda().then(response => {
                if(response.code === 200)
                    setAccountsList(response.data);
                else
                    console.log(response.mensajeDetalle);
            });
        }
       
    }, []);

    const handleOnClick = (target) => {
        navigate(target);
    };
    return (
        <>
            <Box sx={{
                flex: 1,
                overflow: 'auto',
                height: '100%',
                display: 'block',
                p: 1,
            }}>
                {accounts !== undefined && accounts.length > 0 ? (
                    accounts.map((account, index) => {
                        //debugger;
                        return filter == 'none'?
                        (
                            <MainScreenCard key={index} account={account} index={index} navigate={navigate} />
                        ): account.type == filter &&
                        (
                            <MainScreenCard key={index} account={account} index={index} navigate={navigate} />
                        );
                    })
                ) : (
                    <Typography variant="h5" gutterBottom component="div" fontWeight={'500'} textAlign={'center'}>
                        Sin datos almacenados
                    </Typography>
                )}
            </Box>

            <Backdrop open={open} />
            <SpeedDial
                ariaLabel="Add Account"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                FabProps={{
                    sx: {
                        bgcolor: '#9CF6B1',
                        '&:hover': { bgcolor: '#9CF6B1', },
                        color: 'black',
                        borderRadius: 4,
                        boxShadow: '0px 0.25px 3px rgba(0, 0, 0, 0.039), 0px 2.75px 9px rgba(0, 0, 0, 0.19)'
                    }
                }}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        onClick={() => handleOnClick(action.target)}
                    />
                ))}
            </SpeedDial>
        </>
    );
}

export default MainScreen;