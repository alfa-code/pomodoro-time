import React, { Component } from 'react';

import startDraw from './canvas';

// style
import style from './style.scss';

class TomatCanvas extends Component {
  constructor(props) {
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
        ref={this.myRef}
        width={innerWidth}
        height={innerHeight}
        className={style.canvas}
      />
    );
  }
}

export default TomatCanvas;
