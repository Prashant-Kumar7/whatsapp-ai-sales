import React from "react";
import { cn } from "@/lib/utils"

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  title,
}) => (
  <div className={`bg-white shadow-lg rounded-xl overflow-hidden ${className}`}>
    {title && (
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
    )}
    <div className="p-6">{children}</div>
  </div>
);


const DownloadCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { DownloadCard, CardContent, CardFooter }