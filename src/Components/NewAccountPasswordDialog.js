import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import PasswordModal from "../Components/ContraseñaCombinadaModal"

function NewAccountPasswordDialog(props) {
    const { onClose, open, ...other } = props;
    const [password, setPassword] = useState();

    const handleCancelar = () => {
        onClose();
    };

    const handleGuardar = () => {
        console.log(password);
        onClose(password);
    };

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: '90%' } }}
            maxWidth="xs"
            scroll='paper'
            open={open}
            {...other}
        >
            <DialogTitle>Generar Passphrase</DialogTitle>
            <DialogContent dividers>
                <PasswordModal
                    NuevaPass={newPassword => setPassword(newPassword)}
                />
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancelar}>
                    Cancelar
                </Button>
                <Button onClick={handleGuardar}>Guardar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default NewAccountPasswordDialog;