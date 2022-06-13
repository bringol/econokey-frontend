import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NewAccountPasswordDialog from './NewAccountPasswordDialog';
import NewAccountPassphraseDialog from './NewAccountPassphraseDialog';
import { addElementoBoveda, deleteElementoBoveda, editElementoBoveda } from '../Controllers/WebService.controller';

import { IconButton, InputAdornment, TextField, Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';

import logoBtcWallet from '../img/btcwallet.jpg';

const NewCryptoWalletSelect = ({ navigate }) => {

    const [values, setValues] = useState({
    });

    const handleAgregar = () => {
        navigate('../wallet')
    }

    const handleGenerar = () => {
        navigate('../wallet-gen')
    }

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                borderRadius: 1,
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                flex: 1,
                overflow: 'auto',
                height: '100%',
            }}>
                <Card sx={{
                    maxWidth: 150,
                    m: 1,
                }}>
                    <CardActionArea onClick={handleAgregar}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={logoBtcWallet}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" textAlign="center">
                                Agregar
                            </Typography>
                            <Typography variant="body2" color="text.secondary" textAlign="center">
                                Almacenar una Crypto-Wallet existente.
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={{
                    maxWidth: 150,
                    m: 1,
                }}>
                    <CardActionArea onClick={handleGenerar}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={logoBtcWallet}
                            alt="btc create wallet"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" textAlign="center">
                                Generar
                            </Typography>
                            <Typography variant="body2" color="text.secondary" textAlign="center">
                                Generar una nueva Crypto-Wallet fria.
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        </>
    );
}

export default NewCryptoWalletSelect;