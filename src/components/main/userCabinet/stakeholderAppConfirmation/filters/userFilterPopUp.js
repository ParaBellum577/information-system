import React, { memo, useState, useEffect } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import _ from 'lodash';
import Popup from 'reactjs-popup';
import styles from '../index.module.scss';

const statuses = [
    {id: 1, status: 'Очікує підтвердження'},
    {id: 2, status:'Підтверджено'}
];
const StatusPopUp = function ({ roleId, changeUserRole, currentUserId, userId }) {
    const [isPopupOpen, setTogglePopup] = useState(false);
    const [selectedStatus, setStatus] = useState(statuses[0]);
    // useEffect(() => {
    //     const currentRole = _.find(users_roles, ['id', roleId]);
    //     setRole(currentRole);
    // }, [roleId]);

    const handleChangeStatus= status => {
        // statuses.forEach(status => {
        //     if(status.id === roleId) {
        //         setRole(status);
        //     }
        // });
        setStatus(status);
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