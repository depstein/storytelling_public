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
import { AddPacePage } from '../pages/add-pace/add-pace';
import { WriteDiyPage } from '../pages/write-diy/write-diy';
import { WriteRunningPage } from '../pages/write-running/write-running';
import { ReviewChapterPage } from '../pages/review-chapter/review-chapter';
import { ViewChapterComponent } from '../components/view-chapter/view-chapter';
import { TabsPage } from '../pages/tabs/tabs';
import { CDVPhotoLibraryPipe } from '../providers/cdvphotolibrary.pipe';
import { IonicStorageModule } from '@ionic/storage';

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
    WritePage,
    ViewPage,
    TabsPage,
    WriteDiyPage,
    WriteRunningPage,
    ReviewChapterPage,
    //Components
    ViewChapterComponent,
    //Providers
    CDVPhotoLibraryPipe,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
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
    SettingsPage,
    WritePage,
    ViewPage,
    WriteDiyPage,
    WriteRunningPage,
    ReviewChapterPage,
    TabsPage,
    ViewChapterComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage ]
})
export class AppModule {}
