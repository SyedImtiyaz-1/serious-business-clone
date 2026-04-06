import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#111] text-white p-6">
          <div className="max-w-xl text-center">
            <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
            <p className="mb-4 text-sm leading-relaxed text-slate-300">
              An unexpected rendering error occurred. Refresh the page or go back to continue.
            </p>
            <pre className="text-xs text-left whitespace-pre-wrap bg-slate-900 p-4 rounded-lg overflow-x-auto text-slate-200">
              {this.state.error?.toString()}
            </pre>
            <button
              className="mt-6 inline-flex items-center justify-center rounded-full bg-white text-black px-6 py-3 font-semibold"
              onClick={() => window.location.reload()}
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
