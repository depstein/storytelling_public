import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SettingsPage } from '../pages/settings/settings';
import { WritePage } from '../pages/write/write';
import { ViewPage } from '../pages/view/view';
import { AddDetailPage } from '../pages/add-detail/add-detail';
import { AddTextDescriptionPage } from '../pages/add-text-description/add-text-description';
import { AddExpensesPage } from '../pages/add-expenses/add-expenses';
import { AddEmotionPage } from '../pages/add-emotion/add-emotion';
import { TabsPage } from '../pages/tabs/tabs';
import { CDVPhotoLibraryPipe } from '../providers/cdvphotolibrary.pipe';

@NgModule({
  declarations: [
    //Pages
    MyApp,
    SettingsPage,
    AddDetailPage,
    AddTextDescriptionPage,
    AddExpensesPage,
    AddEmotionPage,
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
    AddDetailPage,
    AddTextDescriptionPage,
    AddExpensesPage,
    AddEmotionPage,
    SettingsPage,
    WritePage,
    ViewPage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
