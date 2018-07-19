import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ngModuleJitUrl } from '@angular/compiler';
import { HomeComponent } from './pages/home/home.component';
import { ToDoListComponent } from './pages/to-do-list/to-do-list.component';
import { ToDoItemComponent } from './pages/to-do-item/to-do-item.component';


const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'toDoList', component: ToDoListComponent},
    {path: 'toDo/:id', component: ToDoItemComponent},
    {path: 'toDoAdd', component: ToDoItemComponent},
    {path: '**', component: HomeComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }