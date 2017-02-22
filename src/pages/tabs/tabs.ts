import { Component } from '@angular/core';

import { WritePage } from '../write/write';
import { ViewPage } from '../view/view';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = WritePage;
  tab2Root: any = ViewPage;
  tab3Root: any = SettingsPage;

  constructor() {

  }
}
