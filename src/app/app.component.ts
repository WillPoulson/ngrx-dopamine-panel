import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskActions } from './store/actions/task.actions';
import { AppState } from './store/models/app-state.model';
import { Task } from './store/models/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public tasks$: Observable<Array<Task>> | undefined;
  public incompleteTasks$: Observable<boolean> | undefined;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.tasks$ = this.store.select(store => store.tasks);
    this.incompleteTasks$ = this.tasks$.pipe(
      map((tasks) => tasks.filter(x => x.completed).length !== tasks.length)
    );
  }

  public dispatchToggleTaskAction(id: string): void {
    this.store.dispatch(TaskActions.toggleCompleted({ id }));
  }

  public dispatchResetAction(): void {
    this.store.dispatch(TaskActions.reset());
  }

}
