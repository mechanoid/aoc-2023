import { assertEquals } from "std/assert/mod.ts";
import {
  findDigitsInLine,
  summarizeFirstAndLastDigitsOfEachLine,
} from "./day_1.ts";

const exampleText = `1abc2
  pqr3stu8vwx
  a1b2c3d4e5f
  treb7uchet`;

const results = [
  12,
  38,
  15,
  77,
];

const exampleWithDigitNames = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

const resultsWithDigitNames = [
  29,
  83,
  13,
  24,
  42,
  14,
  76,
];

Deno.test("find digits in line", () => {
  exampleText.split("\n").forEach((line: string, index: number) => {
    assertEquals(findDigitsInLine(line), results[index]);
  });
});

Deno.test("find digits in line with same digits occuring multiple times", () => {
  assertEquals(findDigitsInLine("a33r78fdsfdsf7"), 37);
});

Deno.test("find digits and digit names in line", () => {
  exampleWithDigitNames.split("\n").forEach((line: string, index: number) => {
    assertEquals(findDigitsInLine(line), resultsWithDigitNames[index]);
  });
});

Deno.test("summarize first and last digits in each text line", () => {
  assertEquals(summarizeFirstAndLastDigitsOfEachLine(exampleText), 142);
});

Deno.test("summarize first and last digits in each text line including digit names", () => {
  assertEquals(
    summarizeFirstAndLastDigitsOfEachLine(exampleWithDigitNames),
    281,
  );
});
