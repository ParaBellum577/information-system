import React, { useState, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { showUserList } from '../../../../actions/user';
import { createChat } from '../../../../actions/chat';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import _ from 'lodash'
import { GiCheckMark } from 'react-icons/gi';
import buttons from '../../../buttons.module.scss'
import style from './index.module.scss';
import styles from '../../../main/stakeholders/index.module.scss';
import 'reactjs-popup/dist/index.css';

const actions = { showUserList, createChat };

const ConversationButton = function ({ createChat, chatRooms, showUserList, user, userId, updateChatList, t }) {
    const [selectedUsers, setSelectedUsers] = useState([userId]);
    const userID = localStorage.getItem('currentUserId');
    useEffect(() => {
        showUserList(userID || userId);
        setSelectedUsers([userId]);
    }, []);

    const handleCreateChat = async () => {
        const data = {
            creator: userId,
            users: selectedUsers
        }
        await createChat(data);
        setSelectedUsers([]);
        updateChatList(userId);
    }

    const handleSelect = id => {
        const selected = [...selectedUsers];
        const index = selected.indexOf(id);
        if (index > -1) {
            selected.splice(index, 1);
        } else {
            selected.push(id);
        }
        setSelectedUsers(selected);
    }
    return (
        <div className={style.convButton}>
            <Popup
                modal
                position="center"
                trigger={<button className={buttons.buttonConfirm} >{t('Create a new chat')}</button>}
                className={styles.createChat}
            >
                {
                    close => (
                        <>
                            <Scrollbars
                                autoHeight
                                autoHeightMax={400}
                            >
                                {
                                    user.userList && user.userList.map(userData => (
                                        user.user.id !== userData.id &&
                                        <div onClick={() => handleSelect(userData.id)} className={style.conversationListItem}>
                                            <img className={style.conversationAvatar} src={userData.avatar} alt="" />
                                            <div>
                                                <h1>{`${userData.firstName} ${userData.lastName}`}</h1>
                                                {
                                                    selectedUsers.indexOf(userData.id) > -1 &&
                                                    <GiCheckMark color="#30B4AE" />
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </Scrollbars>
                            <div className={style.buttons}>
                                {/* <button className={buttons.buttonConfirm}>Cancel</button> */}
                                <button className={buttons.buttonSignIn} onClick={() => {
                                    handleCreateChat();
                                    close();
                                }}>{t('Create')}</button>
                            </div>
                        </>
                    )
                }
            </Popup>
        </div>
    );
}

export default React.memo(connect(null, actions)(ConversationButton));