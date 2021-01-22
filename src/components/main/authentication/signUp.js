import React, { useEffect, useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Multiselect } from 'react-widgets'
import { navigate } from "@reach/router";
import { connect } from 'react-redux';
import { isValidPhoneNumber } from 'react-phone-number-input';
import _ from 'lodash';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';
import { CustomInput } from 'common/customFormComponents/customInput';
import { Form } from 'common/customFormComponents/Form';
import PswPopOver from 'common/passwordPopOver';
import CountrySelector from 'common/countryList';
import DatePicker from 'common/customDatePicker';
import { userSignUp } from 'actions/user';


import 'react-widgets/dist/css/react-widgets.css';
import 'react-phone-number-input/style.css';
import styles from './index.module.scss';
import style from './signUp.module.scss';
import button from '../../buttons.module.scss';

import img from '../../style/laboratory-reg.png';
import backArrow from '../../style/icons/back-arrow.svg';
import hidePasswordIcon from '../../style/img/Icon_hide_password.svg';
import showPasswordIcon from '../../style/img/Icon_show_password.svg';

const actions = { userSignUp };
const incorrect_color = ' error-input-bottom';
const correct_color = ' correct-input-bottom'

const SignUp = function ({ userSignUp }) {
  const { t } = useTranslation();
  const [error, setError] = useState({});

  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidNumber, setIsValidNumber] = useState(false);

  const [occupation, setOccupation] = useState()
  const [nationality, setNationality] = useState('');
  const [countryOfResidence, setCountryOfResidence] = useState('UA');

  const [sourceOfKnowledgeAboutTheLab, setSourceOfKnowledgeAboutTheLab] = useState('');
  const [purposeOfWorkInLab, setPurposeOfWorkInLab] = useState('');

  const [birthdayParams, setBirthdayParams] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [options, setOptions] = useState([t("Student"), t("Entrepreneur"), t("Startuper"), t("Unemployed")]);

  const handleCreate = (name) => {
    let newOption = name;
    setOptions([...options, newOption]);
  }
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
  useEffect(() => {
    if (
      isValidNumber &&
      passwordValid &&
      !error.nationality &&
      !error.countryOfResidence &&
      !error.phoneNumber &&
      !error.occupation
      // phoneNumber !== ''
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [
    isValidNumber,
    phoneNumber,
    countryOfResidence,
    sourceOfKnowledgeAboutTheLab,
    purposeOfWorkInLab,
    birthdayParams,
    nationality,
    occupation,
    password,
    error
  ]);

  useEffect(() => {
    handleChangeNumber();
  }, [phoneNumber]);

  const handleChangeNumber = () => {
    const validPhoneNumber = isValidPhoneNumber(phoneNumber);
    setIsValidNumber(validPhoneNumber);
  }

  const handleChangePsw = e => {
    let passwordValidation = (/[A-Z|А-Я|Ё]+/.test(e.target.value)
      || /\d+/.test(e.target.value))
      && (/[a-z|а-я|ё]+/.test(e.target.value))
      && (/.{8,64}/.test(e.target.value));

    setPassword(e.target.value.trim());
    if (passwordValidation) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  }
  const getBirthdayParams = value => setBirthdayParams(value);
  const getNationality = value => setNationality(value);
  const getCountryOfResidence = value => setCountryOfResidence(value);

  const handleSetOccupation = e => setOccupation(e);
  const handleAboutTheLab = e => setSourceOfKnowledgeAboutTheLab(e.target.value.trim());
  const handlePurposeOfWorkInLab = e => setPurposeOfWorkInLab(e.target.value.trim());

  const handleConfirmForm = async (values) => {
    if(isFormValid) {
      let userData = {
        firstName: values.firstName,
        lastName: values.lastName,
        patronymic: values.patronymic,
        nationality: nationality,
        dateOfBirth: birthdayParams.day,
        monthOfBirth: birthdayParams.month,
        yearOfBirth: birthdayParams.year,
        countryOfResidence: countryOfResidence,
        phone: phoneNumber,
        occupation: occupation,
        email: values.email,
        password: values.password,
        sourceOfKnowledgeAboutTheLab,
        purposeOfWorkInLab
      }
      await userSignUp(userData);
      navigate('/stakeholders/');
    }
  };

  const validate = () => {
    const validPhoneNumber = isValidPhoneNumber(phoneNumber);
    let error = {};
    if (phoneNumber === '' || !validPhoneNumber) {
      error.phoneNumber = true;
    } else {
      error.phoneNumber = false
    }
    if (birthdayParams.day === '') {
      error.day = true;
    } else {
      error.day = false
    }
    if (birthdayParams.year === '') {
      error.year = true;
    } else {
      error.year = false
    }
    if (birthdayParams.month === '') {
      error.month = true;
    } else {
      error.month = false
    }
    if (nationality === null) {
      error.nationality = true;
    } else {
      error.nationality = false
    }
    if (countryOfResidence === null) {
      error.countryOfResidence = true;
    } else {
      error.countryOfResidence = false
    }
    if(_.isEmpty(occupation)) {
      error.occupation = true
    } else {
      error.occupation = false
    }
    return setError(error);
  };

  useEffect(() => {

  }, [error]);

  const schema = yup.object().shape({
    firstName: yup.string().matches(/^([^0-9]*)$/).required(),
    lastName: yup.string().matches(/^([^0-9]*)$/).required(),
    patronymic: yup.string().matches(/^([^0-9]*)$/).required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    aboutTheLab: yup.string(),
    purposeOfWorkInLab: yup.string().required(),
    aboutTheLab: yup.string().required(),
  });

  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });


  const onSubmit = values => {
    handleConfirmForm(values);
    localStorage.setItem('sucsessform', true)
  }


  return (
    <>
      <div id='modal-sign-up' className={styles.modal}>
        <div className={styles.modalLeft}>
          <img src={img} alt="img" />
        </div>
        <div className={styles.modalRight}>
          <img onClick={() => navigate('/')} className={style.arrowBack} title="На головну" src={backArrow} alt="go back" />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h1>{t("Sign Up")}</h1>
            <div className={style.firstInpGroup}>
              <CustomInput
                ref={register}
                error={!!errors.lastName}
                id="last-name"
                type="text"
                name="lastName"
                label={t("Last name")}
              />
              <CustomInput
                ref={register}
                error={!!errors.firstName}
                id="first-name"
                type="text"
                name="firstName"
                label={t("Your name")}
              // helpText={errors.firstName.message}
              />
              <CustomInput
                ref={register}
                error={!!errors.patronymic}
                id="patronymic"
                type="text"
                name="patronymic"
                label={t("Your patronymic")}
              />
            </div>
            <DatePicker
              title
              ref={register}
              inputСolorDay={!!error.day}
              inputColorMonth={!!error.month}
              inputColorYear={!!error.year}
              getParams={getBirthdayParams}
            />
            <div className={style.thirdInpGroup}>
              <CountrySelector
                handleCallback={getNationality}
                placeHolder={t("Your citizenship")}
                error={error.nationality}
                ref={register}
                name="nationality"
                id="nationality"
                labelId="nationality-label"

              />
              <CountrySelector
                handleCallback={getCountryOfResidence}
                placeHolder={t("Country of Residence")}
                error={error.countryOfResidence}
                ref={register}
                name="countryOfResidence"
                id="country"
                labelId="coutry-label"
              />
            </div>
            <div className={style.occupation}>
              <Multiselect  
                value={occupation}
                onChange={handleSetOccupation}
                data={options}
                allowCreate="onFilter"
                onCreate={name => handleCreate(name)}
                placeholder={t("Main occupation")}
                filter='contains'
                className={error.occupation ? 'error-select' : ''}
              />
              <PhoneInput
                placeholder={t("Phone number")}
                international
                defaultCountry="UA"
                className={style.inputs + ((!error.phoneNumber) ? `${correct_color}` : `${incorrect_color}`)}
                value={phoneNumber}
                onChange={setPhoneNumber}
              />
            </div>
            <div className={style.mailBlock}>
              <CustomInput
                ref={register}
                error={!!errors.email}
                id="email"
                type="email"
                name="email"
                label={t("Your email")}
                maxLength={100}
              />
                <CustomInput
                  id='psw'
                  name="password"
                  ref={register}
                  error={!!errors.password && !passwordValid}
                  type="password"
                  placeholder={t("Your psw")}
                  maxLength={100}
                  onChange={handleChangePsw}
                />
                <img
                  id='eye'
                  onClick={showPassword}
                  src={hidePasswordIcon}
                  className={styles.hidePsw}
                  alt="eye"
                />
              <PswPopOver
                password={password}
                target="psw"
              />
            </div>
            <div className={style.questions}>
              <div>
                <span>{t("How did you learn about the laboratory?")}</span>
                <CustomInput
                  multiline
                  rows={2}
                  variant="outlined"
                  onChange={handleAboutTheLab}
                  type="text"
                  name="aboutTheLab"
                  ref={register}
                  error={!!errors.aboutTheLab}
                />
              </div>
              <div>
                <span>{t("The purpose of work in the laboratory")}</span>
                <CustomInput
                  multiline
                  rows={2}
                  variant="outlined"
                  onChange={handlePurposeOfWorkInLab}
                  type="text"
                  name="purposeOfWorkInLab"
                  ref={register}
                  error={!!errors.purposeOfWorkInLab}
                />
              </div>
            </div>
            <button
              type="submit"
              onClick={validate}
              className={button.buttonConfirm}
            >
              {t("Send")}
            </button>
          </Form>
        </div>
      </div>
    </>
  )
}


export default memo(connect(null, actions)(SignUp));