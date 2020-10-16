import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  {path:'',redirectTo:'login', pathMatch:'full'},
  {path:'lists',component:TaskListComponent},
  {path:'lists/:listId',component:TaskListComponent},
  {path:'new-list',component: NewListComponent},
  {path:'lists/:listId/new-task',component: NewTaskComponent},
  {path:'login',component: LoginComponent},
  {path:'user',component: UserComponent},
  {path:'user/:taskId', component:UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
