import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Container, Typography } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import WalletHook from "../../hook/user/WalletHook";


const UserTransactions= () => {

   const [userTransActions] = WalletHook()

  const navigate = useNavigate()

    return (
        <Container  sx={{pt:2}}>
        <Box component='div' sx={{display:'flex', mb:3 , justifyContent:'space-between' , height:50}}>
        <Typography variant="h4">Wallet Management</Typography>
        <Button onClick={()=>navigate('/addTransaction')} variant="contained" startIcon={<AddCircleOutlineIcon  />}>Add Transaction</Button>
        </Box>
        
        <TableContainer component={Paper}>
      <Table  sx={{ minWidth: 650  }} aria-label="simple table">
        <TableHead sx={{bgcolor:'#F8F9FA'}}>
          <TableRow>
            <TableCell sx={{textAlign:'center'}}>Sender </TableCell>
            <TableCell sx={{textAlign:'center'}} >Reciver</TableCell>
            <TableCell sx={{textAlign:'center'}}>amount</TableCell>
            <TableCell sx={{textAlign:'center'}} >Description</TableCell>

          
          </TableRow>
        </TableHead>
        <TableBody>
          {userTransActions.map((row) => (
            <TableRow
              key={row.id}
            >
          
              <TableCell sx={{textAlign:'center'}} >{row.sender_name}</TableCell>
              <TableCell  sx={{textAlign:'center'}} >{row.receiver_name}</TableCell>
              <TableCell  sx={{textAlign:'center'}} >{row.money}$</TableCell>
              <TableCell sx={{textAlign:'center'}}>
              <Button sx={{mx:1}} onClick={()=>navigate(`/editTransaction/${row.id}`)} variant="outlined" color="primary">
              update
            </Button>
             <Button onClick={()=>console.log('delete transaction')} variant="outlined"  color="error">
              Delete
          </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <ToastContainer/>
        </Container>
    )


}

export default UserTransactions
