import React, { useState, useEffect, useCallback } from 'react';
import { ReminderContext } from './reminderContextInstance';
import { useBookmarks } from '../hooks/useBookmarks';

const STORAGE_KEY = 'suchanapatt_job_reminders';

export function ReminderProvider({ children }) {
  const { showToast } = useBookmarks();

  const [reminders, setReminders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load job reminders from localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
    } catch (e) {
      console.error('Failed to persist job reminders to localStorage', e);
    }
  }, [reminders]);

  const hasReminder = useCallback(
    (jobId) => {
      if (!jobId) return false;
      return reminders.some((item) => item.id === jobId);
    },
    [reminders]
  );

  const toggleReminder = useCallback(
    (job) => {
      if (!job || !job.id) return;

      const itemTitle = job.title || job.examName || 'Opportunity';

      if (hasReminder(job.id)) {
        setReminders((prev) => prev.filter((item) => item.id !== job.id));
        showToast(`Removed from your reminders: "${itemTitle}"`, 'info');
      } else {
        const newReminder = {
          id: job.id,
          title: itemTitle,
          organization: job.organization || '',
          lastDate: job.lastDate || job.examDateText || '',
          category: job.category || '',
          status: job.status || 'upcoming',
          createdAt: Date.now()
        };
        setReminders((prev) => [newReminder, ...prev]);
        showToast(`Saved to your reminders: "${itemTitle}"`, 'success');
      }
    },
    [hasReminder, showToast]
  );

  const removeReminder = useCallback(
    (jobId) => {
      if (!jobId) return;
      setReminders((prev) => prev.filter((item) => item.id !== jobId));
      showToast('Removed from your reminders', 'info');
    },
    [showToast]
  );

  const clearReminders = useCallback(() => {
    setReminders([]);
    showToast('All upcoming reminders cleared', 'info');
  }, [showToast]);

  return (
    <ReminderContext.Provider
      value={{
        reminders,
        remindersCount: reminders.length,
        hasReminder,
        toggleReminder,
        removeReminder,
        clearReminders
      }}
    >
      {children}
    </ReminderContext.Provider>
  );
}

