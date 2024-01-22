import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import Link from 'next/link'


const AppFooter = () => {
    return (
        <Box sx={{ background: '#181821', color: '#a9b3bb' }}>
            <Box sx={{
                paddingTop: '50px', width: {
                    md: '80%',
                    lg: '80%',
                    xs: '90%'
                }, margin: '50px auto 0'
            }}>
                <Grid container spacing={2} >
                    <Grid item xs={6} md={3} lg={3}>
                        <p style={{color:'#fff'}}>ABOUT</p>
                        <ul style={{ listStyle: 'none', marginTop: '10px' }}>
                            <li>
                                Pricing
                            </li>
                            <li style={{ marginTop: '15px' }}>
                                Contact
                            </li>
                        </ul>
                    </Grid>

                    <Grid item xs={6} md={3} lg={3}>
                        <p style={{color:'#fff'}}>PRODUCT</p>
                        <ul style={{ listStyle: 'none', marginTop: '10px' }}>
                            <li>
                                Update
                            </li>
                            <li style={{ marginTop: '15px' }}>
                                Blog
                            </li>
                        </ul>
                    </Grid>

                    <Grid item xs={6} md={3} lg={3}>
                        <p style={{color:'#fff'}}>SOCIALS</p>
                        <ul style={{ listStyle: 'none', marginTop: '10px' }}>
                            <li>
                                <Link href={'https://github.com/trungcrbay'}
                                    style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#a9b3bb', textDecoration: 'none' }}>
                                    <GitHubIcon />
                                    GitHub
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href={'https://www.facebook.com/profile.php?id=100090748884506'}
                                    style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#a9b3bb', textDecoration: 'none', marginTop: '15px' }}>
                                    <FacebookIcon />
                                    Facebook
                                </Link>
                            </li>
                        </ul>
                    </Grid>

                    <Grid item xs={6} md={3} lg={3}>
                        <p style={{color:'#fff'}}>HELP & INFO</p>
                        <ul style={{ listStyle: 'none', marginTop: '10px' }}>
                            <li>
                                Terms And Conditions
                            </li>
                            <li style={{ marginTop: '15px' }}>
                                Privacy Policy
                            </li>
                        </ul>
                    </Grid>
                </Grid>

                <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
                    <p>Made by trungcrbay with 💚</p>
                    <p style={{ padding: '15px 0', color: 'gray' }}>© QuizzApp 2024. All Rights Reserved.</p>
                </Box>
            </Box>
        </Box>
    )
}

export default AppFooter;