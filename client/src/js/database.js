import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = (id, content) => {
  openDB("jate", 1)
    .then((jateDB) => {
      const tx = jateDB.transaction("jate", "readwrite");//tx for transaction, is transmit in rf 8)
      const store = tx.objectStore("jate");
      return store.put({ id, value: content });
    })
    .then((result) => {
      console.log("Data saved to the database with ID:", id, result);
    })
    .catch((error) => {
      console.error("Could not save data to the database:", error);
    });
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = () => {
  openDB("jate", 1)
    .then((jateDB) => {
      const tx = jateDB.transaction("jate", "readonly");
      const store = tx.objectStore("jate");
      return store.getAll();
    })
    .then((result) => {
      console.log("Data read from database", result);
      return result;  
    })
    .catch((error) => {
      console.error("Could not read data from the database:", error);
    });
};

initdb();
