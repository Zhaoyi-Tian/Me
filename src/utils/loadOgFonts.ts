import { readFile } from "node:fs/promises";
import type { Font } from "satori";

let fonts: Promise<Font[]> | undefined;

// 分享图使用静态 TTF；网页使用同字体的可变 WOFF2。
export function loadOgFonts(): Promise<Font[]> {
  return (fonts ??= Promise.all([
    readFile("public/fonts/Satoshi-Regular.ttf"),
    readFile("public/fonts/Satoshi-Bold.ttf"),
  ]).then(([regular, bold]) => [
    { name: "Satoshi", data: regular, weight: 400, style: "normal" },
    { name: "Satoshi", data: bold, weight: 700, style: "normal" },
  ]));
}
