import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface Task {
    id: string;
    name: string;
    icon: IconDefinition;
    completed: boolean;
}
