import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import List from 'src/app/models/list';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private taskService:TaskService, private router:Router) { }

  ngOnInit(): void {
  }
  addList(value:string){
    this.taskService.createList(value,this.generatePassword())
    .subscribe((list:List) => {console.log(list); this.router.navigate(['/lists',list._id])}); 
  }
  generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

}
