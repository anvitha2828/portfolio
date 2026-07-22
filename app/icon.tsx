import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const runtime = "nodejs";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const against = await readFile(
    join(process.cwd(), "public", "against regular.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FF7A59",
          fontFamily: "Against",
          fontSize: 28,
          WebkitTextStroke: "1.5px #FF7A59",
        }}
      >
        A
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Against", data: against, weight: 400 }],
    },
  );
}
