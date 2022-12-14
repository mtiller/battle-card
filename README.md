- Airdrop - Automatic (3 random events each with 3 possible outcomes)
- Part 1 - Player choice (16 possibilities at most, 4 random events each with 3 possible outcomes)
- Part 2 - Automatic (no random events)
- Part 3 - Player choice (3? possibilities at most, no random events)
- Part 4 - Automatic (at most 1 random event with 2 possible outcomes)
- Part 5 - Automatic (no random events)

Game start: 1 state
Airdrop: 27 possible true initial states
Part 1: N -> N*16*64 (16 choices each with 64 outcomes)
Part 2: N -> N
Part 3: N -> N*3 (assuming doing nothing is an option)
Part 4: N -> N*2 (once per game)
part 5: N -> N

Possible fanout 16*64*3\*2 = 6144 possibilities Over the course of the game
6144^6 = 5.38e+22 possibilities. But there can't be that many states so it will actually be much smaller.

How to represent progression in game?

For each human choice, generate a state where each value is a histogram based on some monte-carlo of random events.
