import fs from 'fs';
import path from 'path';
import { createDatabase } from "db0";
import sqlite from "db0/connectors/better-sqlite3";

async function initDatabase() {
    const db = createDatabase(sqlite({}));
    const sqlFilePath = path.join('scripts', 'db.sql'); 
    const sql = fs.readFileSync(sqlFilePath, 'utf8');
  
    try {
      await db.exec(sql);
      console.log('Database initialized successfully.');
    } catch (error) {
      console.error('Error initializing database:', error);
      process.exit(1);
    }
  }
  
  initDatabase();