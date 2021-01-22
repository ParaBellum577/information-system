import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import _ from 'lodash';
import {
    showLaboratoryAll,
    createLaboratory,
    deleteLaboratory,
    updateLaboratory
} from 'actions/laboratory';
import { showUserList } from 'actions/user';
import LoaderThreeDots from 'common/customLoader';
import LaboratoryItem from './labItem';
import Popup from 'reactjs-popup';
import { CustomInput } from 'common/customFormComponents/customInput';
import DayComponent from './dayComponent';
import { useTranslation } from 'react-i18next';
import CustomSearch from 'common/searchComponent';

import 'reactjs-popup/dist/index.css';
import styles from './index.module.scss';
import buttons from 'src/components/buttons.module.scss';

const actions = {
    showLaboratoryAll,
    showUserList,
    createLaboratory,
    deleteLaboratory,
    updateLaboratory
};

const mapStateToProps = ({ user, laboratory }) => ({ user, laboratory });

const Laboratory = function ({
    showLaboratoryAll,
    updateLaboratory,
    deleteLaboratory,
    createLaboratory,
    showUserList,
    user,
    laboratory
}) {
    const [laboratories, setLaboratories] = useState([]);
    const [open, setOpen] = React.useState(false);
    const userID = localStorage.getItem('currentUserId');
    const [search, setSearch] = useState('');

    const [labName, setLabName] = useState('');
    const [Monday, setMonday] = useState({});
    const [Tuesday, setTuesday] = useState({});
    const [Wednesday, setWednesday] = useState({});
    const [Thursday, setThursday] = useState({});
    const [Friday, setFriday] = useState({});
    const [Saturday, setSaturday] = useState({});
    const [Sunday, setSunday] = useState({});
    const { t } = useTranslation();

    const getLabs = async () => {
        if (_.isEmpty(user.userList)) {
            showUserList(userID);
        }
        await showLaboratoryAll(user.user.id);
        setLaboratories(laboratory.laboratories);
    }
    useEffect(() => {
        getLabs();
    }, []);

    const handleCreateLaboratory = async () => {
        const requesPayload = {
            laboratoryName: labName,
            administrator: user.user.id,
            schedule: {
                1: Monday,
                2: Tuesday,
                3: Wednesday,
                4: Thursday,
                5: Friday,
                6: Saturday,
                7: Sunday,
            }
        };
        if (labName !== '') {
            await createLaboratory(requesPayload, requesPayload.administrator);
            setLabName('');
            getLabs();
        }
    }
    const handleSetMonday = data => setMonday(data);
    const handleSetTuesday = data => setTuesday(data);
    const handleSetWednesday = data => setWednesday(data);
    const handleSetThursday = data => setThursday(data);
    const handleSetFriday = data => setFriday(data);
    const handleSetSaturday = data => setSaturday(data);
    const handleSetSunday = data => setSunday(data);
    const closeModal = () => setOpen(false);
    const handleSearch = event => {
        setSearch(event.target.value);
    };
    const popUpContent = () => {
        const renderContent = (
            <Popup
                trigger={<button className={buttons.buttonConfirm}>+ {t('Add laboratories')}</button>}
                modal
                nested
                open={open}
                closeOnDocumentClick
                onClose={closeModal}
            >
                {
                    close => (
                        <div className={styles.createLaboratory}>
                            <CustomInput
                                onChange={(e) => setLabName(e.target.value)}
                                value={labName}
                                id="name"
                                type="name"
                                name="name"
                                label={t('Name laboratories')}
                                maxLength={100}
                                error={labName === ''}
                            />
                            <div className={styles.createLaboratoryHead}>
                                <span>{t('Work schedule')}</span>
                                <p>{t('Weekend')}:</p>
                            </div>
                            <DayComponent
                                day={t('Mo')}
                                handleSetTime={handleSetMonday}
                            />
                            <DayComponent
                                day={t('Tu')}
                                handleSetTime={handleSetTuesday}
                            />
                            <DayComponent
                                day={t('We')}
                                handleSetTime={handleSetWednesday}
                            />
                            <DayComponent
                                handleSetTime={handleSetThursday}
                                day={t('Th')}
                            />
                            <DayComponent
                                handleSetTime={handleSetFriday}
                                day={t('Fr')}
                            />
                            <DayComponent
                                handleSetTime={handleSetSaturday}
                                day={t('Sa')}
                            />
                            <DayComponent
                                handleSetTime={handleSetSunday}
                                day={t('Su')}
                            />
                            <button disabled={labName === ''} onClick={() => {
                                handleCreateLaboratory();
                                close();
                            }} className={buttons.buttonSignIn}>{t('Save')}</button>
                        </div>
                    )
                }
            </Popup>
        );
        return renderContent
    }

    return (
        <>
            <div className={styles.laboratory}>
                <div className={styles.laboratoryHeader}>
                    <CustomSearch
                        placeholder={t('Name laboratories')}
                        search={search}
                        handleSearch={handleSearch}
                    />
                    {popUpContent()}
                </div>
                {
                    _.isEmpty(laboratory.laboratories) ? <div className={styles.loader}><LoaderThreeDots height={150} width={200} /></div> :
                        <div className={styles.laboratoryContent}>
                            {
                                !_.isEmpty(laboratory.laboratories) &&
                                laboratory.laboratories.map(lab => (
                                    lab.laboratoryName.toLowerCase().includes(search.toLowerCase()) &&
                                    <LaboratoryItem
                                        key={lab.id}
                                        data={lab}
                                        userList={user.userList}
                                        userId={user.user.id}
                                        deleteLaboratory={deleteLaboratory}
                                        updateLaboratory={updateLaboratory}
                                        getLabs={getLabs}
                                        t={t}
                                    />
                                ))
                            }
                        </div>
                }
            </div>
        </>
    )
}

export default memo(connect(mapStateToProps, actions)(Laboratory));