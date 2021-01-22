import React, { useState, memo } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { CustomInput } from '../../../common/customFormComponents/customInput';
import { CustomSelect } from '../../../common/customFormComponents/select';
import { Form } from '../../../common/customFormComponents/Form';
import { getEquipment } from '../../../../actions/equipment';

import styles from './index.module.scss';
import buttons from '../../../../components/buttons.module.scss';
import plus from '../../../style/icons/plus-solid.svg';
import minus from '../../../style/icons/minus-solid.svg';

const actions = { getEquipment };
const mapStateToProps = ({ equipment }) => ({ equipment });

const SecondStep = ({ handleChangeStep, getEquipment, equipment, t }) => {
    const [userSettings, setUserSettings] = useState(JSON.parse(localStorage.getItem('stakeholderAppSecond')) || {});
    const [error, setError] = useState({});
    const [positiveStakeholders, setPositiveStakeholders] = useState(userSettings.positiveStakeholders || []);
    const [negativeStakeholders, setNegativeStakeholders] = useState(userSettings.negativeStakeholders || []);
    const [equipmentData, setEquipmentData] = useState(userSettings.equipment || []);
    const [selectedEquipment, setSelectedEquipment] = useState(userSettings.equipment || []);
    const [targetGroups, setTargetGroups] = useState(userSettings.targetGroups || []);
    const [declaration, setDeclaration] = useState(userSettings.declaration || '');
    const [positiveInputs, setPositiveInputs] = useState(userSettings.positiveInputs || [{ count: 1 }]);
    const [negativeInputs, setNegativeInputs] = useState(userSettings.negativeInputs || [{ count: 1 }]);

    const getEquipments = async () => {
        await getEquipment()
        if (!_.isEmpty(equipment)) {
            const equipmentCollection = [];
            equipment.equipment.map((equip) => {
                equipmentCollection.push({
                    value: equip.id,
                    label: equip.equipmentName
                })
            })
            setEquipmentData(equipmentCollection);
        }
    }
    React.useEffect(() => {
        getEquipments();
    }, [])

    const addPositiveInput = () => {
        setPositiveInputs([...positiveInputs, { count: positiveInputs.length + 1 }]);
    };

    const deletePositiveInput = count => {
        const formatingArray = positiveInputs.map(e => e);
        formatingArray.splice(count, 1);
        if (count > 0) {
            setPositiveInputs(formatingArray);
        }
    };

    const addNegativeInput = () => {
        setNegativeInputs([...negativeInputs, { count: negativeInputs.length + 1 }]);
    };

    const deleteNegativeInput = count => {
        const formatingArray = negativeInputs.map(e => e);
        formatingArray.splice(count, 1);
        if (count > 0) {
            setNegativeInputs(formatingArray);
        }
    };

    const handleNextStep = values => {
        const positiveStakeholdersData = [];
        const negativeStakeholdersData = [];

        if (values.positiveStakeholders1) {
            positiveStakeholdersData.push(values.positiveStakeholders1);
        }
        if (values.positiveStakeholders2) {
            positiveStakeholdersData.push(values.positiveStakeholders2);
        }
        if (values.positiveStakeholders3) {
            positiveStakeholdersData.push(values.positiveStakeholders3);
        }
        if (values.positiveStakeholders4) {
            positiveStakeholdersData.push(values.positiveStakeholders4);
        }
        if (values.negativeStakeholders1) {
            negativeStakeholdersData.push(values.negativeStakeholders1);
        }
        if (values.negativeStakeholders2) {
            negativeStakeholdersData.push(values.negativeStakeholders2);
        }
        if (values.negativeStakeholders3) {
            negativeStakeholdersData.push(values.negativeStakeholders3);
        }
        if (values.negativeStakeholders4) {
            negativeStakeholdersData.push(values.negativeStakeholders4);
        }
        setPositiveStakeholders(positiveStakeholdersData);
        setNegativeStakeholders(negativeStakeholdersData);

        const data = {
            positiveStakeholders: positiveStakeholdersData || [''],
            negativeStakeholders: negativeStakeholdersData || [''],
            equipment: selectedEquipment,
            targetGroups,
            declaration: values.declaration,
            positiveInputs,
            negativeInputs
        };
        localStorage.setItem('stakeholderAppSecond', JSON.stringify(data));
        setUserSettings(data);
        handleChangeStep(3);
    };

    const handleSetEquipment = e => setSelectedEquipment(e.target.value);
    const handleSetTargetGroups = e => setTargetGroups(e.target.value.split(","));
    const handleSetdeclaration = e => setDeclaration(e.target.value);

    const handleBack = () => {
        const data = {
            positiveStakeholders,
            negativeStakeholders,
            selectedEquipment,
            targetGroups,
            declaration,
            positiveInputs,
            negativeInputs
        };
        localStorage.setItem('stakeholderAppSecond', JSON.stringify(data));
        handleChangeStep(1);
    }
    const validate = () => {
        let error = {};
        if (_.isEmpty(equipmentData)) {
            error.equipment = true;
        } else {
            error.equipment = false
        }
        return setError(error);
    };

    const schema = yup.object().shape({
        positiveStakeholders1: yup.string(),
        positiveStakeholders2: yup.string(),
        positiveStakeholders3: yup.string(),
        positiveStakeholders4: yup.string(),

        negativeStakeholders1: yup.string(),
        negativeStakeholders2: yup.string(),
        negativeStakeholders3: yup.string(),
        negativeStakeholders4: yup.string(),

        targetGroups: yup.string().required(),
        declaration: yup.string().required(),
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
            {/* <img onClick={handleBack} className={inputStyle.arrowBack} title="Назад" src={backArrow} alt="go back" /> */}
            <Form onSubmit={handleSubmit(onSubmit)} className={`${styles.secondStep} ${styles.block}`}>
                <div>
                    <h2>{t('Describe your project')}</h2>
                </div>
                <CustomSelect
                    ref={register}
                    onChange={handleSetEquipment}
                    value={selectedEquipment}
                    name="equipment"
                    options={equipmentData}
                    id="equipment"
                    labelId="equipment-label"
                    placeholder={t("Equipment necessary for implementation")}
                    error={error.equipment}
                    multiple={true}
                    MenuProps={{
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left"
                        },
                        getContentAnchorEl: null
                    }}
                />
                <div className={`${styles.blockMar} ${styles.dynamicBlock}`}>
                    <div className={styles.dynamicInpuys}>
                        {
                            positiveInputs.map((elem, i) => (
                                <div>
                                    <CustomInput
                                        key={elem.count + i}
                                        ref={register}
                                        placeholder={t("Positively interested parties")}
                                        id={`${'positive-stakeholders' + elem.count}`}
                                        type="text"
                                        name={`${'positiveStakeholders' + elem.count}`}
                                    // value={positiveStakeholders}
                                    // error={!!`${'errors.positiveStakeholders' + elem.count}`}
                                    />
                                    <div className={styles.buttonGroup}>
                                        {
                                            i !== 0 &&
                                            <img onClick={() => deletePositiveInput(i)} src={minus} alt="delete item" />
                                        }
                                        {
                                            i < 3 &&
                                            <img onClick={addPositiveInput} src={plus} alt="add item" />
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className={styles.dynamicInpuys}>
                        {
                            negativeInputs.map((elem, i) => (
                                <div>
                                    <CustomInput
                                        key={elem.count + i}
                                        ref={register}
                                        placeholder={t("Negative interested parties")}
                                        id={`${'negative-stakeholders' + elem.count}`}
                                        name="negativeStakeholders"
                                        name={`${'negativeStakeholders' + elem.count}`}
                                        type="text"
                                    // value={negativeStakeholders}
                                    // error={!!`${'errors.negativeStakeholders' + elem.count}`}
                                    />
                                    <div className={styles.buttonGroup}>
                                        {
                                            i !== 0 &&
                                            <img onClick={() => deleteNegativeInput(i)} src={minus} alt="delete item" />
                                        }
                                        {
                                            ((i + 1 === negativeInputs.length) && i < 3) && 
                                            <img onClick={addNegativeInput} src={plus} alt="add item" />
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div>
                </div>
                <CustomInput
                    ref={register}
                    label={t('Possible consumers (target groups)')}
                    id="target-groups"
                    name="targetGroups"
                    type="text"
                    onChange={handleSetTargetGroups}
                    value={targetGroups}
                    error={!!errors.targetGroups}
                />
                <div>
                    <span>{t('Declaration of compliance with the law and no violation of legal norms/restrictions')}</span>
                </div>
                <CustomInput
                    ref={register}
                    multiline
                    rows={2}
                    variant="outlined"
                    id="declaration"
                    name="declaration"
                    type="text"
                    onChange={handleSetdeclaration}
                    value={declaration}
                    error={!!errors.declaration}
                />
                <div className={styles.buttons}>
                    <button
                        className={buttons.buttonConfirm}
                        onClick={handleBack}
                    >
                        {t('Previous')}
                </button>
                    <button
                        type="submit"
                        className={buttons.buttonSignIn}
                        onClick={validate}
                    >
                        {t('Next')}
                </button>
                </div>
            </Form>
        </>
    )
}

export default memo(connect(mapStateToProps, actions)(SecondStep));
