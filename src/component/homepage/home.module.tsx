'use client'
import classes from './homepage.module.css';
import { AnimatePresence, motion } from "framer-motion"
import Link from 'next/link'
import Box from '@mui/material/Box';
import { useEffect, useRef } from 'react';

const HomePage = () => {
  const linkRef = useRef(null);
  const handleEnterPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && linkRef.current) {
      //@ts-ignore
      linkRef.current.click();
    }
  };
  useEffect(() => {
    //@ts-ignore
    document.addEventListener('keydown', handleEnterPress);
  }, []);
  return (
    <Box sx={{
      paddingTop: {
        xs: 0,
        md: '65px',
        lg: '65px'
      }
    }}>
      <AnimatePresence initial={true}>
        <motion.div className={classes.homepage}
        >
          <div className={classes.content}>
            <motion.h1
              style={{ marginTop: '10px' }}
              initial={{ y: -250 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
            >Welcome to Quiz Web</motion.h1>

            <div className={classes.home_img}>
              <img src="/homequiz.png" />
            </div>

            <motion.div
              initial={{ x: '-100vw' }}
              animate={{ x: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
              style={{ width: '100%', marginTop: '40px', textAlign: 'center' }}>
              <h2 className={classes.text_score}>If you get a high score, you probably spend
                <em> way </em>
                too much time on Wikipedia.</h2>
            </motion.div>

            <motion.div
              initial={{ x: '-100vw' }}
              animate={{ x: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
              style={{ width: '100%', marginTop: '20px', textAlign: 'center' }}>
              <h2
                className={classes.text_introduce}>There are a few questions and a break for refreshments in the middle.
                (You'll have to provide your own snacks, sorry.)</h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
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
                <Link href="/quiz" style={{ color: 'var(--fg)', textDecoration: 'none' }} ref={linkRef}> Start Quiz</Link>
              </motion.button>
              <Box sx={{ fontSize: '12px', marginTop: '10px' }}>
                press <strong>Enter ↵</strong>
              </Box>
            </motion.div>
          </div>
        </motion.div >
      </AnimatePresence>

    </Box >
  );
};

export default HomePage;
