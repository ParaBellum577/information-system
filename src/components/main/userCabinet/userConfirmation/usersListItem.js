import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import { removeUser } from 'actions/team';
import { changeUserRole } from 'actions/stakeholders';
import { TiCancel, TiTick } from 'react-icons/ti';
import { BsChevronDoubleDown, BsChevronDoubleUp } from 'react-icons/bs';
import RolePopUp from './rolePopUp';
import UserdeclinePopUp from './userdeclinePopUp';

import styles from './index.module.scss';

const actions = { removeUser, changeUserRole };
const UserListItem = function ({ data, changeUserRole, userId, t, userDecline, userConfirm, getUsers }) {
    const [open, setOpen] = useState(false);

    const handleConfirmUser = async () => {
        await userConfirm(data.id, userId);
        getUsers();
    }

    const handleDeclineUser = async () => {
        await userDecline(data.id, userId);
        getUsers();
    }
    return (
        <>
            <table className={styles.usersItem}>
                <thead className={styles.usersItemHeader}>
                    <tr><th>{t('User name')}</th></tr>
                    <tr><th>{t('Register Date')}</th></tr>
                    <tr><th>{t('Role')}</th></tr>
                    {
                        data.isActive &&
                        <tr><th>{t('Actions')}</th></tr>
                    }
                </thead>
                <tbody className={styles.usersItemBody}>
                    <tr>
                        <td className={styles.userName}>
                            {`${data.lastName} ${data.firstName} ${data.patronymic}`}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {moment(data.createdAt).format('DD-MM-YYYY')}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <RolePopUp
                                changeUserRole={changeUserRole}
                                userId={data.id}
                                currentUserId={userId}
                                roleId={data.roleId}
                                disabled={!data.isActive}
                            />
                        </td>
                    </tr>
                    <tr className={`${styles.actions}`}>
                    {
                        data.isActive &&
                            <td>
                                <div>
                                    <UserdeclinePopUp
                                        trigger={<TiCancel data-tip="Відхилити" size="25" />}
                                        handleDeclineUser={handleDeclineUser}
                                    />
                                    {
                                        !data.userConfirm &&
                                        <TiTick onClick={handleConfirmUser} data-tip="Підтвердити" size="25" />
                                    }
                                </div>
                            </td>
                    }
                    </tr>
                    <div onClick={() => setOpen(!open)} style={open ? { opacity: 1 } : {}} className={styles.arrowDropDown}>
                        {
                            open ?
                                <BsChevronDoubleUp size="20" /> :
                                <BsChevronDoubleDown size="20" />
                        }
                    </div>
                </tbody>
                {
                    open &&
                    <div className={styles.userInfo}>
                        <div>
                            <span>{t('User Name')}:</span>
                            <p>{`${data.lastName} ${data.firstName} ${data.patronymic}`}</p>
                        </div>
                        <div>
                            <span>{t('Phone')}:</span>
                            <p>{data.phone}</p>
                        </div>
                        <div>
                            <span>{t('Email address')}:</span>
                            <p>{data.email}</p>
                        </div>
                        <div>
                            <span>{t("Country of Residence")}:</span>
                            <p>{data.countryOfResidence}</p>
                        </div>
                        <div>
                            <span>{t('Citizenship')}:</span>
                            <p>{data.nationality}</p>
                        </div>
                        <div>
                            <span>{t('Date of birth')}:</span>
                            <p>{moment(`${data.dateOfBirth}-${data.monthOfBirth}-${data.yearOfBirth}`).format('DD-MM-YYYY')}</p>
                        </div>
                        <div>
                            <span>{t('How did you know about ?')}:</span>
                            <p>{`${data.sourceOfKnowledgeAboutTheLab}`}</p>
                        </div>
                        <div>
                            <span>{t("The purpose of work in the laboratory")}:</span>
                            <p>{`${data.purposeOfWorkInLab}`}</p>
                        </div>
                    </div>
                }
                <ReactTooltip />
                <ReactTooltip />
                <ReactTooltip />
            </table>
        </>
    )
}

export default React.memo(connect(null, actions)(UserListItem));