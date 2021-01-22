import React, { memo, useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import _ from 'lodash';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux'
import DatePicker from "react-datepicker";
import { useTranslation } from 'react-i18next';
import { FiTrash2, FiPlus, FiUpload } from 'react-icons/fi';
import { CustomInput } from 'common/customFormComponents/customInput';
import { CustomSelect } from '../../../common/customFormComponents/select';
import { Form } from 'common/customFormComponents/Form';
import {
    getEquipment,
} from 'actions/equipment';
import ImageUploading from 'react-images-uploading';
import 'reactjs-popup/dist/index.css';
import styles from './index.module.scss';
import buttons from 'src/components/buttons.module.scss';

const mapStateToProps = ({ equipment }) => ({ equipment });
const actions = { getEquipment };

const AddEquipment = function ({ equipment, getEquipment }) {
    const { t } = useTranslation();
    const id = localStorage.getItem('currentUserId');
    const [сharacteristicsCount, setCharacteristicsCount] = useState([{ count: 1 }]);
    const [dateOfReceipt, setDateOfReceipt] = useState(new Date());
    const [images, setImages] = React.useState([]);
    const maxNumber = 1;

    const onChange = (imageList, addUpdateIndex) => {
        console.log("🚀 ~ file: addEquipment.js ~ line 34 ~ onChange ~ imageList", imageList[0])
        setImages(imageList);
    };
    const handleAddInputs = () => {
        setCharacteristicsCount([...сharacteristicsCount, { count: сharacteristicsCount.length + 1 }]);
    };
    const handleDeleteInputs = count => {
        const formatingArray = сharacteristicsCount.map(e => e);
        formatingArray.splice(count, 1);
        if (count > 0) {
            setCharacteristicsCount(formatingArray);
        }
    };
    const schema = yup.object().shape({
        equipName: yup.string().required(),
        description: yup.string().required(),
        condition: yup.string(),

        characteristicName1: yup.string(),
        characteristicUnit1: yup.string(),
        characteristicValue1: yup.number(),

        characteristicName2: yup.string(),
        characteristicUnit2: yup.string(),
        characteristicValue2: yup.number(),

        characteristicName3: yup.string(),
        characteristicUnit3: yup.string(),
        characteristicValue3: yup.number(),

        characteristicName4: yup.string(),
        characteristicUnit4: yup.string(),
        characteristicValue4: yup.number(),
    });

    const { register, handleSubmit, errors } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schema),
    });

    const onSubmit = values => {
        console.log("🚀 ~ file: addEquipment.js ~ line 44 ~ AddEquipment ~ values", values)
        // handleConfirmForm(values);
    }
    const popUpContent = () => {
        const renderContent = (
            <Popup
                trigger={<button className={buttons.buttonConfirm}>+ {t('Add equipment')}</button>}
                modal
                nested
                // open={open}
                closeOnDocumentClick
            // className="equipmentModal"
            >
                {
                    close => (
                        <Form onSubmit={handleSubmit(onSubmit)} className={styles.createEquipment}>
                            <h5>Додати обладнання</h5>
                            <div className={styles.firstGroup}>
                                <div>
                                    <CustomInput
                                        // onChange={(e) => setCompetenceName(e.target.value)}
                                        // value={competenceName}
                                        id="equipName"
                                        type="text"
                                        name="equipName"
                                        label="Назва..."
                                        variant="outlined"
                                        ref={register}
                                        maxLength={60}
                                        error={!!errors.equipName}
                                    />
                                    <CustomInput
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        type="text"
                                        label="Опис..."
                                        name="description"
                                        ref={register}
                                        error={!!errors.description}
                                    />
                                </div>
                                <div className={styles.uploadWrapper}>
                                    <ImageUploading
                                        multiple
                                        value={images}
                                        onChange={onChange}
                                        maxNumber={maxNumber}
                                        dataURLKey="data_url"
                                    >
                                        {({
                                            imageList,
                                            onImageUpload,
                                            onImageUpdate,
                                            onImageRemove,
                                            dragProps,
                                        }) => (
                                            <div>
                                                {
                                                    _.isEmpty(imageList) ?
                                                <div className="dropzone" onClick={onImageUpload} {...dragProps}>
                                                    Click or Drop image here
                                                </div> :

                                                imageList.map((image, index) => (
                                                <div key={index} className={styles.imageItem}>
                                                    <img src={image['data_url']} alt="" width="100" />
                                                    <div>
                                                        <FiUpload title="Upload new img" size="25" onClick={() => onImageUpdate(index)} />
                                                        <FiTrash2 title="Remove img" size="25" onClick={() => onImageRemove(index)} />
                                                    </div>
                                                </div>
                                            ))}
                                            </div>
                                        )}
                                    </ImageUploading>
                                </div>
                            </div>
                            {
                                сharacteristicsCount.map((elem, i) => {
                                    return (
                                        <div key={elem.count + i} className={styles.characteristics}>
                                            <CustomInput
                                                ref={register}
                                                label={t("Назва характеристики")}
                                                type="text"
                                                name={`${'characteristicName' + elem.count}`}
                                                id={`${'characteristic-name' + elem.count}`}
                                                variant="outlined"
                                                maxLength={40}
                                            />
                                            <CustomInput
                                                ref={register}
                                                label={t("Одиниці вимірювання")}
                                                type="text"
                                                name={`${'characteristicUnit' + elem.count}`}
                                                id={`${'characteristic-unit' + elem.count}`}
                                                variant="outlined"

                                            />
                                            <CustomInput
                                                ref={register}
                                                label={t("Значення")}
                                                type="number"
                                                name={`${'characteristicValue' + elem.count}`}
                                                id={`${'characteristic-value' + elem.count}`}
                                                variant="outlined"
                                            />
                                            <div className={styles.actions}>
                                                {
                                                    i !== 0 &&
                                                    <FiTrash2 title="Remove line" onClick={() => handleDeleteInputs(i)} size="20" />
                                                }
                                                {
                                                    ((i + 1 === сharacteristicsCount.length) && i < 3) &&
                                                    <FiPlus title="Add line" onClick={handleAddInputs} size="20" />
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                                )
                            }
                            <CustomSelect
                                ref={register}
                                // onChange={handleSetEquipment}
                                // value={selectedEquipment}
                                name="competences"
                                // options={equipmentData}
                                id="competences"
                                placeholder="Компетентності, необхідні для використання обладнання"
                                // error={error.equipment}
                                multiple={true}
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "left"
                                    },
                                    getContentAnchorEl: null
                                }}
                            />
                            <div className={styles.dateBlock}>
                                <span>Дата надходження обладнання:</span>
                                <DatePicker selected={dateOfReceipt} onChange={date => setDateOfReceipt(date)} />
                            </div>
                            <CustomInput
                                multiline
                                rows={2}
                                variant="outlined"
                                type="text"
                                label="Стан обладнання на момент прийому"
                                id="condition"
                                name="condition"
                                ref={register}
                                error={!!errors.condition}
                            />
                            <button type="submit" className={buttons.buttonSignIn}>{t('Save')}</button>
                            {/* onClick={() => {close()}} */}
                        </Form>
                    )
                }
            </Popup>
        );
        return renderContent
    }

    return (
        <>
            {popUpContent()}
        </>
    )
}

export default memo(connect(mapStateToProps, actions)(AddEquipment));