import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HoursComponent } from './hours/hours.component';
import { VehiclesComponent } from './vehicles/vehicles.component';

const routes: Routes = [
  { path: '', component: VehiclesComponent },
  { path: 'hours/:type/:entrypoint', component: HoursComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
