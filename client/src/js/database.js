import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => console.error('putDb not implemented');

export const getDb = async () => {
  
  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('text', 'readonly');

  const store = tx.objectStore('text');

  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();