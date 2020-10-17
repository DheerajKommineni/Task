import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { stringify } from 'querystring';
import List from 'src/app/models/list';
import { TaskService } from 'src/app/task.service';
import {storedlist} from '../temp'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  lists:List[]=[];
  list:List[];
  login=false;
  listid:string;
  storedlist=storedlist;
  constructor(private taskService:TaskService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void { 
  }
  async verify(listId:string, pwd:string){
    if(listId=="12345678" && pwd=="managers"){
      this.router.navigate(['./lists']);
    }
    else{
      this.taskService.getlist(listId)
      .subscribe((list:List[]) =>{this.listid=list[0]._id;this.passwordcheck(list[0].password,pwd);this.list=list});
    }

  }
  passwordcheck(password:string,pwd:string){
      if(password==pwd){
        this.login=true;
        storedlist.push(this.listid);
        this.router.navigate(['./user'])
      }
      else{
        this.login=false;
        alert("check your password");
        return;
      }

  }

}
