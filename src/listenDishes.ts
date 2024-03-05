import { collection, onSnapshot } from 'firebase/firestore';
import { Item } from './ItemModel';
import { itemModel, update } from '.';

export function listenDishes(db: any) {
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
    update()
  })
}
