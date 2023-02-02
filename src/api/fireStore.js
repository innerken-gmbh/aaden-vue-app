import firebase from 'firebase/app'
import 'firebase/firestore'
import { sendFireStoreOrder } from '@/api/api'

const firebaseConfig = {
  apiKey: 'AIzaSyDwY4rJNrLXdrLI-ukxzCAGan97lOx84cM',
  authDomain: 'aaden-online-order.firebaseapp.com',
  projectId: 'aaden-online-order'
}
const app = firebase.initializeApp(firebaseConfig)
const db = firebase.firestore(app)

export function fireStoreOrders () {
  const res = []
  db.collection('order')
    .onSnapshot(async (querySnapshot) => {
      querySnapshot.forEach((doc) => {
      })
      await sendFireStoreOrder(res)
    })
  db.collection('order')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
        res.push(doc.data())
        console.log(doc.id, ' => ', res)
      })
    })
  return res
}

export function updateFireBaseOrders (cloudId, canPickUp, confirmed, finished, paid) {
  db.collection('order')
    .where('cloudId', '==', cloudId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        if (canPickUp != null) {
          db.collection('order').doc(doc.id).update(
            'canPickUp', canPickUp
          ).then(() => {
            console.log('Document successfully updated!')
          })
        }
        if (confirmed != null) {
          db.collection('order').doc(doc.id).update(
            'confirmed', confirmed
          ).then(() => {
            console.log('Document successfully updated!')
          })
        }
        if (finished != null) {
          db.collection('order').doc(doc.id).update(
            'finished', finished
          ).then(() => {
            console.log('Document successfully updated!')
          })
        }
        if (paid != null) {
          db.collection('order').doc(doc.id).update(
            'paid', paid
          ).then(() => {
            console.log('Document successfully updated!')
          })
        }
      })
    })
  return 1
}
