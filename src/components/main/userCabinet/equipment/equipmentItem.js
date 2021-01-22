import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import styles from './index.module.scss';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';

// import buttons from 'src/components/buttons.module.scss';



const EquipmentItem = function ({ data, t, changeCompetenceName, showCompetenceAll, userId }) {
    const [adminData, setAdminData] = useState({});

    // useEffect(() => {
    //     !_.isEmpty(userList) && userList.map(user => {
    //         if (user.id === data.administrator) {
    //             return setAdminData(user);
    //         }
    //     })
    // }, [data]);

    // const handleDeleteLab = async () => {
    //     await deleteLaboratory(data.id, userId);
    //     getLabs();
    // }

    return (
        <>
            <div className={styles.equipmentItem}>
                <div className={styles.equipmentItemHeader}>
                    <h5>{data.equipmentName}</h5>
                    <div>
                        <FiEdit2 size="20" />
                        <FiTrash2 size="20" />
                    </div>
                </div>
                <div className={styles.equipmentItemContent}>
                    <div>{data.equipmentDescription}</div>
                    <div><img src={data.equipmentPic} alt="equipmentImg" /></div>
                </div>
                <div>
                    {
                        !_.isEmpty(data.EquipmentCharacteristics) &&
                        data.EquipmentCharacteristics.map(el => (
                            <div className={styles.characteristicElement}>
                                <span>{el.characteristicName}:</span>
                                <p>{`${el.characteristicValue} ${el.characteristicUnit}`}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default (EquipmentItem);