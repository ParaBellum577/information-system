import React, { memo, useState, useEffect } from 'react';
import _ from 'lodash';
import TimePicker from 'react-time-picker';
import { Checkbox, useCheckboxState } from 'pretty-checkbox-react';
import { useTranslation } from 'react-i18next';

import styles from './index.module.scss';
const DayComponent = function ({ day, handleSetTime }) {
    const checkbox = useCheckboxState();
    const [checked, setChecked] = useState(false);
    const [fromDate, setFromDate] = useState('09:00');
    const [toDate, setToDate] = useState('18:00');
    const { t } = useTranslation();

    const handleChangeData = (data, name) => {
        if (name === 'from') {
            setFromDate(data);
        } else if (name === 'to') {
            setToDate(data);
        } else {
            setChecked(!checked);
        }
        handleSetTime({ workDayStart: fromDate, workDayEnd: toDate, dayOff: checkbox.state });
    }

    useEffect(() => {
        handleSetTime({ workDayStart: fromDate, workDayEnd: toDate, dayOff: checkbox.state });
    }, [toDate, fromDate, checked, checkbox.state]);

    return (
        <>
            <div className={styles.dayBlock}>
                <div className={styles.time}>
                    <h6>{day}:</h6>
                    <span>{t('From')}</span>
                    <TimePicker
                        onChange={(e) => handleChangeData(e, 'from')}
                        value={fromDate}
                        disabled={checked}
                        disableClock
                    />
                    <span>{t('To')}</span>
                    <TimePicker
                        onChange={(e) => handleChangeData(e, 'to')}
                        value={toDate}
                        disabled={checked}
                        disableClock
                    />
                </div>
                <div className={styles.checkbox}>
                    <Checkbox
                        name="tac"
                        {...checkbox}
                    />
                </div>
            </div>
        </>
    )
}

export default memo(DayComponent);