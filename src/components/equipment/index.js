import React from 'react';
import Header from '../header/index';
import Footer from '../footer/index';
import { getEquipment } from '../../actions/equipment';
import { connect } from 'react-redux';
import _ from 'lodash';
import EquipmentItem from './equipmentItem';
// import { Scrollbars } from 'react-custom-scrollbars';
import InfiniteScroll from 'react-infinite-scroller';

import styles from './index.module.scss';

const actions = { getEquipment };
const mapStateToProps = ({ equipment }) => ({ equipment });

const Equipment = function ({ getEquipment, equipment }) {
  const [showOptionLimit, setOptionLimit] = React.useState(4);
  const ListLength = !_.isEmpty(equipment.equipment) ? equipment.equipment.length : 0;

  const loadMoreTasks = () => setOptionLimit(showOptionLimit + 2);

  React.useEffect(() => {
    getEquipment();
  }, [])

  return (
    <>
      <Header />
      <div className={styles.equipment}>
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
              !_.isEmpty(equipment.equipment) &&
              _.take(equipment.equipment, showOptionLimit).map(equip => (
                <EquipmentItem key={equip.id} equip={equip} />
              ))
            }
          </InfiniteScroll>
        {/* </Scrollbars> */}
      </div>
      <Footer />
    </>
  )
}

export default React.memo(connect(mapStateToProps, actions)(Equipment));
