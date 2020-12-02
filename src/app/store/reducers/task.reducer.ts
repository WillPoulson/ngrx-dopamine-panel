import { Task } from '../models/task.model';
import * as uuid from 'uuid';
import { Action, createReducer, on } from '@ngrx/store';
import { TaskActions } from '../actions/task.actions';
import { faBroom, faCoffee, faPaw, faWalking } from '@fortawesome/free-solid-svg-icons';

export const initialState: Array<Task> = [
    {
        id: uuid.v4(),
        name: 'Make a coffee',
        icon: faCoffee,
        completed: false
    },
    {
        id: uuid.v4(),
        name: 'Go for a walk',
        icon: faWalking,
        completed: false
    },
    {
        id: uuid.v4(),
        name: 'Do some cleaning',
        icon: faBroom,
        completed: false
    },
    {
        id: uuid.v4(),
        name: 'Play with hamsters',
        icon: faPaw,
        completed: false
    }
];

const taskReducerFn = createReducer(
    initialState,
    on(TaskActions.toggleCompleted, (state, { id }) => {

        const task = state.find(x => x.id === id);
        if (task === undefined) {
            return state;
        }
        const taskIndex = state.indexOf(task);

        return ([
            ...state.slice(0, taskIndex),
            {
                ...task,
                completed: !task.completed,
            },
            ...state.slice(taskIndex + 1)
        ]);
    }),
    on(TaskActions.reset, () => initialState)
);

export function taskReducer(state: Array<Task> | undefined, action: Action): Array<Task> | undefined {
    return taskReducerFn(state, action);
}
