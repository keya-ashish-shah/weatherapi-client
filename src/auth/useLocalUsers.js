import { useCallback } from "react";

const STORAGE_KEY = "wv_users_v1";


export default function useLocalUsers() {
  const getAll = useCallback(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }, []);

  const saveAll = useCallback((users) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }, []);

  const addUser = useCallback((user) => {
    const users = getAll();
    users.push(user);
    saveAll(users);
  }, [getAll, saveAll]);

  const findByEmail = useCallback((email) => {
    const users = getAll();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }, [getAll]);

  return { getAll, saveAll, addUser, findByEmail };
}
