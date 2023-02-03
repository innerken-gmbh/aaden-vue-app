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

export function listenFireStoreOrders () {
  const cachedCloudIds = {}
  db.collection('order')
    .onSnapshot(async (querySnapshot) => {
      const toSend = []
      querySnapshot.forEach(doc => {
        const order = doc.data()
        if (cachedCloudIds[order.cloudId]) return
        toSend.push(order)
        cachedCloudIds[order.cloudId] = true
      })
      await sendFireStoreOrder(toSend)
    })
}

export function updateFireBaseOrders (cloudId, canPickUp, confirmed, finished, paid, accepted) {
  db.collection('order')
    .where('cloudId', '==', cloudId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const updateArr = []

        const addToUpdateIf = function (key, value, predicate, destination) {
          if (predicate(key, value)) {
            destination.push(key)
            destination.push(value)
          }
        }

        const valueNotNull = (_, value) => value !== undefined && value !== null

        addToUpdateIf('canPickUp', canPickUp, valueNotNull, updateArr)
        addToUpdateIf('confirmed', confirmed, valueNotNull, updateArr)
        addToUpdateIf('finished', finished, valueNotNull, updateArr)
        addToUpdateIf('paid', paid, valueNotNull, updateArr)
        addToUpdateIf('accepted', accepted, valueNotNull, updateArr)

        // doc.data() is never undefined for query doc snapshots
        db.collection('order').doc(doc.id)
          .update(...updateArr)
          .then(() => {
            console.log('Document successfully updated!')
          })
      })
    })
  return 1
}
