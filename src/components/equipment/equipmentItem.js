import React from 'react';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import styles from './index.module.scss';
import buttons from '../../components/buttons.module.scss';


const EquipmentItem = function ({ equip }) {
    const { t } = useTranslation();
    const [canVisibleText, setCanVisibleText] = React.useState(false);

    const handleOpencontent = () => {
        setCanVisibleText(!canVisibleText);
    }

    return (
        <>
            <div key={equip.id} className={styles.equipmentItem}>
                <div className={styles.img}>
                    <img src={equip.equipmentPic} alt="unknown" />
                </div>
                <div>
                    <p>{equip.equipmentName}</p>
                    <button
                        onClick={handleOpencontent}
                        className={buttons.buttonSignIn}
                        >
                        {!canVisibleText ? t('Find out more') : t('Collapse')}
                    </button>
                    {
                        canVisibleText &&
                        <div className={styles.fullContent}>
                            {equip.equipmentDescription}
                        </div>
                    }
                    {
                        equip.EquipmentCharacteristics.map(e => (
                            <div key={e.id}>
                                <span>{`${e.characteristicName}:  `}</span>
                                <span>{e.characteristicValue}</span>
                                <span>{e.characteristicUnit}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default EquipmentItem;
