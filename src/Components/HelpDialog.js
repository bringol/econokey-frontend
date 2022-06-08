import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { AppBar, Toolbar, Typography } from '@mui/material';


function HelpDialog(props) {
    const {onClose, value: valueProp, open, ...other } = props;     
    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
        >
            <AppBar sx={{
          position: 'sticky',
          background: 'linear-gradient(0deg, rgba(6, 109, 55, 0.05), rgba(6, 109, 55, 0.05)), #FBFDF7',
          boxShadow: '0px 0.5px 2px rgba(0, 0, 0, 0.25)',
          color: '#1A1C19'
        }}>
            <Toolbar>
                <Typography variant="h5" component="div" noWrap sx={{
                fontSize: 16,
                fontWeight: '500',
                fontStyle: 'normal',
                flexGrow: 1,
                alignSelf: 'center'
                }}>
                Glosario

                </Typography>
                <IconButton
                    edge="start"
                    onClick={onClose}
                    aria-label="close"
                    >
                        <CloseIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
            <DialogContent dividers>
            <List>
                <ListItem>
                    <ListItemText primary="Bóveda" secondary="Lugar seguro donde se pueden almacenar contraseñas, wallets y notas." />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Passphrase" secondary="Método de creación de contraseñas seguras y fáciles de recordar que consisten de una secuencia de palabras." />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Crypto wallet" secondary="Billetera virtual única generada mediante un algoritmo lógico, la cual sirve para almacenar distintos tipos de cripto-monedas. No se debe confundir con una cuenta bancaria." />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Notas" secondary="Se utiliza para almacenar información segura sin un formato especifico." />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Entropía de una contraseña" secondary="Medida que representa el nivel de aleatoriedad de una contraseña, cuanto mayor es la entropía la misma es mas segura." />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Tipos de carácteres" secondary="Pueden ser Alfa-numéricos (Ej. Abc123), Símbolos especiales (Ej. :[‘(&),) y ASCII extendido (Incluye caracteres y simbolos que no se encuentran comunmente en un teclado)." />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Delimitadores" secondary="Es el carácter utilizado como separador entre palabras." />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Capitalización" secondary="Utilización de mayúsculas dentro de cada palabra, puede ser solo minúsculas (Ej. auto), solo mayúsculas (Ej. AUTO) y título (Ej. Auto)." />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Longitud de una contraseña" secondary="Largo de una contraseña medido en cantidad de caracteres." />
                </ListItem>
                <Divider />
            </List>
            </DialogContent>
        </Dialog>
    );
}

export default HelpDialog;