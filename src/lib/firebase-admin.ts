
import admin from 'firebase-admin';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

function initializeAdmin() {
    if (admin.apps.length > 0) {
        return;
    }

    try {
        if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
            throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. Please add it to your .env.local file.');
        }
        
        const serviceAccount = JSON.parse(
            process.env.FIREBASE_SERVICE_ACCOUNT_KEY
        );

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        });
    } catch (error) {
        // Log a more descriptive error to help with debugging
        console.error('CRITICAL: Firebase admin initialization failed.', error);
        // Throw the error to halt execution if initialization fails.
        // This prevents downstream errors from uninitialized services.
        throw new Error('Could not initialize Firebase Admin SDK. Please check your service account credentials and server logs.');
    }
}


const getAdminDb = () => {
    initializeAdmin();
    return admin.firestore();
}

const getAdminAuth = () => {
    initializeAdmin();
    return admin.auth();
};

export { getAdminDb, getAdminAuth };
