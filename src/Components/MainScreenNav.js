import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AppContext from '../AppContext';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HelpDialog from './HelpDialog';
import { Button } from '@mui/material';
import { FaBook } from 'react-icons/fa';

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function MainScreenNav(props) {

  const {topbar, filterButton, setFilter} = React.useContext(AppContext)

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [open, setOpen] = React.useState(false);

  const handleClickHelpItem = () => {
    setOpen(true);
};

const handleHelpClose = (newValue) => {
    setOpen(false);
};

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setFilter (e.target.id);
    setAnchorEl(null);
  };

  return topbar && (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar sx={{
          position: 'sticky',
          background: 'linear-gradient(0deg, rgba(6, 109, 55, 0.05), rgba(6, 109, 55, 0.05)), #FBFDF7',
          boxShadow: '0px 0.5px 2px rgba(0, 0, 0, 0.25)'
        }}>
          <Toolbar>
            <Typography variant="h5" component="div" noWrap sx={{
              fontSize: 16,
              color: '#1A1C19',
              fontWeight: '500',
              fontStyle: 'normal',
              flexGrow: 1,
              alignSelf: 'center'
            }}>
              Bóveda - BoyerNicolas
            </Typography>
            <IconButton 
              aria-label="glosario"
              onClick={() => setOpen(true)}
              sx={{color:"#0F1833"}}
              >
              <FaBook/>
            </IconButton>
            <HelpDialog
                id={"help-menu"}
                keepMounted
                open={open}
                onClose={() => setOpen(false)}
            />
            {
              filterButton && (
                <>
                  <IconButton sx={{ 
                    color: '#1A1C19'
                    }} 
                    size="large" 
                    aria-label="search"
                    aria-controls='menu-appbar'
                    aria-haspopup='true'
                    onClick={handleMenu}
                    >
                    <FilterListIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    >
                    <MenuItem id="none" onClick={handleClose}>Reestablecer</MenuItem>
                    <MenuItem id="note" onClick={handleClose}>Notas</MenuItem>
                    <MenuItem id="pass" onClick={handleClose}>Contraseña</MenuItem>
                    <MenuItem id='wallet-gen'onClick={handleClose}>EconoWallets</MenuItem>
                    <MenuItem id='wallet'onClick={handleClose}>Wallet</MenuItem>
                  </Menu>
                </>
              )
            }
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </React.Fragment>
  );
}
