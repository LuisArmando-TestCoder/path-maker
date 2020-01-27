import { ZoneTravelerComponent } from './routes/zone-traveler/zone-traveler.component';
export const routes = [
  { path: 'travel/:stringTravel', component: ZoneTravelerComponent },
  { path: 'travel', component: ZoneTravelerComponent },
  { path: '', redirectTo: 'travel', pathMatch: 'full' },
  { path: '**', component: ZoneTravelerComponent },
]
