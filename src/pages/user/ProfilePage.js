import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom'
const ProfilePage = () => {
    const navigate = useNavigate()
    
    return(

        <Box>
        <Typography variant="h2">Profile Page </Typography>
        <Button variant='outlined' onClick={()=>navigate('/transactions')} color='primary'>Wallet</Button>
        
        </Box>
    )

    

};

export default ProfilePage;
