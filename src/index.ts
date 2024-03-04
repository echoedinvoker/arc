import { Item, ItemModel } from './ItemModel';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { ItemVisualizer } from './ItemVisualizer';

const firebaseConfig = {
  apiKey: "AIzaSyC4bKkedi8uLGBLokr7oZ_txm80qCCaE4I",
  authDomain: "udemy-d3-b699d.firebaseapp.com",
  projectId: "udemy-d3-b699d",
  storageBucket: "udemy-d3-b699d.appspot.com",
  messagingSenderId: "852464180558",
  appId: "1:852464180558:web:1c8a940b865dbab68d521f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const itemVisualizer = new ItemVisualizer(
  { selector: '.canvas', width: 600, height: 600 },
  { top: 20, right: 20, bottom: 100, left: 100 },
  [270, 330, 360],
  300
);

const itemModel = new ItemModel([], [])

function listenDishes(db: any) {
  const dishesCol = collection(db, 'dishes');
  onSnapshot(dishesCol, (doc) => {
    doc.docChanges().forEach((change: any) => {
      switch (change.type) {
        case "added":
          itemModel.set(change.doc.data(), change.doc.id)
          break;
        case "modified": {
          const item: Item = itemModel.getItem(change.doc.id)!
          item.name = change.doc.data().name
          item.orders = change.doc.data().orders
          break;
        }
        case "removed":
          itemModel.remove(change.doc.id)
          break;
      }
    })
    itemVisualizer.update(itemModel)
  })
}

listenDishes(db)
