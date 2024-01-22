"use client";
import Box from "@mui/material/Box";
import CheckIcon from "@mui/icons-material/Check";
import CountDown from "../countdown/countdown.time";
import ReplayIcon from "@mui/icons-material/Replay";
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

const RightContent = (props: any) => {
  const { open, setOpen, countCorrect, countTotal, handleOpen,
    handleSubmit, timer, setTimer, isEndQuiz, setIsEndQuiz,
    dataQuiz, indexQuiz, setIndexQuiz, isCheckSelectedAnswer } = props
  console.log("check dataQuiz ngay: ", dataQuiz)
  return (
    <Box
      sx={{ border: "1px solid var(--fg)", width: "100%", height: "500px" }}
    >
      <Box
        sx={{
          display: "flex",
          gap: {
            md: "100px",
            lg: "100px",
            xs: '80px'
          },
          alignItems: "center",
          justifyContent: 'center',
        }}
      >
        <Button
          disabled={isEndQuiz}
          sx={{ display: "flex", flexDirection: "column", cursor: 'pointer' }} onClick={() => {
            handleSubmit();
            handleOpen()
          }}>
          <CheckIcon />
          Submit
        </Button>
        <Box>
          <CountDown
            open={open}
            setOpen={setOpen} countCorrect={countCorrect}
            countTotal={countTotal} handleSubmit={handleSubmit}
            timer={timer} setTimer={setTimer}
          />
        </Box>
        <Button
          sx={{ display: "flex", flexDirection: "column", cursor: 'pointer', color: '#000' }}
          onClick={() => location.reload()}
        >
          <ReplayIcon />
          Retry
        </Button>
      </Box>
      <Divider sx={{ background: 'var(--fg)' }} />
      {/* content 2 */}
      <Box sx={{
        display: 'flex', gap: {
          xs: '30px',
          md: '15px',
          lg: '15px'
        }, flexWrap: 'wrap', marginTop: '15px', marginLeft: '15px'
      }}>

        {dataQuiz.map((item: any, index: number) => {
          return (
            <button
              key={index} // Thêm key prop cho mỗi button
              style={{
                borderRadius: '1000px',
                width: '45px',
                height: '45px',
                cursor: 'pointer',
                background: item.checkSelected && indexQuiz !== index ? 'gray' : '',
                color: '#000',
                opacity: indexQuiz === index ? 0.8 : 1,
                border:indexQuiz === index ? '1px solid #DD0000' : '1px solid #ccc'
              }}
              onClick={() => setIndexQuiz(index)}
            >
              {index + 1}
            </button>
          )
        })}
      </Box>
    </Box>
  )
}

export default RightContent;