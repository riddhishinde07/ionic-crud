import { Component } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  student = [];
  constructor(private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private firestore: AngularFirestore) { }

  ionViewWillEnter() {
    this.getPosts();
  }
  async getPosts() {
    const loader = this.loadingCtrl.create({
      message: 'Please Wait...'
    });
    (await loader).present();
    try {
      this.firestore.collection('student')
        .snapshotChanges()
        .subscribe(data => {
          this.student = data.map(e => ({
            id: e.payload.doc.id,
            name: e.payload.doc.data(),
            age: e.payload.doc.data(),
            address: e.payload.doc.data()
          })); console.log(this.student);
        });
      (await loader).dismiss();
    }
    catch (e) {
      this.showToast(e);

    }
  }

  async deletePost(id: string) {
    const loader = this.loadingCtrl.create({
      message: 'Please Wait...'
    });
    (await loader).present();
    await this.firestore.doc('student/' + id).delete();

    (await loader).dismiss();
  }
  showToast(message: string) {
    this.toastCtrl
      .create({
        message,
        duration: 3000
      })
      .then(toastData => toastData.present());
  }

  onLogout(){
    this.afAuth.signOut().then(() => {
      // Sign-out successful.
      this.navCtrl.navigateRoot('login');
    })
    .catch(error => {
      this.showToast(error.message);
    });
  }
}
