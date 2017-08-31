import React, { Component } from 'react';
import classnames from 'classnames'
import style from './style.scss';

export default class Switcher extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: false
    }
  }

  toggleSwitcher = () => {
    this.setState(previousState => {
      return { status: !this.state.status }
    })
  }

  setTriggerClass = () => {
    return this.state.status ? style.switcherContainerOn : style.switcherContainerOff
  }

  getSwitcherText = () => {
    return this.state.status ? 'On' : "Off"
  }

  getSwitcherTextClass = () => {
    return this.state.status ? style.switcherTextOn : style.switcherTextOff
  }
 
  render() {
    const switcherClass = classnames(style.switcherContainer, this.setTriggerClass())
    const switcherTextClass = classnames(style.switcherText, this.getSwitcherTextClass())
    return (
      <div 
        className={switcherClass}
        onClick={this.toggleSwitcher}
      >
        <div className={style.switcherTrigger} />
        <div className={switcherTextClass}>
          {this.getSwitcherText()}
        </div>
      </div>
    )
  }
}