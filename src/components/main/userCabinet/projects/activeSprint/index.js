import React, { memo, useEffect, useState } from 'react';
import { updateTask } from 'actions/task';
import { connect } from 'react-redux'
import axios from 'axios';
import _ from 'lodash';
import Switch from "react-switch";
import SprintColumn from './sprintColumn';
import { DragDropContext } from "react-beautiful-dnd";
import LoaderThreeDots from 'common/customLoader';
import { useTranslation } from 'react-i18next';


import styles from './index.module.scss';

const actions = { updateTask };
const mapStateToProps = ({ user, project }) => ({ user, project });

const ActiveSprint = function ({ projectId, user, updateTask }) {
    const { t } = useTranslation();
    const userID = localStorage.getItem('currentUserId');
    const [isDataLoad, setDataLoad] = useState(true);
    const [checked, setChecked] = useState(false);
    const [activeSprint, setActiveSprint] = useState();
    const [initialState, setInitialState] = useState([]);
    const [taskList, setTaskList] = useState([]);
    const [myOwnTasks, setMyOwnTasks] = useState([]);
    const [userList, setUserList] = useState([{
        user: `${user.user.firstName} ${user.user.lastName}`,
        id: user.user.id
    }]);
    const [statuses, setStatuses] = useState([]);
    const [open, setOpen] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [testing, setTesting] = useState([]);
    const [done, setDone] = useState([]);

    const showSprintAll = async () => {
        try {
            const res = await axios.post(
                `/api/sprint/showSprintAll`,
                { projectId },
                { params: { id: userID } }
            );
            setActiveSprint(_.find(res.data, ['isActive', true]));
        } catch (error) {
            console.log('showSprintAll error:', error);
        }
    };

    const handleSwitch = () => {
        if (!checked) {
            setTaskList(myOwnTasks);
        } else {
            setTaskList(initialState);
        }
        setChecked(!checked);
    };
    const separateTasks = data => {
        let openList = [];
        let inProgressList = [];
        let testingList = [];
        let doneList = [];
        let myTasks = [];
        !_.isEmpty(data) && data.forEach(el => {
            if (activeSprint && el.sprintId === activeSprint.id) {
                if (el.taskStatus === 1) {
                    openList.push(el);
                } else if (el.taskStatus === 2) {
                    inProgressList.push(el);
                } else if (el.taskStatus === 3) {
                    testingList.push(el);
                } else if (el.taskStatus === 4) {
                    doneList.push(el);
                }
                if ((el.executor === user.user.id)) {
                    myTasks.push(el);
                }
            }
        });
        setOpen(openList);
        setInProgress(inProgressList);
        setTesting(testingList);
        setDone(doneList);
        setMyOwnTasks(myTasks);
    }
    const getAllData = async () => {
        await showSprintAll();
        separateTasks(taskList);
    }

    useEffect(() => {
        getAllData();
    }, [taskList]);

    useEffect(() => {
        setStatuses(
            [
                { id: 1, status: t('Open'), BColor: '#e8ecf2', color: '#7f8fa4', data: open },
                { id: 2, status: t('In progress'), BColor: '#d1e9fb', color: '#1991eb', data: inProgress },
                { id: 3, status: t('Testing'), BColor: '#e7e4f7', color: '#8777d9', data: testing },
                { id: 4, status: t('Done'), BColor: '#e3f3da', color: '#33af13', data: done }
            ]
        )
    }, [testing, done, open, inProgress]);

    useEffect(() => {
        const users = [];
        !_.isEmpty(user.userList) && user.userList.forEach(el => {
            return users.push({
                user: `${el.firstName} ${el.lastName}`,
                id: el.id
            });
        })
        setUserList([...userList, ...users])
        showTaskAllInProject();
    }, [])

    const showTaskAllInProject = async () => {
        try {
            const res = await axios.post(
                `/api/task/showTaskAllInProject`,
                { projectId },
                { params: { id: userID } }
            );
            setTaskList(res.data);
            setInitialState(res.data);
            setDataLoad(false);
        } catch (error) {
            console.log('showTaskAllInProject error:', error);
        }
    };

    const onDragEnd = result => {
        if (!result.destination) return;
        const { source, destination, draggableId } = result;
        let FromState;
        let FromSetState;
        let ToState;
        let ToSetState;
        if (source.droppableId === '1') {
            FromState = open;
            FromSetState = setOpen;
        } else if (source.droppableId === '2') {
            FromState = inProgress;
            FromSetState = setInProgress;
        } else if (source.droppableId === '3') {
            FromState = testing;
            FromSetState = setTesting;
        } else if (source.droppableId === '4') {
            FromState = done;
            FromSetState = setDone;
        }
        if (destination.droppableId === '1') {
            ToState = open;
            ToSetState = setOpen;
        } else if (destination.droppableId === '2') {
            ToState = inProgress;
            ToSetState = setInProgress;
        } else if (destination.droppableId === '3') {
            ToState = testing;
            ToSetState = setTesting;
        } else if (destination.droppableId === '4') {
            ToState = done;
            ToSetState = setDone;
        }

        if (source.droppableId !== destination.droppableId) {
            const arrWithOutDragElement = [];
            let element;
            FromState.forEach(el => {
                if (el.id !== +draggableId) {
                    return arrWithOutDragElement.push(el);
                } else {
                    element = el;
                }
            })
            if (element !== undefined) {
                FromSetState(arrWithOutDragElement);
                ToSetState([...ToState, element]);
                updateTask(
                    +draggableId,
                    { taskStatus: destination.droppableId },
                    user.user.id);
            }
        }
    }

    return (
        <>
            <div className={styles.activeSprint}>
                <div className={styles.activeSprintHeader}>
                    {
                        (activeSprint !== undefined) &&
                        <div>
                            <h2>{activeSprint && activeSprint.sprintName}</h2>
                            <span>{t('All tasks')}</span>
                            <Switch onColor="#1991eb" onChange={handleSwitch} checked={checked} />
                            <span>{t('Only my tasks')}</span>
                        </div>
                    }
                </div>
                {
                    isDataLoad ? <div className={styles.loader}><LoaderThreeDots height={150} width={200} /></div> :
                        <div className={styles.activeSprintBody}>
                            {
                                (activeSprint !== undefined) ?
                                    <DragDropContext onDragEnd={result => onDragEnd(result)}>
                                        {
                                            statuses.map(el => (
                                                <SprintColumn
                                                    key={el.id}
                                                    status={el.status}
                                                    color={el.BColor}
                                                    taskList={taskList}
                                                    statusId={el.id}
                                                    data={el.data}
                                                    userList={userList}
                                                    activeSprint={activeSprint}
                                                    t={t}
                                                />
                                            ))
                                        }
                                    </DragDropContext> :
                                    <div className={styles.emptyData}>{t("You need to start a sprint")}</div>
                            }
                        </div>
                }
            </div>
        </>
    )
}

export default memo(connect(mapStateToProps, actions)(ActiveSprint));