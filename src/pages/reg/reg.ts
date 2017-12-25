import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { HomePage } from '../home/home';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the RegPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reg',
  templateUrl: 'reg.html',
})
export class RegPage {

  email: string;
  password: string;
  message: string;
  
    constructor(public navCtrl: NavController, public navParams: NavParams, private ofAuth: AngularFireAuth,public toastCtrl: ToastController) {
    }
  
    login(){
    this.ofAuth.auth.signInWithEmailAndPassword(this.email, this.password).then(user=>this.navCtrl.push(HomePage));
  
    let toast = this.toastCtrl.create({
          message: 'You are Signed In Successfully!',
          duration: 5000
        });
        toast.present();
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad RegPage');
  }

}
