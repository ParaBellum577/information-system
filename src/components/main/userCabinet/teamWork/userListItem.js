import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { removeUser } from 'actions/team';
import { CgUserRemove } from 'react-icons/cg';
import undefAvatar from 'src/components/style/avatar.png';


import styles from './index.module.scss';

const actions = { removeUser };
const UserListItem = function ({ userData , currentUserId, teamId, removeUser, getUsers}) {

    const handleRemoveUser = async () => {
        const data = {teamId, userId: userData.id};
        await removeUser(data, currentUserId);
        getUsers();
    }

    return (
        <>
            <div className={styles.userListItem}>
                <div className={styles.userData}>
                    <img src={undefAvatar} alt="avatar"/>
                    <span>{`${userData.firstName} ${userData.lastName}`}</span>
                </div>
                <CgUserRemove onClick={handleRemoveUser} title="remove user" size="22"/>
            </div>
        </>
    )
}

export default React.memo(connect(null, actions)(UserListItem));