"use client";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import CircleIcon from "@mui/icons-material/Circle";
import Badge from "@mui/material/Badge";
import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ReplayIcon from "@mui/icons-material/Replay";

const DetailQuiz = (props: any) => {
  const [value, setValue] = useState("female");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  const { detailDataQuiz } = props;
  const [indexQuiz, setIndexQuiz] = useState<number>(0);

  const handleNextQuiz = () => {
    if (indexQuiz === detailDataQuiz.length - 1) return;
    setIndexQuiz(indexQuiz + 1);
  };
  const handlePrevQuiz = () => {
    if (indexQuiz === 0) return;
    setIndexQuiz(indexQuiz - 1);
  };
  console.log("checker data:", detailDataQuiz);
  return (
    <Container>
      <h1>Quiz số {detailDataQuiz.quizId}</h1>
      <Box
        sx={{
          border: "1px solid #ccc",
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          width: { xs: "100%", md: "50%", lg: "50%" },
        }}
      >
        <Typography
          sx={{
            marginBottom: "20px",
            height: { md: "5px", lg: "5px", xs: "65px" },
            padding: "10px",
          }}
        >
          Look at the picture. Choose the sentence that best describes the
          picture:
        </Typography>
      </Box>

      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box>
              <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                Câu hỏi: {detailDataQuiz[indexQuiz].description}
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={`data:image/png;base64,${detailDataQuiz[indexQuiz].imageFile}`}
                  width={"50%"}
                  height={"50%"}
                />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                  Question
                </Typography>
              </Box>
              <Box>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                  >
                    {detailDataQuiz[indexQuiz].answers.map(
                      (quiz: any, index: number) => {
                        return (
                          <div>
                            <FormControlLabel
                              value={quiz.description}
                              control={
                                <Radio
                                  color="error"
                                  checkedIcon={<CircleIcon />}
                                />
                              }
                              label={quiz.description}
                            />
                          </div>
                        );
                      }
                    )}
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box
                sx={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                {indexQuiz === 0 ? (
                  <Button disabled>Prev</Button>
                ) : (
                  <Button variant="contained" onClick={() => handlePrevQuiz()}>
                    Prev
                  </Button>
                )}
                {indexQuiz === detailDataQuiz.length - 1 ? (
                  <Button disabled>Next</Button>
                ) : (
                  <Button variant="contained" onClick={() => handleNextQuiz()}>
                    Next
                  </Button>
                )}
                {indexQuiz === detailDataQuiz.length - 1 && (
                  <Button>Submit</Button>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{ border: "1px solid red", width: "100%", height: "500px" }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "15px",
                  alignItems: "center",
                  borderBottom: "1px solid #000",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CheckIcon />
                  Submit
                </Box>
                <Box>01 : 20 : 40</Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <ReplayIcon />
                  Requiz
                </Box>
              </Box>
              <Box></Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default DetailQuiz;
