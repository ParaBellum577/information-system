import React, { memo, useState, useEffect } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import Popup from 'reactjs-popup';
import styles from '../index.module.scss';
import { statuses } from 'common/constansts';

const StatusPopUP = function ({ taskStatus, updateTask, taskID }) {
    const { t } = useTranslation();
    const [isPopupOpen, setTogglePopup] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(statuses[2]);
    useEffect(() => {
        statuses.map(el => {
            if (taskStatus === el.id) {
                setCurrentStatus(el);
            }
        })
    }, []);
    const handleChangeStatus = status => {
        const data = { taskStatus: status };
        statuses.forEach(el => {
            if (status === el.id) {
                setCurrentStatus(el);
                setTogglePopup(false);
            }
        });
        updateTask(taskID, data);
    };
    return (
        <Popup
            trigger={
                <div data-tip={t("Change status")} className={styles.statusBlock} style={{
                    color: currentStatus.color,
                    background: currentStatus.BColor,
                }}>
                    {t(currentStatus.status)}
                    <IoIosArrowDown size="10" />
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
            <div className={styles.statusContent}>
                {
                    statuses.map(e => (
                        <div
                            key={e.id}
                            onClick={() => handleChangeStatus(e.id)}
                            style={{ background: e.BColor }}
                            className={`${styles.statusListItem}`}
                        >
                            <span style={{ color: e.color }} >{t(e.status)}</span>
                            {currentStatus.id === e.id && <AiOutlineCheck size="10" />}
                        </div>
                    ))
                }
            </div>
        </Popup>
    )
}

export default memo(StatusPopUP);