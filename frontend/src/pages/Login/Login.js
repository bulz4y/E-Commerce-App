import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { FormControl, Button, TextField, Divider, Box, Typography, CircularProgress } from '@material-ui/core';


import Navigation from '../../components/Navigation';
import ErrorModal from '../../components/ErrorModal';


import { LoginSchema } from '../../shared/utils/validation';
import { AuthUser } from '../../actions/userActions/userActions';
import { closeErrorModal } from '../../shared/utils/closeErrorModal';






function Login() {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LoginSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit:  (values) => {  
            // Submit Form
            const data = {
                email: values.email,
                password: values.password
            };

             dispatch(AuthUser('http://localhost:5000/api/user/login',data));

        }

        
    });

    const loading = useSelector((state) => state.user.loading);
    const error = useSelector((state) => state.user.error);

    const dispatch = useDispatch();


    return (
        <>
            {error && <ErrorModal open={!!error} closeModal={closeErrorModal} errorMessage={error}/>}
            <Navigation />
            <Box 
                display='flex'
                justifyContent="center"
                alignItems="center"
                style={{height: '100%'}}
                p={2}
            >
                <Box boxShadow={10} p={2} borderRadius={4}>
                            <Typography variant='h5' style={{textAlign: 'center'}}>
                                Login
                            </Typography>

                            <form onSubmit={formik.handleSubmit} noValidate>
                                <FormControl fullWidth margin='normal' >
                                    <TextField  
                                        id='email'
                                        name='email'
                                        type='email'
                                        inputProps={{ 'aria-label': 'description' }} 
                                        placeholder='Enter Email...' 
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        helperText={formik.errors.email && formik.errors.email}
                                        error={formik.errors.email && true}
                                    />
                                </FormControl>

                                <FormControl fullWidth margin='normal'>
                                    <TextField 
                                        id='password'
                                        name='password'
                                        inputProps={{ 'aria-label': 'description' }} 
                                        type='password' 
                                        placeholder='Enter Password...'
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                        helperText={formik.errors.password && formik.errors.password}
                                        error={formik.errors.password && true}
                                    />
                                </FormControl>


                                <Box my={2}>
                                    <Button fullWidth variant='contained' color='primary' type='submit'>
                                        {loading ? <CircularProgress style={{color: '#fff'}} size={24}/> : 'Login' }
                                    </Button>
                                </Box>
                            
                            </form>

                            <Box  my={2} display='flex' alignItems='center' justifyContent='center'>
                                    <Divider variant='middle' style={{width: '40%', display: 'inline-block'}}/>
                                        or
                                    <Divider variant='middle' style={{width: '40%', display: 'inline-block'}}/>
                            </Box>

                            <Box my={2}>
                                    <Button fullWidth variant='contained' to='/signup' component={Link} color='primary'>
                                        Signup
                                    </Button>
                            </Box>
                        

                </Box>
            </Box>
        </>
    );
};

export default Login;