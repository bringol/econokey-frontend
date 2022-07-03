import React from 'react';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { AppBar, Toolbar, Typography } from '@mui/material';

const glosario = [
    {titulo: 'Bóveda', descripcion: 'Lugar seguro donde se pueden almacenar cuentas, crytowallets y notas.'},
    {titulo: 'Passphrase', descripcion: 'Método de creación de contraseñas seguras y fáciles de recordar que consisten de una secuencia de palabras comunes de diccionario.'},
    {titulo: 'Contraseña Clásica', descripcion: 'Un generador de contraseñas convencionales, compuesta por varios parámetros para brinda mayor seguridad y cobertura sobre las diferentes políticas de contraseñas que algunos sitios requieren (Por ejemplo: 8 caracteres con números y mayúsculas)'},
    {titulo: 'Notas', descripcion: 'Se utiliza para almacenar información segura sin un formato especifico.'},
    {titulo: 'Entropía de una Contraseña', descripcion: 'Medida que representa el nivel de complejidad de una contraseña, cuanto mayor es la entropía, más segura será.'},
    {titulo: 'Tipos de Caracteres', descripcion: 'Pueden ser Alfa-numéricos (Ej. Abc123), Símbolos especiales (Ej. :[‘(&),). Están disponibles para aquellos sitios que requieran este tipo de caracteres dentro de la contraseña'},
    {titulo: 'Delimitadores', descripcion: 'Es el símbolo utilizado como separador de palabras.'},
    {titulo: 'Capitalización', descripcion: 'Utilización de mayúsculas dentro de cada palabra, puede ser solo minúsculas (Ej. auto), solo mayúsculas (Ej. AUTO) y título (Ej. Auto).'},
    {titulo: 'Longitud de una contraseña', descripcion: 'Largo de una contraseña.En Passphrase se refiere a la cantidad de palabras que contendrá, mientras que en la Contrseña Clásica se refiere a la cantidad total de caracteres'},
    {titulo: 'Agregar CryptoWalet', descripcion: 'Permite añadir a la bóveda una billetera de criptomonedas existente, como podría ser aquellas creadas en un exchange tal como Binance.'},    
    {titulo: 'Generar CryptoWallet', descripcion: 'Billetera virtual de criptomonedas única generada mediante un algoritmo lógico, la cual sirve para almacenar distintos tipos de cripto-monedas. Este tipo de generación se conoce como Cold Wallet, Billetera Fría, Offline Wallet, o Billetera Fuera de Línea.'},
    {titulo: 'Llave Privada', descripcion: 'Funciona como una firma digital con se verifica quién es el propietario de las criptomonedas. Es muy importante que siempre recordar la llave privada. Sin ella no se acceder a las criptomonedas almacenadas.'},
    {titulo: 'Llave Pública', descripcion: 'Una Llave privada y una Llave pública están matemáticamente relacionadas. Esta clave puede ser conocida por los demás sin suponer un riesgo, no da acceso a las criptomonedas, pero es indispensable para recibirlas de alguien.'},
    // {titulo: '', descripcion: ''},
];


function HelpDialog(props) {
    const {onClose, open } = props;     
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
                {glosario.map((item,index) =>
                    <React.Fragment key={index}>
                        <ListItem>
                            <ListItemText primary={item.titulo} secondary={item.descripcion} />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                )}
            </List>
            </DialogContent>
        </Dialog>
    );
}

export default HelpDialog;