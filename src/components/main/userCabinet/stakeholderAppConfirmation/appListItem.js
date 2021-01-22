import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import { queryConfirm, queryDecline } from 'actions/stakeholders';
import { TiCancel, TiTick } from 'react-icons/ti';
import { BsChevronDoubleDown, BsChevronDoubleUp } from 'react-icons/bs';
import DeclinePopUp from './declineAppPopUp';

import styles from './index.module.scss';

const actions = { queryConfirm, queryDecline };

const AppListItem = function ({ data, userList, userId, t, getData, queryDecline, queryConfirm }) {
    const [open, setOpen] = useState(false);
    const [creator, setCreator] = useState();
    const [status, setStatus] = useState({ color: 'rgb(115, 197, 70)', status: t('Confirmed') });

    useEffect(() => {
        userList.forEach(user => {
            if (user.id === data.userId) {
                setCreator(user);
            }
        });
        getStatusName();
    }, [data]);

    const handleConfirm = async () => {
        await queryConfirm(data.id, userId);
        getData();
    }

    const handleDecline = async (data, id) => {
        await queryDecline(data, id);
        getData();
    }

    const getStatusName = () => {
        if (data.StakeholderQueryStatus.statusName === 'accepted') {
            setStatus({ color: 'rgb(115, 197, 70)', status: t('Confirmed') })
        } else if (data.StakeholderQueryStatus.statusName === 'onCheck') {
            setStatus({ color: 'rgb(255, 158, 48)', status: t('Considered') })
        } else {
            setStatus({ color: 'rgb(221, 44, 0)', status: t('Rejected') })
        }
    }

    return (
        <>
            <table className={styles.appItem}>
                <thead className={styles.appItemHeader}>
                    <tr><th>{t('Project name')}</th></tr>
                    <tr><th>{t('Author')}</th></tr>
                    <tr><th>{t('Date of submission')}</th></tr>
                    <tr><th>{t('Status')}</th></tr>
                    <tr style={{ width: '10%' }}><th>{t('Actions')}</th></tr>
                </thead>
                <tbody className={styles.appItemBody}>
                    <tr>
                        <td className={styles.appName}>
                            {data.projectName}
                        </td>
                    </tr>
                    <tr>
                        {
                            creator &&
                            <td title={`${creator.lastName} ${creator.firstName} ${creator.patronymic}`}>
                                {`${creator.lastName} ${creator.firstName[0].toUpperCase()}.${creator.patronymic[0].toUpperCase()}.`}
                            </td>
                        }
                    </tr>
                    <tr>
                        <td>
                            {moment(data.createdAt).format('DD-MM-YYYY')}
                        </td>
                    </tr>
                    <tr>
                        <td style={{ color: status.color }}>{status.status}</td>
                    </tr>
                    <tr className={`${styles.actions}`}>
                        <td>
                            {
                                data.stakeholderQueryStatusId !== 3 &&
                                <div>
                                    <DeclinePopUp
                                        trigger={<TiCancel data-tip={t('Reject')} size="25" />}
                                        handleDecline={handleDecline}
                                        userId={userId}
                                        stakeholderQueryId={data.id}
                                        disabled={data.stakeholderQueryStatusId === 3}
                                    />
                                    {
                                        data.stakeholderQueryStatusId !== 2 &&
                                        <TiTick onClick={handleConfirm} data-tip={t('Accept')} size="25" />
                                    }
                                </div>
                            }
                        </td>
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
                    <div className={styles.appInfo}>
                        <div>
                            <span>{t('Project area')}:</span>
                            <p>{`${data.projectArea}`}</p>
                        </div>
                        <div>
                            <span>{t('Project implementation goal')}:</span>
                            <p>{data.projectGoals}</p>
                        </div>
                        <div>
                            <span>{t('Concrete results/products')}:</span>
                            {
                                !_.isEmpty(data.Products) && data.Products.map((e, i) => (
                                    <p key={e.productName + i}>{`${e.productName}${(i !== data.Products.length - 1) ? ', ' : ''}`}</p>

                                ))
                            }
                        </div>
                        <div>
                            <span>{t('Required for implementation of equipment from the list of CIR equipment')}:</span>
                            {
                                !_.isEmpty(data.StakeholderEquipments) && data.StakeholderEquipments.map((e, i) => (
                                    <p key={e.equipmentId}>{`${e.equipmentId}${(i !== data.StakeholderEquipments.length - 1) ? ', ' : ''}`}</p>
                                ))
                            }
                        </div>
                        <div>
                            <span>{t('Possible consumers')}:</span>
                            {
                                !_.isEmpty(data.TargetGroups) && data.TargetGroups.map((e, i) => (
                                    <p key={e.targetGroupName + i} >{`${e.targetGroupName}${(i !== data.TargetGroups.length - 1) ? ', ' : ''}`}</p>
                                ))
                            }
                        </div>
                        <div>
                            <span>{t('Declaration of compliance with the law')}:</span>
                            <p>{`${data.declaration}`}</p>
                        </div>
                        <div className={styles.userContarcts}>
                            <h5>{t('Company information')}:</h5>
                            <div>
                                <span>{t('Name of company/firm/enterprise')}:</span>
                                <p>{`${data.StakeholderContact.companyName}`}</p>
                            </div>
                            <div>
                                <span>{t('Position/status')}:</span>
                                <p>{`${data.StakeholderContact.companyRepresentativePosition}`}</p>
                            </div>
                            <div>
                                <span>{t('Type of entity')}:</span>
                                <p>{`${data.StakeholderContact.personType}`}</p>
                            </div>
                            <div>
                                <span>{t('Email')}:</span>
                                <p>{`${data.StakeholderContact.email}`}</p>
                            </div>
                            <div>
                                <span>{t('Phone')}:</span>
                                <p>{`${data.StakeholderContact.phone}`}</p>
                            </div>
                            <div>
                                <span>{t('Legal form or occupation')}:</span>
                                <p>{`${data.StakeholderContact.legalForm}`}</p>
                            </div>
                            <div>
                                <span>{t('Number of previously introduced innovative products')}:</span>
                                <p>{`${data.StakeholderContact.numberOfPreviouslyProducts}`}</p>
                            </div>
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

export default React.memo(connect(null, actions)(AppListItem));