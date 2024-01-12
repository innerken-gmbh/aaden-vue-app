import { initializeApp } from 'firebase/app'
import { doc, getFirestore, updateDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCtvQ3d-HAtHTUg_-505c-qXRnlz8RlZeg',
  authDomain: 'aaden-saas.firebaseapp.com',
  projectId: 'aaden-saas',
  storageBucket: 'aaden-saas.appspot.com',
  messagingSenderId: '169167876904',
  appId: '1:169167876904:web:b83934e5a34d1cbfcc161d',
  measurementId: 'G-QRPH7NLDZS'
}
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export async function acceptFireBaseOrder (cloudId, accepted = true) {
  return await updateDoc(doc(db, 'orderDisplay', cloudId), {
    accepted: accepted
  })
}
