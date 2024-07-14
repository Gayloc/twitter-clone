import fs from 'fs';
import path from 'path';

async function initDatabase() {
    const db = useDatabase();
    const sqlFilePath = path.join(__dirname, 'db.sql'); 
    const sql = fs.readFileSync(sqlFilePath, 'utf8');
  
    try {
      await db.sql`${sql}`;
      console.log('Database initialized successfully.');
    } catch (error) {
      console.error('Error initializing database:', error);
      process.exit(1);
    }
  }
  
  initDatabase();