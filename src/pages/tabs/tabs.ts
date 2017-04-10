import { Component } from '@angular/core';

import { Timeline } from './timeline';
import { Profile } from './profile';
import { Settings } from './settings';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class Tabs {

timelineTab = Timeline;
profileTab = Profile;
settingsTab = Settings;

  constructor() { }

  }
