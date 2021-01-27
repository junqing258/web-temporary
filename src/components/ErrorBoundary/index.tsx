import { omit } from '@/utils/snippets';
import React from 'react';

const logErrorToService = (error: any, errorInfo: any) => {
  console.log('[LOG_ERROR_TO_SERVICE]', error, errorInfo);
};

type WrapperPropsType = React.HTMLAttributes<HTMLDivElement>;

export class ErrorBoundary extends React.Component<WrapperPropsType, any> {
  constructor(props: WrapperPropsType) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any): any {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error: Error | null, info: any): any {
    // 你同样可以将错误日志上报给服务器
    this.setState({ error, info });
    logErrorToService(error, info);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      const { error, info } = this.state;
      const componentStack = info && info.componentStack ? info.componentStack : null;
      const errorMessage = (error || '').toString();
      const errorDescription = componentStack;

      return (
        <pre
          style={{ fontSize: 14, whiteSpace: 'pre-line', paddingLeft: '2em', ...this.props.style }}
          {...omit(this.props, ['children', 'style'])}
        >
          <code style={{ color: '#000fff' }}>{errorMessage}</code>
          <code style={{ color: 'red' }}>{errorDescription}</code>
        </pre>
      );
    }

    return this.props.children;
  }
}

export const withBoundary = (errProps: WrapperPropsType) => (
  Comp: React.ComponentType<any>,
): React.ComponentType<any> => {
  return class WrapBoundary extends React.Component<any, any> {
    render(): React.ReactNode {
      return (
        <ErrorBoundary {...errProps}>
          <Comp {...this.props} />
        </ErrorBoundary>
      );
    }
  };
};
