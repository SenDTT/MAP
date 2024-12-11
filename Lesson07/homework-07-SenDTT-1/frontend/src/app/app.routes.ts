import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DiaryListComponent } from './pages/diary-list/diary-list.component';
import { DiaryDetailComponent } from './pages/diary-detail/diary-detail.component';
import { DiaryFormComponent } from './pages/diary-form/diary-form.component';
import { AuthGuard } from './guards/auth.guard';
import { MainLayoutComponent } from './main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      {
        path: 'diaries',
        component: DiaryListComponent,
        canActivate: [AuthGuard],
        children: [
          { path: 'add', component: DiaryFormComponent },
          { path: ':id', component: DiaryDetailComponent },
          { path: ':id/edit', component: DiaryFormComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
