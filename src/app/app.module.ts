import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { routes } from './routes';
import { AppComponent } from './app.component';
import { ZoneTravelerCanvasComponent } from './zone-traveler-canvas/zone-traveler-canvas.component';
import { ZoneTravelerComponent } from './routes/zone-traveler/zone-traveler.component';

@NgModule({
  declarations: [
    AppComponent,
    ZoneTravelerCanvasComponent,
    ZoneTravelerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
