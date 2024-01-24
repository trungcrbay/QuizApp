'use client'
import classes from './homepage.module.css';
import { AnimatePresence, motion } from "framer-motion"
import Link from 'next/link'
import Box from '@mui/material/Box';
import React, { useEffect, useRef } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import AppFooter from '../footer/app.footer';
import Divider from '@mui/material/Divider';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: 300,
    md: 400,
    lg: 400
  },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: '#000'
};



const HomePage = () => {
  const linkRef = useRef(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEnterPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && linkRef.current) {
      //@ts-ignore
      linkRef.current.click();
    }
  };

  const router = useRouter()

  const myRef = useRef(null);

  const onScrollToTop = () => {
    //@ts-ignore
    myRef.current!.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    //@ts-ignore
    document.addEventListener('keydown', handleEnterPress);
  }, []);

  const CustomExpandIcon = () => {
    return (
      <Box
        sx={{
          ".Mui-expanded & > .collapsIconWrapper": {
            display: "none"
          },
          ".expandIconWrapper": {
            display: "none"
          },
          ".Mui-expanded & > .expandIconWrapper": {
            display: "block"
          }
        }}
      >
        <div className="expandIconWrapper" style={{ color: 'var(--fg)' }}><CloseIcon /></div>
        <div className="collapsIconWrapper" style={{ color: 'var(--fg)' }}><AddIcon /></div>
      </Box>
    );
  };
  return (
    <>
      <Box sx={{
        paddingTop: {
          xs: 0,
          md: '65px',
          lg: '65px'
        }
      }}>

        <AnimatePresence initial={true}>
          <motion.div className={classes.homepage}
            ref={myRef}
          >
            <div className={classes.content}>
              <motion.div
                style={{ marginTop: '10px' }}
                className={classes.main_text}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01]
                }}
              >
                <h1 className={classes.highlightText}>Welcome to quiz website </h1>
                <h1 className={classes.after_hightlight_text}>for challenging your general knowledge </h1>
              </motion.div>


              <motion.div
                className={classes.introduce_text}
              >
                <div className={classes.introduce_box}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4} lg={4}>
                      <motion.div
                        style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.8,
                          delay: 0.8,
                          ease: [0, 0.71, 0.2, 1.01]
                        }}
                      >
                        <CheckCircleIcon style={{ color: 'green' }} />
                        <span className={classes.introduce_main_text}>Test yourself by challenging quiz</span>
                      </motion.div>
                    </Grid>

                    <Grid item xs={12} md={4} lg={4}>
                      <motion.div
                        style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.8,
                          delay: 1.1,
                          ease: [0, 0.71, 0.2, 1.01]
                        }}
                      >
                        <CheckCircleIcon style={{ color: 'green' }} />
                        <span className={classes.introduce_main_text}>Take a break to relieve stress</span>
                      </motion.div>
                    </Grid>

                    <Grid item xs={12} md={4} lg={4}>
                      <motion.div
                        style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.8,
                          delay: 1.4,
                          ease: [0, 0.71, 0.2, 1.01]
                        }}
                      >
                        <CheckCircleIcon style={{ color: 'green' }} />
                        <span className={classes.introduce_main_text}>Gamify learning with images</span>
                      </motion.div>
                    </Grid>
                  </Grid>
                </div>

              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 1.7,
                  ease: [0, 0.71, 0.2, 1.01]
                }}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    textShadow: "0px 0px 8px rgb(255,255,255",
                    boxShadow: "0px 0px 8px rgb(255,255,255",
                  }}
                  transition={{
                    duration: 0.3
                  }}
                  className={classes.start_button}
                >
                  <Link href="/quiz" style={{ color: 'var(--fg)', textDecoration: 'none' }} ref={linkRef} className={classes.button}> Let start quiz</Link>
                </motion.button>
                <Box sx={{ fontSize: '12px', marginTop: '10px' }}>
                  press <strong>Enter ↵</strong>
                </Box>
              </motion.div>
              <motion.div
                style={{ marginTop: '50px' }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 2,
                  ease: [0, 0.71, 0.2, 1.01]
                }}
              >
                <video className={classes.video} loop muted autoPlay preload='auto' playsInline>
                  <source src="quiz_video.mp4" type='video/mp4' />
                </video>
              </motion.div>

              <motion.div
                className={classes.quote}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 2.3,
                  ease: [0, 0.71, 0.2, 1.01]
                }}
              >
                <span className="" style={{ color: 'rgba(91,100,113,.5)' }}>
                  <svg width="50" height="50" viewBox="0 0 101 84" fill="none" xmlns="http://www.w3.org/2000/svg" >
                    <path d="M32.9468 38.0905C30.4839 37.3814 28.0209 37.0216 25.6251 37.0216C21.9255 37.0216 18.8384 37.8671 16.4447 38.9024C18.7524 30.4541 24.2961 15.8768 35.3395 14.2352C35.8402 14.1606 36.3087 13.9428 36.6884 13.608C37.0681 13.2731 37.3428 12.8356 37.4794 12.3481L39.893 3.71521C39.9938 3.35455 40.0163 2.97648 39.9588 2.60643C39.9013 2.23638 39.7652 1.88294 39.5596 1.56988C39.3541 1.25683 39.0839 0.991426 38.7673 0.791528C38.4506 0.591631 38.0948 0.461876 37.7238 0.410997C36.9054 0.299494 36.0804 0.243422 35.2545 0.243164C21.9989 0.243164 8.87121 14.0789 3.33168 33.8894C0.0799197 45.5119 -0.87358 62.9853 7.13624 73.9836C11.6184 80.1379 18.1576 83.4242 26.5723 83.7526L26.6751 83.7547C37.0577 83.7547 46.2643 76.7623 49.0651 66.7521C49.8961 63.8113 50.1356 60.7348 49.7698 57.7007C49.4039 54.6666 48.4399 51.7352 46.9336 49.0762C43.9178 43.7213 38.951 39.8181 32.9468 38.0905ZM97.939 49.0773C94.9233 43.7213 89.9565 39.8181 83.9522 38.0905C81.4893 37.3814 79.0263 37.0216 76.6316 37.0216C73.4745 37.0121 70.3492 37.6523 67.4501 38.9024C69.7578 30.4541 75.3015 15.8768 86.346 14.2352C86.8466 14.1604 87.3149 13.9425 87.6946 13.6077C88.0742 13.2729 88.349 12.8355 88.4858 12.3481L90.8995 3.71521C91.0003 3.35455 91.0227 2.97648 90.9652 2.60643C90.9077 2.23638 90.7716 1.88294 90.5661 1.56988C90.3606 1.25683 90.0904 0.991426 89.7737 0.791528C89.4571 0.591631 89.1012 0.461876 88.7302 0.410997C87.9119 0.299424 87.0869 0.243352 86.261 0.243164C73.0053 0.243164 59.8777 14.0789 54.3371 33.8894C51.0864 45.5119 50.1329 62.9853 58.1438 73.9857C62.6249 80.1389 69.1651 83.4263 77.5788 83.7536L77.6826 83.7557C88.0641 83.7557 97.2719 76.7634 100.073 66.7532C100.903 63.8121 101.141 60.7356 100.775 57.7017C100.409 54.6677 99.445 51.7364 97.939 49.0773Z" fill="currentColor">
                    </path>
                  </svg>
                </span>

                <div className={classes.main_quote}>
                  <h2 className={classes.highlightText}>The more quiz you do</h2>
                  <h2 className={classes.main_quote_2}>The more knowledge you get</h2>
                </div>

                <div className={classes.home_img}>
                  <img src="/woman.png" />
                </div>
              </motion.div>

              <motion.div
                className={classes.contain_box_1}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01]
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6} lg={6}
                    sx={{
                      order: {
                        xs: 1,
                        lg: 0,
                        md: 0
                      }
                    }}>
                    <div style={{ position: 'relative' }} className={classes.relative_image}>
                      <div className={classes.choose_img}>
                        <img src='check_answer.jpg' style={{ width: '90%', borderRadius: '10px' }} />
                      </div>

                      <div className={classes.double_image}>
                        <img src='choose_answer.jpg' style={{ borderRadius: '10px', width: '90%' }} />
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={12} md={6} lg={6} sx={{
                    order: {
                      xs: 0,
                      lg: 1,
                      md: 1
                    }
                  }}>
                    <div className={classes.contain_box_1_content}>
                      <h2 className={classes.contain_box_title}>Doing your quiz</h2>
                      <p>Unlock your hidden knowledge and unveil your true entertainment prowess. Dive into a realm of trivia, Where can you relieve stress after work. </p>
                      <p>🏆 Are you ready to conquer the quiz?</p>
                    </div>
                  </Grid>
                </Grid>
              </motion.div>

              <motion.div
                className={classes.contain_box_1}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01]
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6} lg={6}
                    sx={{
                      order: {
                        xs: 0,
                        lg: 1,
                        md: 1
                      }
                    }}>
                    <div style={{ position: 'relative' }} className={classes.relative_image}>
                      <div className={classes.double_image}>
                        <video className={classes.video} style={{ width: '100%' }} loop muted autoPlay preload='auto' playsInline>
                          <source src='admin.mp4' type='video/mp4' />
                        </video>
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={12} md={6} lg={6} sx={{
                    order: {
                      xs: 1,
                      md: 0,
                      lg: 0
                    }
                  }}>
                    <div className={classes.contain_box_1_content}>
                      <h2 className={classes.contain_box_title}>Become admin</h2>
                      <p>
                        Unleash Your Inner Quiz Master: Become an Admin on Your Favourite Quiz App!</p>
                      <p>Ever dreamt of crafting brain-bending trivia, curating captivating categories, and shaping the ultimate quizzing experience? Well, step aside, tired quizzes, because it's time to become an admin on your favourite quiz app!</p>
                    </div>
                  </Grid>
                </Grid>
              </motion.div>

              <motion.div
                className={classes.contain_box_1}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01]
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6} lg={6}
                    sx={{
                      order: {
                        xs: 1,
                        lg: 0,
                        md: 0
                      }
                    }}>
                    <div style={{ position: 'relative' }} className={classes.relative_image}>
                      <div className={classes.double_image}>
                        <img src='history.jpg' style={{ borderRadius: '10px', width: '90%' }} />
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={12} md={6} lg={6} sx={{
                    order: {
                      xs: 0,
                      lg: 1,
                      md: 1
                    }
                  }}>
                    <div className={classes.contain_box_1_content}>
                      <h2 className={classes.contain_box_title} >Check your history</h2>
                      <p>Your brain's battle scars and victory laps, all on display. Relive the thrill (or cringe) of past quizzes with 'Check your history'.</p>
                    </div>
                  </Grid>
                </Grid>
              </motion.div>

              <div style={{ marginTop: '30px' }}>
                <h2 style={{ textTransform: 'uppercase' }}>Things you might wonder</h2>
                <div className={classes.accordian} >
                  <Accordion disableGutters sx={{
                    boxShadow: 'none',
                    background: 'var(--bg-accordian )',
                    color: 'var(--fg)'
                  }} >
                    <AccordionSummary
                      expandIcon={<CustomExpandIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography>What about QuizzApp?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography sx={{ textAlign: 'start' }}>
                        A fun and engaging way to test your knowledge on various topics, from trivia to specific subjects.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion disableGutters sx={{
                    boxShadow: 'none', background: 'var(--bg-accordian )',
                    color: 'var(--fg)'
                  }}>
                    <AccordionSummary
                      expandIcon={<CustomExpandIcon />}
                      aria-controls="panel2-content"
                      id="panel2-header"
                    >
                      <Typography>How does it work?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography sx={{ textAlign: 'start' }}>
                        Browse through different categories or search for specific quizzes.
                        You answer multiple-choice questions, true/false, or other engaging formats.
                        Track your progress with detailed scoring and see where you rank on leaderboards.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion disableGutters sx={{
                    boxShadow: 'none', background: 'var(--bg-accordian )',
                    color: 'var(--fg)'
                  }}>
                    <AccordionSummary
                      expandIcon={<CustomExpandIcon />}
                      aria-controls="panel3-content"
                      id="panel3-header"
                    >
                      <Typography>Why use it?</Typography>
                    </AccordionSummary>
                    <AccordionDetails >
                      <Typography sx={{ textAlign: 'start' }}>
                        Browse through different categories or search for specific quizzes.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion disableGutters sx={{
                    boxShadow: 'none',
                    background: 'var(--bg-accordian )',
                    color: 'var(--fg)'
                  }} >
                    <AccordionSummary
                      expandIcon={<CustomExpandIcon />}
                      aria-controls="panel4-content"
                      id="panel4-header"
                    >
                      <Typography>Is there a mobile or desktop app?</Typography>
                    </AccordionSummary>
                    <AccordionDetails >
                      <Typography sx={{ textAlign: 'start' }}>
                        Although QuizzApp is primarily designed for desktop usage, some features are still available on mobile browsers.
                        For the best experience, we recommend accessing QuizzApp through a desktop browser.
                        However, we are planning to release a dedicated mobile version in the future.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>

              <ArrowDropUpIcon className={classes.fixed_icon_to_top} onClick={() => onScrollToTop()} />
              <CardGiftcardIcon className={classes.gift_icon} onClick={() => handleOpen()} />

              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slotProps={{
                  backdrop: {
                    timeout: 500,
                  },
                }}
              >
                <Fade in={open}>
                  <Box sx={style}>
                    <div style={{ width: '100%', position: 'relative' }}>
                      <CloseIcon sx={{ position: 'absolute', right: '0', cursor: 'pointer' }} onClick={() => handleClose()} />
                    </div>
                    <h3 style={{ paddingTop: '30px' }}>Use this account for testing this app</h3>
                    <div style={{ marginTop: '15px' }}>
                      <p id="transition-modal-title">
                        Username: trungnguyen@gmail.com
                      </p>
                      <p id="transition-modal-description">
                        Password: 123456
                      </p>
                      <p style={{ color: '#FF0000', marginTop: '20px' }}>To get maximum experience, we recommend you should use PC/Laptop. Thanks!</p>
                      <div style={{ width: '100%' }}>
                        <Button variant="contained" sx={{ display: 'block', margin: '10px auto' }} onClick={() => router.push('/signin')}>LOGIN</Button>
                      </div>
                    </div>
                  </Box>
                </Fade>
              </Modal>

              <Divider sx={{ margin: '30px 0', background: 'var(--fg)' }} />
            </div>
            <AppFooter />
          </motion.div >
        </AnimatePresence>

      </Box >
    </>
  );
};

export default HomePage;
