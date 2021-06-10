import React, { useState } from 'react';

import { CircularProgress, Box, Button, Grid, InputBase, Link, makeStyles, Typography } from '@material-ui/core';

import ErrorModal from './ErrorModal';
import SuccessModal from './SuccessModal';


const useStyles = makeStyles((theme) => {
    return {
        footer: {
            padding: theme.spacing(2),
        },

        button: {
            '@media (max-width: 600px)': {
                width: '100%'
            }
        },

        input: {
            color: '#fff',
            marginRight: theme.spacing(1),
            borderBottom: `1px solid #fff`,

            '@media (max-width: 600px)': {
               margin: `0 0 ${theme.spacing(2)}px 0`,
               width: '100%'
            }
        },

        inputContainer: {
            '@media (max-width: 600px)': {
                flexDirection: 'column'
             }
        },

        container: {
            background: theme.palette.primary.main,
            padding: theme.spacing(3),
            color: "#fff",
            // marginBottom: theme.spacing(3),
            '@media (max-width: 600px)': {
                flexDirection: 'column',
                alignItems: 'normal'
            }
        },

        heading: {
            '@media (max-width: 600px)': {
                marginBottom: theme.spacing(2),
                fontSize: '1rem'
            }
        }
    };
});

function Footer() {

    const classes = useStyles();

    const [state, setData] = useState({error: false, message: '', success: false, loading: false});

    const [email, setEmail] = useState('');

    const signupNewsletter = async (e) => {
        e.preventDefault();

        setData((state) => {
            
            return {
                ...state,
                loading: true
            };
        });

        try {

            const res = await fetch('http://localhost:5000/api/newsletter/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email})
            });

            
            const data = await res.json();


            if(!res.ok) {
                throw new Error(data.error);
            }

            setData((state) => {
                return {
                    ...state,
                    loading: false,
                    success: true,
                    message: data.message
                };
            });


        } catch(err) {
            console.log(err);
            setData((state) => {
                return {
                    ...state,
                    loading: false,
                    error: true,
                    message: err.message
                };
            });
        } finally {
            setEmail('');
        }
        


    }

    return (
        <>
             {state.error && <ErrorModal open={(state.error)} closeModal={() => setData((state) => { return { ...state, error: false, message: ''}}) } errorMessage={state.message}/>}
        
            {state.success && <SuccessModal open={state.success} closeModal={() => setData((state) => { return {...state, success: false, message: ''}})}  message={state.message} />}

            <Box className={classes.container} display='flex' alignItems='center' justifyContent='space-around'>
                <Typography className={classes.heading} variant='h6' style={{textTransform: 'uppercase'}}>
                    Sign Up For Newsletter
                </Typography>
                <Box display='inline-flex' className={classes.inputContainer}>
                    <form onSubmit={signupNewsletter}>
                        <InputBase type='email' required value={email} onChange={(e) => {setEmail(e.target.value)}} className={classes.input} color='secondary' placeholder='Email' inputProps={{ 'aria-label': 'description' }}/>
                        <Button type='submit' className={classes.button} variant='contained' color='secondary'>
                            {state.loading ? <CircularProgress style={{color: '#fff'}} size={24}/> : "Sign up" }
                        </Button>
                    </form>
                    
                </Box>
            </Box>
        <footer className={classes.footer}>
 
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3} >
                    <Typography variant='h5'>
                        Collection
                    </Typography>
                    <Box display='flex' alignItems='flex-start' flexDirection='column'>
                                <Link href="#" color='primary' component="button" variant="body2">
                                    Mens
                                </Link>
                                <Link href="#" color='primary' component="button" variant="body2">
                                    Trending
                                </Link>
                                <Link href="#" color='primary' component="button" variant="body2">
                                    Best Seller
                                </Link>

                            
                        </Box>
                </Grid>
                <Grid item xs={12} sm={3} >
                    <Typography variant='h5'>
                        Buy with us
                    </Typography>
                    <Box display='flex' alignItems='flex-start' flexDirection='column'>
                                <Link href="#" color='primary' component="button" variant="body2">
                                    FAQs
                                </Link>
                                <Link href="#" color='primary' component="button" variant="body2">
                                    Cookie Policy
                                </Link>
                                <Link href="#" color='primary' component="button" variant="body2">
                                    Privacy Policy
                                </Link>
                            
                        </Box>
                </Grid>
                <Grid item xs={12} sm={3} >
                    <Typography variant='h5'>
                        About
                    </Typography>
                    <Box display='flex' alignItems='flex-start' flexDirection='column'>
                        <Typography variant='body2'>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus voluptate et, deleniti sit vel veniam.
                        </Typography>
                            
                        </Box>
                </Grid>
                <Grid item xs={12} sm={3} >
                    <Typography variant='h5'>
                        Contact Us
                    </Typography>
                        <Box display='flex' flexDirection='column' alignItems='flex-start'>
                                <Typography   variant="body2">
                                   Address: Address Address Address
                                </Typography>
                                <Typography    variant="body2">
                                    Phone: 011355545
                                </Typography>
                                <Typography   variant="body2">
                                    Email: test@test.com
                                </Typography>
                            
                        </Box>
                        
                </Grid>
            </Grid>
        </footer>
        </>
    );
};

export default Footer;