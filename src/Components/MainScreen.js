import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import MainScreenCard from './MainScreenCard';

const MainScreen = ({ accounts }) => {
    console.log(accounts.count)
    return (
        <>
            {(accounts !== undefined) && (accounts.length > 0) ? (
                <Box height={'100vh'} display={'flex'} flexDirection={'column'}>
                    {
                        accounts.map((account, index) => {
                            return (
                                <MainScreenCard account={account} index={index} />
                            )
                        })
                    }
                </Box>
            ) : (
                <Box height={'100vh'} display={'flex'} flexDirection={'column'}>
                    <Box flex={1} overflow={'auto'} flexDirection={'row'} alignItems={'flex-end'} display={'flex'} justifyContent={'center'}>
                        <Typography variant="h5" gutterBottom component="div" fontWeight={'500'}>
                            Sin datos almacenados
                        </Typography>
                    </Box>
                    <Box flex={1} overflow="auto" flexDirection={'row'} alignItems={'flex-start'} display={'flex'} justifyContent={'center'}>
                        <Box
                            sx={{
                                height: 56,
                                width: 56,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#9CF6B1',
                                boxShadow: '0px 0.25px 3px rgba(0, 0, 0, 0.039), 0px 2.75px 9px rgba(0, 0, 0, 0.19)',
                                borderRadius: 4
                            }}
                        >
                            <AddIcon
                                sx={{
                                    fontSize: 24
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
}

export default MainScreen;