import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <div className="w-full">
      <label htmlFor="email">
        <input
          id="email"
          type={type}
          className={cn(
            `peer flex h-9  rounded-sm outline-none  bg-transparent border-input  px-3 py-1
         text-sm  transition-colors  
          disabled:cursor-not-allowed 
         disabled:opacity-50 text-black  dark:text-white `,
            className
          )}
          ref={ref}
          {...props}
        />
      </label>
    </div>
  );
});
Input.displayName = "Input";

export { Input };
