import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Next Chapter uncaught rendering error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('cached_user_profile');
    } catch {}
    this.setState({ hasError: false });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FBF9F6] text-amber-950 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 text-2xl font-serif mb-4 shadow-sm">
            ✦
          </div>
          <h1 className="font-serif text-2xl font-bold text-amber-900 mb-2">Next Chapter Dating</h1>
          <p className="text-sm text-amber-800/80 max-w-md mb-6 leading-relaxed">
            We encountered a temporary connection issue while preparing your companion sanctuary.
          </p>
          <button
            onClick={this.handleReset}
            className="px-6 py-2.5 bg-amber-900 hover:bg-amber-950 text-amber-50 rounded-xl text-xs font-semibold tracking-wide transition-all shadow cursor-pointer"
          >
            Refresh & Resume
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
