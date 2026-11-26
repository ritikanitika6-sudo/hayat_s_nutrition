import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import { getInitialData } from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Primary and secondary storage file paths
const storageFile = path.join(__dirname, 'storage.json');
const altStorageFile = path.join(__dirname, '..', 'src', 'data', 'storage.json');

class StorageManager {
  constructor() {
    this.filePath = storageFile;
    this.memoryCache = null;
    this.init();
  }

  init() {
    try {
      // If primary storage file doesn't exist, check alternative or seed
      if (!fs.existsSync(this.filePath)) {
        if (fs.existsSync(altStorageFile)) {
          const raw = fs.readFileSync(altStorageFile, 'utf8');
          fs.writeFileSync(this.filePath, raw, 'utf8');
          this.memoryCache = JSON.parse(raw);
        } else {
          const initial = getInitialData();
          fs.writeFileSync(this.filePath, JSON.stringify(initial, null, 2), 'utf8');
          this.memoryCache = initial;
        }
      } else {
        const raw = fs.readFileSync(this.filePath, 'utf8');
        this.memoryCache = JSON.parse(raw);
      }
    } catch (err) {
      console.warn('Storage init warning, falling back to in-memory seed:', err.message);
      this.memoryCache = getInitialData();
    }
  }

  read() {
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, 'utf8');
        this.memoryCache = JSON.parse(raw);
      }
      return this.memoryCache;
    } catch (err) {
      console.error('Error reading storage.json:', err.message);
      return this.memoryCache || getInitialData();
    }
  }

  write(data) {
    try {
      this.memoryCache = data;
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
      // Also sync to alt storage file if directory exists
      const altDir = path.dirname(altStorageFile);
      if (fs.existsSync(altDir)) {
        fs.writeFileSync(altStorageFile, JSON.stringify(data, null, 2), 'utf8');
      }
      return true;
    } catch (err) {
      console.error('Error writing storage.json:', err.message);
      return false;
    }
  }

  getCollection(name) {
    const data = this.read();
    return data[name] || [];
  }

  getItemById(collection, id) {
    const items = this.getCollection(collection);
    return items.find((item) => String(item.id).toLowerCase() === String(id).toLowerCase()) || null;
  }

  addItem(collection, item) {
    const data = this.read();
    if (!data[collection]) data[collection] = [];
    const newItem = {
      id: item.id || crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...item
    };
    data[collection].push(newItem);
    this.write(data);
    return newItem;
  }

  updateItem(collection, id, updates) {
    const data = this.read();
    if (!data[collection]) return null;
    const index = data[collection].findIndex(
      (item) => String(item.id).toLowerCase() === String(id).toLowerCase()
    );
    if (index === -1) return null;
    data[collection][index] = {
      ...data[collection][index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.write(data);
    return data[collection][index];
  }

  deleteItem(collection, id) {
    const data = this.read();
    if (!data[collection]) return false;
    const initialLength = data[collection].length;
    data[collection] = data[collection].filter(
      (item) => String(item.id).toLowerCase() !== String(id).toLowerCase()
    );
    if (data[collection].length !== initialLength) {
      this.write(data);
      return true;
    }
    return false;
  }

  // --- Hydration Tracker specific helpers ---
  getHydration() {
    const data = this.read();
    if (!data.hydrationTracker) {
      data.hydrationTracker = { currentWater: 0, maxWater: 2500, step: 250, logs: [] };
      this.write(data);
    }
    return data.hydrationTracker;
  }

  addWater(amount = 250) {
    const data = this.read();
    if (!data.hydrationTracker) {
      data.hydrationTracker = { currentWater: 0, maxWater: 2500, step: 250, logs: [] };
    }
    const current = data.hydrationTracker.currentWater || 0;
    const max = data.hydrationTracker.maxWater || 2500;
    const nextVal = Math.min(current + Number(amount), max);
    data.hydrationTracker.currentWater = nextVal;
    if (!data.hydrationTracker.logs) data.hydrationTracker.logs = [];
    data.hydrationTracker.logs.push({
      id: crypto.randomUUID(),
      amount: Number(amount),
      timestamp: new Date().toISOString()
    });
    this.write(data);
    return data.hydrationTracker;
  }

  resetWater() {
    const data = this.read();
    if (!data.hydrationTracker) {
      data.hydrationTracker = { currentWater: 0, maxWater: 2500, step: 250, logs: [] };
    }
    data.hydrationTracker.currentWater = 0;
    this.write(data);
    return data.hydrationTracker;
  }

  // --- Personalized Generated Plans ---
  savePlan(plan) {
    return this.addItem('generatedPlans', plan);
  }

  getSavedPlans() {
    return this.getCollection('generatedPlans');
  }

  // --- Calculation History ---
  logCalculation(type, inputs, result) {
    return this.addItem('calculationHistory', {
      type,
      inputs,
      result,
      timestamp: new Date().toISOString()
    });
  }
}

export const storage = new StorageManager();
export default storage;

