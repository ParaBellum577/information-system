import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './index.module.scss';
import buttons from '../../components/buttons.module.scss';


const RequestItem = function ({ request }) {
    const [canVisibleText, setCanVisibleText] = React.useState(false);
    const { t } = useTranslation();
    const handleOpencontent = () => {
        setCanVisibleText(!canVisibleText);
    }
    return (
        <>
            <div key={request.id} className={styles.requestItem}>
                <div>
                    <div className={styles.requestItemInfo}>
                        <div>
                            <span>{t('Project name')}:</span>
                            <p>{request.projectName}</p>
                        </div>
                        <div>
                            <span>{t('Project area')}:</span>
                            <p>{request.projectArea}</p>
                        </div>
                        <div>
                            <span>{t('Terms of implementation')}:</span>
                            <p>{`${request.dateFrom} - ${request.dateTo}`}</p>
                        </div>
                        <div>
                            <span>{t('Project implementation goal')}:</span>
                            <p>{request.projectGoals}</p>
                        </div>
                        {/* <div>
                    <span>{t('Declaration of compliance with the law and no violation of legal norms/restrictions')}:</span>
                    <p>{request.declaration}</p>
                  </div> */}
                    </div>
                    <button
                        onClick={handleOpencontent}
                        className={buttons.buttonSignIn}
                    >
                        {!canVisibleText ? t('Контактна інформація') : t('Collapse')}
                    </button>
                    {
                        canVisibleText &&
                        <div className={`${styles.requestItemInfo} ${styles.connects}`}>
                            <div>
                                <span>{t('Company representative, full name')}:</span>
                                <p>{request.StakeholderContact.companyRepresentativeName}</p>
                            </div>
                            <div>
                                <span>{t('Position/status')}:</span>
                                <p>{request.StakeholderContact.companyRepresentativePosition}</p>
                            </div>
                            <div>
                                <span>{t('Name of company/firm/enterprise')}:</span>
                                <p>{request.StakeholderContact.companyName}</p>
                            </div>
                            <div>
                                <span>{t('Type of entity')}:</span>
                                <p>{request.StakeholderContact.personType}</p>
                            </div>
                            <div>
                                <span>{t('Legal form or occupation')}:</span>
                                <p>{request.StakeholderContact.legalForm}</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default (RequestItem);
