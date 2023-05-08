/*
 * Copyright (c) 2023. Haodong JU
 */

import { getDoc, getDocs } from 'firebase/firestore'

export async function resultOf (query, logLabel = '') {
  const res = (await getDocs(query)).docs
    .map(contentOf)
  if (logLabel) {
    console.log(res, logLabel)
  }
  return res
}

export async function resultOfId (query, logLabel = '') {
  const res = (await getDocs(query)).docs
    .map(contentOfId)
  if (logLabel) {
    console.log(res, logLabel)
  }
  return res
}

export function contentOfId (doc) {
  return {
    ...doc.data(),
    id: doc.id
  }
}

export function contentOf (doc) {
  return doc.data()
}

export async function docContentOf (docRef) {
  return contentOf(await getDoc(docRef))
}
