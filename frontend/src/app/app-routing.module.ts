import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ManagementPanelComponent } from './admin-panel/management-panel/management-panel.component';
import { ForgotPasswordComponent } from './admin-panel/password-recovery/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './admin-panel/password-recovery/reset-password/reset-password.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  {path:'projects', component: ProjectsComponent },
  {
    path: 'admin',
    component: AdminPanelComponent,
  },
  { path: 'admin/management', component: ManagementPanelComponent },
  { path: 'admin/forgot-password', component: ForgotPasswordComponent },
  { path: 'admin/reset-password/:id/:token', component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
