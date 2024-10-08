import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfilComponent } from './user-profil/user-profil.component';
import { AuthGuard } from './shared/services/auth.guard';
import { MyEventsComponent } from './my-events/my-events.component';
import { EditEventComponent } from './edit-event/edit-event.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'event/:id', component: EventDetailComponent },
  { path: 'create', component: CreateEventComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: UserProfilComponent },
  { path: 'my-events', component: MyEventsComponent },
  { path: 'edit-event/:id', component: EditEventComponent },
  { path: '**', redirectTo: '' } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
