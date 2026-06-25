import type { ASGXLead } from '@/types/lead';

/**
 * Submits a lead to Firestore.
 * TODO: Wire up actual Firestore document creation using the db instance from ./firebase
 * Example implementation:
 *   import { db } from './firebase';
 *   import { collection, addDoc } from 'firebase/firestore';
 *   const docRef = await addDoc(collection(db, 'leads'), lead);
 *   return docRef.id;
 *
 * @param lead - The ASGXLead object to submit
 * @returns The document ID of the created lead
 */
export async function submitLead(lead: ASGXLead): Promise<string> {
  // TODO: Replace with actual Firestore submission
  const placeholderId = `placeholder-${Date.now()}`;
  console.warn('[leadSubmission] Using placeholder submission. Wire up Firestore before deploying.', lead);
  return placeholderId;
}
