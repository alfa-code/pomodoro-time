import React, { Component } from 'react';

import { startDraw } from './canvas';

import style from './style.module.scss';

export class TomatCanvas extends Component<any, any> {
    private myRef: any;
    constructor(props: any) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        startDraw(this.myRef.current);
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        const { innerWidth, innerHeight } = window;
        return (
            <canvas
                ref={ this.myRef }
                width={innerWidth}
                height={innerHeight}
                className={ style.canvas }
            />
        );
    }
}
