import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDataPageRoutingModule } from './edit-data-routing.module';

import { EditDataPage } from './edit-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditDataPageRoutingModule
  ],
  declarations: [EditDataPage]
})
export class EditDataPageModule {}
