import { ErrorInfo, PureComponent, ReactNode } from 'react';
import { HTTPError } from 'ky';
import { Message } from 'semantic-ui-react';

type StatusMessages = { [status: number]: string };
type Props = { children: ReactNode; statusMessages?: StatusMessages; onError?: () => void };
type State = { hasError: boolean; error: Error | null };
const DEFAULT_MESSAGES: StatusMessages = { 0: 'サーバエラーです' };

class ErrorBoundary extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError = (error: Error): State => ({
    hasError: true,
    error,
  });

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { onError } = this.props;
    if (onError) onError();

    console.error(error, errorInfo); // eslint-disable-line no-console
  }

  render() {
    const { children, statusMessages = DEFAULT_MESSAGES, onError: _onError } = this.props;
    const { hasError, error } = this.state;
    const messages = { ...DEFAULT_MESSAGES, ...statusMessages };

    if (hasError) {
      const statusCode = (error as HTTPError)?.response?.status;

      if (statusCode && Object.keys(messages).includes(String(statusCode))) {
        return <Message warning>{messages[statusCode]}</Message>;
      }

      return <Message error>{messages[0]}</Message>;
    }

    return children;
  }
}

export default ErrorBoundary;
