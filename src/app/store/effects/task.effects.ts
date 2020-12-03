import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskActions } from '../actions/task.actions';
import { filter, tap, withLatestFrom } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-state.model';
import * as confetti from 'canvas-confetti';

@Injectable()
export class TaskEffects {
    constructor(
        private actions$: Actions,
        private appState: Store<AppState>
    ) {}

    playDing$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TaskActions.toggleCompleted),
            withLatestFrom(this.appState.select(state => state.tasks)),
            filter(([action, tasks]) => {
                const task = tasks.find(x => x.id === action.id);
                if (!task) {
                    return false;
                }
                return task.completed;
            }),
            tap(() => {
                const audio = new Audio();
                audio.src = './assets/sounds/ding.mp3';
                audio.load();
                audio.play();
            }),
        ), { dispatch: false },
    );

    launchConfetti$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TaskActions.toggleCompleted),
            withLatestFrom(this.appState.select(state => state.tasks)),
            filter(([action, tasks]) => {
                const completed = tasks.filter(x => x.completed);
                return completed.length === tasks.length;
            }),
            tap(async () => {
                const confettiCanvas = document.getElementById('confetti') as HTMLCanvasElement;
                const confettiCannon = confetti.create(confettiCanvas, { resize: true });
                confettiCannon({
                    particleCount: 120,
                    spread: 50,
                    ticks: 300,
                });
            }),
        ), { dispatch: false },
    );
}
