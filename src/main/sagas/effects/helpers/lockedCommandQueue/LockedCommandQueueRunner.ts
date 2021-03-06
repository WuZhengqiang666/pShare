import { QueuedCommandWithPassword } from "./QueuedCommandWithPassword";
export interface LockedCommandQueueRunner {
    addQueuedCommand: (queuedCommand: QueuedCommandWithPassword) => void;
    cancel: () => void
    readonly finished: Promise<void>
    restart: () => Promise<void>
}
