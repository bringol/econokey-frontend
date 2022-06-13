import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addElementoBoveda, deleteElementoBoveda, editElementoBoveda } from '../Controllers/WebService.controller';

import { TextField, Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import { useLocation } from 'react-router-dom';

function ConfirmationDialogRaw(props) {
    const { onClose, open, ...other } = props;

    const handleCancel = () => {
        onClose(false);
    };

    const handleOk = () => {
        onClose(true);
    };

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '90%', maxHeight: 435 } }}
            maxWidth="xs"
            open={open}
            {...other}
        >
            <DialogTitle textAlign={'center'}>Confirmacion de eliminación</DialogTitle>
            <DialogContent dividers>
                ¿Esta seguro que desea eliminar este elemento?
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Button sx={{
                    m: 1,
                }}
                    variant='outlined'
                    size="small"
                    endIcon={<CancelIcon fontSize='small' />}
                    onClick={handleCancel}
                >
                    CANCELAR
                </Button>
                <Button sx={{
                    m: 1,
                }}
                    variant='outlined'
                    color="error"
                    size="small"
                    startIcon={<DeleteIcon fontSize='small' />}
                    onClick={handleOk}
                >
                    ELIMINAR
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const NewNote = ({ navigate }) => {
    const { state } = useLocation();
    let account = state ? state : '';
    const [values, setValues] = useState({
        id: account.id ? account.id : '',
        titulo: account.titulo ? account.titulo : '',
        descripcion: account.descripcion ? account.descripcion : '',
        comentarios: account.comentarios ? account.comentarios : '',
        tituloError: false,
        descripcionError: false,
        comentariosError: false,
        isEditing: state ? true : false,
        openConfirmation: false,
    });

    const handleComentarios = (event) => {
        setValues({
            ...values,
            comentarios: event.target.value,
            comentariosError: event.target.value === '',
        });
    }

    const handleTitulo = (event) => {
        setValues({
            ...values,
            titulo: event.target.value,
            tituloError: event.target.value === '',
        });
    }

    const handleDescripcion = (event) => {
        setValues({
            ...values,
            descripcion: event.target.value,
            descripcionError: event.target.value === '',
        });
    }

    const handleCancelar = () => {
        navigate("../")
    }

    const handleGuardar = () => {
        async function crearNota() {
            const notaNueva = {
                id: uuidv4(),
                titulo: values.titulo,
                descripcion: values.descripcion,
                type: 'note',
                comentarios: values.comentarios,
            }

            let response = await addElementoBoveda(notaNueva);

            if (response.code === 200)
                navigate("../")
            else
                console.log(response.mensajeDetalle);
        }

        async function editarNota() {
            const cuentaNueva = {
                id: values.id,
                titulo: values.titulo,
                descripcion: values.descripcion,
                type: 'note',
                comentarios: values.comentarios,
            }    

            let response = await editElementoBoveda(cuentaNueva.id, cuentaNueva);

            if (response.code === 200)
                navigate("../")
            else
                console.log(response.mensajeDetalle);
        }

        setValues({
            ...values,
            tituloError: values.titulo === '',
            descripcionError: values.descripcion === '',
            comentariosError: values.comentarios === '',
        });

        if (values.titulo && values.descripcion && values.comentarios)
            if (!values.isEditing)
                crearNota();
            else
                editarNota();

    }

    const Borrar = () => {
        async function borrarCuenta(id) {

            let response = await deleteElementoBoveda(id);

            if (response.code === 200)
                navigate("../")
            else
                console.log(response.mensajeDetalle);
        }
        borrarCuenta(values.id)
    }

    const handleCloseConfirmation = (confirmDialog) => {
        if (confirmDialog)
            Borrar();
        else
            setValues({
                ...values,
                openConfirmation: false,
            });
    }

    const handleClickDelete = () => {
        setValues({
            ...values,
            openConfirmation: true,
        });
    }

    return (
        <>
            <Box
                component='form'
                Validate
                autoComplete='off'
                sx={{
                    flex: 1,
                    overflow: 'auto',
                    height: '100%',
                    display: 'block',
                    p: 1,
                }}>
                <Typography variant="h1" component="div" noWrap sx={{
                    fontSize: 25,
                    fontWeight: '500',
                    fontStyle: 'normal',
                    flexGrow: 1,
                    alignSelf: 'center',
                    textAlign: 'center',
                    backgroundColor: 'rgba(6, 109, 55, 0.05)',
                    borderRadius: '6px',
                    mb: 1,
                    mt: 1,
                    p: 1,
                }}>
                    {(values.isEditing) ? (
                        'EDITAR NOTA'
                    ) : 'NUEVA NOTA'}
                </Typography>
                <TextField
                    error={values.tituloError}
                    required
                    id={'0'}
                    label="Titulo"
                    fullWidth
                    onChange={(event) => handleTitulo(event)}
                    value={values.titulo}
                    sx={{
                        backgroundColor: 'rgba(6, 109, 55, 0.05)',
                        borderRadius: '6px',
                        mb: 1,
                        mt: 1,
                    }}
                />
                <TextField
                    error={values.descripcionError}
                    required
                    id={'1'}
                    label="Descripcion"
                    fullWidth
                    onChange={(event) => handleDescripcion(event)}
                    multiline
                    minRows={2}
                    maxRows={2}
                    value={values.descripcion}
                    sx={{
                        backgroundColor: 'rgba(6, 109, 55, 0.05)',
                        borderRadius: '6px',
                        mb: 1,
                        mt: 1,
                    }}
                />
                <TextField
                    error={values.comentariosError}
                    required
                    id={'4'}
                    label="Comentarios"
                    fullWidth
                    onChange={(event) => handleComentarios(event)}
                    value={values.comentarios}
                    multiline
                    minRows={2}
                    maxRows={4}
                    sx={{
                        background: 'rgba(6, 109, 55, 0.05)',
                        borderRadius: '6px',
                        mb: 1,
                        mt: 1,
                    }}
                />
                <Box
                    sx={{
                        textAlign: 'center',
                    }}
                >
                    <Button sx={{
                        m: 1,
                    }}
                        variant='outlined'
                        size="small"
                        endIcon={<CancelIcon fontSize='small' />}
                        onClick={handleCancelar}
                    >
                        CANCELAR
                    </Button>
                    <Button sx={{
                        m: 1,
                    }}
                        variant='contained'
                        color="success"
                        size="small"
                        endIcon={<SendIcon fontSize='small' />}
                        onClick={handleGuardar}
                    >
                        GUARDAR
                    </Button>
                    {(values.isEditing) ? (
                        <>
                            <Button sx={{
                                m: 1,
                            }}
                                variant='outlined'
                                color="error"
                                size="small"
                                startIcon={<DeleteIcon fontSize='small' />}
                                onClick={handleClickDelete}
                            >
                                ELIMINAR
                            </Button>
                        </>
                    ) : null}
                </Box>
            </Box >
            <ConfirmationDialogRaw
                id="confirmDialog"
                keepMounted
                open={values.openConfirmation}
                onClose={handleCloseConfirmation}
            />
        </>
    );
}

export default NewNote;