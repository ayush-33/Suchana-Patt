import React from 'react';
import { useBookmarks } from '../../hooks/useBookmarks';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export function Toast() {
  const { toast } = useBookmarks();

  if (!toast) return null;

  return (
    <div className="sp-toast-container" role="status" aria-live="polite">
      <div className="sp-toast">
        {toast.type === 'success' && <CheckCircle2 size={18} color="#22c55e" />}
        {toast.type === 'warning' && <AlertCircle size={18} color="#f59e0b" />}
        {toast.type === 'info' && <Info size={18} color="#38bdf8" />}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
