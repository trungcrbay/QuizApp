"use client";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useRouter } from "next/navigation";

const HomeQuiz = (props: any) => {
  const router = useRouter();
  const { dataQuiz } = props;
  console.log("dât quiz", dataQuiz);
  return (
    <>
      <Container>
        <Box sx={{ marginTop: "100px" }}>
          <Grid container spacing={2}>
            {dataQuiz &&
              dataQuiz.map((item) => {
                return (
                  <Grid item md={4} xs={12}>
                    <Card sx={{ width: 275 }}>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          Quiz số {item.id}
                        </Typography>
                        <Box style={{ width: "100%" }}>
                          <img
                            src={`data:image/png;base64, ${item.image}`}
                            style={{
                              objectFit: "cover",
                              height: "250px",
                              width: "100%",
                            }}
                          />
                        </Box>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          {item.description}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          onClick={(e) => {
                            router.push(`/quiz/${item.id}`);
                            e.preventDefault();
                          }}
                        >
                          Start
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default HomeQuiz;
