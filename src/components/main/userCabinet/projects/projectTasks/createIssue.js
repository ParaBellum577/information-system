import React, { useState, memo, useEffect } from 'react';
import DatePicker from "react-datepicker";
import { connect } from 'react-redux';
import _ from 'lodash';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { CustomInput } from 'common/customFormComponents/customInput';
import { CustomSelect } from 'common/customFormComponents/select';
import { Form } from 'common/customFormComponents/Form';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import CustomPopUp from '../../../popUps/customPopUp';
// import DropZone from 'common/dropZone';
// import StatusPopUP from '../projectTasks/taskPopUps/status';
// import PriorityPopUp from '../projectTasks/taskPopUps/priority';
import { createTask } from 'actions/task';
import { showUserList } from 'actions/user';

import "react-datepicker/dist/react-datepicker.css";
import styles from './index.module.scss';
import buttons from 'src/components/buttons.module.scss';

const mapStateToProps = ({ user }) => ({ user });
const actions = { createTask, showUserList };

const CreateIssue = function ({ trigger, user, createTask, sprints, showUserList, projectId, getTasks, t }) {
    const userID = localStorage.getItem('currentUserId');
    const [open, setOpen] = useState(false);
    const [userCollection, setUserCollection] = useState([]);
    const [sprintCollection, setSprintCollection] = useState([]);
    const [name, setName] = useState('');
    const [FromDate, setFromDate] = useState(new Date());
    const [ToDate, setToDate] = useState(new Date().setDate(new Date().getDate() + 1));
    const [assingee, setAssingee] = useState(user.user.id);
    const [sprint, setSprint] = useState(null);

    // const [status, setStatus] = useState({});
    // const [priority, setPriority] = useState();
    // const [attachment, setAttachment] = useState([]);
    
    const handleChangeAssignee = e => setAssingee(e.target.value);
    const handleChangeSprint = e => setSprint(e.target.value);
    const handleChangeName = e => setName(e.target.value);
    const closeModal = () => setOpen(false);
    
    const getUsers = async () => {
        if(_.isEmpty(userCollection)) {
            await showUserList(userID || user.user.id);
            const userData = user.userList.map(user => {
                return { value: user.id, label: `${user.firstName} ${user.lastName}`, count: user.id }
                
            });
            setUserCollection(userData);
        }
        const sprintData = !_.isEmpty(sprints) && sprints.map(el => {
            return { value: el.id, label: `${el.sprintName}`, count: el.id }
        });
        setSprintCollection(sprintData);
    }

    useEffect(() => {
        getUsers();
    }, [user.userList]);

    const handleconfirm = async values => {
        const data = {
            taskName: values.taskName,
            taskText: values.taskDescription || '',
            projectId: +projectId,
            executor: +assingee,
            dateStartPlanned: FromDate,
            dateFinishPlanned: ToDate,
            sprintId: sprint
        };
        await createTask(data, user.user.id);
        getTasks();
    }
    const schema = yup.object().shape({
        taskName: yup.string().required(),
        taskDescription: yup.string().required(),
    });

    const { register, handleSubmit, errors } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schema),
    });

    const onSubmit = values => {
        handleconfirm(values);
        closeModal();
    }
    const popUpContent = () => {
        const renderContent = (
            <Popup
                trigger={trigger}
                modal
                nested
                open={open}
                closeOnDocumentClick
                closeOnEscape
                onClose={closeModal}
            >
               {close => (<Form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.modalCreateIssue}>
                        <h5>{t('Add task')}</h5>
                        <div>
                            <div className={styles.issueDescription}>
                                <CustomInput
                                    ref={register}
                                    error={!!errors.taskName}
                                    id="taskName"
                                    type="text"
                                    name="taskName"
                                    label={t("Task name")}
                                    value={name}
                                    onChange={handleChangeName}
                                />
                                <CustomInput
                                    ref={register}
                                    multiline
                                    rows={12}
                                    variant="outlined"
                                    id="taskDescription"
                                    type="text"
                                    name="taskDescription"
                                    label={t("Description")}
                                />
                                {/* <DropZone /> */}
                            </div>
                            <div className={styles.issueInfo}>
                                <CustomSelect
                                    onChange={handleChangeAssignee}
                                    value={assingee}
                                    name="assignee"
                                    options={userCollection}
                                    id="assignee"
                                    labelId="assignee-label"
                                    placeholder={t("Performer")}
                                    MenuProps={{
                                        anchorOrigin: {
                                            vertical: "bottom",
                                            horizontal: "left"
                                        },
                                        getContentAnchorEl: null
                                    }}
                                />
                                {/* <div>
                            <span>Створив:</span>
                            <span>ПІБ автора таски</span>
                        </div> */}
                                <div>
                                    <span>{t("Expected start date")}:</span>
                                    <DatePicker selected={FromDate} onChange={date => setFromDate(date)} />
                                </div>
                                <div>
                                    <span>{t("Expected end date")}:</span>
                                    <DatePicker selected={ToDate} onChange={date => setToDate(date)} />
                                </div>
                                {/* <div className={styles.priorityBlock}>
                            <div>
                                <span>Cтатус:</span>
                                <StatusPopUP />
                            </div>
                            <div>
                                <span>Пріоритет:</span>
                                <PriorityPopUp />
                            </div>
                        </div> */}
                                <CustomSelect
                                    onChange={handleChangeSprint}
                                    value={sprint}
                                    name="sprint"
                                    options={sprintCollection}
                                    id="sprint"
                                    labelId="sprint-label"
                                    placeholder={t("Sprint")}
                                    disabled={_.isEmpty(sprintCollection)}
                                    MenuProps={{
                                        anchorOrigin: {
                                            vertical: "bottom",
                                            horizontal: "left"
                                        },
                                        getContentAnchorEl: null
                                    }}
                                />
                                <button type="submit" onClick={()=> setTimeout(()=> close(), 100)} className={buttons.buttonSignIn}>{t("Save")}</button>
                            </div>
                        </div>
                    </div>
                </Form>)}
            </Popup>
        );
        return renderContent
    }

    return <>{popUpContent()}</>
}

export default memo(connect(mapStateToProps, actions)(CreateIssue));