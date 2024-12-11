import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NgModule } from '@angular/core';
import { DiaryListComponent } from './pages/diary-list/diary-list.component';
import { DiaryDetailComponent } from './pages/diary-detail/diary-detail.component';
import { DiaryFormComponent } from './pages/diary-form/diary-form.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  declarations: [
    DiaryListComponent,
    DiaryDetailComponent,
    DiaryFormComponent,
    LoginComponent,
    SignupComponent,
    AppComponent,
    RouterModule,
  ],
  imports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
