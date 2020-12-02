import { Task } from './task.model';

export interface AppState {
    readonly tasks: Array<Task>;
}
