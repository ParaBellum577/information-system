import React, { memo, useState, useEffect } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import Popup from 'reactjs-popup';
import styles from '../index.module.scss';

const StatusPopUp = function ({ handleFilterByStatus }) {
    const { t } = useTranslation();
    const statuses = [
        {id: 1, status: t('Awaiting confirmation')},
        {id: 2, status: t('Confirmed')},
        {id: 3, status: t('All')},
    ];
    const [isPopupOpen, setTogglePopup] = useState(false);
    const [selectedStatus, setStatus] = useState(statuses[0]);
    
    const handleChangeStatus= status => {
        setStatus(status);
        handleFilterByStatus(status.id);
        setTogglePopup(false);
    }

    return (
        <Popup
            trigger={
                <div 
                // data-tip="Змінити роль" 
                className={styles.statusBlock} 
                style={isPopupOpen ? {
                    backgroundColor: '#f2f4f7'
                } : {}}
                >
                    {selectedStatus.status}
                    <IoIosArrowDown size="15" />
                </div>
            }
            open={isPopupOpen}
            onOpen={() => setTogglePopup(!isPopupOpen)}
            onClose={() => setTogglePopup(false)}
            closeOnDocumentClick
            closeOnEscape
            position="bottom"
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
                            style={selectedStatus.id === e.id ? {
                                background: '#f0f3f5',
                                color: '#1991eb'
                            } : {}}
                            onClick={() => handleChangeStatus(e)} 
                            className={`${styles.statusListItem}`}
                        >
                            <span>{e.status}</span>
                            {selectedStatus.id === e.id && <AiOutlineCheck size="15" />}
                        </div>
                    ))
                }
            </div>
        </Popup>
    )
}

export default memo(StatusPopUp);