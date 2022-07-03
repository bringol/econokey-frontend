import React from 'react';
import { Box, Typography, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';

import logoBtcWallet from '../img/btcwallet.jpg';
//pantalla generar o agregar
const NewCryptoWalletSelect = ({ navigate }) => {

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