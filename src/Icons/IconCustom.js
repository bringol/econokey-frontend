import { Box, FormControl, InputBase, InputLabel, ListItemIcon, MenuItem, Select } from '@mui/material';
import React from 'react';
import Icon from './Icon';
import { ICONS } from "./Constants.js";
import styled from 'styled-components';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
    },
    '& .MuiInputBase-input.MuiSelect-select': {
        height: '1.4375em',
    },
    '& .MuiInputBase-input': {
        height: '1.4375em',
        boxSizing: 'content-box',
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '16.5px 14px',
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));

const IconCustom = (props) => {
    const { value, onChange } = props;

    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <>
            <Box
                sx={{
                    flex: 1,
                    flexDirection: 'row',
                    overflow: 'auto',
                    display: 'block',
                    textAlign: 'center',
                }}
            >
                <FormControl sx={{ m: 1, width: 110 }} >
                    <InputLabel id="iconSelectLabel">Icono</InputLabel>
                    <Select
                        labelId="iconSelectLabel"
                        id="iconSelect"
                        value={value}
                        label="Icono"
                        onChange={handleChange}
                        input={<BootstrapInput />}
                    >
                        <MenuItem value={'default'}>
                            Ninguno
                        </MenuItem>
                        <MenuItem value={'discord'} >
                            <ListItemIcon >
                                <Icon icon={ICONS.DISCORD} />
                            </ListItemIcon>
                        </MenuItem>
                        <MenuItem value={'github'}>
                            <ListItemIcon>
                                <Icon icon={ICONS.GITHUB} />
                            </ListItemIcon>
                        </MenuItem>
                        <MenuItem value={'gmail'}>
                            <ListItemIcon>
                                <Icon icon={ICONS.GMAIL} />
                            </ListItemIcon>
                        </MenuItem>
                        <MenuItem value={'instagram'}>
                            <ListItemIcon>
                                <Icon icon={ICONS.INSTAGRAM} />
                            </ListItemIcon>
                        </MenuItem>
                        <MenuItem value={'linkedin'}>
                            <ListItemIcon>
                                <Icon icon={ICONS.LINKEDIN} />
                            </ListItemIcon>
                        </MenuItem>
                        <MenuItem value={'outlook'}>
                            <ListItemIcon>
                                <Icon icon={ICONS.OUTLOOK} />
                            </ListItemIcon>
                        </MenuItem>
                        <MenuItem value={'sporify'}>
                            <ListItemIcon>
                                <Icon icon={ICONS.SPOTIFY} />
                            </ListItemIcon>
                        </MenuItem>
                        <MenuItem value={'steam'}>
                            <ListItemIcon>
                                <Icon icon={ICONS.STEAM} />
                            </ListItemIcon>
                        </MenuItem>
                        <MenuItem value={'twitch'}>
                            <ListItemIcon>
                                <Icon icon={ICONS.TWITCH} />
                            </ListItemIcon>
                        </MenuItem>
                        <MenuItem value={'twitter'}>
                            <ListItemIcon>
                                <Icon icon={ICONS.TWITTER} />
                            </ListItemIcon>
                        </MenuItem>     
                        <MenuItem value={'binance'}>
                            <ListItemIcon>
                                <Icon icon={ICONS.BINANCE} />
                            </ListItemIcon>
                        </MenuItem>
                        <MenuItem value={'bitcoin'}>
                            <ListItemIcon>
                                <Icon icon={ICONS.BITCOIN} />
                            </ListItemIcon>
                        </MenuItem>                      
                    </Select>
                </FormControl>
            </Box>
        </>
    );
}

export default IconCustom;