// angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

// third party imports
import { NgxLoadingModule } from 'ngx-loading';
import {NgbDateAdapter, NgbModule} from '@ng-bootstrap/ng-bootstrap';

// App imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { EntryEditorComponent } from './entry-editor/entry-editor.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

import {WorkoutApiService} from './services/workout-api.service';
import {DateStringAdapterService} from './services/date-string-adapter.service';
import { PerformanceTargetModalComponent } from './performance-target-modal/performance-target-modal.component';
import { AdminComponent } from './admin/admin.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WorkoutsComponent,
    EntryEditorComponent,
    NavMenuComponent,
    PerformanceTargetModalComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxLoadingModule.forRoot({}),
    FormsModule,
    NgbModule
  ],
  providers: [
    WorkoutApiService,
    {provide: NgbDateAdapter, useClass: DateStringAdapterService}
  ],
  entryComponents : [
    PerformanceTargetModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
