import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';

import { RegPage } from '../reg/reg';
import { TransPage } from '../trans/trans';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  order = [];
  countOrders = 0;

drinks = [{
  id: 0,
  name: "ماء",
  price: "1",
},
{
  id: 1,
  name: "عصير",
  price: "1.10",
},
{
  id: 2,
  name: "بيبسي",
  price: "1.20",
},
{
  id: 3,
  name: "كابتشينو",
  price: "1.30",
},
{
  id: 4,
  name: "شاي",
  price: "1.90",
},
{
  id: 5,
  name: "هوت شوكلت",
  price: "2.10",
},
{
  id: 6,
  name: "كاكاو",
  price: "2.00",
},
{
  id: 7,
  name: "أفوكادو",
  price: "1.90",
}];

foods = [{
  id: 8,
  name: "كيك",
  price: "1.50",
},
{
  id: 9,
  name: "بسبوسة",
  price: "1.30",
},
{
  id: 10,
  name: "تشيز كيك",
  price: "1.70",
},
{
  id: 11,
  name: "بيتزا",
  price: "2.70",
},
{
  id: 12,
  name: "دونات",
  price: "1.90",
},
{
  id: 13,
  name: "سكالوب",
  price: "1.20",
},
{
  id: 14,
  name: "برجر",
  price: "1.20",
},
{
  id: 15,
  name: "سمك",
  price: "2.50",
}
];


constructor(public fireAuth: AngularFireAuth, public navCtrl: NavController, db: AngularFireDatabase, public alertCtrl: AlertController) {

  this.itemsRef = db.list('/trans/', ref => ref.limitToLast(50),);
  // Use snapshotChanges().map() to store the key
  this.items = this.itemsRef.snapshotChanges().map(changes => {
  return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
  });

  fireAuth.auth.onAuthStateChanged(function(user) {
        if (!user) {
          navCtrl.setRoot(RegPage);
        }


      }); 


}


addToOrderList(item, qty) {
  var flag = 0;

  if (this.order.length > 0) {
      for (var i = 0; i < this.order.length; i++) {
          if (item.id === this.order[i].id) {
              item.qty += qty;
              flag = 1;
              break;
          }
      }
      if (flag === 0) {
          item.qty = 1;
      }
      if (item.qty < 2) {
          this.order.push(item);
      }

  } 
  
  else {
      item.qty = qty;
      this.order.push(item);
  }
}

removeSingleItem (item) {
  for (var i = 0; i < this.order.length; i++) {
      if (item.id === this.order[i].id) {
          item.qty -= 1;
          if (item.qty === 0) {
              this.order.splice(i, 1);
          }
      }
  }
}


removeItem (item) {
  for (var i = 0; i < this.order.length; i++) {
      if (item.id === this.order[i].id) {
          this.order.splice(i, 1);
      }
  }
}

getTotal () {
  var tot = 0;
  for (var i = 0; i < this.order.length; i++) {
      tot += (this.order[i].price * this.order[i].qty)
  }
  return tot;
}

clearOrderList () {
  this.order = [];
}

checkout() {
  this.countOrders += 1;
  let alert = this.alertCtrl.create({ title: "Order Number: "+this.countOrders.toString(),
  subTitle: "Amount: "+this.getTotal().toFixed(2).toString()+" Payment received. Thanks",
  buttons: ['OK']});
  alert.present();
  this.itemsRef.push({ orderNum:this.countOrders, total:this.getTotal().toFixed(2) , Date:Date() });
  //this.itemsRef.push(this.order);
  this.order = [];
}

getLastTrans(){
  this.navCtrl.push(TransPage);
}

signOut(){
  this.fireAuth.auth.signOut();
}

}

