import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MainScreenCard from './MainScreenCard';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LanguageIcon from '@mui/icons-material/Language';
import Backdrop from '@mui/material/Backdrop';
import AppContext from '../AppContext'

const actions = [
    { icon: <ArticleIcon />, name: 'Nota', target:"../" },
    { icon: <AccountBalanceWalletIcon />, name: 'Wallet' , target:"../"},
    { icon: <LanguageIcon />, name: 'Contraseña', target:"../new-password"},
    { icon: <LanguageIcon />, name: 'Passphrase', target: "../new-passphrase"}
];

const MainScreen = ({ navigate }) => {

    const { accounts, setTopbar, setFilterButton } = React.useContext(AppContext)

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    React.useEffect(() => {
        setTopbar(true);
        setFilterButton(true);
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
                {(accounts !== undefined) && (accounts.length > 0) ? (
                    accounts.map((account, index) => {
                        return (
                            <MainScreenCard key={index} account={account} index={index} />
                        )
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
                          '&:hover': { bgcolor: '#9CF6B1',},
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
                            onClick={()=>handleOnClick(action.target)}
                        />
                    ))}
                </SpeedDial>
        </>
    );
}

export default MainScreen;