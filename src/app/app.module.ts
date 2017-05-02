import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, DeepLinkConfig } from 'ionic-angular';
import { MyApp } from './app.component';
import { SettingsPage } from '../pages/settings/settings';
import { WritePage } from '../pages/write/write';
import { ViewPage } from '../pages/view/view';
import { AddDetailPage } from '../pages/add-detail/add-detail';
import { AddTextDescriptionPage } from '../pages/add-text-description/add-text-description';
import { AddExpensesPage } from '../pages/add-expenses/add-expenses';
import { AddEmotionPage } from '../pages/add-emotion/add-emotion';
import { AddPacePage } from '../pages/add-pace/add-pace';
import { AddPhotosPage } from '../pages/add-photos/add-photos';
import { WriteDiyPage } from '../pages/write-diy/write-diy';
import { WriteRunningPage } from '../pages/write-running/write-running';
import { ReviewChapterPage } from '../pages/review-chapter/review-chapter';
import { ViewChapterComponent } from '../components/view-chapter/view-chapter';
import { PhotoSelectorComponent } from '../components/photo-selector/photo-selector';
import { CDVPhotoLibraryPipe } from '../providers/cdvphotolibrary.pipe';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

export const deepLinkConfig: DeepLinkConfig = {
  links: [
    { component: ViewPage, name: "view", segment: "view/:uid/:cid"}
  ]
};

@NgModule({
  declarations: [
    //Pages
    MyApp,
    SettingsPage,
    AddDetailPage,
    AddTextDescriptionPage,
    AddExpensesPage,
    AddEmotionPage,
    AddPacePage,
    AddPhotosPage,
    WritePage,
    ViewPage,
    WriteDiyPage,
    WriteRunningPage,
    ReviewChapterPage,
    //Components
    ViewChapterComponent,
    PhotoSelectorComponent,
    //Providers
    CDVPhotoLibraryPipe,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    //IonicModule.forRoot(MyApp, {}, deepLinkConfig),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddDetailPage,
    AddTextDescriptionPage,
    AddExpensesPage,
    AddEmotionPage,
    AddPacePage,
    AddPhotosPage,
    SettingsPage,
    WritePage,
    ViewPage,
    WriteDiyPage,
    WriteRunningPage,
    ReviewChapterPage,
    ViewChapterComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage ]
})
export class AppModule {}
