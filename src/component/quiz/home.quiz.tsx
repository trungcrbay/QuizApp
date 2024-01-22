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
import { AnimatePresence, motion } from "framer-motion"
import Link from 'next/link'

const HomeQuiz = (props: any) => {
  const router = useRouter();
  const { dataQuiz } = props;
  console.log("dât quiz", dataQuiz);
  return (
    <div className="homepage" style={{ height: '100%' }}>
      <Container>
        <AnimatePresence initial={true}>
          <motion.div
            key="modal"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, ease: "linear" }}
            style={{ paddingTop: "100px" }}>
              <Grid container spacing={2} sx={{margin:'0 auto'}}>
              {dataQuiz &&
                dataQuiz.map((item: any) => {
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
                              e.preventDefault();
                            }}
                          >
                            <Link href={`/quiz/${item.id}`} style={{ color: '#000', textDecoration: 'none' }}>
                              Start
                            </Link>
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })}
            </Grid></motion.div></AnimatePresence>


      </Container>
    </div>
  );
};

export default HomeQuiz;
