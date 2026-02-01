import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs font-mono uppercase transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:ring-offset-2 focus:ring-offset-yarn-base",
  {
    variants: {
      variant: {
        default:
          "border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800",
        secondary:
          "border-zinc-800/50 bg-yarn-surface text-zinc-400 hover:bg-zinc-800/50",
        destructive:
          "border-red-900/50 bg-red-950/50 text-red-400 hover:bg-red-950",
        outline: 
          "border-zinc-700 text-zinc-400 hover:text-zinc-300",
        success:
          "border-green-900/50 bg-green-950/50 text-green-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
