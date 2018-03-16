import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LifecycleEventsPage } from './lifecycle-events';

@NgModule({
  declarations: [
    LifecycleEventsPage,
  ],
  imports: [
    IonicPageModule.forChild(LifecycleEventsPage),
  ],
})
export class LifecycleEventsPageModule {}
