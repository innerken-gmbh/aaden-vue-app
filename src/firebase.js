import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import IKUtils from 'innerken-js-utils'

const firebaseConfig = {
  apiKey: 'AIzaSyCtvQ3d-HAtHTUg_-505c-qXRnlz8RlZeg',
  authDomain: 'aaden-saas.firebaseapp.com',
  projectId: 'aaden-saas',
  storageBucket: 'aaden-saas.appspot.com',
  messagingSenderId: '169167876904',
  appId: '1:169167876904:web:b83934e5a34d1cbfcc161d',
  measurementId: 'G-QRPH7NLDZS'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export async function firebaseAction (action) {
  try {
    await action()
  } catch (e) {
    IKUtils.showError(e?.message ?? 'Firebase Error')
  }
}
