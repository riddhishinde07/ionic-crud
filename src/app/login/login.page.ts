import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { User } from '../models/user.mode';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = {} as User;
  googlePlus: any;


  constructor(private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,

  ) { }

  ngOnInit() {
  }
  facelogin() {
    this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => {
        console.log(res);
        this.navCtrl.navigateRoot('home');
      });

  }
  loginGoogle(){
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(res => {
      console.log(res);
      this.navCtrl.navigateRoot('home');
    });
  }


  async login(user: User) {
    if (this.formValidation()) {
      const loader = this.loadingCtrl.create({
        message: 'Please Wait..'
      });
      (await loader).present();
      try {
        await this.afAuth.
          signInWithEmailAndPassword(user.email, user.password).then(data => {
            console.log(data);
            this.navCtrl.navigateRoot('home');
          });

      } catch (e) {
        this.showToast(e);
      }
      (await loader).dismiss();
    }
  }
  formValidation() {
    if (!this.user.email) {
      this.showToast('Enter email');
      return false;
    }
    if (!this.user.password) {
      this.showToast('Enter password');
      return false;
    }
    return true;
  }





  showToast(message: string) {
    this.toastCtrl
      .create({
        message,
        duration: 3000
      })
      .then(toastData => toastData.present());
  }


}
