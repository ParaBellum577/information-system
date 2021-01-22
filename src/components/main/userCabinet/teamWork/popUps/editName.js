import React, { memo, useState, useEffect } from 'react';
import { FiEdit2 } from 'react-icons/fi';

import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import Popup from 'reactjs-popup';
import styles from '../index.module.scss';
import buttons from 'src/components/buttons.module.scss';

const EditNamePopUp = function ({trigger, handleChangeName}) {
    const [isPopupOpen, setTogglePopup] = useState(false);
    const [name, setName] = useState('');
    const { t } = useTranslation();

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
                <h5>{t('Change team name')}</h5>
                <div>
                    <input onChange={e => setName(e.target.value)} type="text"/>
                    <button className={buttons.buttonSignIn} onClick={() => {
                        handleChangeName(name);
                        setTogglePopup(false);
                        }}>{t('Save')}</button>
                </div>
            </div>
        </Popup>
    )
}

export default memo(EditNamePopUp);