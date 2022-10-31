import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './MainPage/main/main.component';
import { FullQuestionComponent } from './Question/full-question/full-question.component';
import { PostQuestionComponent } from './Question/post-question/post-question.component';
import { SerachPageComponent } from './Question/serach-page/serach-page.component';
import { LoginComponent } from './User/login/login.component';
import { ProfileComponent } from './User/profile/profile.component';
import { SignUpComponent } from './User/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },

  {
    path: 'add',
    component: PostQuestionComponent,
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
  },
  {
    path: 'search/:title',
    component: SerachPageComponent,
  },
  {
    path: 'search/category/:category',
    component: SerachPageComponent,
  },
  {
    path: 'question/:id',
    component: FullQuestionComponent,
  },
  {
    path: '**',
    redirectTo: '/main',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
