import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import { Modal, Typography, Button, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: '#fff',
      width: '80%'
    },

    header: {
        background: theme.palette.success.main,
        color: '#fff',
        padding: theme.spacing(2)
    },

    body: {
        padding: theme.spacing(2)
    },

    footer: {
        padding: theme.spacing(2)
    },

    btn: {
        background: theme.palette.success.main,
        color: '#fff',
        '&:hover': {
            background: theme.palette.success.light
        }
    }


  }));

function SuccessModal(props) {
    const classes = useStyles();

    return (
        <Modal
            open={props.open}
            onClose={props.closeModal}
        >
            <div className={classes.modal}>
                <Typography className={classes.header} >
                    Success!
                </Typography>
                <Typography className={classes.body}>
                    {props.message}
                </Typography>
            
                <Box className={classes.footer}>
                    <Button variant='contained' className={classes.btn} style={{marginRight: '1rem'}} onClick={props.closeModal}>
                        Okay
                    </Button>
                    {props.cart && <Button variant='contained' className={classes.btn} component={Link} to='/cart'>
                        Go To Cart
                    </Button>}
                    
                </Box>
            </div>
        </Modal>
    )
    
}

export default SuccessModal;