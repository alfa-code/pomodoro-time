import React from 'react';
import Logo from 'src/app/components/logo';
import Share from 'src/app/components/share';
// import TomatLayout from 'src/app/components/tomat-layout';
import TomatCanvas from 'src/app/components/tomat-canvas';
import SettingsButton from 'src/app/components/settings/settings-button';
import InfoButton from 'src/app/components/info/info-button';

// smart containers
import Notifications from 'src/app/containers/notifications';
import Timer from 'src/app/containers/timer';
import Popup from 'src/app/containers/popup';

import {
  Link
} from 'react-router-dom';

import style from './style.scss';

export default function MainContainer() {
    return (
        <div className={style.container}>
            <Logo />
            <Notifications />
            <Timer />
            <TomatCanvas />
            <Share />
            <Popup />
            <InfoButton />
            <SettingsButton />
            <Link to="/secret">Secret</Link>
        </div>
    );
}
