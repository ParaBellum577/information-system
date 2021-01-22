import React,{ useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux'
import { navigate } from "@reach/router"  ;
import { AiOutlineClose } from 'react-icons/ai';
import styles from './index.module.scss';
import buttons from '../../buttons.module.scss';

const mapStateToProps = ({ user }) => ({ user });

const Main = function() {
  const { t } = useTranslation();
  const [isVisibleSucsess, setIsVisibleSucsess] = useState(localStorage.getItem('sucsessform'));
  const [isVisibleInvite, setIsVisibleInvite] = useState(true);
  const [isVisibleBlockConfirm, setIsVisibleBlockConfirm] = useState(localStorage.getItem('completeform'));


  const handleCloseSucsess = () => {
    localStorage.removeItem('sucsessform');
    setIsVisibleSucsess(false)
  }
  const handleCloseInvite = () => setIsVisibleInvite(false);
  const handleCloseConfirm = () => {
    localStorage.removeItem('completeform');
    setIsVisibleBlockConfirm(false)
  }
  return(
      <>
        <div className={styles.form}>
        {
           isVisibleBlockConfirm &&
           <div className={styles.item}>
                <AiOutlineClose  onClick={handleCloseConfirm} size="25" />
               <h5>{t("Stakeholder statement successfully created!")}</h5>
               <p>{t("System administrators will check it soon")}</p>
           </div>
         }
         {
           isVisibleSucsess &&
           <div className={styles.item}>
                <AiOutlineClose onClick={handleCloseSucsess} size="25" />
               <h5>{t("AccountCreate")}</h5>
               <p>{t("Admincheck")}</p>
           </div>
         }
         {
             isVisibleInvite &&
            <div className={styles.item}>
                <AiOutlineClose onClick={handleCloseInvite} size="25" />
                <h5>{t("JoinTheGO")}</h5>
                <p>{t("GovOrg")}</p>
                <button className={buttons.buttonConfirm}>{t("Offer")}</button>
            </div>
         }
            <div className={styles.item}>
                <h5>{t("Suggest your own project")}</h5>
                <p>{t("DescribeIdea")}</p>
                <button onClick={() => navigate("/stakeholder-form/")} className={buttons.buttonConfirm}>{t("Join")}</button>
            </div>
        </div>
      </>
    )
}

export default memo(connect(mapStateToProps)(Main));