import React, { memo, useState, useEffect } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import _ from 'lodash';
import Popup from 'reactjs-popup';
import styles from './index.module.scss';
import { users_roles } from 'common/constansts';

const RolePopUp = function ({ roleId, changeUserRole, currentUserId, userId, disabled }) {
    const [isPopupOpen, setTogglePopup] = useState(false);
    const [selectedRole, setRole] = useState(users_roles[0]);

    useEffect(() => {
        const currentRole = _.find(users_roles, ['id', roleId]);
        setRole(currentRole);
    }, [roleId]);

    const handleChangerole = roleId => {
        users_roles.forEach(role => {
            if(role.id === roleId) {
                setRole(role);
            }
        });
        changeUserRole({userId, roleId}, currentUserId);
        setTogglePopup(false);
    }

    return (
        <Popup
            trigger={
                <div 
                data-tip={disabled ? "Користувача відхилино" : "Змінити роль" }
                className={styles.roleBlock} 
                style={isPopupOpen ? {
                    backgroundColor: '#f2f4f7'
                } : {}}
                >
                    {selectedRole.role}
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
            disabled={disabled}
            contentStyle={{
                width: '0',
                boxShadow: 'none',
                border: 'none',
                padding: '0',
            }}
        >
            <div className={styles.roleContent}>
                {
                    users_roles.map(e => (
                        e.id !== 1 &&
                        <div
                            key={e.id}
                            style={selectedRole.id === e.id ? {
                                background: '#f0f3f5',
                                color: '#1991eb'
                            } : {}}
                            onClick={() => handleChangerole(e.id)} 
                            className={`${styles.roleListItem}`}
                        >
                            <span>{e.role}</span>
                            {selectedRole.id === e.id && <AiOutlineCheck size="15" />}
                        </div>
                    ))
                }
            </div>
        </Popup>
    )
}

export default memo(RolePopUp);