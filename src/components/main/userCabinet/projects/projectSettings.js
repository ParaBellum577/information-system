import React, { useState, useEffect, memo } from 'react';
import { connect } from 'react-redux'
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { Link, useLocation  } from '@reach/router';
import styles from './index.module.scss';


const mapStateToProps = ({ user }) => ({ user });

const ProjectSettings = function (props) {
    const [activeTab, setActiveTab] = useState(1);
    const location = useLocation();
    const { t } = useTranslation();

    useEffect(() => {
      if(location.pathname.includes('about')) {
        setActiveTab(1) 
      } else if (location.pathname.includes('tasks')) {
        setActiveTab(2) 
      } else if (location.pathname.includes('active-sprint')) {
        setActiveTab(3) 
      }
    }, []);
    
    const handleSetActiveTab = idx => {
        setActiveTab(idx);
    }
    return (
        <div className={styles.projectSettings}>
            <div className={styles.projectSettingsHeader}>
                <Link
                    onClick={() => handleSetActiveTab(1)}
                    to={`/dashboard/projects/${props.projectId}/about/`}
                    className={activeTab === 1 && styles.activeTab}
                >
                    {t('About the project')}
                </Link>
                <Link
                    onClick={() => handleSetActiveTab(2)}
                    to={`/dashboard/projects/${props.projectId}/tasks/`}
                    className={activeTab === 2 && styles.activeTab}
                >
                    {t('Tasks')}
                </Link>
                <Link
                    onClick={() => handleSetActiveTab(3)}
                    to={`/dashboard/projects/${props.projectId}/active-sprint/`}
                    className={activeTab === 3 && styles.activeTab}
                >
                    {t('Active sprint')}
                </Link>
                <Link
                    onClick={() => handleSetActiveTab(4)}
                    to={`/dashboard/projects/${props.projectId}/about/`}
                    className={activeTab === 4 && styles.activeTab}
                >
                    {t('Gantt')}
                </Link>
                <Link
                    onClick={() => handleSetActiveTab(5)}
                    to={`/dashboard/projects/${props.projectId}/about/`}
                    className={activeTab === 5 && styles.activeTab}
                >
                    {t('Settings')}
                </Link>
            </div>
            {props.children}
        </div>
    )
}

export default memo(connect(mapStateToProps)(ProjectSettings));