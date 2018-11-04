import { Component } from '@angular/core';
import { TasksService } from './services/tasks.service';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TasksService, HttpService]
})
export class AppComponent {
	
	constructor(private tasksService: TasksService) {}
	
	save() {
		this.tasksService.saveTasksInDb();	
	}
}
