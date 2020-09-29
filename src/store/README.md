# Store

## Architecture

The application store architecture is split into two parts: Vuex and Hooks.

Vuex is the application data repository (long term store), operating as a type of local database. Components should not use the Vuex store directly, but load the data into local state (or into hooks) and then commit the state once the user action is confirmed.

Hooks are to be used when state needs to be shared across multiple components as a short-term store when a user is interacting with components.
