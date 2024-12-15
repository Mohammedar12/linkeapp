import * as React from "react";

import { cn } from "@/lib/utils";

const cnInput = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <div className="w-full">
      <label htmlFor="input">
        <input
          id="input"
          type={type}
          className={cn(
            `peer flex h-9  rounded-sm outline-none  bg-transparent border-input  px-3 py-1
         text-sm  transition-colors  
          disabled:cursor-not-allowed 
         disabled:opacity-50 text-secondary-foreground    `,
            className
          )}
          ref={ref}
          {...props}
        />
      </label>
    </div>
  );
});
cnInput.displayName = "Input";

export { cnInput };
