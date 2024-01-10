'use client'
import Link from 'next/link'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function NotFound() {
    return (
        <Box sx={{ width: {
            xs:'100%',
            md:'700px',
            lg:'700px'
        }, margin: '0 auto',textAlign:'center' }}>
            <img src={'400.gif'}
                height={'100%'}
                width={'100%'}
                sizes='100vw'
                alt={`A cute animal!`}
            />
            <h2 style={{color:'#ccc'}}>404 Not Found</h2>
            <p style={{marginTop:'10px',fontWeight:'bold'}}>Look like you are lost</p>
            <p style={{marginTop:'10px'}}>The page you are looking for is currently unavailable!</p>
            <Button variant="contained" color="error" sx={{marginTop:'10px' ,borderRadius:'10px'}}>
                <Link href="/" style={{textDecoration:'none', color:'#fff'}}>&lt;&lt;&lt;  Return Home</Link>
            </Button>
        </Box>
    )
}