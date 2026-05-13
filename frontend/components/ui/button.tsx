import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost" | "danger";
  asChild?: boolean;
};

export function Button({ className, variant = "primary", asChild, children, ...props }: ButtonProps) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
      className: cn(
        buttonClassName(variant),
        className,
        (children as React.ReactElement<{ className?: string }>).props.className
      )
    });
  }

  return (
    <button
      className={cn(buttonClassName(variant), className)}
      {...props}
    >
      {children}
    </button>
  );
}

function buttonClassName(variant: NonNullable<ButtonProps["variant"]>) {
  return cn(
    "inline-flex h-9 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium transition disabled:pointer-events-none disabled:opacity-50",
    variant === "primary" && "bg-primary text-primary-foreground hover:brightness-95",
    variant === "outline" && "border bg-transparent hover:bg-muted",
    variant === "ghost" && "hover:bg-muted",
    variant === "danger" && "bg-destructive text-white hover:brightness-95"
  );
}
