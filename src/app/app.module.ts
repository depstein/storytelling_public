import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SettingsPage } from '../pages/settings/settings';
import { WritePage } from '../pages/write/write';
import { ViewPage } from '../pages/view/view';
import { TabsPage } from '../pages/tabs/tabs';
import { CDVPhotoLibraryPipe } from '../providers/cdvphotolibrary.pipe';

@NgModule({
  declarations: [
    //Pages
    MyApp,
    SettingsPage,
    WritePage,
    ViewPage,
    TabsPage,
    //Providers
    CDVPhotoLibraryPipe,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    WritePage,
    ViewPage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
