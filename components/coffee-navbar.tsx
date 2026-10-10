"use client";

import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavbarButton,
  NavbarLogo,
  NavBody,
  NavItems,
} from "@/components/ui/resizable-navbar";
import { useEffect, useState, type MouseEvent } from "react";

const navItems = [
  { name: "The menu", link: "#menu" },
  { name: "Our story", link: "#story" },
  { name: "Visit us", link: "#visit" },
];

const handleSmoothNavigation = (
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
) => {
  if (!href.startsWith("#")) return;

  const target = document.getElementById(href.slice(1));
  if (!target) return;

  event.preventDefault();
  event.stopPropagation();
  event.currentTarget.blur();
  const navbar = document.querySelector<HTMLElement>("[data-resizable-navbar]");
  const offset = (navbar?.getBoundingClientRect().height ?? 80) + 28;
  const targetTop = Math.max(
    0,
    target.getBoundingClientRect().top + window.scrollY - offset,
  );

  window.history.replaceState(null, "", href);
  window.requestAnimationFrame(() => {
    window.scrollTo({ top: targetTop, behavior: "smooth" });
  });
};

export default function CoffeeNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const mobileMenuId = "coffee-mobile-nav-menu";

  useEffect(() => {
    const updateActiveSection = () => {
      const navbar = document.querySelector<HTMLElement>("[data-resizable-navbar]");
      const activationLine = (navbar?.getBoundingClientRect().bottom ?? 80) + 48;
      let nextActiveSection: string | null = null;

      for (const item of navItems) {
        const section = document.getElementById(item.link.slice(1));
        if (section && section.getBoundingClientRect().top <= activationLine) {
          nextActiveSection = item.link;
        }
      }

      setActiveSection(nextActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <Navbar>
      <NavBody className="border border-[var(--line)] bg-transparent shadow-none">
        <NavbarLogo />
        <NavItems
          items={navItems}
          activeHref={activeSection}
          onItemClick={handleSmoothNavigation}
        />
        <div className="relative z-20 flex items-center gap-2">
          <NavbarButton
            href="#visit"
            variant="secondary"
            className="hidden xl:inline-flex"
            onClick={(event: MouseEvent<HTMLAnchorElement>) => handleSmoothNavigation(event, "#visit")}
          >
            Visit us
          </NavbarButton>
          <NavbarButton
            href="#menu"
            variant="primary"
            onClick={(event: MouseEvent<HTMLAnchorElement>) => handleSmoothNavigation(event, "#menu")}
          >
            Order ahead <span aria-hidden="true" className="text-base leading-none">↗</span>
          </NavbarButton>
        </div>
      </NavBody>

      <MobileNav className="border border-[var(--line)] bg-transparent shadow-none">
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            controls={mobileMenuId}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          id={mobileMenuId}
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--coral)]">
            Take your time
          </p>
          {navItems.map((item) => (
            <a
              key={item.link}
              href={item.link}
              onClick={(event: MouseEvent<HTMLAnchorElement>) => {
                handleSmoothNavigation(event, item.link);
                setIsMobileMenuOpen(false);
              }}
              aria-current={activeSection === item.link ? "page" : undefined}
              className={`flex w-full items-center justify-between border-b border-[var(--line)] py-3 font-[var(--font-syne)] text-xl text-[var(--espresso)] last:border-0 ${activeSection === item.link ? "rounded-2xl border-transparent bg-[var(--peach)]/60 px-3" : ""}`}
            >
              <span>{item.name}</span>
              <span aria-hidden="true" className="text-[var(--coral)]">↗</span>
            </a>
          ))}
          <div className="mt-3 flex w-full flex-col gap-2">
            <NavbarButton
              href="#menu"
              variant="primary"
              className="w-full"
              onClick={(event: MouseEvent<HTMLAnchorElement>) => {
                handleSmoothNavigation(event, "#menu");
                setIsMobileMenuOpen(false);
              }}
            >
              Order ahead
            </NavbarButton>
            <p className="pt-2 text-center text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">
              Open daily · 7am–5pm
            </p>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
