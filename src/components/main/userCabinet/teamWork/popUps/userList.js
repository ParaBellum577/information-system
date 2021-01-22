import React, { memo, useState, useEffect } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { GiCheckMark } from 'react-icons/gi';
import { addUser } from 'actions/team';
import _ from 'lodash';
import Popup from 'reactjs-popup';
import styles from '../index.module.scss';
import buttons from 'src/components/buttons.module.scss';
import undefAvatar from 'src/components/style/avatar.png';
import { BiSearchAlt2 } from 'react-icons/bi';

const actions = { addUser };
const UserList = function ({ trigger, addUser, teamId, userId, getUsers }) {
    //   const { t } = useTranslation();
    const [isPopupOpen, setTogglePopup] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]);
    const [search, setSearch] = useState('');
    const [initialState, setInitialState] = useState([]);

    useEffect(() => {
        showUserToAdd();
    }, [teamId]);

    const handleSelect = id => {
        setSelectedUser(id);
    }
    const handleConfirm = async () => {
        const data = { teamId, userId };
        await addUser(data, userId);
        getUsers();
        setTogglePopup(false);
    };

    const showUserToAdd = async () => {
        try {
            const res = await axios.post(
                `/api/team/showUserToAdd`,
                { teamId },
                { params: { id: userId } }
            );
            setUsers(res.data);
            setInitialState(res.data);
        } catch (error) {
            console.log('showUserToAdd error:', error);
        }
    };

    const handleSearchUsers = event => {
        const updatedList = _.filter(initialState, user => {
            const fullUserName = user.firstName + user.lastName;
            return fullUserName.toLowerCase().includes(event.target.value.toLowerCase());
        });
        setUsers(updatedList);
        setSearch(event.target.value);
    };

    return (
        <Popup
            trigger={trigger}
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
        {
             !_.isEmpty(initialState) ?
            <div className={`${styles.changeName}`}>
                <h5>Оберіть участника</h5>
                <div className={styles.projectSearch}>
                    <BiSearchAlt2 size="20" />
                    <input
                        type="text"
                        placeholder="Ім'я участника"
                        value={search}
                        onChange={handleSearchUsers}
                    />
                </div>
                <div className={styles.usersListBlock}>
                    <Scrollbars
                        autoHeight
                        autoHeightMax={216}
                    >
                        {
                            users.map(user => (
                                <div key={user.id} onClick={() => handleSelect(user.id)} className={styles.conversationListItem}>
                                    <img className={styles.conversationAvatar} src={undefAvatar} alt="" />
                                    <div>
                                        <h1>{`${user.firstName} ${user.lastName}`}</h1>
                                        {
                                            selectedUser === user.id &&
                                            <GiCheckMark color="#30B4AE" />
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </Scrollbars>
                </div>
                <button className={buttons.buttonSignIn} onClick={handleConfirm}>OK</button>
            </div>
            : 
            <div style={{
                fontSize: '13px',
                color: '#7f8fa4',
                fontWeight: 'bold',
            }} className={styles.changeName}>
                Усі участники вже у команді
            </div>
        }
        </Popup>
    )
}

export default memo(connect(null, actions)(UserList));
