import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import styles from './index.module.scss';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';
import EditNamePopUp from './changeName';
// import buttons from 'src/components/buttons.module.scss';



const CompetencesItem = function ({ data, t, changeCompetenceName, showCompetenceAll }) {

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
            <div className={styles.competenceItem}>
                <div className={styles.competenceItemInfo}>
                    <div className={styles.competenceItemInfoContent}>
                        <div className={styles.competenceItemInfoHeader}>
                            <div>
                                <h5>{data.competenceName}</h5>
                                {
                                    // adminData.id === userId &&
                                    <EditNamePopUp
                                        trigger={<div><FiEdit2 size="15" /></div>}
                                        changeCompetenceName={changeCompetenceName}
                                        showCompetenceAll={showCompetenceAll}
                                        itemId={data.id}
                                    />
                                }
                            </div>
                            {
                                // adminData.id === userId &&
                                <FiTrash2 size="20" />
                            }
                        </div>
                        <div>
                            <span>{t('Courses')}:</span>
                            <div>
                                <p>курс, курс1, курс2</p>
                            </div>
                        </div>
                        <div>
                            <span>{t('Equipment')}:</span>
                            <p>Обладнання 1, Обладнання 2</p>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
        </>
    )
}

export default (CompetencesItem);