'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Image from 'next/image'
export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <Box sx={{
            width: {
                xs: '100%',
                md: '700px',
                lg: '700px'
            }, margin: '0 auto', textAlign: 'center'
        }}>

            <Image
                src="/error.jpg"
                alt="Error picture"
                width={400}
                height={400}
            />
            <h2>Something went wrong</h2>
            <Button variant="contained" color="error" sx={{ marginTop: '10px', borderRadius: '10px' }}>
                <Link href="/" style={{ textDecoration: 'none', color: '#fff' }}>&lt;&lt;&lt;  Return Home</Link>
            </Button>
        </Box>
    )
}