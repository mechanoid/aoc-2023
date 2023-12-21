import { trim } from "./util/string_helper.ts";

type Color = "red" | "blue" | "green";
type DiceCollection = Partial<Record<Color, number>>;
type GameSummary = {
  game: string;
  id: number;
  sessions: DiceCollection[];
};

export const parseSession = (sessionString: string) => {
  return sessionString.split(",").map(trim).reduce<DiceCollection>(
    (res, curr: string) => {
      const [count, color] = curr.split(" ");
      res[color as Color] ||= 0;
      (res[color as Color] as number) += parseInt(count);
      return res;
    },
    {},
  );
};

export const summarizeGame = (line: string): GameSummary => {
  const [game, sessionString] = line.split(":");
  const [, id] = game.split(" ");

  const sessions = sessionString.split(";").map(parseSession);

  return {
    game,
    id: parseInt(id),
    sessions,
  };
};

export const checkSession = (
  session: DiceCollection,
  color: Color,
  count: number,
) =>
  Object.prototype.hasOwnProperty.call(session, color)
    ? (session[color] as number) <= count
    : true;

export const evaluatePossibility = (bag: DiceCollection, game: GameSummary) => {
  for (const [color, count] of Object.entries(bag)) {
    const possible = game.sessions.every((session) =>
      checkSession(session, color as Color, count)
    );

    if (!possible) return false;
  }
  return true;
};

export const checkGames = (games: string, bag: DiceCollection) =>
  games.split("\n")
    .map(trim)
    .map((gameString) => {
      if (gameString === "") return 0;

      const game = summarizeGame(gameString);
      const possible = evaluatePossibility(bag, game);

      return possible ? game.id : 0;
    })
    .reduce((res, curr) => res += curr, 0);

export const minimalDiceCountForGame = (game: GameSummary): DiceCollection =>
  game.sessions.reduce<DiceCollection>((res, session: DiceCollection) => {
    Object.entries(session).forEach(([color, count]) => {
      res[color as Color] ||= 0;
      res[color as Color] = count > (res[color as Color] as number)
        ? count
        : res[color as Color];
    });
    return res;
  }, {});

export const powerOfGame = (game: GameSummary) =>
  Object.values(minimalDiceCountForGame(game))
    .reduce<number>((res, dice) => dice * res, 1);

export const powerOfGames = (games: string) =>
  games.split("\n")
    .map(trim)
    .map((gameString) => {
      if (gameString === "") return 0;

      const game = summarizeGame(gameString);
      return powerOfGame(game);
    })
    .reduce<number>((res, power) => power + res, 0);

export const run = async () => {
  const bag = { red: 12, blue: 14, green: 13 };

  const text = await Deno.readTextFile("data/day_2.txt");

  console.log("Day 2:");
  console.log(
    "  Possible Games ID Summary: ",
    checkGames(text, bag),
  );
  console.log(
    "  Power of Games: ",
    powerOfGames(text),
  );
};
