"use client";

import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import React, { useEffect, useId, useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
  scrollThreshold?: number;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: { name: string; link: string }[];
  className?: string;
  onItemClick?: (event: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  activeHref?: string | null;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  id?: string;
}

const glassShadow =
  "0 0 0 1px rgba(53,37,31,0.08), 0 8px 32px rgba(53,37,31,0.08), 0 1px 0 rgba(255,253,248,0.6) inset";
const springTransition = { type: "spring" as const, stiffness: 200, damping: 50 };

export const Navbar = ({
  children,
  className,
  scrollThreshold = 8,
}: NavbarProps) => {
  // Track the document, rather than the sticky header's own position.
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > scrollThreshold);
  });

  return (
    <motion.header
      data-resizable-navbar
      data-scrolled={visible}
      className={cn("sticky inset-x-0 top-0 z-50 h-20 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.header>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      data-nav-body="desktop"
      initial={false}
      animate={{
        backdropFilter: visible ? "blur(20px) saturate(1.1)" : "blur(14px) saturate(1.05)",
        boxShadow: visible ? glassShadow : "0 0 0 0 rgba(53,37,31,0)",
        backgroundColor: visible ? "rgba(214,229,218,0.72)" : "rgba(214,229,218,0.56)",
        width: visible ? "60%" : "100%",
        y: visible ? 12 : 0,
      }}
      transition={reduceMotion ? { duration: 0 } : springTransition}
      style={{
        minWidth: "900px",
        WebkitBackdropFilter: visible ? "blur(20px) saturate(1.1)" : "blur(14px) saturate(1.05)",
      }}
      className={cn(
        "relative mx-auto hidden h-20 w-full max-w-7xl flex-row items-center justify-between gap-6 rounded-full px-6 text-[var(--espresso)] lg:flex",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick, activeHref }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const hoverId = useId();
  const reduceMotion = useReducedMotion();

  return (
    <motion.nav
      aria-label="Main navigation"
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative hidden items-center justify-center gap-1 text-sm font-medium text-[var(--espresso)] lg:flex",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          key={item.link}
          href={item.link}
          onMouseEnter={() => setHovered(idx)}
          onFocus={() => setHovered(idx)}
          onBlur={() => setHovered(null)}
          onClick={(event) => onItemClick?.(event, item.link)}
          aria-current={activeHref === item.link ? "page" : undefined}
          className={cn(
            "relative rounded-full px-4 py-3 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--espresso)]",
            activeHref === item.link && "text-[var(--espresso)]",
          )}
        >
          {activeHref === item.link && hovered !== idx && (
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-[var(--peach)]/70 shadow-[inset_0_0_0_1px_rgba(223,137,111,0.18)]"
            />
          )}
          {hovered === idx && (
            <motion.span
              layoutId={hoverId}
              aria-hidden="true"
              transition={reduceMotion ? { duration: 0 } : { duration: 0.2 }}
              className="absolute inset-0 rounded-full bg-[var(--peach)]/60"
            />
          )}
          <span className="relative z-10">{item.name}</span>
        </a>
      ))}
    </motion.nav>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      data-mobile-nav
      data-nav-body="mobile"
      initial={false}
      animate={{
        backdropFilter: visible ? "blur(20px) saturate(1.1)" : "blur(14px) saturate(1.05)",
        boxShadow: visible ? glassShadow : "0 0 0 0 rgba(53,37,31,0)",
        backgroundColor: visible ? "rgba(214,229,218,0.76)" : "rgba(214,229,218,0.6)",
        width: visible ? "90%" : "100%",
        borderRadius: visible ? "24px" : "0px",
        y: visible ? 12 : 0,
      }}
      transition={reduceMotion ? { duration: 0 } : springTransition}
      style={{
        WebkitBackdropFilter: visible ? "blur(20px) saturate(1.1)" : "blur(14px) saturate(1.05)",
      }}
      className={cn(
        "relative mx-auto flex h-20 w-full max-w-[calc(100%-2rem)] flex-col justify-center px-3 text-[var(--espresso)] lg:hidden",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({ children, className }: MobileNavHeaderProps) => (
  <div className={cn("flex w-full items-center justify-between gap-2", className)}>
    {children}
  </div>
);

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
  id,
}: MobileNavMenuProps) => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      onClose();
      ref.current?.closest("[data-mobile-nav]")
        ?.querySelector<HTMLButtonElement>("button[aria-expanded]")?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      const container = ref.current?.closest("[data-mobile-nav]");
      if (event.target instanceof Node && container && !container.contains(event.target)) {
        onClose();
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => { if (desktop.matches) onClose(); };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          ref={ref}
          id={id}
          aria-label="Mobile navigation"
          initial={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
          transition={{ duration: reduceMotion ? 0 : 0.18 }}
          className={cn(
            "absolute inset-x-0 top-[calc(100%+8px)] z-50 flex max-h-[calc(100dvh-112px)] w-full flex-col gap-2 overflow-y-auto overscroll-contain rounded-3xl border border-[var(--line)] bg-[var(--cream)] p-5 text-[var(--espresso)] shadow-xl",
            className,
          )}
        >
          {children}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
  controls,
}: {
  isOpen: boolean;
  onClick: () => void;
  controls?: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={isOpen ? "Close navigation" : "Open navigation"}
    aria-expanded={isOpen}
    aria-controls={controls}
    className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-[var(--espresso)] transition-colors hover:bg-[var(--peach)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--espresso)]"
  >
    {isOpen ? <IconX size={22} aria-hidden="true" /> : <IconMenu2 size={22} aria-hidden="true" />}
  </button>
);

export const NavbarLogo = () => (
  <a
    href="#top"
    aria-label="Juniper and Bloom home"
    className="relative flex shrink-0 items-center rounded-full py-1 text-[var(--espresso)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--espresso)]"
  >
    <Image
      src="/juniper-bloom-logo-wide.svg"
      alt="Juniper & Bloom"
      width={383}
      height={41}
      priority
      className="rb-brand-logo h-auto w-[210px] sm:w-[260px]"
    />
  </a>
);

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "relative inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-2 text-center text-xs font-bold whitespace-nowrap transition duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--espresso)] motion-reduce:transform-none";
  const variantStyles = {
    primary: "button-coral shadow-sm",
    secondary: "bg-transparent text-[var(--espresso)] hover:bg-[var(--peach)]/50",
    dark: "bg-[var(--espresso)] text-[var(--cream)] shadow-sm hover:bg-[#50382d]",
    gradient: "bg-gradient-to-b from-[var(--peach)] to-[var(--coral)] text-[var(--espresso)] shadow-sm",
  };

  return (
    <Tag
      href={Tag === "button" ? undefined : href}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
