import React from 'react';
import Logo from 'src/app/components/logo';
import Share from 'src/app/components/share';
import TomatLayout from 'src/app/components/tomat-layout';
import SettingsButton from 'src/app/components/settings/settings-button';
import InfoButton from 'src/app/components/info/info-button';

// smart containers
import Notifications from 'src/app/containers/notifications';
import Timer from 'src/app/containers/timer';
import Popup from 'src/app/containers/popup';

import style from './style.scss';

export default function MainContainer() {
  return (
    <div className={style.container}>
      <Logo />
      <Notifications />
      <Timer />
      <TomatLayout />
      <Share />
      <Popup />
      <InfoButton />
      <SettingsButton />
    </div>
  );
}
