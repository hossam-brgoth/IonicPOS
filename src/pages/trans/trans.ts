import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
//import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController, AlertController } from 'ionic-angular';


/**
 * Generated class for the TransPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trans',
  templateUrl: 'trans.html',
})
export class TransPage {

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(navCtrl: NavController, db: AngularFireDatabase,
    public toastCtrl: ToastController, public alertCtrl: AlertController) {
  
  
    /*fireAuth.auth.onAuthStateChanged(function(user) {
      if (!user) {
        navCtrl.setRoot(RegisterPage);
      }
  
  
    }); */
  
    this.itemsRef = db.list('/trans/', ref => ref.limitToLast(100),);
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().map(changes => {
    return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransPage');
  }

}
