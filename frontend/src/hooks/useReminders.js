import { useContext } from 'react';
import { ReminderContext } from '../context/reminderContextInstance';

export function useReminders() {
  const context = useContext(ReminderContext);
  if (!context) {
    throw new Error('useReminders must be used within a ReminderProvider');
  }
  return context;
}

