import React, { Component } from 'react';

import { startDraw } from './canvas';

import style from './style.module.scss';

export class TomatCanvas extends Component<any, any> {
    private myRef: any;
    constructor(props: any) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
        }
    }

    componentDidMount() {
        // startDraw(this.myRef.current);
        startDraw(this.myRef.current);

        window.addEventListener('resize', () => {
            this.setState({ innerWidth: window.innerWidth, innerHeight: window.innerHeight });
            startDraw(this.myRef.current);
        });
    }

    // shouldComponentUpdate() {
    //     return false;
    // }

    render() {
        const { innerWidth, innerHeight } = this.state;
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
