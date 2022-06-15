import React, { useState } from 'react';
import zxcvbn from 'zxcvbn';
import { LinearProgress, Typography } from '@mui/material';


const PasswordStrMeter = ({ password }) => {
  const testResult = zxcvbn(password);
  const [color, setColor] = useState('');
  const [label, setLabel] = useState('');
  const [num, setNum] = useState(0);

  React.useEffect(() => {

    setNum(testResult.score * 100 / 4)

    switch (testResult.score) {
      case 0:
        setColor("130,130,130")
        setLabel("Muy Débil")
        return
      case 1:
        setColor("234,17,17")
        setLabel("Débil")
        return
      case 2:
        setColor("255,173,0")
        setLabel("Decente")
        return
      case 3:
        setColor("155,193,88")
        setLabel("Moderado")
        return
      case 4:
        setColor("0,181,0")
        setLabel("Excelente")
        return
      default:
        setColor("0,0,0")
        setLabel('')
        return
    }
  }, [testResult.score]);

  return (
    <>
      <LinearProgress variant="determinate" value={num} sx={{
        backgroundColor: `rgb(${color},0.4)`,
        "& .MuiLinearProgress-bar": {
          backgroundColor: `rgb(${color})`
        }
      }} />
      <Typography variant="body2" sx={{
        color: `rgb(${color})`
      }}>
        {label}
      </Typography>
    </>
  )
}

export default PasswordStrMeter