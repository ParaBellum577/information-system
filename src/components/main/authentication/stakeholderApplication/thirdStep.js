import React, { useEffect, useState, memo } from 'react';
import { connect } from 'react-redux';
import { navigate } from '@reach/router'
// import { isValidPhoneNumber } from 'react-phone-number-input'
// import { CustomSelect } from 'common/customFormComponents/select';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { CustomInput } from 'common/customFormComponents/customInput';
import { Form } from 'common/customFormComponents/Form';

import { stakeholderCreate } from 'actions/stakeholders';
import validator from 'validator';
import PhoneInput from 'react-phone-number-input'
import styles from './index.module.scss';
import inputStyle from '../signUp.module.scss';
import buttons from '../../../../components/buttons.module.scss';

import youtube from '../../../style/icons/social/youtube.svg';
import whatsapp from '../../../style/icons/social/whatsapp.svg';
import facebook from '../../../style/icons/social/facebook.svg';
import instagram from '../../../style/icons/social/instagram.svg';
import telegram from '../../../style/icons/social/telegram.svg';
import twitter from '../../../style/icons/social/twitter.svg';

const mapStateToProps = ({ user }) => ({ user });
const actions = { stakeholderCreate };

const ThirdStep = ({ handleChangeStep, t, stakeholderCreate, user }) => {
    const [userSettings, setUserSettings] = useState(JSON.parse(localStorage.getItem('stakeholderAppThird')) || {});
    const [userSettingsFirst] = useState(JSON.parse(localStorage.getItem('stakeholderAppFirst')) || {});
    const [userSettingsSecond] = useState(JSON.parse(localStorage.getItem('stakeholderAppSecond')) || {});

    const [isValidNumber, setIsValidNumber] = useState(true);
    const [isEmailValid, setEmailValid] = useState(false);

    const [isFormValid, setIsFormValid] = useState(false);

    const [companyRepresentativeName, setCompanyRepresentativeName] = useState(userSettings.companyRepresentativeName || '');
    const [companyRepresentativePosition, setCompanyRepresentativePosition] = useState(userSettings.companyRepresentativePosition || '');
    const [numberOfPreviouslyProducts, setNumberOfPreviouslyProducts] = useState(userSettings.numberOfPreviouslyProducts || 0);
    const [companyName, setCompanyName] = useState(userSettings.companyName || '');
    const [personType, setPersonType] = useState(userSettings.personType || '');
    const [size, setSize] = useState(userSettings.size || 0);
    const [email, setEmail] = useState(userSettings.email || '');
    const [legalForm, setLegalForm] = useState(userSettings.legalForm || '');
    const [phoneNumber, setPhoneNumber] = useState(userSettings.phoneNumber || '');


    const handleCompanyRepresentativeName = e => setCompanyRepresentativeName(e.target.value);
    const handleNumberOfPreviouslyProducts = e => setNumberOfPreviouslyProducts(e.target.value < 0 ? 0 : e.target.value);
    const handleCompanyRepresentativePosition = e => setCompanyRepresentativePosition(e.target.value);
    const handleCompanyName = e => setCompanyName(e.target.value);
    const handleType = e => setPersonType(e.target.value);
    const handleSize = e => setSize(e.target.value < 0 ? 0 : e.target.value);
    const handleLegalForm = e => setLegalForm(e.target.value);

    useEffect(() => {
        if ((companyRepresentativeName, companyRepresentativePosition, companyName, personType, email, legalForm, phoneNumber) !== ''
            && (numberOfPreviouslyProducts, size) !== 0 && isEmailValid && isValidNumber
        ) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [
        companyRepresentativeName,
        companyRepresentativePosition,
        numberOfPreviouslyProducts,
        companyName,
        personType,
        size,
        email,
        legalForm,
        phoneNumber,
        isEmailValid,
        isEmailValid
    ]);

    // const handleChangeNumber = () => {
    //     const validPhoneNumber = isValidPhoneNumber(phoneNumber);
    //     setIsValidNumber(validPhoneNumber);
    // }

    const handleChangeEmail = e => {
        setEmail(e.target.value);
        if (!validator.isEmail(e.target.value)) {
            setEmailValid(false);
        } else {
            setEmailValid(true);
        }
    }
    const handleConfirm = async values => {
        if (isFormValid) {
            const requestData = {
                projectName: userSettingsFirst.projectName,
                projectArea: userSettingsFirst.projectArea,
                dateFrom: userSettingsFirst.DateFrom,
                dateTo: userSettingsFirst.DateTo,
                projectGoals: userSettingsFirst.projectGoals,
                declaration: userSettingsSecond.declaration,
                companyRepresentativeName: values.companyRepresentativeName,
                companyRepresentativePosition: values.companyRepresentativePosition,
                numberOfPreviouslyProducts: values.numberOfPreviouslyProducts,
                companyName: values.companyName,
                personType: values.personType,
                legalForm: values.legalForm,
                size: values.size,
                email: values.email,
                phone: phoneNumber,
                products: userSettingsFirst.projectProduct,
                // equipment: userSettingsSecond.equipment,
                equipment: [1], //temporarily//
                positiveStakeholders: userSettingsSecond.positiveStakeholders,
                negativeStakeholders: userSettingsSecond.negativeStakeholders,
                targetGroups: userSettingsSecond.targetGroups,
                address: userSettingsFirst.purposeOfProject,
            };
            await stakeholderCreate(requestData, user.user.id);
            const data = {
                companyRepresentativeName,
                companyRepresentativePosition,
                numberOfPreviouslyProducts,
                companyName,
                personType,
                size,
                email,
                legalForm,
                phoneNumber,
            };
            localStorage.removeItem('stakeholderApp');
            localStorage.removeItem('stakeholderAppFirst');
            localStorage.removeItem('stakeholderAppSecond');
            localStorage.removeItem('stakeholderAppThird');
            localStorage.setItem('completeform', true)
            setUserSettings(data);
            navigate('/stakeholders/');
        }
    }
    const handleBack = () => {
        const data = {
            companyRepresentativeName,
            companyRepresentativePosition,
            numberOfPreviouslyProducts,
            companyName,
            personType,
            size,
            email,
            legalForm,
            phoneNumber
        };
        localStorage.setItem('stakeholderAppThird', JSON.stringify(data));
        handleChangeStep(2);
    }
    const schema = yup.object().shape({
        // equipment: yup.array().of(yup.string().required()),
        email: yup.string().email().required(),
        companyRepresentativeName: yup.string().required(),
        companyRepresentativePosition: yup.string().required(),
        companyName: yup.string().required(),
        legalForm: yup.string().required(),
        size: yup.number().required(),
        numberOfPreviouslyProducts: yup.number().required(),
        personType: yup.string().required(),
    });

    const { register, handleSubmit, errors } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schema),
    });

    const onSubmit = values => {
        handleConfirm(values)
    }
    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)} className={`${styles.thirdStep} ${styles.block}`}>
                <div className={` ${styles.doubleInp} ${styles.mediaGroup}`}>
                    <CustomInput
                        ref={register}
                        label={t('Company representative, full name')}
                        id="companyRepresentativeName"
                        name="companyRepresentativeName"
                        type="text"
                        onChange={handleCompanyRepresentativeName}
                        value={companyRepresentativeName}
                        error={!!errors.companyRepresentativeName}
                    />
                    <CustomInput
                        ref={register}
                        label={t('Position/status')}
                        id="companyRepresentativePosition"
                        type="text"
                        name="companyRepresentativePosition"
                        onChange={handleCompanyRepresentativePosition}
                        value={companyRepresentativePosition}
                        error={!!errors.companyRepresentativePosition}
                    />
                </div>
                <div className={` ${styles.doubleInp} ${styles.mediaGroup}`}>
                    <CustomInput
                        ref={register}
                        label={t('Name of company/firm/enterprise')}
                        id="company-name"
                        name="companyName"
                        type="text"
                        onChange={handleCompanyName}
                        value={companyName}
                        error={!!errors.companyName}
                    />
                    <CustomInput
                        ref={register}
                        label={t('Type of entity')}
                        id="person"
                        type="text"
                        name="personType"
                        onChange={handleType}
                        value={personType}
                        error={!!errors.personType}
                    />
                </div>
                <div className={` ${styles.doubleInp} ${styles.mediaGroup}`}>
                    <CustomInput
                        ref={register}
                        label={t('Legal form or occupation')}
                        id="legal-name"
                        name="legalForm"
                        type="text"
                        onChange={handleLegalForm}
                        value={legalForm}
                        error={!!errors.legalForm}
                    />
                    <CustomInput
                        ref={register}
                        label={t('Size')}
                        id="size"
                        name="size"
                        type="number"
                        onChange={handleSize}
                        value={size}
                        error={!!errors.size}
                    />
                </div>
                <div className={styles.singleInp}>
                    <span>{t('Number of previously introduced innovative products')}</span>
                    <CustomInput
                        ref={register}
                        // label="Розмір"
                        id="previous-products"
                        name="numberOfPreviouslyProducts"
                        type="number"
                        onChange={handleNumberOfPreviouslyProducts}
                        value={numberOfPreviouslyProducts}
                        error={!!errors.numberOfPreviouslyProducts}
                    />
                </div>
                <div className={styles.contacts}>
                    <div><span>{t('Contact info')}</span></div>
                    <div className={`${styles.mailBlock} ${styles.blockMar}`}>
                        <PhoneInput
                            placeholder={t("Phone number")}
                            international
                            defaultCountry="UA"
                            className={inputStyle.inputs}
                            value={phoneNumber}
                            onChange={setPhoneNumber}
                        />
                        <CustomInput
                            ref={register}
                            error={!!errors.email}
                            id="email"
                            type="email"
                            name="email"
                            onChange={handleChangeEmail}
                            value={email}
                            label={t("Your email")}
                            maxLength={100}
                        />
                    </div>
                </div>
                <div className={styles.socialGroup}>
                    <div>
                        <div>
                            <img src={youtube} alt="youtube" />
                            <input className={inputStyle.inputs} type="text" />
                        </div>
                        <div>
                            <img src={facebook} alt="facebook" />
                            <input className={inputStyle.inputs} type="text" />
                        </div>
                        <div>
                            <img src={twitter} alt="twitter" />
                            <input className={inputStyle.inputs} type="text" />
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src={instagram} alt="instagram" />
                            <input className={inputStyle.inputs} type="text" />
                        </div>
                        <div>
                            <img src={whatsapp} alt="whatsapp" />
                            <input className={inputStyle.inputs} type="text" />
                        </div>
                        <div>
                            <img src={telegram} alt="telegram" />
                            <input className={inputStyle.inputs} type="text" />
                        </div>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button
                        className={buttons.buttonConfirm}
                        onClick={handleBack}
                    >
                        {t('Previous')}

                    </button>
                    <button
                        type='submit'
                        className={buttons.buttonSignIn}
                    >
                        {t('Next')}

                    </button>
                </div>
            </Form>
        </>
    )
}
export default memo(connect(mapStateToProps, actions)(ThirdStep));



