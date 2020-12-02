import { createAction, props } from '@ngrx/store';

const toggleCompleted = createAction(
    '[Task] Toggle Completed',
    props<{ id: string }>()
);

const reset = createAction(
    '[Task] Reset',
);

export const TaskActions = {
    toggleCompleted,
    reset
};
