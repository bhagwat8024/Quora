import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './MainPage/nav-bar/nav-bar.component';
import { MainComponent } from './MainPage/main/main.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './User/login/login.component';
import { SignUpComponent } from './User/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { authInterceptorProvider } from './Service/auth.interceptor';
import { SingleCategoryComponent } from './Category/single-category/single-category.component';
import { MatCardModule } from '@angular/material/card';
import { SingleQuestionComponent } from './Question/single-question/single-question.component';
import { PostQuestionComponent } from './Question/post-question/post-question.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReplyQuestionComponent } from './Reply/reply-question/reply-question.component';
import { ShowAllRepliesComponent } from './Reply/show-all-replies/show-all-replies.component';
import { TopReplyDivComponent } from './Reply/top-reply-div/top-reply-div.component';
import { FilterQuestionComponent } from './Question/filter-question/filter-question.component';
import { ProfileComponent } from './User/profile/profile.component';
import { MatTabsModule } from '@angular/material/tabs';
import { QuestionListComponent } from './Question/question-list/question-list.component';
import { CategoryListComponent } from './Category/category-list/category-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserFollowEditButtonComponent } from './User/user-follow-edit-button/user-follow-edit-button.component';
import { EditUserComponent } from './User/edit-user/edit-user.component';
import { SearchBarComponent } from './MainPage/search-bar/search-bar.component';
import { SerachPageComponent } from './Question/serach-page/serach-page.component';
import { FullQuestionComponent } from './Question/full-question/full-question.component';
import { ShowFollowerFollowingComponent } from './User/show-follower-following/show-follower-following.component';
import { MatChipsModule } from '@angular/material/chips';
import { EllipsisModule } from 'ngx-ellipsis';
import { NgxTextOverflowClampModule } from 'ngx-text-overflow-clamp';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MainComponent,
    LoginComponent,
    SignUpComponent,
    SingleCategoryComponent,
    SingleQuestionComponent,
    PostQuestionComponent,
    ReplyQuestionComponent,
    ShowAllRepliesComponent,
    TopReplyDivComponent,
    FilterQuestionComponent,
    ProfileComponent,
    QuestionListComponent,
    CategoryListComponent,
    UserFollowEditButtonComponent,
    EditUserComponent,
    SearchBarComponent,
    SerachPageComponent,
    FullQuestionComponent,
    ShowFollowerFollowingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    EllipsisModule,
    NgxTextOverflowClampModule,
  ],
  providers: [authInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
