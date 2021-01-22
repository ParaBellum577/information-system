import React, { useState, memo } from 'react';
import _ from 'lodash';
import Popup from 'reactjs-popup';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { userLogin } from 'actions/user';
import { CustomInput } from 'common/customFormComponents/customInput';
import { Form } from 'common/customFormComponents/Form';

import styles from './index.module.scss';
import buttons from '../../buttons.module.scss';
import 'reactjs-popup/dist/index.css';

import close from '../../style/img/close.svg';
import hidePasswordIcon from '../../style/img/Icon_hide_password.svg';
import showPasswordIcon from '../../style/img/Icon_show_password.svg';


const mapStateToProps = ({ user }) => ({ user });
const actions = { userLogin };

const LoginPopup = function ({ isLoginOpen, handeOpenLogin, t, user, userLogin }) {

  const [loginError, setLoginError] = useState('');

  const showPassword = () => {
    const pass = document.getElementById('psw');
    if (pass.type === 'text') {
      pass.type = 'password';
      document.getElementById('eye').src = hidePasswordIcon;
    } else {
      pass.type = 'text'
      document.getElementById('eye').src = showPasswordIcon;
    }
  }

  const handleConfirm = async values => {
    await userLogin(values);
    if (!_.isEmpty(user.error)) {
      setLoginError(user.error);
    }
  };

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });


  const onSubmit = values => {
    handleConfirm(values);
  }

  return (
    <>
      <Popup
        modal
        nested
        open={isLoginOpen}
        closeOnDocumentClick
        onClose={() => handeOpenLogin(false)}
      >
        <img onClick={() => handeOpenLogin(false)} className={buttons.closeButton} src={close} alt="close" />
        <Form onSubmit={handleSubmit(onSubmit)} className={styles.loginPopUp}>
          <div>
            <h5>{t('Login')}</h5>
            <CustomInput
              ref={register}
              error={!!errors.email}
              id="email"
              type="email"
              name="email"
              label={t("Your email")}
              maxLength={100}
            />
            <div>
              <CustomInput
                id='psw'
                name="password"
                ref={register}
                error={!!errors.password}
                type="password"
                placeholder={t("Your psw")}
                maxLength={100}
              />
              <img
                id='eye'
                onClick={showPassword}
                src={hidePasswordIcon}
                className={styles.hidePsw}
                alt="eye"
              />
            </div>
            {
              loginError !== '' &&
              <span className={styles.errorMessage}>Incorrect email or password</span>
            }
          </div>
          <button
            type="submit"
            className={buttons.buttonConfirm}
          >
            {t('Login')}
          </button>
        </Form>
      </Popup>
    </>
  )
}

export default memo(connect(mapStateToProps, actions)(LoginPopup));
