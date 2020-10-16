import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import List from 'src/app/models/list';
import Task from 'src/app/models/task';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  lists:List[]=[];
  tasks:Task[]=[];
  list:List[];
  flag=false;
  pwd:string;
  listpassword:string;
  listId:string;
  today=new Date();
  date = this.today.getDate()+'-'+(this.today.getMonth()+1)+'-'+this.today.getFullYear();
  time= this.today.getHours() + ":" + this.today.getMinutes() + ':' + this.today.getSeconds();
  constructor(private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.taskService.getlists()
      .subscribe((lists:List[]) => this.lists=lists); 
    this.route.params.subscribe((params:Params) =>{
      this.listId = params.listId;
      if(!this.listId) {return;}
      else{
        this.taskService.getTasks(this.listId).subscribe((tasks: Task[])=> {
          this.tasks = tasks;
          for(var i=0;i<tasks.length;i++){
            console.log(tasks[i].deadline);
            console.log(this.time);
            var aa1=(this.time).split(":");
            var aa2=(this.tasks[i].deadline.split(":"));
            var d1=new Date(parseInt("2001",10),(parseInt("01",10))-1,parseInt("01",10),parseInt(aa1[0],10),parseInt(aa1[1],10),parseInt(aa1[2],10));
            var d2=new Date(parseInt("2001",10),(parseInt("01",10))-1,parseInt("01",10),parseInt(aa2[0],10),parseInt(aa2[1],10),parseInt(aa2[2],10));
            var dd1=d1.valueOf();
            var dd2=d2.valueOf();
            console.log(Date.parse("22:10") > Date.parse("22:09"));
            if(dd1<dd2){
              if(this.tasks[i].completed==true){
                console.log(dd1<dd2);
                return;
              }
            }
            else if(dd2<dd1){
              console.log(this.tasks[i].completed)
              if(this.tasks[i].completed!=true){
                this.tasks[i].completed=true;
                this.tasks[i].submittime=false;
                this.taskService.updateTask(this.listId,this.tasks[i]._id,this.tasks[i])
                .subscribe((task:Task) => console.log(task));
              }
            }
        }});
        this.taskService.getlist(this.listId).subscribe((list:List[])=>{console.log(list); this.pwd=list[0].password})
      }
    });
  }
  onTaskClick(task:Task){
    this.taskService.setCompleted(this.listId,task).subscribe(() => task.completed = !task.completed);
  }
  deletetask(task:Task){
    this.taskService.deleteTask(this.listId,task._id)
    .subscribe((task:Task) =>{console.log(task); this.tasks.filter(t => t._id != task._id)});
    alert("Task is deleted successfully");
  }
  deletelist(list:List){
    this.taskService.deleteList(list._id)
    .subscribe((list:List) =>{console.log(list); this.lists.filter(l => l._id != list._id)})
    this.listId=undefined;
    this.listpassword=undefined;
    this.flag=false;
    alert("Employee is deleted sucessfully");
  }
  addTaskClick(){
    if(!this.listId){
      alert("Please Select a list to add tasks");
      return;
    }
    this.router.navigate(['./new-task'],{relativeTo:this.route})
  }
  password(listId:string){
    for(var i=0;i<this.lists.length;i++){
      if(this.lists[i]._id == listId){
        return this.lists[i].password;
      }
    }
  }
  test(){
    console.log(this.date+''+ this.time + ' ' + this.today);
  }
  open(){
    this.flag=true;
  }

}
