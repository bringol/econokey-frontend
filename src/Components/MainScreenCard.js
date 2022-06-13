import React, { useState } from 'react';
import { styled, Box, Card, CardHeader, CardContent, Collapse, Avatar, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArticleIcon from '@mui/icons-material/Article';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LanguageIcon from '@mui/icons-material/Language';

import MainScreenCardNote from './MainScreenCardNote';
import MainScreenCardAccount from './MainScreenCardAccount';
import MainScreenCardWallet from './MainScreenCardWallet';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const MainScreenCard = ({ account, index, navigate }) => {
    const [values, setValues] = useState({
        expanded: false,
    });

    const handleExpandClick = () => {
        setValues({
            ...values,
            expanded: !values.expanded,
        })
    };

    const handleClickEditItem = () => {
        if (account.type === 'note') {
            navigate('../new-note', { state: account });
        } else if (account.type === 'pass') {
            navigate('../new-account', { state: account });
        } else {
            navigate('../wallet', { state: account });
        }
    };

    return (
        <>
            <Card sx={{
                margin: '7px',
                background: 'linear-gradient(0deg, rgba(6, 109, 55, 0.05), rgba(6, 109, 55, 0.05)), #FBFDF7',
                boxShadow: '0px 0.5px 1px rgba(0, 0, 0, 0.19)',
                borderRadius: '12px'
            }}>
                <CardHeader sx={{
                    padding: '5px'
                }}
                    avatar={
                        <Box sx={{
                            display: 'flex'
                        }}>
                            <ExpandMore
                                expand={values.expanded}
                                onClick={handleExpandClick}
                                aria-expanded={values.expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                            <Avatar sx={{
                                background: 'linear-gradient(0deg, rgba(6, 109, 55, 0.05), rgba(6, 109, 55, 0.05)), #FBFDF7'
                            }} aria-label="recipe">
                                {(account.type === 'note') ? (
                                    <ArticleIcon sx={{
                                        color: 'black'
                                    }} />
                                ) : (account.type === 'wallet') ? (
                                    <AccountBalanceWalletIcon sx={{
                                        color: 'black'
                                    }} />
                                ) : (
                                    <LanguageIcon sx={{
                                        color: 'black'
                                    }} />
                                )
                                }
                            </Avatar>
                        </Box>
                    }
                    action={
                        <IconButton
                            aria-label="Edit"
                            aria-haspopup="true"
                            aria-controls="edit-menu"
                            onClick={handleClickEditItem}
                        >
                            <EditIcon />
                        </IconButton>

                    }
                    title={account.titulo}
                    subheader={account.descripcion}
                />
                <Collapse in={values.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {(account.type === 'note') ? (
                            <>
                                <MainScreenCardNote account={account} index={index} />
                            </>
                        ) : (account.type === 'pass') ? (
                            <>
                                <MainScreenCardAccount account={account} index={index} />
                            </>
                        ) : (account.type === 'wallet') ? (
                            <>
                                <MainScreenCardWallet account={account} index={index} />
                            </>
                        ) : null}
                    </CardContent>
                </Collapse>
            </Card>
        </>
    );
}

export default MainScreenCard;