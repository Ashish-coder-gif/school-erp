import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-slate-300/50 dark:border-slate-700/50 placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-white/5 flex field-sizing-content min-h-24 w-full rounded-lg border bg-white/50 px-3 py-2 text-base shadow-sm transition-all duration-200 outline-none focus-visible:ring-[3px] focus-visible:bg-white dark:focus-visible:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm hover:border-slate-400 dark:hover:border-slate-600 hover:bg-white/70 dark:hover:bg-white/8",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
