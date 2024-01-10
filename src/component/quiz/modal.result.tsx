'use client'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: '#000'
};

const ModalQuizResult = (props: any) => {
    const { open, setOpen, countCorrect, countTotal } = props
    const handleClose = () => setOpen(false);
    return (<div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <img src="/congratulation.gif" alt="" style={{ width: '80%', display: 'block', margin: '0 auto' }} />
                <Box>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Quiz Result
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Correct: {countCorrect}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Your score: {countCorrect}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Total Question: {countTotal}
                    </Typography>
                </Box>
                <Box sx={{ justifyContent: 'flex-end', display: 'flex', gap: '5px', marginTop: '20px' }}>
                    <Button variant="outlined" onClick={() => handleClose()} size="small">Close</Button>
                    <Button variant="contained" onClick={() => handleClose()} size="small">Results</Button>
                </Box>
            </Box>
        </Modal>
    </div>)
}

export default ModalQuizResult;