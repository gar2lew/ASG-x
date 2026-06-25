/**
 * Firebase client scaffold.
 * Reads config from Vite env vars. Supports emulator mode.
 * Fails safely if config is missing — returns null instead of crashing.
 *
 * Emulator only at this stage. Do NOT connect to production Firebase.
 */

let _app: unknown = null // FirebaseApp
let _db: unknown = null  // Firestore

function hasFirebaseConfig(): boolean {
  return Boolean(
    import.meta.env.VITE_FIREBASE_API_KEY &&
    import.meta.env.VITE_FIREBASE_PROJECT_ID
  )
}

function isEmulatorMode(): boolean {
  return import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true'
}

async function initFirebase() {
  if (!hasFirebaseConfig()) {
    console.warn(
      '[firebaseClient] Firebase config is missing. Set VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID in .env. Firebase features unavailable.'
    )
    return
  }

  try {
    const { initializeApp } = await import('firebase/app')
    const { getFirestore, connectFirestoreEmulator } = await import(
      'firebase/firestore'
    )

    const config = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? '',
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? '',
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? '',
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? '',
      messagingSenderId:
        import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '',
      appId: import.meta.env.VITE_FIREBASE_APP_ID ?? '',
    }

    _app = initializeApp(config)
    _db = getFirestore(_app)

    if (isEmulatorMode()) {
      connectFirestoreEmulator(_db, 'localhost', 8080)
      console.info(
        '[firebaseClient] Connected to Firestore emulator (localhost:8080).'
      )
    }

    console.info('[firebaseClient] Firebase initialised successfully.')
  } catch (error) {
    console.error('[firebaseClient] Failed to initialise Firebase:', error)
    _app = null
    _db = null
  }
}

// Eager-init promise — resolves when Firebase is ready (or null)
let _initPromise: Promise<void> | null = null

function ensureInit(): Promise<void> {
  if (!_initPromise) {
    _initPromise = initFirebase()
  }
  return _initPromise
}

/**
 * Returns the Firestore db instance, or null if unavailable.
 */
export async function getFirestoreDb(): Promise<unknown | null> {
  await ensureInit()
  return _db
}

/**
 * Returns true if Firebase is initialised and available for use.
 */
export function isFirebaseAvailable(): boolean {
  return _db !== null
}
