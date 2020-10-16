import { Injectable } from '@angular/core';
import Task from './models/task';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webService:WebService) {
   }
   getlists(){
     return this.webService.get('lists');
   }
   getlist(listId: string){
     return this.webService.get('lists/' + listId);
   }
   createList(title:string,password:string){
    return this.webService.post('lists',{ title,password });
  }
  getTasks(listId: string){
    return this.webService.get('lists/' + listId + '/tasks');
  }
  getTask(listId: string,taskId:string){
    return this.webService.get('lists/' + listId + '/tasks/' + taskId);
  }
  updateTask(listId: string,taskId:string,task:Task){
    return this.webService.patch('lists/' + listId + '/tasks/' + taskId,task);
  }
  createTask(listId:string,title:string,deadline:string){
    return this.webService.post('lists/' + listId + '/tasks',{ title,deadline });
  }
  deleteList(listId:string){
    return this.webService.delete('lists/' + listId);
  }
  deleteTask(listId:string, taskId:string){
    return this.webService.delete('lists/' + listId + '/tasks/' + taskId);
  }
  setCompleted(listId:string, task:Task){
    return this.webService.patch('lists/' + listId + '/tasks/' + task._id, {completed: !task.completed});
  }
}
