'use client'
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
    // Or a custom loading skeleton component
    return (
        <main style={{
            textAlign: 'center',
            paddingTop: '100px',
            height: '100vh',
        }} className="homepage">
            <CircularProgress style={{
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                top: '50%',
                left: '50%'
            }} />
        </main>
    )
}