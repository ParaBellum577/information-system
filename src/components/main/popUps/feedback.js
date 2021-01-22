import React from 'react';
import styles from './index.module.scss';
import buttons from '../../buttons.module.scss';
import Popup from 'reactjs-popup';
import { navigate  } from '@reach/router';
import 'reactjs-popup/dist/index.css';
import close from '../../style/img/close.svg';

const FeedBack = function () {
    const [open, setOpen] = React.useState(false);
    const closeModal = () => setOpen(false);
  return(
      <>
        <Popup
            trigger={<button className={styles.button}> Open Modal </button>}
            modal
            nested
            open={open} 
            closeOnDocumentClick 
            onClose={closeModal}
            >
            <img className={buttons.closeButton} src={close} alt="close"/>
            <div className={styles.modalFeedBack}>
                <h5>Зворотній зв’язок</h5>
                <div className={styles.inputGroup}>
                    <input type="text" placeholder="Ваше ім’я"/>
                    <input type="text" placeholder="Ваш email"/>
                </div>
                <div>
                    <input type="text" placeholder="Тема"/>
                </div>
                <div>
                    <input type="text" placeholder="Поставити запитання"/>
                </div>
                <button onClick={()=> navigate('/')} className={buttons.buttonConfirm}>На головну</button>
            </div>
        </Popup>
      </>
    )
}

export default FeedBack;