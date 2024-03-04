import { ItemModel } from './ItemModel';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
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

async function getDishes(db: any) {
  const dishesCol = collection(db, 'dishes');
  const dishesSnapshot = await getDocs(dishesCol);
  const dishesList = dishesSnapshot.docs.map(doc => doc.data());
  return dishesList;
}

const itemVisualizer = new ItemVisualizer(
  { selector: '.canvas', width: 600, height: 600 },
  { top: 20, right: 20, bottom: 100, left: 100 },
  [270, 330, 360],
  200
);

getDishes(db).then((data: any) => {
  const itemModel = new ItemModel(data)
  itemVisualizer.update(itemModel)
})

