import React, { memo } from "react";
import { Link } from "react-router-dom";
import type { AppButtonProps } from "@/common/components/shared/button/type";
import { SIZES, VARIANTS } from "@/common/utils/constant/config";


const AppButton: React.FC<AppButtonProps> = (props) => {
  const {
    icon,
    iconRight,
    variant = "primary",
    size = "md",
    loading = false,
    className = "",
    children,
    ...rest
  } = props as AppButtonProps & {
    href?: string;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<any>;
  };

  const disabled = rest.disabled ?? false;
  const href = "href" in props ? props.href : undefined;
  const isLink = typeof href === "string";
  const isDisabledLike = disabled || loading;

  const allClassNames = [
    VARIANTS[variant],
    SIZES[size],
    isDisabledLike ? "opacity-60 pointer-events-none" : "",
    loading ? "opacity-80" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <span className="inline-flex items-center gap-2">
      {loading ? <span className="loader" aria-hidden="true" /> : icon}
      {children}
      {iconRight}
    </span>
  );

  // 🔹 LINK / ANCHOR branch
  if (isLink && href) {
    const isExternal =
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:");

    const { onClick, ...anchorRest } = rest;

    const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
      if (isDisabledLike) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      if (onClick) {
        onClick(e);
      }
    };

    if (isExternal) {
      return (
        <a
          href={href}
          className={allClassNames}
          aria-disabled={isDisabledLike}
          onClick={handleClick}
          {...(anchorRest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        to={href}
        className={allClassNames}
        aria-disabled={isDisabledLike}
        onClick={handleClick}
        {...(anchorRest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </Link>
    );
  }

  // 🔹 BUTTON branch
  const { type = "button", onClick, ...buttonRest } = rest;

  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (isDisabledLike) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={typeof type === 'undefined' ? undefined : type as 'submit' | 'reset' | 'button'}
      className={allClassNames}
      disabled={isDisabledLike}
      onClick={handleButtonClick}
      {...(buttonRest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
};

export default memo(AppButton);
