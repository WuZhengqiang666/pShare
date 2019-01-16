import { ActionType, createStandardAction } from 'typesafe-actions';

const AppActions = {
    initializeApp: createStandardAction('app/INITIALIZE')<void>(),
}

type AppActions = ActionType<typeof AppActions>;

// ensure this is added to ./index.ts RootActions
export default AppActions