import React, { useState, memo } from 'react';
import DatePicker from "react-datepicker";
import { connect } from 'react-redux';
import { createSprint } from 'actions/sprint';
// import _ from 'lodash';
import Popup from 'reactjs-popup';
import { CustomInput } from 'common/customFormComponents/customInput';


import "react-datepicker/dist/react-datepicker.css";
import styles from '../index.module.scss';
import buttons from 'src/components/buttons.module.scss';

const mapStateToProps = ({ user }) => ({ user });
const actions = { createSprint };

const CreateSprint = function ({ trigger, user, createSprint, projectId, getSprints, t }) {
    const [isPopupOpen, setTogglePopup] = useState(false);
    const [sprintName, setSprintName] = useState('');
    const [FromDate, setFromDate] = useState(new Date());
    const [ToDate, setToDate] = useState(new Date().setDate(new Date().getDate() + 1));

    const handleCreateSprint = async () => {
        const data = {
            sprintName,
            projectId,
            dateStart: FromDate,
            dateFinish: ToDate
        }
        if(sprintName !== '') {
           await createSprint(data, user.user.id);
            setTogglePopup(false);
            setSprintName('');
            getSprints();
        }
    };
    const handleChangeName = e => setSprintName(e.target.value);
    return (
        <Popup
        trigger={trigger}
        open={isPopupOpen}
        onOpen={() => setTogglePopup(!isPopupOpen)}
        onClose={() => setTogglePopup(false)}
        closeOnDocumentClick
        closeOnEscape
        position="bottom right"
        arrow
        contentStyle={{
            width: '0',
            boxShadow: 'none',
            border: 'none',
            padding: '0',
        }}
    >
            <div className={styles.createSprint}>
                <h5>{t("Create a sprint")}</h5>
                    <div className={styles.issueDescription}>
                        <CustomInput
                            id="sprint-name"
                            type="text"
                            name="sprint-name"
                            label={t("Sprint name")}
                            variant="outlined"
                            onChange={handleChangeName}
                            value={sprintName}
                        />
                    </div>
                    <div className={styles.sprintDate}>
                        <span>{t("Expected start date")}:</span>
                        <DatePicker selected={FromDate} onChange={date => setFromDate(date)} />
                    </div>
                    <div className={styles.sprintDate}>
                        <span>{t("Expected end date")}:</span>
                        <DatePicker selected={ToDate} onChange={date => setToDate(date)} />
                    </div>
                    <button onClick={handleCreateSprint} className={buttons.buttonSignIn}>{t("Save")}</button>
            </div>
    </Popup>
    )
}

export default memo(connect(mapStateToProps, actions)(CreateSprint));