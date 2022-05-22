import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function Dropdown() {
  const [cap, setCap] = React.useState('minúscula');

  const handleChange = (event) => {
    setCap(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 130 }}>
        <InputLabel id="dropdown">Capitalización</InputLabel>
        <Select
          labelId="dropdown"
          id="dropdown-autowidth"
          value={cap}
          onChange={handleChange}
          //onChange={e => setCap(e.target.value)}
          autoWidth
          label="Capitalización"
        >
          <MenuItem value="minúscula">
            <em>minúscula</em>
          </MenuItem>
          <MenuItem value={"Título"}>Título</MenuItem>
          <MenuItem value={"MAYÚSCULA"}>MAYÚSCULA</MenuItem>
          
        </Select>
      </FormControl>
    </div>
  );
}