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
                    <ListItemText primary="Passphrase" secondary="Método de creación de contraseñas que consiste en generar palabras separadas por un carácter en particular lo que permite que sea segura desde el punto de vista técnico y fácil de recordar." />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Crypto wallet" secondary="Billetera virtual utilizada principalmente para el uso de cripto-monedas (monedas virtuales basadas en tecnología block-chain). No se debe confundir con una cuenta bancaria." />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Notas" secondary="Se utiliza para almacenar información segura sin un formato especifico." />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Entropia" secondary="Método de medición para saber si una contraseña es difícil de descifrar, cuanto mayor es la entropía (con un limite de 100) mayor es la cantidad de tiempo y esfuerzo que se debe tener para descifrarla." />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Tipos de caracteres" secondary="Los caracteres se separa en grupos, están los alfa-numéricos (Ej. Abc123), los especiales o símbolos (Ej. :[‘(&), y los especiales extendidos que son símbolos invisibles que representan espacios o saltos de línea." />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Delimitadores" secondary="Son los símbolos o caracteres que se encuentran entre palabras para reemplazar un espacio." />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Capitalización" secondary="Es la forma de escribir las letras de una palabra, existe 3 tipos, solo minúsculas (Ej. auto), solo mayúsculas (Ej. AUTO) y la primera letra en mayúscula y el resto en minúscula (Ej. Auto)." />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Longitud" secondary="Largo de la contraseña medida en cantidad de palabras a utilizar." />
                </ListItem>
                <Divider />
            </List>
            </DialogContent>
        </Dialog>
    );
}

export default HelpDialog;