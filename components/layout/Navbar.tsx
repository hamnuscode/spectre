'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { nav } from '@/data/site';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { NavIcon } from './NavIcon';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Collapse-on-scroll: passive listener, threshold-based (no per-px work).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close overlay on route change + lock scroll while open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out',
          scrolled ? 'py-2' : 'py-4'
        )}
      >
        <div className="container-x">
          <div
            className={cn(
              'group/logo glass relative mx-auto flex items-center justify-between rounded-2xl shadow-[0_10px_30px_-18px_rgba(7,48,109,0.5)] transition-all duration-500 ease-out',
              scrolled ? 'max-w-3xl px-4 py-2' : 'max-w-none px-4 py-3'
            )}
          >
            {/* Left column (flex-1) balances the right column so the nav sits
                in the true centre — horizontally and vertically. */}
            <div className="flex flex-1 items-center">
              <Logo />
            </div>

            {/* Desktop nav. Each item is a single flex-centred button:
                - collapsed → a fixed 40×40 square holding the icon
                - expanded  → an auto-width pill holding the label
                The active state is the button's OWN background, so it is
                always perfectly aligned to its content (no overlay to drift).
                Vertical centring is pure flexbox via the bar's items-center. */}
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
              {nav.map((item) => {
                const active =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    data-cursor="hover"
                    aria-label={item.label}
                    aria-current={active ? 'page' : undefined}
                    title={scrolled ? item.label : undefined}
                    className={cn(
                      'flex h-10 items-center justify-center rounded-xl text-sm font-medium transition-colors duration-300',
                      scrolled ? 'w-10' : 'px-4',
                      active
                        ? 'bg-[var(--navy-tint)] text-navy'
                        : 'text-[var(--muted)] hover:text-[var(--cyan)]',
                      !active && scrolled && 'hover:bg-[var(--navy-tint)]/60'
                    )}
                  >
                    {scrolled ? (
                      <NavIcon href={item.href} />
                    ) : (
                      <span className="link-underline whitespace-nowrap">{item.label}</span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex flex-1 items-center justify-end gap-2">
              <div className="hidden sm:block">
                <Button href="/contact" variant="primary" className="px-5 py-2.5">
                  Get a Quote
                </Button>
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                data-cursor="hover"
                className="relative z-50 flex h-11 w-11 items-center justify-center rounded-xl prism-border lg:hidden"
              >
                <span className="relative block h-4 w-5">
                  <span
                    className={cn(
                      'absolute left-0 top-0 h-0.5 w-5 bg-navy transition-all duration-300',
                      open && 'top-1.5 rotate-45'
                    )}
                  />
                  <span
                    className={cn(
                      'absolute left-0 top-1.5 h-0.5 w-5 bg-navy transition-all duration-300',
                      open && 'opacity-0'
                    )}
                  />
                  <span
                    className={cn(
                      'absolute left-0 top-3 h-0.5 w-5 bg-navy transition-all duration-300',
                      open && 'top-1.5 -rotate-45'
                    )}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-white/95 backdrop-blur-xl"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
            />
            <motion.nav
              className="container-x relative flex h-full flex-col justify-center gap-2"
              aria-label="Mobile"
              initial="hidden"
              animate="show"
              variants={{
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
              }}
            >
              {nav.map((item) => (
                <motion.div
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, x: -24 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href={item.href}
                    className="block py-3 font-display text-[clamp(2rem,9vw,3.2rem)] font-black text-navy"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                className="mt-6"
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <Button href="/contact" className="w-full justify-center">
                  Get a Quote
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
