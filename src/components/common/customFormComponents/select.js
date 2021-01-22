import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import React, { forwardRef } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    Select: {
        width: '100%',
    }
  }));

export const CustomSelect = forwardRef((props, ref) => {
    const classes = useStyles();
    return (
        <>
            <FormControl error={props.error} className={classes.formControl}>
                <InputLabel htmlFor={props.labelId}>{props.placeholder}</InputLabel>
                <Select
                    className={classes.Select}
                    margin="normal"
                    fullWidth
                    inputRef={ref}
                    {...props}
                >
                    {!_.isEmpty(props.options) && props.options.map((e, i) => (
                        <MenuItem key={e.value + i} value={e.count? e.count : e.label}>{e.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    )
})