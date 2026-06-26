import Link from 'next/link';
import { nav, site } from '@/data/site';
import { services } from '@/data/services';
import { Logo } from '@/components/ui/Logo';

export function Footer() {
  return (
    <footer className="relative mt-16 bg-ink text-white">
      {/* Wavy top edge — a tiling white wave that gently flows sideways */}
      <div aria-hidden className="relative -mb-px">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="block h-[5vw] min-h-[40px] w-full"
        >
          {/* Path is 2 tiles wide (0–2880); the visible window is 1 tile
              (0–1440), so translating by one tile loops seamlessly. */}
          <path
            d="M 0 40 C 240 18 480 62 720 40 C 960 18 1200 62 1440 40 C 1680 18 1920 62 2160 40 C 2400 18 2640 62 2880 40 L 2880 0 L 0 0 Z"
            fill="var(--bg)"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              from="0 0"
              to="-1440 0"
              dur="18s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>
      <div className="container-x grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="[&_*]:!text-white">
            <Logo />
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/80">
            {site.description}
          </p>
          <p className="mt-5 text-sm font-medium text-white">{site.responsePromise}</p>
        </div>

        <FooterCol title="Company">
          {nav.map((n) => (
            <FooterLink key={n.href} href={n.href}>
              {n.label}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Services">
          {services.map((s) => (
            <FooterLink key={s.slug} href={`/services#${s.slug}`}>
              {s.name}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Contact">
          <FooterLink href={`mailto:${site.email}`}>{site.email}</FooterLink>
          {site.phones.map((p) => (
            <FooterLink key={p} href={`tel:${p.replace(/[^+\d]/g, '')}`}>
              {p}
            </FooterLink>
          ))}
          <div className="mt-4 flex gap-4">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="link-underline text-xs uppercase tracking-widest text-white/85 transition-colors hover:text-[var(--green)]"
              >
                {s.label.split(' ')[0]}
              </a>
            ))}
          </div>
        </FooterCol>
      </div>

      <div className="container-x flex flex-col items-start justify-between gap-3 border-t border-white/15 py-5 text-xs text-white/70 sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <p className="wordmark text-[0.65rem] text-white/60">
          Driving Real Growth
        </p>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-4 text-xs uppercase tracking-[0.22em] text-[var(--cyan)]">
        {title}
      </h3>
      <ul className="flex flex-col gap-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        data-cursor="hover"
        className="link-underline inline-block text-sm text-white/80 transition-colors duration-300 hover:text-[var(--green)]"
      >
        {children}
      </Link>
    </li>
  );
}
