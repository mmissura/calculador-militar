import { Tooltip, TooltipProps } from 'flowbite-react';
type CustomTooltipProps = TooltipProps & {
  children: React.ReactNode;
};

export const CustomTooltip = ({ children, ...rest }: CustomTooltipProps) => {
  return <Tooltip {...rest}>{children}</Tooltip>;
};
