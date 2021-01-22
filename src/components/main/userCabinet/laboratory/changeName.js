import React, { memo, useState, useEffect } from 'react';
import _ from 'lodash';
import Popup from 'reactjs-popup';
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';
import buttons from 'src/components/buttons.module.scss';

const EditNamePopUp = function ({trigger, handleChangeName, labID, userId, getLabs}) {
    const [isPopupOpen, setTogglePopup] = useState(false);
    const [name, setName] = useState('');
    const { t } = useTranslation();

    const handleConfirm = async () => {
        const data = {
            laboratoryId: labID,
            changedField: {
                laboratoryName: name
            }
        };
       await handleChangeName(data, userId);
       getLabs();
       setTogglePopup(false);
    };

    return (
        <Popup
            trigger={trigger}
            open={isPopupOpen}
            onOpen={() => setTogglePopup(!isPopupOpen)}
            onClose={() => setTogglePopup(false)}
            closeOnDocumentClick
            closeOnEscape
            position="bottom left"
            arrow
            contentStyle={{
                width: '0',
                boxShadow: 'none',
                border: 'none',
                padding: '0',
            }}
        >
            <div className={styles.changeName}>
                <h5>{t('Change laboratories')}</h5>
                <div>
                    <input onChange={e => setName(e.target.value)} type="text"/>
                    <button className={buttons.buttonSignIn} onClick={handleConfirm}>{t('Save')}</button>
                </div>
            </div>
        </Popup>
    )
}

export default memo(EditNamePopUp);