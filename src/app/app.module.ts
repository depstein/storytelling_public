import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, DeepLinkConfig } from 'ionic-angular';
import { MyApp } from './app.component';
import { SettingsPage } from '../pages/settings/settings';
import { WritePage } from '../pages/write/write';
import { ViewPage } from '../pages/view/view';
import { AddDetailPage } from '../pages/add-detail/add-detail';
import { AddPhotosPage } from '../pages/add-photos/add-photos';
import { WriteDiyPage } from '../pages/write-diy/write-diy';
import { WriteRunningPage } from '../pages/write-running/write-running';
import { ReviewChapterPage } from '../pages/review-chapter/review-chapter';
import { PhotoSelectorComponent } from '../components/photo-selector/photo-selector';
import { CDVPhotoLibraryPipe } from '../providers/cdvphotolibrary.pipe';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ChapterCardComponent } from '../components/chapter-card/chapter-card';

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
    AddPhotosPage,
    WritePage,
    ViewPage,
    WriteDiyPage,
    WriteRunningPage,
    ReviewChapterPage,
    //Components
    ChapterCardComponent,
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
    AddPhotosPage,
    SettingsPage,
    WritePage,
    ViewPage,
    WriteDiyPage,
    WriteRunningPage,
    ReviewChapterPage,
    ChapterCardComponent,
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage ]
})
export class AppModule {}
