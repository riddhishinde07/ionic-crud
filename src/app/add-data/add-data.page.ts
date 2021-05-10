import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { Student } from '../models/data.model';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.page.html',
  styleUrls: ['./add-data.page.scss'],
})
export class AddDataPage implements OnInit {


  student = {} as Student;

  constructor(private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private firestore: AngularFirestore) { }

  ngOnInit() {
  }
  async createPost(student: Student) {
    if (this.formValidation()) {
      const loader = this.loadingCtrl.create({
        message: 'Please Wait..'
      });
      (await loader).present();
      try {
        await this.firestore.collection('student').add(this.student);

      }
      catch (e) {
        this.showToast(e);
      }
      (await loader).dismiss();
      this.navCtrl.navigateRoot('home');

    }
  }
  formValidation() {
    if (!this.student.name) {
      this.showToast('Enter name');
      return false;
    }
    if (!this.student.age) {
      this.showToast('Enter age');
      return false;
    }
    if (!this.student.address) {
      this.showToast('Enter address');
      return false;
    }
    return true;
  }



  showToast(message: string) {
    this.toastCtrl
      .create({
        message,
        duration: 1000
      })
      .then(toastData => toastData.present());
  }


}
