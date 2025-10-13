// src/config/env.ts
export interface FirebaseConfig {
    apiKey: string | undefined;
    authDomain: string | undefined;
    projectId: string | undefined;
    storageBucket: string | undefined;
    messagingSenderId: string | undefined;
    appId: string | undefined;
}

export interface AppConfig {
    firebase: FirebaseConfig;
    features: {
        analytics: boolean;
    };
}

export const config: AppConfig = {
    firebase: {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    },
    features: {
        analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    }
};

// Validate required environment variables
export const validateEnv = (): void => {
    const required = ['NEXT_PUBLIC_FIREBASE_API_KEY', 'NEXT_PUBLIC_FIREBASE_PROJECT_ID'];
    const missing = required.filter(key => !process.env[key]);

    if (missing.length > 0) {
        console.warn('Missing environment variables:', missing);
    }
};