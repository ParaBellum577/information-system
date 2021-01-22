import React, { useEffect, useState, memo } from 'react';
import Stepper from 'react-stepper-horizontal';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import styles from './index.module.scss';
import FirstStep from './firstStep';
import SecondStep from './secondStep';
import ThirdStep from './thirdStep';
import StepOne from '../../../style/icons/check.svg';

const StakeHolderApp = () => {
    const { t } = useTranslation();
    const [step, setNextStep] = useState(1);
 
    const handleChangeStep = (nextStep) => {
        setNextStep(nextStep);
    }
    const steps = [
      {
        title: t('First step'), 
        icon: StepOne,
        onClick: () => handleChangeStep(1)
      },
      {
        title: t('Second step'),
        icon: StepOne,
        onClick: () => handleChangeStep(2)
      },
      {
        title: t('Third step'),
        icon: StepOne,
        onClick: () => handleChangeStep(3)
      },
    ];
    return (
        <div className={styles.main}>
          <Stepper 
           steps={steps} 
           activeStep={step - 1}
           defaultOpacity="0.2"
           completeOpacity="1"
           activeColor="#30b4ae00"
           defaultColor="#30b4ae00"
           completeColor="#30b4ae00"
           activeTitleColor="#00000"
           completeTitleColor="#00000"
           />
            {
              step === 1 && (
                  <FirstStep
                    handleChangeStep={handleChangeStep}
                    t={t}
                  />
              )
            }
            {
              step === 2 && (
                  <SecondStep
                   handleChangeStep={handleChangeStep}
                   t={t}
                  />
              )
            }
            {
              step === 3 && (
                <ThirdStep
                  handleChangeStep={handleChangeStep}
                  t={t}
                />
              )
            }
        </div>
    )
}

export default memo(StakeHolderApp);
