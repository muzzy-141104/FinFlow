
import * as admin from 'firebase-admin';

// This guard prevents re-initializing the app in hot-reload environments.
if (!admin.apps.length) {
  try {
    // Check if the environment variable is set.
    if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. Please add it to your .env.local file.');
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
    // where environment variables might not be available. We will rely on subsequent
    // functions to fail gracefully if the admin app is not initialized.
  }
}

const getAdminDb = () => {
    if (!admin.apps.length) {
        // This will be caught by the calling function's try...catch block
        throw new Error("Firebase Admin SDK not initialized. Check your environment variables and server logs for the original error.");
    }
    return admin.firestore();
}
const getAdminAuth = () => {
    if (!admin.apps.length) {
        throw new Error("Firebase Admin SDK not initialized.");
    }
    return admin.auth();
};

export { getAdminDb, getAdminAuth };
