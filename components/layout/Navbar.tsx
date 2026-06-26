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
              'group/logo glass mx-auto flex items-center justify-between rounded-2xl shadow-[0_10px_30px_-18px_rgba(7,48,109,0.5)] transition-all duration-500 ease-out',
              scrolled ? 'max-w-3xl px-4 py-2' : 'max-w-none px-4 py-3'
            )}
          >
            <Logo />

            {/* Desktop nav */}
            <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex" aria-label="Primary">
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
                    title={scrolled ? item.label : undefined}
                    className={cn(
                      'group/nav relative grid place-items-center rounded-xl transition-[color,width,padding] duration-300',
                      scrolled ? 'h-10 w-10' : 'px-3.5 py-2',
                      active
                        ? 'text-navy'
                        : 'text-[var(--muted)] hover:text-[var(--cyan)]'
                    )}
                  >
                    {/* Collapsed: icon. Expanded: label. Cross-fade. */}
                    <span
                      className={cn(
                        'transition-all duration-300',
                        scrolled
                          ? 'scale-100 opacity-100'
                          : 'pointer-events-none absolute scale-75 opacity-0'
                      )}
                    >
                      <NavIcon href={item.href} />
                    </span>
                    <span
                      className={cn(
                        'link-underline whitespace-nowrap text-sm transition-all duration-300',
                        scrolled
                          ? 'pointer-events-none absolute scale-90 opacity-0'
                          : 'scale-100 opacity-100'
                      )}
                    >
                      {item.label}
                    </span>
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-xl bg-[var(--navy-tint)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
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
