import React, { useState, useEffect } from 'react';
import { NotificationContext } from './notificationContextInstance';
import { initialMockNotifications } from '../data/mockNotifications';

const STORAGE_KEY = 'suchanapatt_notifications_state';

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialMockNotifications;
    } catch (e) {
      console.error('Failed to load notifications from localStorage', e);
      return initialMockNotifications;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
    } catch (e) {
      console.error('Failed to save notifications to localStorage', e);
    }
  }, [notifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const resetNotifications = () => {
    setNotifications(initialMockNotifications);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        dismissNotification,
        clearAllNotifications,
        resetNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

