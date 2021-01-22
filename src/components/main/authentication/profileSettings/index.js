import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import styles from './index.module.scss';
import Password from './password';
import AvatarUpload from './avatar';

const mapStateToProps = ({ user }) => ({ user });

const ProfileSettings = function ({ user }) {
  const { t } = useTranslation();
  return (
    <>
      <div className={styles.profileWidget}>
        <AvatarUpload
          t={t}
          userId={user.user.id}
          avatar={user.user.avatar}
        />
        <Password t={t} userId={user.user.id} />
      </div>
    </>
  )
}

export default memo(connect(mapStateToProps)(ProfileSettings));
