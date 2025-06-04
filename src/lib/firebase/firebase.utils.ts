// lib/firebaseDbUtils.ts
import {
    ref,
    set,
    get,
    update,
    remove,
    push,
    child,
  } from "firebase/database";
  import { db } from "./firebase.config";
  
  /** Write or Replace data at a given path */
  export const writeData = async (path: string, data: any) => {
    try {
      await set(ref(db, path), data);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };
  
  /** Read data from a given path */
  export const readData = async (path: string) => {
    try {
      const snapshot = await get(ref(db, path));
      return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
      return { error };
    }
  };
  
  /** Update specific fields at a given path */
  export const updateData = async (path: string, data: Partial<any>) => {
    try {
      await update(ref(db, path), data);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };
  
  /** Delete data at a given path */
  export const deleteData = async (path: string) => {
    try {
      await remove(ref(db, path));
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };
  
  /** Push a new item to a list and get its key */
  export const pushData = async (path: string, data: any) => {
    try {
      const newRef = push(ref(db, path));
      await set(newRef, data);
      return { success: true, key: newRef.key };
    } catch (error) {
      return { success: false, error };
    }
  };
  