import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default:
          'border-violet-500/35 bg-violet-500/15 text-violet-700 dark:text-violet-200 hover:bg-violet-500/25',
        secondary:
          'border-fuchsia-500/35 bg-fuchsia-500/15 text-fuchsia-700 dark:text-fuchsia-200 hover:bg-fuchsia-500/25',
        cyan:
          'border-cyan-600/35 bg-cyan-500/15 text-cyan-800 dark:text-cyan-200 hover:bg-cyan-500/25',
        emerald:
          'border-emerald-600/35 bg-emerald-500/15 text-emerald-800 dark:text-emerald-200',
        outline:
          'border-slate-300 dark:border-white/15 bg-white/60 dark:bg-white/5 text-foreground/85 hover:border-violet-400/50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
