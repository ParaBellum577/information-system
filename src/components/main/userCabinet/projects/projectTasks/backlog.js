import React, { useState, memo } from 'react';
import _ from 'lodash';
import { Scrollbars } from 'react-custom-scrollbars';
import InfiniteScroll from 'react-infinite-scroller';
import { BsThreeDots } from 'react-icons/bs';
import { GrDrag } from 'react-icons/gr';
import { FiTrash2 } from 'react-icons/fi';
import CreateIssue from './createIssue';
import CreateSprint from './taskPopUps/createSprint';
import StatusPopUP from './taskPopUps/status';
import PriorityPopUp from './taskPopUps/priority';
import styles from './index.module.scss';
import buttons from 'src/components/buttons.module.scss';
import { Draggable, Droppable } from "react-beautiful-dnd";


const Backlog = function ({ 
    projectId, 
    tasks, 
    sprints, 
    createSprint, 
    getSprints, 
    deleteTask, 
    userId,
    getTasks, 
    updateTask,
    t
}) {
    const [showOptionLimit, setOptionLimit] = useState(4);
    const issuesLength = tasks ? tasks.length : 0;
    const loadMoreTasks = () => {
        setOptionLimit(showOptionLimit + 4);
    };
    const handleDeleteTask = (taskID) => {
        deleteTask(taskID, userId);
        getTasks();
    };
    return (
        <div className={styles.backlog}>
            <div className={styles.backlogHeader}>
                <h2>Backlog</h2>
                <div>
                    <CreateIssue
                        trigger={<button className={buttons.buttonSignIn}>{t('Add task')}</button>}
                        projectId={projectId}
                        sprints={sprints}
                        getTasks={getTasks}
                        t={t}
                    />
                    <CreateSprint
                        trigger={<button className={buttons.buttonConfirm}>{t('Create a sprint')}</button>}
                        projectId={projectId}
                        createSprint={createSprint}
                        getSprints={getSprints}
                        t={t}
                    />
                </div>
            </div>

            <Droppable droppableId="backlog" key="backlog0">
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
                                            !_.isEmpty(tasks) && _.take(tasks, showOptionLimit).map((e, i) => (
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
                                                                            t={t}
                                                                        />
                                                                        <PriorityPopUp
                                                                            updateTask={updateTask}
                                                                            priorityId={e.priorityId}
                                                                            taskID={e.id}
                                                                            t={t}
                                                                        />
                                                                        <div className={styles.taskActions}>
                                                                            <FiTrash2 onClick={() => handleDeleteTask(e.id)} title={t("Delete task")} size="20" />
                                                                            <BsThreeDots size="20" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    }
                                                </Draggable>

                                            ))
                                        }
                                    </InfiniteScroll>
                                </Scrollbars>
                            </div>
                        )
                    }
                }
            </Droppable>
        </div>
    )
}

export default memo(Backlog);