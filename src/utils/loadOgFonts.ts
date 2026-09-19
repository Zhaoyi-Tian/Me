import { readFile } from "node:fs/promises";
import type { Font } from "satori";

let fonts: Promise<Font[]> | undefined;

// 分享图需要静态字重；这两份字体由同目录的 Satoshi-Variable.ttf 导出。
export function loadOgFonts(): Promise<Font[]> {
  return (fonts ??= Promise.all([
    readFile("public/fonts/Satoshi-Regular.ttf"),
    readFile("public/fonts/Satoshi-Bold.ttf"),
  ]).then(([regular, bold]) => [
    { name: "Satoshi", data: regular, weight: 400, style: "normal" },
    { name: "Satoshi", data: bold, weight: 700, style: "normal" },
  ]));
}
