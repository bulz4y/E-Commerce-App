import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { FormControl, CircularProgress, Button, Divider, Box, Typography, TextField } from '@material-ui/core';

import Navigation from '../../components/Navigation';
import ErrorModal from '../../components/ErrorModal';

import { SignupSchema } from '../../shared/utils/validation';
import { AuthUser } from '../../actions/userActions/userActions';
import { closeErrorModal } from '../../shared/utils/closeErrorModal';




function Signup() {
  
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: SignupSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values) => {  
            // Submit Form

            const data = {
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword
            };

            dispatch(AuthUser('http://localhost:5000/api/user/signup',data));
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
                                Signup
                            </Typography>

                            <form onSubmit={formik.handleSubmit} noValidate>
                                <FormControl fullWidth margin='normal' >
                                    <TextField  
                                        id='email'
                                        name='email'
                                        required={false}
                                        inputProps={{ 'aria-label': 'description' }} 
                                        type='email' 
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
                                        helperText={formik.errors.password && formik.errors.password}
                                        value={formik.values.password}
                                        error={formik.errors.password && true}
                                    />
                                </FormControl>

                                <FormControl fullWidth margin='normal'>
                                    <TextField
                                        id='confirmPassword'
                                        name='confirmPassword'
                                        inputProps={{ 'aria-label': 'description' }} 
                                        type='password' 
                                        placeholder='Confirm Password...'
                                        onChange={formik.handleChange}
                                        value={formik.values.confirmPassword}
                                        helperText={formik.errors.confirmPassword && formik.errors.confirmPassword}
                                        error={formik.errors.confirmPassword && true}
                                    />
                                </FormControl>

                            

                            <Box my={2}>
                                <Button fullWidth variant='contained' type='submit' color='primary'>
                                    {loading ? <CircularProgress style={{color: '#fff'}} size={24}/> : 'Signup' }
                                </Button>
                            </Box>
                            
                            </form>

                            <Box  my={2} display='flex' alignItems='center' justifyContent='center'>
                                    <Divider variant='middle' style={{width: '40%', display: 'inline-block'}}/>
                                        or
                                    <Divider variant='middle' style={{width: '40%', display: 'inline-block'}}/>
                            </Box>

                            <Box my={2}>
                                    <Button fullWidth variant='contained' to='/login' component={Link} color='primary'>
                                        Login
                                    </Button>
                            </Box>
                        

                </Box>
            </Box>
        </>
    );
};

export default Signup;