import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { Link } from '@reach/router';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import _ from 'lodash';
import styles from './index.module.scss';
import buttons from 'src/components/buttons.module.scss';
import { navigate } from '@reach/router';
import { projectFinish, projectStart } from 'actions/project';
import { FiTrash2, FiSettings } from 'react-icons/fi';
import { BiPlayCircle, BiPauseCircle } from 'react-icons/bi';
import { project_statuses } from 'common/constansts';
import LoaderThreeDots from 'common/customLoader';
import CustomPopUp from '../../../main/popUps/customPopUp';

import undefAvatar from 'src/components/style/avatar.png';
const mapStateToProps = ({ user }) => ({ user });
const actions = { projectFinish, projectStart };

const Projects = function ({ projectData, projectFinish, projectStart, user, getProjects, t }) {
    const [team, setTeam] = useState({});
    const [isActiveProject, setIsActiveProject] = useState(false);
    const [teamUsers, setTeamUsers] = useState([]);
    const [color, setColor] = useState('#0000');
    const popUpContent = () => {
        const renderContent = (
            <div className={styles.modalProject}>
                <h5>Ви впевнені, що хочете закрити проєкт?</h5>
                <div>
                    <button className={buttons.cancelButton}>Скасувати</button>
                    <button className={buttons.buttonConfirm}>Підтвердити</button>
                </div>
            </div>
        );
        return renderContent
    }

    const showTeam = async () => {
        try {
            const res = await axios.post(
                `/api/team/showTeam`,
                { projectId: projectData.id },
                { params: { id: user.user.id } }
            );
            showTeamsUser(res.data.id);
            setTeam(res.data);
        } catch (error) {
            console.log('createTask error:', error);
        }
    };

    const showTeamsUser = async id => {
        try {
            const res = await axios.post(
                `/api/team/showTeamsUser`,
                { teamId: id },
                { params: { id: user.user.id } }
            );
            setTeamUsers(res.data);
        } catch (error) {
            console.log('showTeamsUser error:', error);
        }
    };
    useEffect(() => {
        if (projectData.status !== 2) {
            setIsActiveProject(false);
        } else {
            setIsActiveProject(true);
        }
    }, []);

    useEffect(() => {
        project_statuses.forEach(e => {
            if (e.id === projectData.status) {
                setColor(e.color);
            }
        });
        showTeam();
    }, [projectData]);

    const handleStart = async () => {
        await projectStart(projectData.id, user.user.id);
        getProjects();
        setIsActiveProject(!isActiveProject);
    }
    const handlefinish = async () => {
        await projectFinish(projectData.id, user.user.id);
        getProjects();
        setIsActiveProject(!isActiveProject);
    }
    return (
        <>
            {
                projectData &&
                <table className={styles.projectItem}>
                    <thead className={styles.projectItemHeader}>
                        <tr className={styles.width25}><th>{t('Project name')}</th></tr>
                        <tr className={styles.width12}><th>{t('Status')}</th></tr>
                        <tr className={styles.width25}><th>{t('Start and end date')}</th></tr>
                        <tr className={styles.width25}><th>{t('Teams')}</th></tr>
                        <tr className={styles.width12}></tr>
                    </thead>
                    <tbody className={styles.projectItemBody}>
                        <tr className={styles.width25}>
                            {
                                isActiveProject ?
                                    <BiPauseCircle
                                        data-tip="Закінчити проект"
                                        onClick={handlefinish}
                                        size="25"
                                    />
                                    :
                                    <BiPlayCircle
                                        data-tip="Почати проект"
                                        onClick={handleStart}
                                        size="25" />
                            }
                            <td
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate(`/dashboard/projects/${projectData.id}/about`)}
                                className={styles.projectName}
                            >
                                {projectData.StakeholderQuery.projectName}
                            </td>
                        </tr>
                        <tr className={styles.width12}>
                            <td style={{ color: color, fontWeight: '600', fontSize: '12px' }}>
                                {projectData.ProjectStatus.status}
                            </td>
                        </tr>
                        <tr className={styles.width25}>
                            <td>
                                {`${projectData.StakeholderQuery.dateFrom} - ${projectData.StakeholderQuery.dateTo}`}
                            </td>
                        </tr>
                        <tr className={styles.width25}>
                            <td>
                                {
                                    _.isEmpty(teamUsers) ? <div className={styles.loader}><LoaderThreeDots height={60} width={80} /></div> :
                                        <div className={styles.teamBlock}>
                                            <img src={undefAvatar} />
                                            <img src={undefAvatar} />
                                            <img src={undefAvatar} />

                                            {/* {
                                        !_.isEmpty(teamUsers) && _.take(teamUsers, 3).map(user => (
                                            <img src={undefAvatar} alt={user.firstName} title={user.firstName} />
                                        ))

                                    } */}
                                            <Link
                                                to="/dashboard/teams/"
                                                state={{ teamName: team.teamName }}
                                                title={team.teamName}
                                            >
                                                {team.teamName}
                                            </Link>
                                        </div>
                                }
                            </td>
                        </tr>
                        <tr className={`${styles.width12} ${styles.actions}`}>
                            <td>
                                <div>
                                    <CustomPopUp
                                        trigger={<FiTrash2 size="20" />}
                                        children={() => popUpContent()}
                                    />
                                </div>
                                <div>
                                    <FiSettings onClick={() => navigate(`/dashboard/projects/${projectData.id}/about`)} size="20" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <ReactTooltip />
                    <ReactTooltip />
                </table>
            }
        </>
    )
}

export default memo(connect(mapStateToProps, actions)(Projects));