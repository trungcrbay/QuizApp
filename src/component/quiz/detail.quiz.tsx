"use client";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import CircleIcon from "@mui/icons-material/Circle";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation'
import _ from "lodash";
import ModalQuizResult from "./modal.result";
import RightContent from "./right.content";

interface IAnswerData {
  id: number;
  description: string;
  imageFile: string;
  imageName: string;
  answers: {
    id: number;
    description: string;
    isCorrect: boolean;
    isSelected: boolean;
  }[];
}

interface Answer {
  questionId: number;
  userAnswerId: number[];
}

interface Payload {
  quizId: number;
  answers: Answer[];
}

interface Result {
  countCorrect: number;
  countTotal: number;
  quizData?: any
}

const DetailQuiz = (props: any) => {
  const { detailDataQuiz, session } = props;
  const [dataQuiz, setDataquiz] = useState<IAnswerData[]>(detailDataQuiz);
  const [indexQuiz, setIndexQuiz] = useState<number>(0);
  const [answerApi, setAnswerApi] = useState<Answer[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [result, setResult] = useState<Result | any>({});
  const params = useParams<{ slug: string }>();
  const quizId = params.slug
  const handleOpen = () => setOpen(true);
  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>, id: any, quizId: any) => {
    const currentAnswers = _.cloneDeep(dataQuiz[indexQuiz].answers); // Tạo bản sao sâu
    currentAnswers.forEach((item: any) => {
      if (+item.id === +quizId) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
    });

    dataQuiz[indexQuiz].answers = currentAnswers; // Cập nhật dữ liệu gốc
    setDataquiz(dataQuiz);
  }

  const handleSubmit = () => {
    console.log("dataquiz: ", dataQuiz)
    let payload: Payload = {
      quizId: +quizId,
      answers: []
    }
    let answers: Answer[] = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((question: any) => {
        let questionId = question.id;
        let userAnswerId: any[] = [];
        question.answers.forEach((item: any) => {
          console.log("itemm:", item)
          if (item.isSelected === true) {
            userAnswerId.push(item.id)
          }
        })
        answers.push({
          questionId: +questionId,
          userAnswerId: userAnswerId
        })
      })
      payload.answers = answers
      setAnswerApi(answers)
    }
  }

  const handleNextQuiz = () => {
    if (indexQuiz === detailDataQuiz.length - 1) return;
    setIndexQuiz(indexQuiz + 1);
  };
  const handlePrevQuiz = () => {
    if (indexQuiz === 0) return;
    setIndexQuiz(indexQuiz - 1);
  };

  const resResult = async () => {
    const res = await fetch("http://localhost:8081/api/v1/quiz-submit", {
      method: "POST",
      body: JSON.stringify({
        quizId: +quizId,
        answers: answerApi
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session}`
      },
    });
    var data = await res.json();
    if (data) {
      console.log(data.DT)
      setResult(data.DT)
    }
  }

  console.log("dataQuiz : ", dataQuiz)

  useEffect(() => {
    resResult()
    console.log("indexQuiz ", indexQuiz)
  }, [answerApi, indexQuiz])

  return (
    <Container>
      <h1>Quiz số {detailDataQuiz.quizId}</h1>
      <Box
        sx={{
          border: "1px solid var(--fg)",
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          width: { xs: "100%", md: "50%", lg: "50%" },
        }}
      >
        <Typography
          sx={{
            marginBottom: "20px",
            height: { md: "5px", lg: "5px", xs: "50px" },
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
              <Typography variant="h5" sx={{ margin: "20px 0" }}>
                Câu hỏi: {dataQuiz[indexQuiz].description}
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={`data:image/png;base64,${dataQuiz[indexQuiz].imageFile}`}
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
                  >
                    {dataQuiz[indexQuiz].answers.map(
                      (quiz: any, index: number) => {
                        return (
                          <div>
                            <FormControlLabel
                              value={quiz.description}
                              control={
                                <Radio
                                  color="error"
                                  value={quiz.description}
                                  checked={quiz.isSelected}
                                  checkedIcon={<CircleIcon />}
                                  onChange={(e: any) => {
                                    handleCheckbox(e, `${dataQuiz[indexQuiz].id}`, `${quiz.id}`)
                                  }}
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
                {indexQuiz === dataQuiz.length - 1 ? (
                  <Button disabled>Next</Button>
                ) : (
                  <Button variant="contained" onClick={() => handleNextQuiz()}>
                    Next
                  </Button>
                )}
                {indexQuiz === dataQuiz.length - 1 && (
                  <Button onClick={() => {
                    handleSubmit();
                    handleOpen()
                  }}>Submit</Button>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <RightContent open={open} setOpen={setOpen} countCorrect={result.countCorrect}
              countTotal={result.countTotal}
              handleSubmit={handleSubmit}
              handleOpen={handleOpen}
            />
          </Grid>
        </Grid>
      </Box>
      {open === true && <ModalQuizResult open={open} setOpen={setOpen}
        countCorrect={result.countCorrect}
        countTotal={result.countTotal} />}
    </Container>
  );
};

export default DetailQuiz;
