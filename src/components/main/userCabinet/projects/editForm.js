import React, { memo } from 'react';
import styles from './index.module.scss';
import buttons from 'src/components/buttons.module.scss';

const EditForm = function (
 {
     css = '',
     index,
     title,
     description,
     handleEditForm,
     currentIdx,
     editForm,
     onChange
 }) {

    return (
        <div onClick={() => handleEditForm(index)} className={css}>
            <h6>{title}</h6>
            {
                (currentIdx === index && editForm) ?
                    <div className={styles.editForm}>
                        <input onChange={onChange} className={styles.editInput} type="text" />
                        <button className={buttons.buttonSignIn}>save</button>
                    </div>
                    :
                    <div>{description}</div>
            }
        </div>
    )
}

export default memo(EditForm);