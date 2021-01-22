import React, { useState, useEffect, memo } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from '@reach/router';
import styles from './index.module.scss';


const LaboratoryIndex = function (props) {
    const [activeTab, setActiveTab] = useState(1);
    const location = useLocation();
    const { t } = useTranslation();
    
    useEffect(() => {
        if (location.pathname.includes('laboratory')) {
            setActiveTab(1)
        } else if (location.pathname.includes('equipment')) {
            setActiveTab(2)
        } else if (location.pathname.includes('competences')) {
            setActiveTab(4)
        }
        // else if (location.pathname.includes('competences')) {
        //     setActiveTab(3)
        // } 
    }, []);

    const handleSetActiveTab = idx => {
        setActiveTab(idx);
    }
    return (
        <div className={styles.laboratoryNav}>
            <div className={styles.laboratoryLinks}>
                <Link
                    onClick={() => handleSetActiveTab(1)}
                    to={`/dashboard/laboratory/`}
                    className={activeTab === 1 && styles.activeTab}
                >
                    {t('Laboratory')}
                </Link>
                <Link
                    onClick={() => handleSetActiveTab(2)}
                    to={`/dashboard/laboratory/equipment/`}
                    className={activeTab === 2 && styles.activeTab}
                >
                    {t('Equipment')}
                </Link>
                <Link
                    onClick={() => handleSetActiveTab(3)}
                    to={`/dashboard/dashboard/courses/`}
                    className={activeTab === 3 && styles.activeTab}
                >
                    {t('Courses')}
                </Link>
                <Link
                    onClick={() => handleSetActiveTab(4)}
                    to={`/dashboard/laboratory/competences/`}
                    className={activeTab === 4 && styles.activeTab}
                >
                    {t('Competences')}
                </Link>
            </div>
            <div className={styles.labContainer}>
            <Scrollbars
                autoHeight
                autoHeightMin={780}
                // autoHeightMax={820}
            >
                {props.children}
            </Scrollbars>
            </div>
        </div>
    )
}

export default memo(LaboratoryIndex);