import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import buttons from 'src/components/buttons.module.scss';
import styles from './index.module.scss';

const UserdeclinePopUp = function ({ trigger, handleDeclineUser }) {
    const [open, setOpen] = React.useState(false);
    const closeModal = () => setOpen(false);

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
                        <h5>Ви впевнені, що хочете відхилити користувача?</h5>
                        <div>
                            <button onClick={()=> {
                                handleDeclineUser();
                                close();
                            }} className={buttons.cancelButton}>Відхилити</button>
                            <button onClick={() => close()} className={buttons.buttonConfirm}>Залишити</button>
                        </div>
                    </div>
                )
                }
            </Popup>
        </>
    )
}

export default UserdeclinePopUp;