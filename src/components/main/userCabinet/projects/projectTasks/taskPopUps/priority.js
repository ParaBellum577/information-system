import React, { memo, useState, useEffect } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { BsFlagFill } from 'react-icons/bs';
import { priorities } from 'common/constansts';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import Popup from 'reactjs-popup';
import styles from '../index.module.scss';

const PriorityPopUp = function ({ priorityId, updateTask, taskID }) {
    const { t } = useTranslation();
    const [isPopupOpen, setTogglePopup] = useState(false);
    const [currentPriority, setCurrentPriority] = useState(priorities[1]);
    useEffect(() => {
        priorities.map(el => {
            if (priorityId === el.id) {
                setCurrentPriority(el);
            }
        })
    }, []);
    const handleChangePriority = priority => {
        const data = { priorityId: priority };
        priorities.forEach(el => {
            if (priority === el.id) {
                setCurrentPriority(el);
                setTogglePopup(false);
            }
        })
        updateTask(taskID, data);
    };
    return (
        <Popup
            trigger={
                <div data-tip={t("Change priority")} className={styles.prioBlock} style={{ color: currentPriority.color }}>
                    <BsFlagFill size="20" />
                </div>
            }
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
            <div className={styles.priorityContent}>
                {
                    priorities.map(e => (
                        <div
                            key={e.id}
                            onClick={() => handleChangePriority(e.id)}
                            style={{ color: e.color }}
                            className={`${styles.priorityListItem}`}
                        >
                            <BsFlagFill size="20" />
                            <span>{t(e.priority)}</span>
                            {currentPriority.id === e.id && <AiOutlineCheck size="15" />}
                        </div>
                    ))
                }
            </div>
        </Popup>
    )
}

export default memo(PriorityPopUp);