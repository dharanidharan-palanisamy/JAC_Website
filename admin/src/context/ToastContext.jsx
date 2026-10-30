import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(({ title, message, type = 'success', duration = 4000 }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev.slice(-3), { id, title, message, type, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    return id;
  }, [removeToast]);

  // Listen to global window events so any file/service can trigger a toast
  useEffect(() => {
    const handleCustomToast = (e) => {
      if (e.detail) {
        addToast(e.detail);
      }
    };
    window.addEventListener('app-toast', handleCustomToast);
    return () => window.removeEventListener('app-toast', handleCustomToast);
  }, [addToast]);

  const value = {
    addToast,
    removeToast,
    success: (message, title = 'Success') => addToast({ type: 'success', title, message }),
    error: (message, title = 'Error') => addToast({ type: 'error', title, message }),
    info: (message, title = 'Notice') => addToast({ type: 'info', title, message })
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Toast Notification Container */}
      <div className="fixed bottom-6 right-6 z-[99999] flex flex-col gap-3 pointer-events-none max-w-sm sm:max-w-md w-[calc(100vw-2.5rem)]">
        {toasts.map((toast) => {
          const isSuccess = toast.type === 'success';
          const isError = toast.type === 'error';
          const isInfo = toast.type === 'info';

          return (
            <div
              key={toast.id}
              className="pointer-events-auto flex items-start gap-3.5 p-4 rounded-2xl bg-neutral-950 text-white shadow-2xl border border-neutral-800 transition-all duration-300 transform translate-y-0 opacity-100 animate-in fade-in slide-in-from-bottom-3"
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border ${
                  isSuccess
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : isError
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                    : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                }`}
              >
                {isSuccess && <CheckCircle2 className="w-5 h-5" />}
                {isError && <AlertCircle className="w-5 h-5" />}
                {isInfo && <Info className="w-5 h-5" />}
              </div>

              <div className="flex-1 pr-2">
                <h4 className="text-sm font-bold text-white tracking-tight">
                  {toast.title || (isSuccess ? 'Saved Successfully!' : isError ? 'Action Failed' : 'Notification')}
                </h4>
                {toast.message && (
                  <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                    {toast.message}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    // Fallback if used outside provider
    return {
      addToast: () => {},
      removeToast: () => {},
      success: (msg, title) => showToast(msg, title, 'success'),
      error: (msg, title) => showToast(msg, title, 'error'),
      info: (msg, title) => showToast(msg, title, 'info')
    };
  }
  return context;
};

// Global helper that can be called from anywhere, even outside React components (e.g. in api.js)
export const showToast = (message, title = 'Saved Successfully!', type = 'success', duration = 4000) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('app-toast', {
        detail: { message, title, type, duration }
      })
    );
  }
};

