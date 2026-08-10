'use client';

import React, { useEffect, useState } from 'react';
import { ClipboardCheck } from 'lucide-react';
import styles from './components.module.css';

export default function Toast() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleShowToast = (event: Event) => {
      const customEvent = event as CustomEvent<{ message: string }>;
      setToastMessage(customEvent.detail.message);
      
      // Auto-dismiss after 3 seconds
      setTimeout(() => {
        setToastMessage(null);
      }, 3000);
    };

    window.addEventListener('show-toast', handleShowToast);
    return () => {
      window.removeEventListener('show-toast', handleShowToast);
    };
  }, []);

  if (!toastMessage) return null;

  return (
    <div className={styles.toast}>
      <ClipboardCheck size={18} style={{ color: 'var(--accent-color)' }} />
      <div>
        <div className={styles.toastTitle}>Success</div>
        <div className={styles.toastDesc}>{toastMessage}</div>
      </div>
    </div>
  );
}
