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
                    </Select>
                </FormControl>
            </Box>
        </>
    );
}

export default IconCustom;