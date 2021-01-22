import React from 'react';
import Header from '../header/index';
import Footer from '../footer/index';
import { showStakeholderQueryAll } from 'actions/stakeholders';
import { BiSearchAlt2 } from 'react-icons/bi';
import { connect } from 'react-redux';
import _ from 'lodash';
import RequestItem from './requestItem';
import { useTranslation } from 'react-i18next';
// import { Scrollbars } from 'react-custom-scrollbars';
import InfiniteScroll from 'react-infinite-scroller';

import styles from './index.module.scss';

const actions = { showStakeholderQueryAll };
const mapStateToProps = ({ stakeholder, user }) => ({ stakeholder, user });

const StakeholdersRequests = function ({ stakeholder, user, showStakeholderQueryAll }) {
  const { t } = useTranslation();
  const [search, setSearch] = React.useState('');
  const [showOptionLimit, setOptionLimit] = React.useState(2);
  const ListLength = !_.isEmpty(stakeholder.requests) ? stakeholder.requests.length : 0;

  const loadMoreTasks = () => setOptionLimit(showOptionLimit + 2);

  React.useEffect(() => {
    showStakeholderQueryAll(user.user.id);
  }, []);

  const handleSearchProjects = event => setSearch(event.target.value);

  return (
    <>
      <Header />
      <div className={styles.request}>
        <div className={styles.projectSearch}>
          <BiSearchAlt2 size="20" />
          <input
            type="text"
            placeholder={t('Project name')}
            value={search}
            onChange={handleSearchProjects}
          />
        </div>
        {/* <Scrollbars
          autoHide
          autoHeight
          autoHeightMin={620}
          autoHeightMax={820}
        > */}
          <InfiniteScroll
            pageStart={0}
            loadMore={loadMoreTasks}
            hasMore={ListLength > showOptionLimit}
            useWindow={false}
          >
            {
              !_.isEmpty(stakeholder.requests) &&
              _.take(stakeholder.requests, showOptionLimit).map(request => (
                request.stakeholderQueryStatusId === 2 &&
                request.projectName.toLowerCase().includes(search.toLowerCase()) &&
                <RequestItem key={request.id} request={request} />
              ))
            }
          </InfiniteScroll>
        {/* </Scrollbars> */}
      </div>
      <Footer />
    </>
  )
}

export default React.memo(connect(mapStateToProps, actions)(StakeholdersRequests));
