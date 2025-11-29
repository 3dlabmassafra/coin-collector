import { DatabaseItem } from '../data/numismaticDatabase';
import type { IDBPDatabase, DBSchema } from 'idb';

export interface CollectionItem extends DatabaseItem {
    instanceId: string;
    dateAdded: number;
    condition: string; // e.g., 'BB', 'SPL', 'FDC'
    estimatedValue: number;
    userNotes?: string;
    imageUrl?: string; // Base64 or Blob URL
}

interface CoinCollectorDB extends DBSchema {
    items: {
        key: string;
        value: CollectionItem;
        indexes: { 'by-date': number };
    };
}

const DB_NAME = 'coin-collector-db';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<CoinCollectorDB>> | null = null;

export const initDB = async () => {
    // Only run in browser environment
    if (typeof window === 'undefined') {
        throw new Error('IndexedDB can only be initialized in the browser');
    }

    if (!dbPromise) {
        // Dynamic import to prevent SSR issues
        const { openDB } = await import('idb');

        dbPromise = openDB<CoinCollectorDB>(DB_NAME, DB_VERSION, {
            upgrade(db) {
                const store = db.createObjectStore('items', { keyPath: 'instanceId' });
                store.createIndex('by-date', 'dateAdded');
            },
        });
    }
    return dbPromise;
};

export const saveItem = async (item: CollectionItem) => {
    const db = await initDB();
    return db.put('items', item);
};

export const getAllItems = async () => {
    const db = await initDB();
    return db.getAllFromIndex('items', 'by-date');
};

export const deleteItem = async (id: string) => {
    const db = await initDB();
    return db.delete('items', id);
};
