import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AccordionComponent } from './pages/components/accordion/accordion.component';
import { AvatarPageComponent } from './pages/components/avatar/avatar.component';
import { BadgeComponent } from './pages/components/badge/badge.component';
import { ButtonComponent } from './pages/components/button/button.component';
import { IconComponent } from './pages/components/icon/icon.component';
import { IconRoundComponent } from './pages/components/icon-round/icon-round.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'components/accordion', component: AccordionComponent },
  { path: 'components/avatar', component: AvatarPageComponent },
  { path: 'components/badge', component: BadgeComponent },
  { path: 'components/button', component: ButtonComponent },
  { path: 'components/icon', component: IconComponent },
  { path: 'components/icon-round', component: IconRoundComponent },
];
