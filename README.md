# Battle Card: Market Garden

This is an implementation of the rules for [Battle Card: Market
Garden](https://twitter.com/mtiller/status/1605656408430477312) by [David
Thompson](https://twitter.com/djackthompson) and [Nils
Johansson](https://twitter.com/zweigefuhle).

## Running

This code is already deployed [here](https://game-too-far.netlify.app). But if
you want to run it locally so you can play around with the code, this should be
possible assuming you [Download NodeJS](https://nodejs.org/en/download/). You'll
also need to install
[Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable). I suggest
`npm install --global yarn`.

Once those dependencies are installed, you'll need to fetch the rest of the
dependencies which is just:

```sh
$ yarn install
```

At that point, you can run the code with `yarn dev`. This should open a browser
window with the app running in it.

## Architecture

### Separation of Presentation and Business Logic

Although this is a web application, most of the code is written without any
consideration for the UI. Specifically, the `src/rules` and `src/monte`
directories are actually where most of the code resides and these have no
connection to the UI.

### Implementing Rules

The overall approach to implementing game turns is a little unusual because of
the fact that various random events are interlaced between the player decisions
and the fact that this is a solo game. So whereas many games might utilize some
kind of minimax search, this one is really just playing against chance. So
there are no decision to be made except those of the human player. But again,
there are multiple decisions made in a given round with random events in
between.

The best place to start if you are trying to follow how the rules are
implemented would be `src/rules/simulate.ts`. I tried to follow the structure
of the game rules as much as possible here. Starting here you can dig down into
each step in the round in greater detail.

### State

The game state is managed using what is effectively a [State
Monad](<https://en.wikipedia.org/wiki/Monad_(functional_programming)#State_monads>)
based approach. What this means is that everything about the state of the game
is contained in a data structure. Javascript as limited support for immutable
data structures so this is more a convention than something enforced by the type
system. But the bottom line here is that:

- There are no global variables
- The various functions in `src/rules/simulate.ts` all return a new state,
  leaving the state that was passed into them untouched.

### UI

The UI leverages [React](https://reactjs.org/) to manage rendering and state as well as [Mantine](https://mantine.dev/) for styled components. The build system leverages [ViteJS](https://vitejs.dev/) and I host a version of the application on [Netlify](https://www.netlify.com/).

As mentioned before, the game rules are implemented without any dependency on any UI related code. This makes testing all the logic, etc. a breeze without the need to bring in tools like Storybook, Cypress, etc.

The UI itself "starts" in `src/main.tsx`. This then imports the application
from `src/Apps.tsx`. From there, various components are implemented in
`src/components` and most of the data management is implemented using hooks in
`src/hooks`.
