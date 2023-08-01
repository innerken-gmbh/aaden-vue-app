import { initializeApp } from 'firebase/app'
import { getDoc, getDocs, getFirestore } from 'firebase/firestore'
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
    return await action()
  } catch (e) {
    IKUtils.toast(e?.message ?? 'Firebase Error')
    return null
  }
}

export async function executeQuery (query) {
  return getDocContentWithId(await getDocs(query))
}

function getDocContentWithId (docs) {
  return docs.docs.map(docContent)
}

export async function getDocContent (docRef) {
  return docContent(await getDoc(docRef))
}

export function docContent (doc) {
  return {
    id: doc.id,
    ...doc.data()
  }
}
