import React from 'react';
import { UncontrolledPopover, PopoverBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';

import acceptIcon from '../style/icons/accept.svg'
import rejectIcon from '../style/icons/reject.svg'
import styles from '../main/authentication/signUp.module.scss';

const PswPopOver = function ({ password, target }) {
    const { t } = useTranslation();

  const accept = (
    <img src={acceptIcon} alt="accept"/>
  )
  const reject = (
    <img src={rejectIcon} alt="reject"/>
  )
  
  return(
    <>
        <UncontrolledPopover
          trigger="focus"
          placement='top'
          target={target}
        >
          {/* <PopoverHeader>Your password must have:</PopoverHeader> */}
          <PopoverBody className={styles.popover}>
            <li className={styles.li}> {((/.{8,64}/).test(password)) ? accept : reject} {`8-64 ${t('Characters')}`}</li>
            <li className={styles.li}> {((/[A-Z|А-Я|Ё]+/).test(password) || (/\d+/).test(password)) ? accept : reject} {t('Numbers or UPPER case letter')}</li>
            <li className={styles.li}> {((/[a-z|а-я|ё]+/).test(password)) ? accept : reject} {t('Lower case letter')}</li>
          </PopoverBody>
        </UncontrolledPopover>
    </>
    )
}

export default PswPopOver;