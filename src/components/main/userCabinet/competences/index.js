import React, { memo, useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import LoaderThreeDots from 'common/customLoader';
import CustomSearch from 'common/searchComponent';
import { CustomInput } from 'common/customFormComponents/customInput';
import { 
    showCompetenceAll, 
    createCompetence,
    changeCompetenceName 
} from 'actions/сompetence';

import CompetencesItem from './competenceItem';
import 'reactjs-popup/dist/index.css';
import styles from './index.module.scss';
import buttons from 'src/components/buttons.module.scss';

const mapStateToProps = ({ сompetence }) => ({ сompetence });
const actions = { showCompetenceAll, createCompetence, changeCompetenceName };

const Competences = function ({ сompetence, showCompetenceAll, createCompetence, changeCompetenceName }) {
    const { t } = useTranslation();
    const id = localStorage.getItem('currentUserId');
    const [open, setOpen] = useState(false);
    const [competenceName, setCompetenceName] =useState('');
    const [search, setSearch] = useState('');

    // const getLabs = async () => {
    //     showUserList(user.user.id);
    //     await showLaboratoryAll(user.user.id);
    //     setLaboratories(laboratory.laboratories);
    // }

    const handleSearchProjects = event => {
        setSearch(event.target.value);
    };

    useEffect(() => {
        showCompetenceAll(id);
    }, []);

    const handleCreate = async () => {
        if(competenceName !== '') {
            await createCompetence({competenceName}, id);
            showCompetenceAll(id);
        }
    };

    const popUpContent = () => {
        const renderContent = (
            <Popup
                trigger={<button className={buttons.buttonConfirm}>+ {t('Add competence')}</button>}
                modal
                nested
                open={open}
                closeOnDocumentClick
                // onClose={closeModal}
            >
                {
                    close => (
                        <div className={styles.createLaboratory}>
                            <CustomInput
                                onChange={(e) => setCompetenceName(e.target.value)}
                                value={competenceName}
                                id="name"
                                type="name"
                                name="name"
                                label="Назва..."
                                maxLength={60}
                                // error={competenceName === ''}
                            />
                            <button onClick={() => {
                                handleCreate();
                                close();
                            }} className={buttons.buttonSignIn}>OK</button>
                        </div>
                    )
                }
            </Popup>
        );
        return renderContent
    }

    return (
        <>
            <div className={styles.competence}>
                <div className={styles.competenceHeader}>
                    <CustomSearch
                        placeholder={t('Competence name')}
                        search={search}
                        handleSearch={handleSearchProjects}
                    />
                    {popUpContent()}
                </div>
                {
                    _.isEmpty(сompetence.competencesList) ? <div className={styles.loader}><LoaderThreeDots height={150} width={200} /></div> :
                        <div className={styles.competenceContent}>
                            {
                                !_.isEmpty(сompetence.competencesList) &&
                                сompetence.competencesList.map(сomp=> (
                                    сomp.competenceName.toLowerCase().includes(search.toLowerCase()) &&
                                    <CompetencesItem
                                        t={t}
                                        key={сomp.id}
                                        data={сomp}
                                        changeCompetenceName={changeCompetenceName}
                                        showCompetenceAll={showCompetenceAll}
                                    />
                                ))
                            }
                        </div>
                }
            </div>
        </>
    )
}

export default memo(connect(mapStateToProps, actions)(Competences));