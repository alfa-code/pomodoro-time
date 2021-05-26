import React from 'react';

import { Logo } from 'Src/app/components/logo';
import Share from 'Src/app/components/share';
// import TomatLayout from 'Src/app/components/tomat-layout';
import { TomatCanvas } from 'Src/app/components/tomat-canvas';
import SettingsButton from 'Src/app/components/settings/settings-button';
import InfoButton from 'Src/app/components/info/info-button';

import Notifications from 'Src/app/containers/notifications';
import Timer from 'Src/app/containers/timer';
import Popup from 'Src/app/containers/popup';

import style from './style.module.scss';

export function MainContainer() {
    return (
        <div className={ style.container }>
            <Logo />
            <TomatCanvas />
            <InfoButton />
            <Popup />
            <Notifications />
            <Share />
            <SettingsButton />
            <Timer />
        </div>
    );
}
