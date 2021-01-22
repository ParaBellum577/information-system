import React, { memo, useState } from 'react';
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Scrollbars } from 'react-custom-scrollbars';
import InfiniteScroll from 'react-infinite-scroller';
import _ from 'lodash';
import ColumnItem from './columnItem';

import styles from './index.module.scss';


const SprintColumn = function ({ statusId, status, color, data, userList, activeSprint }) {
    const [showOptionLimit, setOptionLimit] = useState(4);
    const issuesLength = !_.isEmpty(data) ? data.length : 0;
    const loadMoreTasks = () => {
        setOptionLimit(showOptionLimit + 4);
    };
    return (
        <div className={styles.column}>
            <div style={{ backgroundColor: color }} className={styles.columnHeader}>
                <h4>{status}</h4>
                <span>({issuesLength})</span>
            </div>
            <Droppable droppableId={statusId.toString()} key={statusId}>
                {
                    (provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={styles.columnBody}
                            style={{
                                transition: 'all 0.2s ease-in',
                                background: snapshot.isDraggingOver
                                    ? color
                                    : "#fff",
                                minHeight: 50
                            }}
                        >
                            <Scrollbars
                                autoHide
                                autoHeight
                                autoHeightMin={620}
                                autoHeightMax={620}
                            >
                                <InfiniteScroll
                                    pageStart={0}
                                    loadMore={loadMoreTasks}
                                    hasMore={issuesLength > showOptionLimit}
                                    useWindow={false}
                                >
                                    {
                                        !_.isEmpty(data) && _.take(data, showOptionLimit).map((task, i) => (
                                            (task.sprintId === activeSprint.id) && 
                                            <Draggable
                                                key={task.id}
                                                draggableId={task.id.toString()}
                                                index={i}
                                            >
                                                {
                                                    provided => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <ColumnItem userList={userList} data={task} />
                                                        </div>
                                                    )
                                                }
                                            </Draggable>
                                        ))
                                    }
                                </InfiniteScroll>
                            </Scrollbars>
                        </div>
                    )}
            </Droppable>
        </div>
    )
}

export default memo(SprintColumn);