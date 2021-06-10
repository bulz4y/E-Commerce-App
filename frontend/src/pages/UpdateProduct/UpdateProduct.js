import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Typography, Box, FormControl, CircularProgress, TextField, Button, InputLabel, Select, MenuItem } from '@material-ui/core';


import Navigation from '../../components/Navigation';
import ErrorModal from '../../components/ErrorModal';
import SuccessModal from '../../components/SuccessModal';

import { CreateProductSchemaAdmin } from '../../shared/utils/validation';
import { fetchSubcategories } from '../../actions/categoriesActions/categoriesActions';
import { closeSuccessModal, updateProduct } from '../../actions/adminActions/adminActions';
import { closeErrorModal } from '../../shared/utils/closeErrorModal';
import { fetchProduct } from '../../actions/singleProductActions/singleProductActions';



function UpdateProduct(props) {

    const imageFile = useRef();

    const params = useParams();

    const categories = useSelector((state) => state.categories.categories);

    const product = useSelector((state) => state.singleProduct.product);

    const subcategory = useSelector((state) => state.categories.subcategory);

    const { loading, error, message } = useSelector((state) => state.admin);
    const categoryError = useSelector((state) => state.categories.error);
    const singleProductError = useSelector((state) => state.singleProduct.error);


    const token = useSelector((state) => state.user.user.token);

    const dispatch = useDispatch();

  
    let values = {
        title: product.name || '',
        price: product.price ||'',
        quantity: product.quantity || '',
        description: product.description || '',
        parentCategory: product.categoryId ? product.categoryId.parent : '',
        childCategory: subcategory.length > 0 && product.categoryId ? product.categoryId._id : '',
        image: ''
    };

    const formik = useFormik({
        
        initialValues: values,
        enableReinitialize: true,

        validationSchema: CreateProductSchemaAdmin,
        validateOnChange: false,
        validateOnBlur: false,

        onSubmit(values) {
            let formData = new FormData();

            for(let key in values) {
                formData.append(key, values[key]);
            }

            formData.append('id', product._id);

            if(imageFile.current) {
                formData.append('imageFile', imageFile.current);
            }
            
            dispatch(updateProduct('http://localhost:5000/api/admin/updateProduct/', formData, token));
          

        }
    });

    const fetchSubcategory = (val) => {
        
        const parent = val;
        
        dispatch(fetchSubcategories(`http://localhost:5000/api/products/subcategory/${parent}`));
        
        formik.setFieldValue('childCategory', '');

    }
  
    useEffect(() => {
        dispatch(fetchProduct(`http://localhost:5000/api/products/${params.productId}`));
    }, [dispatch, params.productId]);

    useEffect(() => {
        
        if(formik.values.parentCategory !== '') {
            
            dispatch(fetchSubcategories(`http://localhost:5000/api/products/subcategory/${formik.values.parentCategory}`));
        }
        
    }, [dispatch, formik.values.parentCategory]);

  
    return (
        <>
         {(error || categoryError || singleProductError) && <ErrorModal open={(!!error || !!categoryError || !!singleProductError)} closeModal={closeErrorModal} errorMessage={error || categoryError || singleProductError}/>}
        
         {message && <SuccessModal color={'rgb(0, 150, 136)'} open={!!message} closeModal={() => dispatch(closeSuccessModal())} message={message} />}

            <Navigation />
            <Box p={2}>
                <Typography variant='h4' style={{textAlign: 'center'}}>Update Product</Typography>

                <form onSubmit={formik.handleSubmit}>
                            <FormControl fullWidth margin='normal' >
                                    <TextField  
                                        id='title'
                                        name='title'
                                        type='text'
                                        inputProps={{ 'aria-label': 'description' }} 
                                        placeholder='Enter Title...' 
                                        onChange={formik.handleChange}
                                        value={formik.values.title}
                                        helperText={formik.errors.title && formik.errors.title}
                                        error={formik.errors.title && true}
                                        
                                    />
                                </FormControl>

                                <FormControl fullWidth margin='normal'>
                                    <InputLabel id="parent category">Parent Category</InputLabel>
                                    
                                    <Select
                                        id='parentCategory'
                                        name='parentCategory'  
                                        labelId="parent-category"
                                        value={formik.values.parentCategory}
                                        onChange={(e) => {
                                           
                                            formik.handleChange(e);
                                            fetchSubcategory(e.target.value);
                                            
                                           
                                            
                                        }}
                                        // helperText={formik.errors.parentCategory && formik.errors.parentCategory}
                                        error={formik.errors.parentCategory && true}
                                    >
                                        {categories.map((c) => {
                                            return (
                                                <MenuItem 
                                                    key={c._id}
                                                    value={c._id}
                                                >
                                                    {c.name}
                                                </MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth margin='normal'>
                                    <InputLabel id="child-category">Child Category</InputLabel>
                                    
                                    <Select
                                        id='childCategory'
                                        name='childCategory'
                                        labelId="child-category"
                                        value={subcategory.length > 0 ? formik.values.childCategory : ''}
                                        onChange={formik.handleChange}
                                        // helperText={formik.errors.childCategory && formik.errors.childCategory}
                                        error={formik.errors.childCategory && true}
                                    >
                                        {subcategory && subcategory.map((sc) => {
                                            return (
                                                <MenuItem value={sc._id} key={sc._id}>
                                                    {sc.name}
                                                </MenuItem>
                                            )
                                        })}
                                        {/* <MenuItem value={"10"}>Ten</MenuItem>
                                        <MenuItem value={"20"}>Twenty</MenuItem>
                                        <MenuItem value={"30"}>Thirty</MenuItem> */}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth margin='normal'>
                                    <TextField 
                                        id='price'
                                        name='price'
                                        inputProps={{ 'aria-label': 'description' }} 
                                        type='number' 
                                        placeholder='Enter Price...'
                                        onChange={formik.handleChange}
                                        value={formik.values.price}
                                        helperText={formik.errors.price && formik.errors.price}
                                        error={formik.errors.price && true}
                                       
                                    />
                                </FormControl>

                                <FormControl fullWidth margin='normal'>
                                    <TextField 
                                        id='quantity'
                                        name='quantity'
                                        inputProps={{ 'aria-label': 'description' }} 
                                        type='number' 
                                        placeholder='Enter Quantity...'
                                        onChange={formik.handleChange}
                                        value={formik.values.quantity}
                                        helperText={formik.errors.quantity && formik.errors.quantity}
                                        error={formik.errors.quantity && true}
                                       
                                    />
                                </FormControl>

                                <FormControl fullWidth margin='normal' >
                                    <TextField 
                                        multiline
                                        id='description'
                                        name='description'
                                        inputProps={{ 'aria-label': 'description', rows: 5}} 
                                        placeholder='Enter description...'
                                      
                                        onChange={formik.handleChange}
                                        value={formik.values.description}
                                        helperText={formik.errors.description && formik.errors.description}
                                        error={formik.errors.description && true}
                                       
                                    />
                                </FormControl>

                                <FormControl fullWidth margin='normal' >
                                

                                    <TextField 
                                        id='image'
                                        name='image'
                                        inputProps={{ 'aria-label': 'image', accept: 'image/*'}} 
                                        type='file'
                                        onChange={(e) => {
                                            imageFile.current = e.target.files[0];
                                            formik.handleChange(e);
                                        }}
                                        value={formik.values.image}
                                        helperText={formik.errors.image && formik.errors.image}
                                        error={formik.errors.image && true}
                                       
                                    />
                                </FormControl>


                                <Box my={2}>
                                    <Button  variant='contained'  color='primary' type='submit'>
                                        {loading ? <CircularProgress style={{color: '#fff'}} size={24}/> : null}
                                        <span style={{visibility: loading ? 'hidden' : "visible"}}>Update Product</span>    
                                    </Button>
                                </Box>
                </form>

            </Box>
            
        </>
    );
};

export default UpdateProduct;
