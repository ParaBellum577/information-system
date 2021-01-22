import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import styles from './index.module.scss';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';
import EditNamePopUp from './changeName';
import buttons from 'src/components/buttons.module.scss';



const LaboratoryItem = function ({ data, userList, userId, deleteLaboratory, getLabs, updateLaboratory, t }) {
    const [adminData, setAdminData] = useState({});
    useEffect(() => {
        !_.isEmpty(userList) && userList.map(user => {
            if (user.id === data.administrator) {
                return setAdminData(user);
            }
        })
    }, [data]);

    const handleDeleteLab = async () => {
        await deleteLaboratory(data.id, userId);
        getLabs();
    }

    return (
        <>
            <div className={styles.labItem}>
                <div className={styles.labItemInfo}>
                    <div className={styles.labItemInfoContent}>
                        <div className={styles.labItemInfoHeader}>
                            <div>
                                <h5>{data.laboratoryName}</h5>
                                {
                                    adminData.id === userId &&
                                    <EditNamePopUp
                                        trigger={<div><FiEdit2 size="15" /></div>}
                                        handleChangeName={updateLaboratory}
                                        labID={data.id}
                                        userId={userId}
                                        getLabs={getLabs}
                                    />
                                }
                            </div>
                            {
                                adminData.id === userId &&
                                <FiTrash2 onClick={handleDeleteLab} size="20" />
                            }
                        </div>
                        <div>
                            <span>{t("Work schedule")}</span>
                            <div className={styles.daysOfWeek}>
                                <p>{t("Mo")}:</p>
                                <p>{t("Tu")}:</p>
                                <p>{t("We")}:</p>
                                <p>{t("Th")}:</p>
                                <p>{t("Fr")}:</p>
                                <p>{t("Sa")}:</p>
                                <p>{t("Su")}:</p>
                            </div>
                            <div>
                                {
                                   !_.isEmpty(data.LaboratorySchedules) && data.LaboratorySchedules.map(el => (
                                        el.dayOff ? <p>{"Weekend"}</p> :
                                        <p key={el.dayId}>{`${el.workDayStart} - ${el.workDayEnd}`}</p>
                                        
                                    ))
                                }
                            </div>
                        </div>
                        <div>
                            <span>{t('Admin')}:</span>
                            <p>{`${adminData.lastName} ${adminData.firstName} ${adminData.patronymic}`}</p>
                        </div>
                        <div>
                            <span>{t("Equipment")}:</span>
                            <p>Обладнання1, Обладнання2</p>
                        </div>
                    </div>
                    <div className={styles.labItemInfoButtons}>
                        <button className={buttons.buttonSignIn}>{t('Presence log')}</button>
                        <button className={buttons.buttonConfirm}>{t("Accounting")}</button>
                    </div>
                </div>
                <div></div>
            </div>
        </>
    )
}

export default (LaboratoryItem);