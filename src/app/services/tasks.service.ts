import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { Task } from '../models/task';
import { HttpService } from './http.service';

@Injectable() 
export class TasksService {
  private tasksListObs = new BehaviorSubject<Array<Task>>([]);

  
  constructor(private httpService: HttpService) {
	/**const tasksList = [ 
		{name: "Zrobić zakupy", created: new Date().toLocaleString(), isDone: false}, 
		{name: "Umyć samochód", created: new Date().toLocaleString(), isDone: false}, 
		{name: "Odrobić lekcje", created: new Date().toLocaleString(), isDone: false}, 
		{name: "Posprzątać pokój", created: new Date().toLocaleString(), isDone: false}, 
		{name: "Naprawić komputer", created: new Date().toLocaleString(), isDone: false},
		{name: "Naprawić samochód", created: new Date().toLocaleString(), end: new Date().toLocaleString(), isDone: true}
	];  	
	this.tasksListObs.next(tasksList);*/
	this.httpService.getTasks().subscribe(list => {
		this.tasksListObs.next(list);
	});	
  }
  
  add(task: Task) {
	const list = this.tasksListObs.getValue();
	list.push(task);
	this.tasksListObs.next(list);
  }
  
  remove(task: Task) {
	const list = this.tasksListObs.getValue();.filter( e => e !== task);  
	this.tasksListObs.next(list);
  }
  
  done(task: Task) {
	task.end = new Date().toLocaleString();
	task.isDone = true;	
	const list = this.tasksListObs.getValue();
	this.tasksListObs.next(list);	
  }

  getTasksListObs(): Observable<Array<Task>> {
	return this.tasksListObs.asObservable();
  }	
  
  saveTasksInDb() {
	this.httpService.saveTasks(this.tasksListObs.getValue());	
  }
  
}