import React, { useState } from 'react';
import { styled, Box, Card, CardHeader, CardContent, Collapse, Avatar, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Icon from '../Icons/Icon.js';
import MainScreenCardNote from './MainScreenCardNote';
import MainScreenCardAccount from './MainScreenCardAccount';
import MainScreenCardWallet from './MainScreenCardWallet';
import { getIcon } from '../Icons/Constants.js'

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
        } else if (account.type === 'wallet' && account.icon !== 'econokey'){
            navigate('../wallet', { state: account });
        } else if (account.type === 'wallet' && account.icon === 'econokey'){
            navigate('../wallet-gen', { state: account });
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
                                <Icon icon={getIcon(account.icon)} />
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
                    title={(account.type === 'note') ? (account.note_name) : (account.type === 'pass') ? (account.password_name) : (account.type === 'wallet') ? (account.wallet_name) : (account.type === 'wallet-gen') ? (account.wallet_name) : null}
                    subheader={account.description}
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
                        ) : (account.type === 'wallet' && account.icon !== 'econokey') ? (
                            <>
                                <MainScreenCardWallet account={account} index={index} />
                            </>
                        ) : (account.type === 'wallet' && account.icon === 'econokey') ? (
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