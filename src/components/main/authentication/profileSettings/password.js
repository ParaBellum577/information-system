import React, { memo, useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { CustomInput } from 'common/customFormComponents/customInput';
import { Form } from 'common/customFormComponents/Form';
import PswPopOver from 'common/passwordPopOver';

import buttons from '../../../buttons.module.scss';
import styles from './index.module.scss';
import hidePasswordIcon from '../../../style/img/Icon_hide_password.svg';
import showPasswordIcon from '../../../style/img/Icon_show_password.svg';


const Password = function ({ t, userId }) {
    const [error, setError] = useState('')
    const [sucsess, setSucsess] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

   const changePassword = async data => {
    try {
        await axios.post(
            `/api/stakeholder/changePassword`,
            {
                newPassword: data.newPassword,
                oldPassword: data.oldPassword,
                id: userId,
            }
        );
        setOldPassword('');
        setNewPassword('');
        setError('');
        setSucsess(true);
        } catch (error) {
          console.log('changePassword error:', error.message);
          setSucsess(false);
          if(error.message === "Request failed with status code 400" || error.message === "Request failed with status code 500") {
            setError(t('The old password is incorrect'))
          }
        }
    };

    const schema = yup.object().shape({
        oldPassword: yup.string().required(),
        newPassword: yup.string().required(),
    });

    const handleNewPsw = event => {
        setNewPassword(event.target.value);
    }
    const handleOldPsw = event => {
        setOldPassword(event.target.value);
    }
    const { register, handleSubmit, errors } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schema),
    });

    const showOldPassword = () => {
        const pass = document.getElementById('old-psw');
        if (pass.type === 'text') {
            pass.type = 'password';
            document.getElementById('eye1').src = hidePasswordIcon;
        } else {
            pass.type = 'text'
            document.getElementById('eye1').src = showPasswordIcon;
        }
    }
    const showNewPassword = () => {
        const pass = document.getElementById('new-psw');
        if (pass.type === 'text') {
            pass.type = 'password';
            document.getElementById('eye2').src = hidePasswordIcon;
        } else {
            pass.type = 'text'
            document.getElementById('eye2').src = showPasswordIcon;
        }
    }
    useEffect(() => {

    },[error]);

    const onSubmit = async values => {
        changePassword(values);
    }

    return (
        <>
            <div className="widget">
                <div className="widget-header"><h2>{t("Change password")}</h2></div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.inputGroup}>
                        <CustomInput
                            ref={register}
                            error={!!errors.oldPassword}
                            id="old-psw"
                            type="password"
                            name="oldPassword"
                            label={t("Old password")}
                            variant="outlined"
                            value={oldPassword}
                            onChange={handleOldPsw}
                        />
                        <img
                            id='eye1'
                            onClick={showOldPassword}
                            src={hidePasswordIcon}
                            className={styles.hidePsw}
                            alt="eye"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <CustomInput
                            ref={register}
                            error={!!errors.newPassword}
                            id="new-psw"
                            type="password"
                            name="newPassword"
                            label={t("New password")}
                            onChange={handleNewPsw}
                            variant="outlined"
                            value={newPassword}
                        />
                        <img
                            id='eye2'
                            onClick={showNewPassword}
                            src={hidePasswordIcon}
                            className={styles.hidePsw}
                            alt="eye"
                        />
                        <PswPopOver
                            password={newPassword}
                            target="new-psw"
                        />
                    </div>
                    {
                        error !== '' &&
                        <span className={styles.errorMessage}>{error}</span>
                    }
                    {
                        sucsess &&
                        <span className={styles.sucsessMessage}>{t('Password changed successfully')}</span>
                    }
                    <button className={`${styles.button} ${buttons.buttonConfirm}`} type="submit">{t('Save changes')}</button>
                </Form>
            </div>
        </>
    )
}

export default memo(Password);