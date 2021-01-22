
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { uploadAvatar } from 'actions/user'
import buttons from '../../../buttons.module.scss';
import undefAvatar from '../../../style/avatar.png'
import styles from './index.module.scss';

const actions = { uploadAvatar }

const AvatarUpload = function ({ avatar, userId, uploadAvatar, t }) {
    const [preview, setPreview] = useState(undefAvatar || avatar);
    const [selectedFile, setSelectedFile] = useState(undefined);

    const onSelectFile = e => {
        if (!e.target.files || _.isEmpty(e.target.files)) {
            setSelectedFile(undefined);
            return
        }
        setSelectedFile(e.target.files[0])
    }
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefAvatar)
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const handleSelectInput = () => {
        let element = document.querySelector('input[type="file"]');
        element.click();
    };
    const handleSubmit = async () => {
        if (setSelectedFile !== undefined) {
            const formData = new FormData();
            formData.append('avatar', selectedFile);
            await uploadAvatar(formData, userId);
        }
    }
    return (
        <div className="widget">
            <div className="widget-header"><h2>{t("Change avatar")}</h2></div>
            <input onChange={onSelectFile} style={{ display: 'none' }} type="file" name="file" />
            <div className={styles.inputfiles}>
                <img
                    onClick={handleSelectInput}
                    src={preview}
                    alt="Preview"
                />
            </div>
            <button
                style={{ marginBottom: '20px' }}
                className={`${styles.button} ${buttons.buttonConfirm}`}
                type="submit"
                onClick={handleSubmit}
            >{t('Save changes')}
            </button>
        </div>
    )
}

export default connect(null, actions)(AvatarUpload);
