import React, { memo, useEffect, useState } from 'react';
import styles from './index.module.scss';

const ColumnItem = function ({ data, userList }) {
    const [name, setName] = useState('');

    useEffect(() => {
        userList.forEach(el=> {
            if(data.executor === el.id) return setName(el.user)
        })
    })
    return (
        <div className={styles.columnItem}>
            <h4>{data.taskName}</h4>
            <span>{name}</span>
            <p>{data.taskText}</p>
        </div>
    )
}

export default memo(ColumnItem);