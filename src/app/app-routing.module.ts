import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { QuizAttemptComponent } from './components/player/quiz-attempt/quiz-attempt.component';
import { LoginSuccessComponent } from './components/login-success/login-success.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'quiz', component: QuizAttemptComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login-success', component: LoginSuccessComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }