/*
 * Copyright (c) 2023. Haodong JU
 */

import firebase from 'firebase/compat'
import { getStripePayments } from '@stripe/firestore-stripe-payments'
import { login } from '@/api/firebase/user'

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  OAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithRedirect
} from 'firebase/auth'
import store from '@/store'

const firebaseConfig = {
  apiKey: 'AIzaSyATTtRB1PlOC-At0-ndKqap4RABwwCc6ew',
  authDomain: 'aaden-boss-test.firebaseapp.com',
  projectId: 'aaden-boss-test',
  storageBucket: 'aaden-boss-test.appspot.com',
  messagingSenderId: '604566804841',
  appId: '1:604566804841:web:a82cb7788517358ceb45f8',
  measurementId: 'G-CST41XTVMJ'
}

export const FireBaseApp = firebase.initializeApp(firebaseConfig)

export const FireBaseAuth = firebase.auth()

export async function loginWithGoogle () {
  const provider = new GoogleAuthProvider()
  return await signInWithRedirect(FireBaseAuth, provider)
}

export async function loginWithApple () {
  const provider = new OAuthProvider('apple.com')
  return await signInWithRedirect(FireBaseAuth, provider)
}

export async function loginWithEmailAndPassword (email, password) {
  return await signInWithEmailAndPassword(FireBaseAuth, email, password)
}

export async function createUserWithEmail (email, password) {
  return await createUserWithEmailAndPassword(FireBaseAuth, email, password)
}

export async function resetPasswordEmail (email) {
  return await sendPasswordResetEmail(FireBaseAuth, email)
}

export const FireBaseStore = firebase.firestore()

export const StripePayment = getStripePayments(FireBaseApp, {
  customersCollection: 'user',
  productsCollection: 'products'
})

FireBaseAuth.useDeviceLanguage()

FireBaseAuth.onAuthStateChanged(user => {
  if (user?.uid) {
    login(user.uid, user.displayName)
  } else {
    store.commit('loginStateReady')
  }
})
