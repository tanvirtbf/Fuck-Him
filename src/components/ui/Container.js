import { cn } from "@/lib/cn";

// Centered content column: max 1200px, 16px side gutter on phones.
export default function Container({ as: Tag = "div", className, children, ...props }) {
  return (
    <Tag className={cn("mx-auto w-full max-w-site px-4 sm:px-6 lg:px-8", className)} {...props}>
      {children}
    </Tag>
  );
}
