import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

const variants = {
  primary: "bg-ink text-white hover:bg-black disabled:bg-ink/40",
  red: "bg-red text-white hover:bg-[#c50510] disabled:bg-red/40",
  ghost: "bg-transparent text-ink border border-ink/15 hover:border-ink hover:bg-white",
  white: "bg-white text-ink hover:bg-paper-2",
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
  const classes = `inline-flex min-h-11 items-center justify-center gap-2 px-5 text-[13px] font-medium tracking-[0.04em] uppercase transition-colors ${variants[variant]} ${className}`;

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
