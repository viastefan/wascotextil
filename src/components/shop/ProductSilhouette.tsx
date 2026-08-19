import type { Silhouette } from "@/lib/catalog";

export function ProductSilhouette({
  type,
  color,
  className = "",
}: {
  type: Silhouette;
  color: string;
  className?: string;
}) {
  const stroke = color.toLowerCase() === "#f4f1ec" || color.toLowerCase() === "#d7c7a8" ? "#C9C2B6" : "rgba(0,0,0,0.18)";

  return (
    <svg
      viewBox="0 0 200 240"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {type === "tee" ? (
        <path
          d="M44 54 20 78l18 22 18-14v118h88V86l18 14 18-22-24-24-18 10c-6-22-22-36-40-36s-34 14-40 36z"
          fill={color}
          stroke={stroke}
          strokeWidth="1.5"
        />
      ) : null}
      {type === "hoodie" ? (
        <>
          <path
            d="M70 38c0-18 12-30 30-30s30 12 30 30v18H70z"
            fill={color}
            stroke={stroke}
            strokeWidth="1.5"
          />
          <path
            d="M40 66 18 90l20 22 20-16v108h84V96l20 16 20-22-22-24-16 8c-6-18-22-30-44-30s-38 12-44 30z"
            fill={color}
            stroke={stroke}
            strokeWidth="1.5"
          />
          <path d="M86 56h28v70H86z" fill="none" stroke={stroke} strokeWidth="1.2" />
        </>
      ) : null}
      {type === "polo" ? (
        <>
          <path
            d="M44 58 22 80l16 20 20-12v116h84V88l20 12 16-20-22-22-16 8c-6-20-20-32-38-32s-32 12-38 32z"
            fill={color}
            stroke={stroke}
            strokeWidth="1.5"
          />
          <path d="M82 54 100 78l18-24" fill="none" stroke={stroke} strokeWidth="1.4" />
        </>
      ) : null}
      {type === "sweater" ? (
        <path
          d="M42 62 18 86l20 22 20-14v110h84V94l20 14 20-22-24-24-16 8c-6-22-22-36-42-36s-36 14-42 36z"
          fill={color}
          stroke={stroke}
          strokeWidth="1.5"
        />
      ) : null}
      {type === "bag" ? (
        <>
          <path d="M70 38c0 18 8 34 30 34s30-16 30-34" fill="none" stroke={stroke} strokeWidth="3" />
          <path
            d="M48 70h104l-10 132H58z"
            fill={color}
            stroke={stroke}
            strokeWidth="1.5"
          />
        </>
      ) : null}
      {type === "cap" ? (
        <>
          <path
            d="M40 128c8-40 28-62 60-62s52 22 60 62H40z"
            fill={color}
            stroke={stroke}
            strokeWidth="1.5"
          />
          <path d="M28 128h144c-8 16-36 24-72 24s-64-8-72-24z" fill={color} stroke={stroke} strokeWidth="1.5" />
        </>
      ) : null}
    </svg>
  );
}
