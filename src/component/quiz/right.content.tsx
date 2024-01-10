"use client";
import Box from "@mui/material/Box";
import CheckIcon from "@mui/icons-material/Check";
import CountDown from "../countdown/countdown.time";
import ReplayIcon from "@mui/icons-material/Replay";
import Divider from '@mui/material/Divider';
import { useRouter } from 'next/navigation';
const RightContent = (props: any) => {
  const { open, setOpen, countCorrect, countTotal, handleOpen, handleSubmit } = props
  const router = useRouter()
  return (
    <Box
      sx={{ border: "1px solid var(--fg)", width: "100%", height: "500px" }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "100px",
          alignItems: "center",
          justifyContent: 'center',
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column",cursor:'pointer' }} onClick={() => {
          handleSubmit();
          handleOpen()
        }}>
          <CheckIcon />
          Submit
        </Box>
        <Box>
          <CountDown open={open} setOpen={setOpen} countCorrect={countCorrect} countTotal={countTotal} handleSubmit={handleSubmit}/>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" ,cursor:'pointer'}} onClick={() => router.refresh()}>
          <ReplayIcon />
          Retry
        </Box>
      </Box>
      <Divider sx={{background:'var(--fg)'}}/>
      <Box></Box>
    </Box>
  )
}

export default RightContent;