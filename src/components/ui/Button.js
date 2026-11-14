import { cn } from "@/lib/cn";

const base =
  "inline-flex items-center justify-center gap-2 font-sans text-label font-semibold uppercase tracking-label transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60";

const variants = {
  // Solid purple — main call to action
  primary: "min-h-12 px-7 bg-accent text-accent-fg hover:bg-indigo",
  // Pink outlined pill — like the demo navbar button (text uses the AA-safe pink)
  outline:
    "min-h-11 rounded-full border-2 border-pink px-6 text-pink-text hover:bg-pink hover:text-ink",
  // Navy outlined pill — same shape as `outline`, for bright (cyan / mint) backgrounds
  "outline-navy":
    "min-h-11 rounded-full border-2 border-navy px-6 text-navy hover:bg-navy hover:text-white",
  // White button for coloured blocks (purple / indigo / navy)
  inverse: "min-h-12 px-7 bg-white text-ink hover:bg-mint",
  // Small underlined text link ("MY PROFILE")
  link: "min-h-11 px-0 text-fg underline decoration-2 underline-offset-8 hover:text-accent-text",
};

/**
 * <Button href="#contact">          → renders <a>
 * <Button href="https://…" external> → new tab + rel="noopener noreferrer"
 * <Button type="submit">             → renders <button>
 */
export default function Button({
  href,
  external = false,
  variant = "primary",
  className,
  children,
  ...props
}) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
    return (
      <a href={href} className={classes} {...externalProps} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
