'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class CausticsGlassErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.warn('CausticsGlassScene error:', error);
    console.warn('Error info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="w-full h-screen bg-[#f0f0f0] flex items-center justify-center">
            <div className="text-center text-gray-600 max-w-md px-4">
              <h2 className="text-2xl font-bold mb-4">3D Model Not Found</h2>
              <p className="mb-4">
                The glass-transformed.glb model file is required for this scene.
              </p>
              <p className="text-sm mb-4">
                Please add the GLB model file to the <code className="bg-gray-200 px-2 py-1 rounded">public</code> folder.
              </p>
              <p className="text-xs text-gray-500">
                You can download it from the original CodeSandbox example or create your own model.
              </p>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

