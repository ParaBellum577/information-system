import React, { useEffect, useState, memo } from 'react';
import ReactTooltip from 'react-tooltip';
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Scrollbars } from 'react-custom-scrollbars';
import InfiniteScroll from 'react-infinite-scroller';
import _ from 'lodash';
import { GrDrag } from 'react-icons/gr';
import { FiTrash2 } from 'react-icons/fi';
import { MdClear } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import StatusPopUP from './taskPopUps/status';
import PriorityPopUp from './taskPopUps/priority';
import LoaderThreeDots from 'common/customLoader';

import styles from './index.module.scss';
import buttons from 'src/components/buttons.module.scss';


const Sprint = function ({
    data,
    taskList,
    deleteTask,
    userId,
    getTasks,
    updateTask,
    deleteSprint,
    updateSprints,
    changeSprint,
    isActive,
    noOneactiveSprint,
    t
}) {
    const [isDataLoad, setIsDataLoad] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [showOptionLimit, setOptionLimit] = useState(4);
    const issuesLength = tasks ? tasks.length : 0;
    const loadMoreTasks = () => {
        setOptionLimit(showOptionLimit + 4);
    };
    const getData = async () => {
        const sortedList = [];
        !_.isEmpty(taskList) && taskList.map(e => {
            if (e.sprintId === data.id) return sortedList.push(e);
        });
        await setTasks(sortedList);
        setIsDataLoad(false);
    }
    const handleDeleteTask = (taskID) => {
        deleteTask(taskID, userId);
        getTasks();
    };
    const handleDeleteSprint = async () => {
        await deleteSprint(data.id, userId);
        updateSprints();
    };
    const handleChangeSprint = async isActive => {
        const requesData = {
            sprintId: data.id,
            changedField: { isActive }
        };
        await changeSprint(requesData, userId);
        updateSprints();
        getTasks();
    }
    useEffect(() => {
        getData();
    }, [taskList]);

    return (
        <div key={data.id} className={styles.backlog}>
            <div className={styles.backlogHeader}>
                <h2>{data.sprintName}</h2>
                {
                    (isActive || noOneactiveSprint) &&
                    <div>
                        {
                            data.isActive ?
                                <button onClick={() => handleChangeSprint(false)} className={buttons.buttonConfirm}>{t('Sprint finish')}</button>
                                :
                                <button onClick={() => handleChangeSprint(true)} className={buttons.buttonConfirm}>{t('Sprint start')}</button>
                        }
                        <MdClear onClick={handleDeleteSprint} size="25" />
                    </div>
                }
            </div>
            {
                isDataLoad ? <LoaderThreeDots height={100} width={100} /> :
                    <Droppable droppableId={data.id.toString()} key={data.sprintName}>
                        {
                            (provided, snapshot) => {
                                return (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className={styles.taskList}
                                        style={{
                                            background: snapshot.isDraggingOver
                                                ? "#ecf2ff"
                                                : "#fff",
                                            minHeight: 50
                                        }}
                                    >
                                        <Scrollbars autoHide autoHeight autoHeightMax={230}>
                                            <InfiniteScroll
                                                pageStart={0}
                                                loadMore={loadMoreTasks}
                                                hasMore={issuesLength > showOptionLimit}
                                                useWindow={false}
                                            >
                                                {
                                                    !_.isEmpty(tasks) ? tasks.map((e, i) => (
                                                        <Draggable
                                                            key={e.id}
                                                            draggableId={e.id.toString()}
                                                            index={i}
                                                        >
                                                            {
                                                                provided => {
                                                                    return (
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            className={styles.taskListItem}
                                                                        >
                                                                            <div>
                                                                                <GrDrag size="15" />
                                                                                <span title={e.taskName}>{e.taskName}</span>
                                                                            </div>
                                                                            <div>
                                                                                <StatusPopUP
                                                                                    updateTask={updateTask}
                                                                                    taskStatus={e.taskStatus}
                                                                                    taskID={e.id}
                                                                                />
                                                                                <PriorityPopUp
                                                                                    updateTask={updateTask}
                                                                                    priorityId={e.priorityId}
                                                                                    taskID={e.id}
                                                                                />
                                                                                <div className={styles.taskActions}>
                                                                                    <FiTrash2
                                                                                        onClick={() => handleDeleteTask(e.id)}
                                                                                        title={t("Delete task")}
                                                                                        size="20"
                                                                                    />
                                                                                    <BsThreeDots size="20" />
                                                                                </div>
                                                                                <ReactTooltip />
                                                                                <ReactTooltip />
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                            }
                                                        </Draggable>
                                                    )) : (
                                                            <div className="dropzone" >
                                                                <p>{t("Drag 'n' drop some tasks here")}</p>
                                                            </div>
                                                        )
                                                }
                                            </InfiniteScroll>
                                        </Scrollbars>
                                    </div>
                                )
                            }
                        }
                    </Droppable>
            }
        </div >
    )
}

export default memo(Sprint);