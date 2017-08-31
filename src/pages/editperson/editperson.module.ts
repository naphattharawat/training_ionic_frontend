import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditpersonPage } from './editperson';

@NgModule({
  declarations: [
    EditpersonPage,
  ],
  imports: [
    IonicPageModule.forChild(EditpersonPage),
  ],
})
export class EditpersonPageModule {}
