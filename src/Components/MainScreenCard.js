import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArticleIcon from '@mui/icons-material/Article';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LanguageIcon from '@mui/icons-material/Language';
import { Box, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import MainScreenCardEditDialog from './MainScreenCardEditDialog';

//añadido para la parte generar contraseña
import {FaDiceD20} from 'react-icons/fa'
import { NavLink } from 'react-router-dom';

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

const MainScreenCard = ({ account, index }) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [values, setValues] = React.useState({
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(account);

    const handleClickEditItem = () => {
        setOpen(true);
    };

    const handleClose = (newValue) => {
        setOpen(false);

        if (newValue) {
            setValue(newValue);
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
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
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
                                ) : (
                                    (account.type === 'wallet') ? (
                                        <AccountBalanceWalletIcon sx={{
                                            color: 'black'
                                        }} />
                                    ) : (
                                        <LanguageIcon sx={{
                                            color: 'black'
                                        }} />
                                    )
                                )}
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
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <TextField
                            required
                            label="Usuario"
                            id={"username"+index}
                            fullWidth
                            value={account.usuario}
                            disabled
                            sx={{
                                backgroundColor: 'rgba(6, 109, 55, 0.05)',
                                borderRadius: '6px',
                                m: 1
                            }}
                        />
                        <TextField
                            required
                            id={"password"+index}
                            label="Constraseña"
                            fullWidth
                            type={values.showPassword ? 'text' : 'password'}
                            value={account.password}
                            disabled
                            sx={{
                                background: 'rgba(6, 109, 55, 0.05)',
                                borderRadius: '6px',
                                m: 1
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">                                    
                                    {/* mostrar/ocultar contraseña */}
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                    
                                    
                                    
                                </InputAdornment>,
                            }}
                        />
                        <TextField
                            required
                            id={"comentarios"+index}
                            label="Comentarios"
                            fullWidth
                            value={account.comentario}
                            disabled
                            multiline
                            maxRows={4}
                            sx={{
                                background: 'rgba(6, 109, 55, 0.05)',
                                borderRadius: '6px',
                                m: 1
                            }}
                        />
                        <TextField
                            required
                            id={"url"+index}
                            label="URL"
                            fullWidth
                            value={account.url}
                            disabled
                            sx={{
                                background: 'rgba(6, 109, 55, 0.05)',
                                borderRadius: '6px',
                                m: 1
                            }}
                        />
                    </CardContent>
                </Collapse>
            </Card>
            <MainScreenCardEditDialog
                index={index}
                id={"edit-menu"+index}
                keepMounted
                open={open}
                onClose={handleClose}
                value={account}
            />
        </>
    );
}

export default MainScreenCard;