import React from 'react';

type PropsType = any;

export default class Floor extends React.Component<PropsType, any> {
  btnRef: React.RefObject<HTMLButtonElement>;
  constructor(props: PropsType) {
    super(props);
    this.state = {
      count: 1,
      num: 0,
    };
    this.btnRef = React.createRef<HTMLButtonElement>();
  }

  componentDidMount(): void {
    this.setState({ a: this.state.count + 1 });

    this.btnRef.current?.addEventListener('click', () => {
      this.handleClick();
    });
  }

  handleClick = (): void => {
    // setTimeout(() => {
    this.setState({ count: this.state.count + 1 }, () => {
      console.log('setState', this.state.count);
    });
    this.setState({ count: this.state.count + 1 }, () => {
      console.log('setState', this.state.count);
    });
    // });
  };

  render(): JSX.Element {
    return (
      <div style={{ color: '#fff' }}>
        {this.state.count}
        <button onClick={this.handleClick}>click me 1</button>
        <button ref={this.btnRef}>click me 2</button>
      </div>
    );
  }
}
