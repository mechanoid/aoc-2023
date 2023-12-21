import { assertEquals } from "std/assert/mod.ts";
import {
  checkGames,
  evaluatePossibility,
  minimalDiceCountForGame,
  powerOfGame,
  powerOfGames,
  summarizeGame,
} from "./day_2.ts";

Deno.test("summarize colors for game", () => {
  const line = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green";
  const result = [
    { blue: 3, red: 4 },
    { red: 1, green: 2, blue: 6 },
    { green: 2 },
  ];

  const { game, id, sessions } = summarizeGame(line);
  assertEquals(game, "Game 1");
  assertEquals(id, 1);
  assertEquals(sessions, result);
});

Deno.test("evaluate possibility for game", () => {
  const game = {
    game: "Game 1",
    id: 1,
    sessions: [{ red: 5, blue: 9, green: 4 }],
  };

  const bag = { red: 12, blue: 14, green: 13 };
  const possibility = evaluatePossibility(bag, game);

  assertEquals(possibility, true);
});

Deno.test("check games", () => {
  const games = `
  Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
  Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
  Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
  Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

  const bag = { red: 12, blue: 14, green: 13 };

  assertEquals(checkGames(games, bag), 8);
});

Deno.test("minimum dice set for a game", () => {
  const game = {
    game: "Game 1",
    id: 1,
    sessions: [{ red: 5, blue: 9, green: 4 }, { red: 10, blue: 4, green: 7 }],
  };

  const result = { red: 10, blue: 9, green: 7 };

  assertEquals(minimalDiceCountForGame(game), result);
});

Deno.test("power of a game", () => {
  const gameString = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green";
  const game = summarizeGame(gameString);

  assertEquals(powerOfGame(game), 48);
});

Deno.test("power of a games", () => {
  const games = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
  Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
  Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
  Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

  assertEquals(powerOfGames(games), 2286);
});
