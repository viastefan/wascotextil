import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

const variants = {
  primary: "bg-ink text-white hover:bg-black disabled:bg-ink/40 shadow-[0_10px_30px_rgba(11,11,11,0.12)]",
  red: "bg-red text-white hover:bg-[#c50510] disabled:bg-red/40",
  ghost: "bg-transparent text-ink border border-ink/12 hover:border-ink/40 hover:bg-white/70",
  white: "bg-white/80 text-ink hover:bg-white backdrop-blur-sm",
} as const;

type Variant = keyof typeof variants;

type Shared = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}: Shared &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: string;
  } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const classes = `pressable inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[13px] font-medium tracking-[0.06em] uppercase ${variants[variant]} ${className}`;

  if (href) {
    const { type, ...anchorProps } = props as ButtonHTMLAttributes<HTMLButtonElement> &
      AnchorHTMLAttributes<HTMLAnchorElement>;
    void type;
    const external = href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http");
    if (external) {
      return (
        <a href={href} className={classes} {...anchorProps}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
