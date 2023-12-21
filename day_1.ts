const DIGIT_MAP: Record<string, number> = {
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9,
};

// deno-fmt-ignore
const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9, "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

const findDigit = (line: string, tail = false) => {
  const indexes = DIGITS
    .map((d) => {
      const matchingIndexesForDigit = Array.from(line
        .matchAll(new RegExp(d.toString(), "g")))
        .map((a) => a.index).filter((i) => i !== undefined);
      return Math[tail ? "max" : "min"](...matchingIndexesForDigit as number[]);
    });

  const onlyMatchingIndexes = indexes.filter((i) => i !== -Infinity);

  const lowestOrHighestIndex = Math[tail ? "max" : "min"](
    ...onlyMatchingIndexes,
  );

  const digitIndex = indexes.findIndex((val) => val === lowestOrHighestIndex);

  if (digitIndex < 9) return DIGITS[digitIndex];

  return DIGIT_MAP[DIGITS[digitIndex]];
};

export const findDigitsInLine = (line: string) => {
  if (line === "") return 0;
  const first = findDigit(line);
  const last = findDigit(line, true);

  return parseInt([first, last].join(""));
};

export const summarizeFirstAndLastDigitsOfEachLine = (text: string) => {
  return text.split("\n").map(
    findDigitsInLine,
  ).reduce(
    (sum, curr) => sum += curr,
    0,
  );
};

export const run = async () => {
  const text = await Deno.readTextFile("data/day_1.txt");

  console.log("Day 1:");
  console.log(
    "  Sum of first and last digits, alltogether summarized: ",
    summarizeFirstAndLastDigitsOfEachLine(text),
  );
};
