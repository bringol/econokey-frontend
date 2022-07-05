import React, { useContext, useState, useEffect } from 'react';
import { addElementoBoveda, deleteElementoBoveda, editElementoBoveda } from '../Controllers/WebService.controller';

import { TextField, Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import { useLocation } from 'react-router-dom';
import AppContext from '../AppContext';

function ConfirmationDialogRaw(props) {
    const { onClose, open, ...other } = props;

    const {setFilterButton} = useContext(AppContext);

    useEffect(()=>{
        setFilterButton(false);
    })

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
        element_id: account.element_id ? account.element_id : '',
        note_name: account.note_name ? account.note_name : '',
        description: account.description ? account.description : '',
        text: account.text ? account.text : '',
        note_nameError: false,
        textError: false,
        isEditing: state ? true : false,
        openConfirmation: false,
    });

    const handleComentarios = (event) => {
        setValues({
            ...values,
            text: event.target.value,
            textError: event.target.value === '',
        });
    }

    const handleTitulo = (event) => {
        setValues({
            ...values,
            note_name: event.target.value,
            note_nameError: event.target.value === '',
        });
    }

    const handleDescripcion = (event) => {
        setValues({
            ...values,
            description: event.target.value,
        });
    }

    const handleCancelar = () => {
        navigate("../")
    }

    const handleGuardar = () => {
        async function crearNota() {
            const newNote = {
                element_type: "note",
                element: {
                    note_name: values.note_name,
                    text: values.text,                    
                    icon: 'default-note',
                    description: values.description,
                }
            }

            let response = await addElementoBoveda(newNote, localStorage.getItem("token"));

            if (response.code === 200)
                navigate("../")
            else
                console.log(response.mensajeDetalle);
        }

        async function editarNota() {
            const editNote = {
                element_id: values.element_id,
                element_type: "note",
                element: {
                    note_name: values.note_name,
                    text: values.text,
                    icon: 'default-note',
                    description: values.description,
                }
            }    

            let response = await editElementoBoveda(editNote.element_id, editNote, localStorage.getItem("token"));

            if (response.code === 200)
                navigate("../")
            else
                console.log(response.mensajeDetalle);
        }

        setValues({
            ...values,
            note_nameError: values.note_name === '',
            textError: values.text === '',
        });

        if (values.note_name && values.text)
            if (!values.isEditing)
                crearNota();
            else
                editarNota();

    }

    const Borrar = () => {
        async function borrarCuenta(element_id) {

            let response = await deleteElementoBoveda(element_id, "note", localStorage.getItem("token"));

            if (response.code === 200)
                navigate("../")
            else
                console.log(response.mensajeDetalle);
        }
        borrarCuenta(values.element_id)
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
                    error={values.note_nameError}
                    required
                    id={'0'}
                    label="Titulo"
                    fullWidth
                    onChange={(event) => handleTitulo(event)}
                    value={values.note_name}
                    sx={{
                        backgroundColor: 'rgba(6, 109, 55, 0.05)',
                        borderRadius: '6px',
                        mb: 1,
                        mt: 1,
                    }}
                />
                <TextField
                    id={'1'}
                    label="Descripcion"
                    fullWidth
                    onChange={(event) => handleDescripcion(event)}
                    multiline
                    minRows={2}
                    maxRows={2}
                    value={values.description}
                    sx={{
                        backgroundColor: 'rgba(6, 109, 55, 0.05)',
                        borderRadius: '6px',
                        mb: 1,
                        mt: 1,
                    }}
                />
                <TextField
                    error={values.textError}
                    required
                    id={'2'}
                    label="Comentarios"
                    fullWidth
                    onChange={(event) => handleComentarios(event)}
                    value={values.text}
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