// src/firebase.js - DEMO MODE (localStorage)
// Replace this with real Firebase config when ready

// Mock database using localStorage
const STORAGE_KEY = 'activity_classifier_db';

const getStoredData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { participants: {}, responses: {} };
  } catch {
    return { participants: {}, responses: {} };
  }
};

const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event('storage'));
};

export const db = { _isDemo: true };

export const ref = (db, path) => ({ path, _isDemo: true });

export const push = (reference, data) => {
  const stored = getStoredData();
  const path = reference.path;
  const id = 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  
  if (path === 'participants') {
    stored.participants[id] = data;
  } else if (path === 'responses') {
    stored.responses[id] = data;
  }
  
  saveData(stored);
  return Promise.resolve({ key: id });
};

export const set = (reference, data) => {
  const stored = getStoredData();
  const path = reference.path;
  
  if (path.startsWith('participants/')) {
    const id = path.split('/')[1];
    stored.participants[id] = data;
  } else if (path.startsWith('responses/')) {
    const id = path.split('/')[1];
    stored.responses[id] = data;
  } else if (path === 'participants') {
    stored.participants = data || {};
  } else if (path === 'responses') {
    stored.responses = data || {};
  }
  
  saveData(stored);
  return Promise.resolve();
};

export const onValue = (reference, callback) => {
  const path = reference.path;
  
  const getData = () => {
    const stored = getStoredData();
    let value = null;
    
    if (path === 'participants') {
      value = stored.participants;
    } else if (path === 'responses') {
      value = stored.responses;
    }
    
    callback({
      val: () => value,
      exists: () => value !== null && Object.keys(value).length > 0
    });
  };
  
  getData();
  
  const handler = () => getData();
  window.addEventListener('storage', handler);
  const interval = setInterval(getData, 1000);
  
  return () => {
    window.removeEventListener('storage', handler);
    clearInterval(interval);
  };
};

console.log('%c📱 DEMO MODE - Data saved locally', 'color: orange; font-weight: bold;');
