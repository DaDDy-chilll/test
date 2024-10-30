import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * This component is used to render a checkbox with various styles and states.
 * @author PSK
 * @param className - Additional class names for styling
 * @param onChange - Callback function when the checkbox state changes
 * @param props - Additional props for the Checkbox component
 * @returns A styled Checkbox component
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    onChange?: (checked: boolean) => void;
  }
>(({ className, onChange, ...props }, ref) => (
  <CheckboxPrimitive.Root
    aria-label={props.name}
    title={props.name}
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primaryColor ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primaryColor data-[state=checked]:text-primary-foreground",
      className,
    )}
    onCheckedChange={(checked) => onChange && onChange(checked === true)}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
