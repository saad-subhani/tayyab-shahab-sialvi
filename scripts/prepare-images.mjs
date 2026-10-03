/**
 * Image preparation utility (uses the `sharp` build that ships with Next.js).
 *
 *   node scripts/prepare-images.mjs portrait <input.png> [outName]
 *   node scripts/prepare-images.mjs logo     <input.png|webp> <outName>
 *
 * portrait → cut-out trimmed to the subject, upscaled to 1400px wide, padded
 *           with transparent headroom so the hair never touches the frame, and
 *           written to public/images/<outName ?? tayyab-hero>.webp
 * logo     → margins trimmed (works for alpha cut-outs and white-background
 *           files), never upscaled, written to
 *           public/images/logos/<outName>.webp
 *
 * The printed pixel size is what belongs in the `logo` object in
 * src/content/site.ts, so each plate keeps the mark's true ratio.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const IMAGES = path.join(process.cwd(), "public", "images");
const LOGOS = path.join(IMAGES, "logos");

/** Lossless alpha keeps cut-out edges clean; only colour data is quantised. */
const toWebp = (quality) => ({ webp: { quality, alphaQuality: 100, effort: 6 } });

async function run() {
  const [mode, input, outName] = process.argv.slice(2);

  if (!["portrait", "logo"].includes(mode) || !input) {
    console.error("usage: node scripts/prepare-images.mjs <portrait|logo> <input> [outName]");
    process.exit(1);
  }

  let buffer;

  if (mode === "portrait") {
    const subject = await sharp(input)
      .trim({ threshold: 10 })
      .resize({ width: 1400, kernel: "lanczos3" })
      .sharpen({ sigma: 0.5 })
      .toBuffer();

    const { width, height } = await sharp(subject).metadata();
    const headroom = Math.round(height * 0.11);

    buffer = await sharp({
      create: {
        width,
        height: height + headroom,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite([{ input: subject, left: 0, top: headroom }])
      .webp(toWebp(84))
      .toBuffer();
  } else {
    buffer = await sharp(input)
      .trim({ threshold: 10 })
      .resize({ width: 900, kernel: "lanczos3", withoutEnlargement: true })
      .webp(toWebp(88))
      .toBuffer();
  }

  const meta = await sharp(buffer).metadata();
  const file =
    mode === "portrait"
      ? path.join(IMAGES, `${outName ?? "tayyab-hero"}.webp`)
      : path.join(LOGOS, `${outName ?? path.parse(input).name}.webp`);

  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, buffer);

  console.log(
    `${path.relative(process.cwd(), file)} → ${meta.width}×${meta.height}px, ` +
      `${Math.round(buffer.length / 1024)} KB, alpha: ${meta.hasAlpha}`,
  );
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});