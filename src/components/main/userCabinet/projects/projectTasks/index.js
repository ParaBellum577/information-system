import React, { useState, useEffect, memo } from 'react';
import { DragDropContext } from "react-beautiful-dnd";
import axios from 'axios';
import { connect } from 'react-redux';
import { BiSearchAlt2 } from 'react-icons/bi';
import { MdClear } from 'react-icons/md';
import Switch from "react-switch";
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import LoaderThreeDots from 'common/customLoader';
import { 
    showSprintAll, 
    deleteSprint, 
    updateSprint, 
    createSprint
} from 'actions/sprint';
import { joinTaskToSprint, deleteTask } from 'actions/task';
import Backlog from './backlog';
import Sprint from './sprint';

import styles from './index.module.scss';
import style from '../index.module.scss';

const mapStateToProps = ({ sprint, user, task }) => ({ sprint, user, task });

const actions = { 
    showSprintAll, 
    joinTaskToSprint, 
    deleteTask, 
    deleteSprint, 
    updateSprint, 
    createSprint 
};

const ProjectTasks = function ({ 
    projectId, 
    joinTaskToSprint, 
    sprint, 
    user, 
    task, 
    deleteTask, 
    deleteSprint, 
    updateSprint,
    createSprint 
}) {
    const userID = localStorage.getItem('currentUserId');
    const [isDataLoad, setIsDataLoad] = useState(true);
    const [checked, setChecked] = useState(false);
    const [noOneactiveSprint, setNoOneactiveSprint] = useState(false);
    const [search, setSearch] = useState('');
    const [sprints, setSprints] = useState([]);
    const [taskList, setTaskList] = useState([]);
    const [backlogTasks, setBacklogTasks] = useState([]);
    const [initialState, setInitialState] = useState([]);
    const [myOwnTasks, setMyOwnTasks] = useState([]);
    const { t } = useTranslation();

    const showTaskAllInProject = async (data, id) => {
        try {
            const res = await axios.post(
                `/api/task/showTaskAllInProject`,
                { projectId: data },
                { params: { id } }
            );
            setTaskList(res.data)
            setInitialState(res.data);
        } catch (error) {
            console.log('showTaskAllInProject error:', error);
        }
    };

    const updateTask = async (taskId, data) => {
        try {
        const id = user.user.id;
        await axios.post(
                `/api/task/updateTask`,
                {
                    taskId,
                    changedField: data
                  },
                { params: { id } }
            );
        } catch (error) {
            console.log('updateTask error:', error);
        }
    };

    const showSprintAll = async (data, id) => {
        try {
            const res = await axios.post(
                `/api/sprint/showSprintAll`,
                { projectId: data },
                { params: { id } }
            );
            const activeSprint = _.find(res.data, ['isActive', true]);
            if(activeSprint !== undefined) {
                setNoOneactiveSprint(false);
            } else {
                setNoOneactiveSprint(true);
            }
            setSprints(res.data);
            setIsDataLoad(false);
        } catch (error) {
            console.log('showSprintAll error:', error);
        }
    };
   const getBacklogTasks = () => {
       const backlog = [];
       const myTasks = [];
        !_.isEmpty(taskList) && taskList.forEach(e => {
           if(e.sprintId === null) return backlog.push(e);
       });
       !_.isEmpty(taskList) && taskList.forEach(el => {
           if((el.executor === user.user.id)) {
               myTasks.push(el);
           } 
       })
       setBacklogTasks(backlog);
       setMyOwnTasks(myTasks);
    };

    useEffect(() => {
        getBacklogTasks();
    }, [taskList]);

    useEffect(() => {
        showTaskAllInProject(projectId, userID);
        showSprintAll(projectId, userID);
        setSprints(sprint.currentSprints);
        setInitialState(task.taskByProject);
        setTaskList(task.taskByProject);
    }, []);

    const handleSearchProjects = event => {
        const updatedList = _.filter(initialState, task => {
          return task.taskName.toLowerCase().includes(event.target.value.toLowerCase());
        });
        setTaskList(updatedList);
        setSearch(event.target.value);
    };
    const handleClearSearch = () => {
        setSearch('');
        setTaskList(initialState);
    }
    const onDragEnd = async result => {
        if (!result.destination) return;
        const { source, destination, draggableId } = result;
        let data;
        if (source.droppableId !== destination.droppableId) {
            const arrWithOutSelect = [];
            taskList.forEach(e => {
                if(e.id !== +draggableId) return arrWithOutSelect.push(e);
            });
            setTaskList(arrWithOutSelect);
            if(destination.droppableId === "backlog") {
                data = { taskId: +draggableId, sprintId: null };
            } else {
                data = { taskId: +draggableId, sprintId: destination.droppableId };
            }
            await joinTaskToSprint(data, user.user.id);
            showTaskAllInProject(projectId, user.user.id);
        }
    }

    const handleSwitch = () => {
        if(!checked) {
            setTaskList(myOwnTasks);
        } else {
            setTaskList(initialState);
        }
        setChecked(!checked);
    };
    return (
        <div className={styles.projectSettingsTasks}>
            <div className={styles.taskFilters}>
                <div className={style.customSearch}>
                    <BiSearchAlt2 size="20" />
                    <input
                        type="text"
                        placeholder={t('Task name')}
                        value={search}
                        onChange={handleSearchProjects}
                    />
                    <div>
                        <MdClear onClick={handleClearSearch} className={search !== '' && styles.activeIcon} size="20" />
                    </div>
                </div>
                <span>{t('All tasks')}</span>
                <Switch onColor="#1991eb" onChange={handleSwitch} checked={checked} />
                <span>{t('Only my tasks')}</span>
            </div>
            {
                isDataLoad ? <div className={styles.loader}><LoaderThreeDots height={150} width={200} /></div> :
                    <DragDropContext onDragEnd={result => onDragEnd(result)}>
                        <Backlog
                            createSprint={createSprint}
                            tasks={backlogTasks}
                            sprints={sprints}
                            projectId={projectId}
                            userId={user.user.id}
                            getTasks={()=> showTaskAllInProject(projectId, user.user.id)}
                            getSprints={()=> showSprintAll(projectId, user.user.id)}
                            updateTask={updateTask}
                            deleteTask={deleteTask}
                            t={t}
                        />
                        {
                            !_.isEmpty(sprints) && sprints.map(el => (
                                <Sprint
                                    key={el.id}
                                    data={el} 
                                    deleteTask={deleteTask} 
                                    taskList={taskList}
                                    userId={user.user.id}
                                    deleteSprint={deleteSprint}
                                    getTasks={()=> showTaskAllInProject(projectId, user.user.id)}
                                    updateSprints={()=>showSprintAll(projectId, user.user.id)}
                                    changeSprint={updateSprint}
                                    updateTask={updateTask}
                                    isActive={!!el.isActive}
                                    noOneactiveSprint={noOneactiveSprint}
                                    t={t}
                                />
                            ))
                        }
                    </DragDropContext>
            }
        </div>
    )
}

export default memo(connect(mapStateToProps, actions)(ProjectTasks));