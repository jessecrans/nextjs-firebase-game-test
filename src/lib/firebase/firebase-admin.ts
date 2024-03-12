import { initializeApp, getApps } from 'firebase-admin/app'
import admin from 'firebase-admin'
import { getDatabase } from 'firebase-admin/database';

// Initialize Admin
const adminConfig = JSON.parse(process.env.FIREBASE_SERVER_ACCOUNT || "");
const createdApps = getApps();
export const adminApp = createdApps.length === 0
  ? initializeApp({
    credential: admin.credential.cert(adminConfig),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
  }, "admin")
  : createdApps[0]
export const adminDb = getDatabase(adminApp);