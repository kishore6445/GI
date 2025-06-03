import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "GI Software"
export const size = {
  width: 1200,
  height: 630,
}

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#f8fcfc",
        fontSize: 64,
        fontWeight: 600,
        color: "#01af7d",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 200,
          height: 200,
          backgroundColor: "#01af7d",
          borderRadius: 20,
          color: "white",
          fontSize: 128,
          marginBottom: 40,
        }}
      >
        GI
      </div>
      GI Software
    </div>,
    {
      ...size,
    },
  )
}
