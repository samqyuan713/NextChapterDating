import { getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import fs from 'fs';
import path from 'path';

let firebaseConfig: any = {};
try {
  const configPath = path.resolve(process.cwd(), 'firebase-applet-config.json');
  if (fs.existsSync(configPath)) {
    firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  }
} catch (e) {
  console.warn('Failed to read firebase-applet-config.json:', e);
}

const apps = getApps();
const adminApp = apps.length === 0 
  ? initializeApp({ projectId: firebaseConfig.projectId || 'model-rarity-3nzsc' }) 
  : apps[0];

export const adminAuth = getAuth(adminApp);
export default adminApp;
