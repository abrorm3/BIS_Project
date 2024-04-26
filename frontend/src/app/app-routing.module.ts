import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ManagementPanelComponent } from './admin-panel/management-panel/management-panel.component';
import { ForgotPasswordComponent } from './admin-panel/password-recovery/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './admin-panel/password-recovery/reset-password/reset-password.component';
import { ProjectsComponent } from './projects/projects.component';
import { BoothDetailsComponent } from './booth-details/booth-details.component';
import { ApproveComponent } from './admin-panel/approve/approve.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'details/:title/:id', component: BoothDetailsComponent },
  {
    path: 'admin',
    component: AdminPanelComponent,
  },
  { path: 'admin/management', component: ManagementPanelComponent },
  { path: 'admin/forgot-password', component: ForgotPasswordComponent },
  {
    path: 'admin/reset-password/:id/:token',
    component: ResetPasswordComponent,
  },
  { path: 'admin/approve/:email/:password', component: ApproveComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
