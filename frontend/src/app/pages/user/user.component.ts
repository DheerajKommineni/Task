import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import List from 'src/app/models/list';
import Task from 'src/app/models/task';
import { TaskService } from 'src/app/task.service';
import {storedlist} from '../temp'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  list:List[];
  tasks:Task[]=[];
  listId:string=storedlist[0];
  taskId:string;
  singletask;
  notes:string;
  today=new Date();
  date = this.today.getDate()+'/'+(this.today.getMonth()+1)+'/'+this.today.getFullYear();
  time= this.today.getHours() + ":" + this.today.getMinutes() + ':' + this.today.getSeconds();
  finaldate=this.date + ' ' + this.time;
  
  flag=false;
  constructor(private taskService: TaskService,private route:ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.taskService.getlist(this.listId)
    .subscribe((list:List[]) =>{console.log(list);this.list=list});
    this.taskService.getTasks(this.listId).subscribe((tasks: Task[])=> 
    {
      console.log(tasks);
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
        if(dd1<dd2){
          console.log(dd1<dd2);
          return;
        }
        else{
          this.tasks[i].completed=true;
          this.tasks[i].submittime=false;
          this.taskService.updateTask(this.listId,this.tasks[i]._id,this.tasks[i])
          .subscribe((task:Task) => console.log(task));
        }
      }
    });
    this.route.params.subscribe((params:Params) =>{
      this.taskId = params.taskId;
      if(!this.taskId) {return;}
      else{
        this.flag=true;
        this.taskService.getTask(this.listId,this.taskId).subscribe((task: Task[])=> {this.singletask = task});
      }
    });
  }

  update(val:string,input:string){
    this.singletask.progress=val;
    this.singletask.notes=input;
    if(val=="100"){
      this.singletask.completed=true;
      this.singletask.submittime=true;
    }
    this.taskService.updateTask(this.listId,this.taskId,this.singletask)
    .subscribe((task:Task) => this.router.navigate(['../'],{relativeTo:this.route}));
  }

}
