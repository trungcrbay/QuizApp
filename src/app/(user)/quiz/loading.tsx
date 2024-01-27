'use client'
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image'

export default function Loading() {
    // Or a custom loading skeleton component
    return (
        <main style={{
            textAlign: 'center',
            paddingTop: '100px',
            height: '100vh',
        }} className="homepage">
            <Image alt='loading image' src={'/quiz-time.gif'} width={250} height={250}/>
            {/* <CircularProgress style={{
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                top: '50%',
                left: '50%'
            }} /> */}
        </main>
    )
}