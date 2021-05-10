import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import {
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Student } from '../models/data.model';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.page.html',
  styleUrls: ['./edit-data.page.scss'],
})
export class EditDataPage implements OnInit {
  student = {} as Student;
  id: any;

  constructor(
    private actRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private firestore: AngularFirestore,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getPostById(this.id);
  }
  async getPostById(id: string) {
    const loader = this.loadingCtrl.create({
      message: 'Please Wait..',
    });
    (await loader).present();

    this.firestore
      .doc('posts/' + id)
      .valueChanges()
      .subscribe((data) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        this.student.name;
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        this.student.age;
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        this.student.address;
      });
    (await loader).dismiss();
  }
  async updatePost(student: Student) {
    if (this.formValidation()) {
      const loader = this.loadingCtrl.create({
        message: 'Pleasw wait..',
      });
      (await loader).present();
      try {
        await this.firestore.doc('student/' + this.id).update(student);
      } catch (e) {
        this.showToast(e);
      }
      (await loader).dismiss();
      this.navCtrl.navigateRoot('home');
    }
  }
  formValidation() {
    if (!this.student.name) {
      this.showToast('Enter Name');
      return false;
    }
    if (!this.student.age) {
      this.showToast('Enter Age');
      return false;
    }
    if (!this.student.address) {
      this.showToast('Enter Address');
      return false;
    }
    return true;
  }

  showToast(message: string) {
    this.toastCtrl
      .create({
        message,
        duration: 3000,
      })
      .then((toastData) => toastData.present());
  }
}
