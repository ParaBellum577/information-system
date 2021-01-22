import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import _ from 'lodash';
import CustomSearch from 'common/searchComponent';
import LoaderThreeDots from 'common/customLoader';
import AppListItem from './appListItem';
import { useTranslation } from 'react-i18next';
import { showStakeholderQueryAll } from 'actions/stakeholders';
import { showUserList } from 'actions/user';
import StatusPopUp from './filters/statusPopUp';
import { Scrollbars } from 'react-custom-scrollbars';
import InfiniteScroll from 'react-infinite-scroller';

import styles from './index.module.scss';

const actions = { showStakeholderQueryAll, showUserList };

const mapStateToProps = ({ stakeholder, user }) => ({ stakeholder, user });
const Laboratory = function ({ stakeholder, user, showStakeholderQueryAll, showUserList }) {
    const { t } = useTranslation();
    const userID = localStorage.getItem('currentUserId');
    const [appList, setAppList] = useState([]);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState(1);

    const [showOptionLimit, setOptionLimit] = useState(8);
    const appListLength = !_.isEmpty(stakeholder.requests) ? stakeholder.requests.length : 0;

    const loadMoreTasks = () => setOptionLimit(showOptionLimit + 4);

    const getData = async () => {
        await showStakeholderQueryAll(userID);
        setAppList(stakeholder.requests);
    }
    useEffect(() => {
        if (_.isEmpty(user.userList)) {
            showUserList(userID);
        }
        getData();
    }, []);

    const handleSearch = event => setSearch(event.target.value);
    const handleFilterByStatus = status => setStatus(status);

    return (
        <>
            <div className={styles.app}>
                <div className={styles.appHeader}>
                    <CustomSearch
                        placeholder={t('Project name')}
                        value={search}
                        handleSearch={handleSearch}
                    />
                    <StatusPopUp handleFilterByStatus={handleFilterByStatus} />
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
                        hasMore={appListLength > showOptionLimit}
                        useWindow={false}
                    >
                        {
                            _.isEmpty(stakeholder.requests) ? <div className={styles.loader}><LoaderThreeDots height={150} width={200} /></div> :
                                <div className={styles.appList}>
                                    {
                                        !_.isEmpty(stakeholder.requests) &&
                                        _.take(stakeholder.requests, showOptionLimit).map(el => {
                                            return (
                                                (el.projectName.toLowerCase().includes(search.toLowerCase())) &&
                                                ((el.stakeholderQueryStatusId === status) || status === 3) &&
                                                <AppListItem
                                                    t={t}
                                                    key={el.id}
                                                    data={el}
                                                    userId={user.user.id}
                                                    userList={user.userList}
                                                    getData={getData}
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