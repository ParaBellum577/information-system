import React, { useEffect, useState, memo } from 'react';
import moment from 'moment';
import _ from 'lodash';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { CustomInput } from 'common/customFormComponents/customInput';
import { Form } from 'common/customFormComponents/Form';
import DatePicker from 'common/customDatePicker';

import styles from './index.module.scss';
import buttons from '../../../../components/buttons.module.scss';
import stakeholder from '../../../style/stakeholder.png'

const FirstStep = ({ handleChangeStep, t }) => {
    const [userSettings, setUserSettings] = useState(JSON.parse(localStorage.getItem('stakeholderAppFirst')) || {});
    const [isFormValid, setIsFormValid] = useState(false);
    const [error, setError] = useState({});
    
    const [projectName, setProjectName] = useState(userSettings.projectName || '');
    const [projectArea, setProjectArea] = useState(userSettings.projectArea || '');
    const [projectGoals, setProjectGoals] = useState(userSettings.projectGoals || '');
    const [purposeOfProject, setPurposeOfProject] = useState(userSettings.purposeOfProject || '');
    const [projectProduct, setProjectProduct] = useState(userSettings.projectProduct || []);
    const [DateFrom, setDateFrom] = useState({});
    const [DateTo, setDateTo] = useState({});
    
    const handleNextStep = values => {
        validate();
        if (isFormValid &&
            (error.yearFrom === false || !error.yearFrom) &&
            (error.monthFrom === false || !error.monthFrom) &&
            (error.dayFrom === false || !error.dayFrom) &&
            (error.yearTo === false || !error.yearTo) &&
            (error.monthTo === false || !error.monthTo) &&
            (error.dayTo === false || !error.dayTo)
            ) {
            const data = {
                projectName: values.projectName,
                projectArea: values.projectArea,
                projectGoals: values.projectGoals,
                purposeOfProject: values.purposeOfProject,
                projectProduct: values.projectProduct.split(","),
                DateFrom: DateFrom.year + '-' + DateFrom.month + '-' + DateFrom.day,
                DateTo: DateTo.year + '-' + DateTo.month + '-' + DateTo.day,
            };
            localStorage.setItem('stakeholderAppFirst', JSON.stringify(data));
            setUserSettings(data);
            handleChangeStep(2, 'next');
        }
    };
    
    const handleProjectName = e => setProjectName(e.target.value);
    const handleProjectArea = e => setProjectArea(e.target.value);
    const handleProjectGoals = e => setProjectGoals(e.target.value);
    const handlePurposeOfProject = e => setPurposeOfProject(e.target.value);
    const handleProjectProduct = e => setProjectProduct(e.target.value.split(","));
    const getDateFrom = value => setDateFrom(value);
    const getDateTo = value => setDateTo(value);
    
    useEffect(() => {
        if ((projectName, projectArea, projectGoals, purposeOfProject) !== ''
        && !_.isEmpty(projectProduct)) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [
        projectName,
        projectArea,
        projectGoals,
        purposeOfProject,
        projectProduct,
        DateTo,
        DateFrom
    ]);
    const validate = () => {
        const momentA = moment(DateFrom.day + '-' + DateFrom.month + '-' + DateFrom.year ,"DD-MM-YYYY");
        const momentB = moment(DateTo.day + '-' +  DateTo.month + '-' + DateTo.year,"DD-MM-YYYY");   
        let error = {};
        if (DateFrom.day === '-' || momentA > momentB) {
            error.dayFrom = true;
        } else {
            error.dayFrom = false
        }
        if (DateFrom.year === '-' || momentA > momentB) {
            error.yearFrom = true;
        } else {
            error.yearFrom = false
        }
        if (DateFrom.month === '-' || momentA > momentB) {
            error.monthFrom = true;
        } else {
            error.monthFrom = false
        }
        if (DateTo.day === '-' || momentA > momentB) {
            error.dayTo = true;
        } else {
            error.dayTo = false
        }
        if (DateTo.year === '-' || momentA > momentB) {
            error.yearTo = true;
        } else {
            error.yearTo = false
        }
        if (DateTo.month === '-' || momentA > momentB) {
            error.monthTo = true;
        } else {
            error.monthTo = false
        }
        return setError(error);
    };
    const schema = yup.object().shape({
        projectName: yup.string().required(),
        projectGoals: yup.string().required(),
        projectArea: yup.string().required(),
        projectProduct: yup.string().required(),
        purposeOfProject: yup.string().required(),
    });

    const { register, handleSubmit, errors } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schema),
    });

    const onSubmit = values => {
        handleNextStep(values);
    }

    return (
        <>
            <Form
                onSubmit={handleSubmit(onSubmit)}
                className={`${styles.firstStep} ${styles.block}`}
            >
                <h2>{t('Describe your project')}</h2>
                <div className={`${styles.blockMar} ${styles.inputFirst}`}>
                    <CustomInput
                        ref={register}
                        id="project-name"
                        type="text"
                        name="projectName"
                        label={t('Project name')}
                        onChange={handleProjectName}
                        value={projectName}
                        error={!!errors.projectName}
                    />
                    <CustomInput
                        ref={register}
                        id="branch-name"
                        type="text"
                        name="projectArea"
                        label={t('Project area')}
                        onChange={handleProjectArea}
                        value={projectArea}
                        error={!!errors.projectArea}
                    />
                </div>
                <div className={styles.periodBlock}>
                    <div className={styles.dateInputs}>
                        <h5>{t('Terms of implementation')}</h5>
                        <DatePicker 
                            ref={register}
                            inputСolorDay={!! error.dayFrom}
                            inputColorMonth={!! error.monthFrom}
                            inputColorYear={!! error.yearFrom}
                            getParams={getDateFrom}
                            defaultValue={userSettings.DateFrom ? userSettings.DateFrom.split('-') : ['-','-','-']}
                            future
                        />
                        <DatePicker
                            future
                            ref={register}
                            inputСolorDay={!! error.dayTo}
                            inputColorMonth={!! error.monthTo}
                            inputColorYear={!! error.yearTo}
                            getParams={getDateTo}
                            defaultValue={userSettings.DateTo ? userSettings.DateTo.split('-') : ['-','-','-']}
                        />
                    </div>
                    <div><img src={stakeholder} alt="stakeholder" /></div>
                </div>
                <CustomInput
                    multiline
                    rows={2}
                    variant="outlined"
                    onChange={handlePurposeOfProject}
                    value={purposeOfProject}
                    placeholder={t('Project implementation goal')}
                    type="text"
                    name="purposeOfProject"
                    ref={register}
                    error={!!errors.purposeOfProject}
                />
                <CustomInput
                    multiline
                    rows={2}
                    variant="outlined"
                    name="projectGoals"
                    onChange={handleProjectGoals}
                    value={projectGoals}
                    placeholder={t('Project objectives')}
                    type="text"
                    ref={register}
                    error={!!errors.projectGoals}
                />
                <CustomInput
                    multiline
                    rows={2}
                    variant="outlined"
                    name="projectProduct"
                    onChange={handleProjectProduct}
                    value={projectProduct}
                    placeholder={t('Concrete results/products')}
                    type="text"
                    ref={register}
                    error={!!errors.projectProduct}
                />
                <button
                    type="submit"
                    className={buttons.buttonSignIn}
                    onClick={validate}
                >
                    {t('Next')}
                </button>
            </Form>
        </>
    )
}

export default memo(FirstStep);

