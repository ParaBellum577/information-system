
import React, { forwardRef } from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      width: '80%',
      marginTop: theme.spacing(1)
    },
}));

export const Form = forwardRef(({children, ...props}) => {
    const classes = useStyles();
return <form className={classes.root} noValidate {...props}>{children}</form>
})