import type { SIZES, VARIANTS } from "../../../utils/constant/config";

type Variant = keyof typeof VARIANTS;
type Size = keyof typeof SIZES;

type CommonProps = {
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
};

type ButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined; 
  };

// 🔹 Link / Anchor variant (href VAR)
type LinkProps = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string; 
  };

export type AppButtonProps = ButtonProps | LinkProps;