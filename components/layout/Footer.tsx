import Link from 'next/link';
import { nav, site } from '@/data/site';
import { services } from '@/data/services';
import { Logo } from '@/components/ui/Logo';

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-ink text-white/80">
      {/* Angular top edge */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[5vw] bg-bg"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 100%)' }}
      />
      {/* Brand accent line */}
      <div aria-hidden className="h-1 w-full bg-cyan" />

      <div className="container-x grid gap-12 py-16 pt-20 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="[&_*]:!text-white">
            <Logo />
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
            {site.description}
          </p>
          <p className="mt-5 text-sm text-white/70">{site.responsePromise}</p>
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
                className="text-xs uppercase tracking-widest text-white/55 transition-colors hover:text-[var(--green)]"
              >
                {s.label.split(' ')[0]}
              </a>
            ))}
          </div>
        </FooterCol>
      </div>

      <div className="container-x flex flex-col items-start justify-between gap-3 border-t border-white/10 py-6 text-xs text-white/45 sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <p className="wordmark text-[0.65rem] text-white/40">
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
        className="text-sm text-white/60 transition-colors duration-300 hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}
