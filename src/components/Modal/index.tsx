import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
// import PropTypes from 'prop-types';

import './index.css';

export interface IProps {
  visible: boolean;
  className?: string;
  destroyOnClose?: boolean;
  onCancel: () => void;
}

export interface IState {
  visible: boolean;
}

let nodeContainer: HTMLDivElement;

export default class Modal extends Component<IProps, IState> {
  node: HTMLDivElement | undefined;
  wrapper: React.RefObject<HTMLDivElement>;
  constructor(props: IProps) {
    super(props);
    this.state = {
      visible: false,
    };
    this.wrapper = React.createRef();
  }

  static getDerivedStateFromProps(props: IProps, state: IState): IState | null {
    if (props.visible !== state.visible) {
      return { visible: props.visible };
    }
    return null;
  }

  initNodeContainer(): void {
    if (!nodeContainer) {
      nodeContainer = document.createElement('div');
      document.body.appendChild(nodeContainer);
    }
    this.node = nodeContainer;
  }

  closeModal(): void {
    const { onCancel } = this.props;
    onCancel && onCancel();
  }

  maskClick(): void {
    this.closeModal();
  }

  render(): React.ReactNode {
    const { children } = this.props;
    const { visible } = this.state;

    if (visible && !this.node) this.initNodeContainer();
    if (!this.node) return null;

    return ReactDOM.createPortal(
      <>
        <CSSTransition in={visible} classNames="bc__alert" timeout={300}>
          <div
            ref={this.wrapper}
            className={`bc__modal bc__modal--${visible ? 'show' : 'hide'} ${this.props.className || ''}`}
          >
            {children}
          </div>
        </CSSTransition>
        <CSSTransition in={visible} classNames="bc__mask" timeout={300}>
          <div className={`bc__mask bc__modal--${visible ? 'show' : 'hide'}`} onClick={this.maskClick.bind(this)}></div>
        </CSSTransition>
      </>,
      this.node,
    );
  }
}
