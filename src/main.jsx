import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

function reportClientError(type, error) {
  try {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: type,
        target: String(error?.message || error || 'Unknown error'),
        metadata: { stack: String(error?.stack || '') },
      }),
    });
  } catch {
    // ignore
  }
}

window.addEventListener('error', (event) => {
  reportClientError('window_error', event.error || event.message);
});

window.addEventListener('unhandledrejection', (event) => {
  reportClientError('unhandled_rejection', event.reason);
});

class RootErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    reportClientError('react_error_boundary', {
      message: error?.message,
      stack: `${error?.stack}\n${info?.componentStack}`,
    });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-zinc-950 text-white p-8 font-mono">
          <h1 className="text-xl font-bold text-rose-400 mb-2">Runtime Error Caught</h1>
          <pre className="text-xs text-zinc-300 whitespace-pre-wrap">
            {String(this.state.error?.stack || this.state.error?.message || this.state.error)}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootEl = document.getElementById('root');
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    <RootErrorBoundary key={Date.now()}>
      <App />
    </RootErrorBoundary>
  );
}
