import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import _ from 'lodash';
import CustomSearch from 'common/searchComponent';
import LoaderThreeDots from 'common/customLoader';
import UsersListItem from './usersListItem';
import { useTranslation } from 'react-i18next';
import { showUserList } from 'actions/user';
import { userConfirm, userDecline } from 'actions/stakeholders';
import { Scrollbars } from 'react-custom-scrollbars';
import InfiniteScroll from 'react-infinite-scroller'
import Switch from "react-switch";
import StatusPopUp from '../stakeholderAppConfirmation/filters/statusPopUp';

import styles from './index.module.scss';

const actions = {
    showUserList,
    userConfirm,
    userDecline
};

const mapStateToProps = ({ user }) => ({ user });

const Laboratory = function ({ user, showUserList, userConfirm, userDecline }) {
    const { t } = useTranslation();
    const userID = localStorage.getItem('currentUserId');
    const [userList, setUserList] = useState([]);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState(false);
    const [checked, setChecked] = useState(false);
    const [showOptionLimit, setOptionLimit] = useState(8);
    const ListLength = !_.isEmpty(user.userList) ? user.userList.length : 0;

    const loadMoreTasks = () => setOptionLimit(showOptionLimit + 4);

    const getUsers = async () => {
        await showUserList(userID);
        setUserList(user.userList);
    }

    useEffect(() => {
        getUsers();
    }, []);

    const handleSearchUsers = event => {
        setSearch(event.target.value);
    };

    const handleFilterByStatus = status => {
        if (status === 1) {
            setStatus(false);
        } else if (status === 2) {
            setStatus(true);
        } else {
            setStatus(status);
        }
    }

    const handleSwitch = () => {
        setChecked(!checked);
    };
    return (
        <>
            <div className={styles.users}>
                <div className={styles.usersHeader}>
                    <CustomSearch
                        placeholder={t('User name')}
                        value={search}
                        handleSearch={handleSearchUsers}
                    />
                    <StatusPopUp t={t} handleFilterByStatus={handleFilterByStatus} />
                    <div>
                        <span>{t('Active')}</span>
                        <Switch onColor="#1991eb" onChange={handleSwitch} checked={checked} />
                        <span>{t('Rejected')}</span>
                    </div>
                </div>
                <Scrollbars
                    autoHide
                    autoHeight
                    autoHeightMin={620}
                    autoHeightMax={820}
                >
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={loadMoreTasks}
                        hasMore={ListLength > showOptionLimit}
                        useWindow={false}
                    >
                        {
                            _.isEmpty(user.userList) ? <div className={styles.loader}><LoaderThreeDots height={150} width={200} /></div> :
                                <div className={styles.usersList}>
                                    {
                                        !_.isEmpty(user.userList) &&
                                        _.take(user.userList, showOptionLimit).map(el => {
                                            const fullUserName = el.firstName + el.lastName;
                                            return (
                                                (el.id !== user.user.id) &&
                                                fullUserName.toLowerCase().includes(search.toLowerCase()) &&
                                                (el.userConfirm === status || status === 3) &&
                                                (el.isActive !== checked) &&
                                                <UsersListItem
                                                    data={el}
                                                    userId={user.user.id}
                                                    userConfirm={userConfirm}
                                                    userDecline={userDecline}
                                                    getUsers={getUsers}
                                                    t={t}
                                                />
                                            )
                                        })
                                    }
                                </div>
                        }
                    </InfiniteScroll>
                </Scrollbars>
            </div>
        </>
    )
}

export default memo(connect(mapStateToProps, actions)(Laboratory));