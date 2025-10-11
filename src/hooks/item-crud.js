// src/hooks/useCrud.js
import { useState, useCallback } from 'react';
import { getAllContainerItems, createContainerItem, updateContainerItem, deleteContainerItem } from "../utils/item-api.js";

export default function useCrud() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await getAllContainerItems();      
      setData(items.items);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addItem = useCallback(async (itemData) => {
    setLoading(true);
    try {
      const newItem = await createContainerItem(itemData);
      setData(prev => [...prev, newItem]);
      return newItem;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const editItem = useCallback(async (id, itemData) => {
    setLoading(true);
    try {
      const updatedItem = await updateContainerItem(id, itemData);
      setData(prev => prev.map(item => item.id === id ? updatedItem : item));
      return updatedItem;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeItem = useCallback(async (id) => {
    setLoading(true);
    try {
      await deleteContainerItem(id);
      setData(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    loading,
    error,
    loadData,
    addItem,
    editItem,
    removeItem
  };
}