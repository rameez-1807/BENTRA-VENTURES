import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure no hardcoded credentials exist
const dbConfig = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } }
  : {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || 'postgres',
      ssl: process.env.DB_SSL === 'false' ? false : { rejectUnauthorized: false }
    };

if (!process.env.DATABASE_URL && (!process.env.DB_HOST || !process.env.DB_PASSWORD)) {
  console.error('❌ Error: Database credentials missing. Please define DATABASE_URL or DB_HOST & DB_PASSWORD in .env');
  process.exit(1);
}

const client = new pg.Client(dbConfig);

async function runMigrations() {
  console.log('🚀 Starting Brentra Ventures Database Migration Runner...');
  console.log(`Connecting to database at ${dbConfig.host || 'DATABASE_URL'}...`);

  try {
    await client.connect();
    console.log('✅ Connected to database successfully.');

    const migrationsDir = path.join(__dirname, 'migrations');
    const migrationFiles = [
      '01_drop_insecure_policies.sql',
      '02_target_schema.sql',
      '03_seed_reference_data.sql'
    ];

    for (const file of migrationFiles) {
      const filePath = path.join(migrationsDir, file);
      if (fs.existsSync(filePath)) {
        console.log(`\n⏳ Executing migration: ${file}...`);
        const sql = fs.readFileSync(filePath, 'utf8');
        await client.query(sql);
        console.log(`✅ Completed migration: ${file}`);
      } else {
        console.warn(`⚠️ Warning: Migration file not found: ${filePath}`);
      }
    }

    console.log('\n🎉 All database migrations applied successfully!');
  } catch (err) {
    console.error('❌ Database migration failed:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigrations();
