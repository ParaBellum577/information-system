import React from 'react';
import Popup from 'reactjs-popup';
import { CustomInput } from 'common/customFormComponents/customInput';
import 'reactjs-popup/dist/index.css';
import buttons from 'src/components/buttons.module.scss';
import styles from './index.module.scss';

const UserdeclinePopUp = function ({ trigger, handleDecline, userId, stakeholderQueryId }) {
    const [open, setOpen] = React.useState(false);
    const [declineReason, setDeclineReason] = React.useState('');

    const closeModal = () => setOpen(false);
    const handleChangeReason = (e) => setDeclineReason(e.target.value);

    const handleConfirmForm = () => {
        const requestdata = {
            reason: declineReason,
            stakeholderQueryId
        };
        if (declineReason !== '') {
            handleDecline(requestdata, userId);
        }
    };

    return (
        <>
            <Popup
                trigger={trigger}
                modal
                nested
                open={open}
                closeOnDocumentClick
                onClose={closeModal}
            >
                {close => (
                    <div className={styles.modalProject}>
                        <h5>Ви впевнені, що хочете відхилити проєкт?</h5>
                        <CustomInput
                            variant="outlined"
                            multiline
                            rows={2}
                            id="decline-кeason"
                            type="text"
                            name="declineReason"
                            label="Вкажіть причину відхилення проєкту"
                            onChange={handleChangeReason}
                            value={declineReason}
                        // error={!!errors.projectName}
                        />
                        <div className={styles.buttons}>
                            <button onClick={() => {
                                handleConfirmForm();
                                close();
                            }} className={buttons.cancelButton}>Відхилити</button>
                            <button
                                onClick={() => close()}
                                className={buttons.buttonConfirm}
                            >Залишити</button>
                        </div>
                    </div>
                )
                }
            </Popup>
        </>
    )
}

export default UserdeclinePopUp;