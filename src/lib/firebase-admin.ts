
import * as admin from 'firebase-admin';

// This guard prevents re-initializing the app in hot-reload environments.
if (!admin.apps.length) {
  try {
    // Check if the environment variable is set.
    if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set.');
    }
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
    );
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
  } catch (error: any) {
    console.error('Firebase admin initialization error', error.stack);
    // Do not throw an error here, as it can crash the build process
    // where environment variables might not be available.
  }
}

const getAdminDb = () => admin.firestore();
const getAdminAuth = () => admin.auth();

export { getAdminDb, getAdminAuth };
