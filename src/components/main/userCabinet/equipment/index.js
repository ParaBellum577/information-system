import React, { memo, useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import LoaderThreeDots from 'common/customLoader';
import CustomSearch from 'common/searchComponent';
import { 
    getEquipment, 
} from 'actions/equipment';
import AddEquipment from './addEquipment';
import EquipmentItem from './equipmentItem';

import 'reactjs-popup/dist/index.css';
import styles from './index.module.scss';


const mapStateToProps = ({ equipment }) => ({ equipment });
const actions = { getEquipment };

const EquipmentTab = function ({ equipment, getEquipment }) {
    const { t } = useTranslation();
    const id = localStorage.getItem('currentUserId');
    const [search, setSearch] = useState('');

    const handleSearchProjects = event => {
        setSearch(event.target.value);
    };

    useEffect(() => {
        getEquipmentData();
    }, []);

    const getEquipmentData = async () => {
        if(_.isEmpty(equipment.equipment)) {
            await getEquipment();
        }
    };

    return (
        <>
            <div className={styles.equipment}>
                <div className={styles.equipmentHeader}>
                    <CustomSearch
                        placeholder={t('Equipment name')}
                        search={search}
                        handleSearch={handleSearchProjects}
                    />
                    <AddEquipment />
                </div>
                {
                    _.isEmpty(equipment.equipment) ? <div className={styles.loader}><LoaderThreeDots height={150} width={200} /></div> :
                        <div className={styles.equipmentContent}>
                            {
                                equipment.equipment.map(equip => (
                                    equip.equipmentName.toLowerCase().includes(search.toLowerCase()) &&
                                    <EquipmentItem
                                        t={t}
                                        key={equip.id}
                                        userId={id}
                                        data={equip}
                                    />
                                ))
                            }
                        </div>
                }
            </div>
        </>
    )
}

export default memo(connect(mapStateToProps, actions)(EquipmentTab));