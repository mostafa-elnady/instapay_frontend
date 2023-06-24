import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home =() => {
  const navigate = useNavigate()
  return (
    <Box>
    
    <Typography variant='h2'>Welcome Apes</Typography>
    <Button variant='outlined' onClick={()=>navigate('/transactions')} color='primary'>Wallet</Button>
    </Box>

  )
}

export default Home
