import React, { memo, useState } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { FiSettings, FiUserPlus, FiEdit2 } from 'react-icons/fi';
import EditNamePopUp from './popUps/editName';
import UserListItem from './userListItem';
import UserList from './popUps/userList';
import styles from './index.module.scss';


const TeamComponent = function ({ data, changeTeamName, userId, getTeams, userList, t }) {
    const [users, setUsers] = useState([]);

    const handleChangeName = async name => {
        const payload = {
            teamId: data.id,
            teamName: name
        };
        await changeTeamName(payload, userId);
        getTeams();
    };

    const showTeamUsers = async (teamID, id) => {
        try {
            const res = await axios.post(
                `/api/team/showTeamsUser`,
                { teamId: teamID, },
                { params: { id } }
            );
            setUsers(res.data);
        } catch (error) {
            console.log('showTeamUsers error:', error);
        }
    };

    useState(() => {
        showTeamUsers(data.id, userId);
    }, []);

    return (
        <div className={styles.teamItem}>
            <div className={styles.teamItemHeader}>
                <div>
                    <div>
                        <span>{data.teamName === null ? t('Team') : data.teamName}</span>
                        <EditNamePopUp
                            trigger={<div><FiEdit2 size="15" /></div>}
                            handleChangeName={handleChangeName}
                        />
                    </div>
                    <p>{`${users.length} ${users.length > 1 ? t('users') : t('user')}`}</p>
                </div>
                <div className={styles.buttonsHeader}>
                    <UserList
                        trigger={
                            <div style={{ cursor: 'pointer' }}>
                                <FiUserPlus
                                    title={t('Add user')}
                                    size="20"
                                />
                            </div>
                        }
                        userList={userList}
                        userId={userId}
                        teamId={data.id}
                        getUsers={() => showTeamUsers(data.id, userId)}
                    />
                    <FiSettings title={t('Settings')} size="20" />
                </div>
            </div>
            <div className={styles.userList}>
                {
                    !_.isEmpty(users) && users.map(user => (
                        <UserListItem
                            key={user.id}
                            getUsers={() => showTeamUsers(data.id, userId)}
                            currentUserId={userId}
                            teamId={data.id}
                            userData={user}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default memo(TeamComponent);