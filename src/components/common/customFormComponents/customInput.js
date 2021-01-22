import React, { forwardRef } from 'react'
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
    //   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    //   border: 0,
    //   borderRadius: 3,
    //   boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    //   color: 'white',
    //   height: 48,
    //   padding: '0 30px',
    },
});

export const CustomInput = forwardRef((props, ref) => {
    const classes = useStyles();
    return <TextField className={classes.root} margin="normal" fullWidth inputRef={ref} {...props}/>
})