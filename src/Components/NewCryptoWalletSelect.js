import React, { useContext, useEffect } from 'react';
import { Box, Typography, Card, CardActionArea, CardMedia, CardContent, Button } from '@mui/material';

import logoBtcWallet from '../img/btcwallet.jpg';
import AppContext from '../AppContext';
//pantalla generar o agregar
const NewCryptoWalletSelect = ({ navigate }) => {

    const {setFilterButton} = useContext(AppContext);

    useEffect(()=>{
        setFilterButton(false);
    })

    const handleAgregar = () => {
        navigate('../wallet')
    }

    const handleGenerar = () => {
        navigate('../wallet-gen')
    }

    const handleClickCancelar = () => {
        navigate('../');
    }

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 1,
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                flex: 1,
                overflow: 'auto',
                height: '100%',
            }}>
                <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                borderRadius: 1,
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                overflow: 'auto',
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
                                    Almacenar una CryptoWallet existente.
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
                                    Generar una nueva CryptoWallet fria.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Box>
                <Button sx={{
                        m: 1,
                        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'
                    }}
                        variant='secondary'
                        size="small"
                        onClick={handleClickCancelar}
                    >
                        Volver
                    </Button>
            </Box>
        </>
    );
}

export default NewCryptoWalletSelect;