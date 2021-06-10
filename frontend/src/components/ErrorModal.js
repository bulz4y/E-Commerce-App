import React from 'react';

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
        background: theme.palette.primary.main,
        color: '#fff',
        padding: theme.spacing(2)
    },

    body: {
        padding: theme.spacing(2)
    },

    footer: {
        padding: theme.spacing(2)
    }
  }));

function ErrorModal(props) {
    const classes = useStyles();

    return (
        <Modal
            open={props.open}
            onClose={props.closeModal}
        >
            <div className={classes.modal}>
                <Typography className={classes.header}>
                    An Error Occured.
                </Typography>
                <Typography className={classes.body}>
                    {props.errorMessage}
                </Typography>
            
                <Box className={classes.footer}>
                    <Button variant='contained' color='primary' onClick={props.closeModal}>
                        Okay
                    </Button>
                </Box>
            </div>
        </Modal>
    )
    
}

export default ErrorModal;