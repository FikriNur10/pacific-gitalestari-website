import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import type { RefObject } from 'react';

/**
 * Landing/marketing micro-interactions, ported from the prototype's script.js.
 *
 * Runs imperatively against the rendered DOM inside `rootRef` (scroll-reveal,
 * count-up, hero parallax, marquee pause-on-hover, solution-card cursor spotlight,
 * category filter, contact form). Kept imperative rather than re-modelled as React
 * state because these are decorative/self-contained effects on largely static
 * content — driving them through state would churn renders for no benefit. Every
 * listener/observer is torn down on unmount. Sticky-header state lives in the header.
 *
 * Re-runs on every Inertia navigation (keyed on `usePage().url`) so newly swapped-in
 * page content gets re-scanned — the shared LandingLayout mounts this once but the
 * children change per page.
 *
 * Progressive enhancement: content is authored visible and with final values, so
 * with JS disabled or `prefers-reduced-motion` the page stays correct — we only
 * animate when motion is allowed.
 */
export function useLandingEffects(
    rootRef: RefObject<HTMLElement | null>,
): void {
    const { url } = usePage();

    useEffect(() => {
        const root = rootRef.current;

        if (!root) {
            return;
        }

        const cleanups: Array<() => void> = [];
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;

        // Scroll-reveal — prime off-screen `.reveal` nodes (hide), release on scroll-in.
        const reveals = Array.from(
            root.querySelectorAll<HTMLElement>('.reveal'),
        );

        if (
            !prefersReducedMotion &&
            'IntersectionObserver' in window &&
            reveals.length
        ) {
            reveals.forEach((el) => {
                const siblings = el.parentElement
                    ? Array.from(el.parentElement.children).filter((c) =>
                          c.classList.contains('reveal'),
                      )
                    : [el];
                el.style.setProperty(
                    '--reveal-i',
                    String(Math.min(siblings.indexOf(el), 6)),
                );
            });
            const revealObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.remove('is-primed');
                            revealObserver.unobserve(entry.target);
                        } else {
                            entry.target.classList.add('is-primed');
                        }
                    });
                },
                { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
            );
            reveals.forEach((el) => revealObserver.observe(el));
            cleanups.push(() => revealObserver.disconnect());
        }

        // Count-up — animate [data-count-to] from 0 to target when scrolled into view.
        const counters = Array.from(
            root.querySelectorAll<HTMLElement>('[data-count-to]'),
        );

        if (
            !prefersReducedMotion &&
            'IntersectionObserver' in window &&
            counters.length
        ) {
            const runCount = (el: HTMLElement): void => {
                const to = Number.parseFloat(el.dataset.countTo ?? '0');
                const suffix = el.dataset.countSuffix ?? '';
                const duration = 1100;
                let startTs: number | null = null;
                const step = (ts: number): void => {
                    if (startTs === null) {
                        startTs = ts;
                    }

                    const t = Math.min(1, (ts - startTs) / duration);
                    const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
                    el.textContent =
                        t < 1 ? String(Math.round(to * eased)) : to + suffix;

                    if (t < 1) {
                        requestAnimationFrame(step);
                    }
                };
                requestAnimationFrame(step);
            };
            const countObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            runCount(entry.target as HTMLElement);
                            countObserver.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.6 },
            );
            counters.forEach((el) => countObserver.observe(el));
            cleanups.push(() => countObserver.disconnect());
        }

        // Hero parallax — nudge [data-parallax] on scroll (transform only, rAF-throttled).
        const parallaxEls = Array.from(
            root.querySelectorAll<HTMLElement>('[data-parallax]'),
        );

        if (!prefersReducedMotion && parallaxEls.length) {
            let ticking = false;
            const applyParallax = (): void => {
                const y = window.scrollY;
                parallaxEls.forEach((el) => {
                    const speed =
                        Number.parseFloat(el.dataset.parallax ?? '0') || 0;
                    el.style.transform = `translate3d(0, ${(y * speed).toFixed(1)}px, 0)`;
                });
                ticking = false;
            };
            const onScroll = (): void => {
                if (!ticking) {
                    ticking = true;
                    requestAnimationFrame(applyParallax);
                }
            };
            window.addEventListener('scroll', onScroll, { passive: true });
            applyParallax();
            cleanups.push(() => window.removeEventListener('scroll', onScroll));
        }

        // Marquee pause — JS path for pause-on-hover/focus (CSS :hover is unreliable over
        // the continuously animating strip).
        root.querySelectorAll<HTMLElement>('[data-marquee]').forEach((mq) => {
            const pause = (): void => mq.classList.add('is-paused');
            const play = (): void => mq.classList.remove('is-paused');
            mq.addEventListener('pointerenter', pause);
            mq.addEventListener('pointerleave', play);
            mq.addEventListener('focusin', pause);
            mq.addEventListener('focusout', play);
            cleanups.push(() => {
                mq.removeEventListener('pointerenter', pause);
                mq.removeEventListener('pointerleave', play);
                mq.removeEventListener('focusin', pause);
                mq.removeEventListener('focusout', play);
            });
        });

        // Cursor-spotlight — track the pointer inside each solution card via CSS vars.
        root.querySelectorAll<HTMLElement>('.solution-card').forEach((card) => {
            const onMove = (event: PointerEvent): void => {
                const r = card.getBoundingClientRect();
                card.style.setProperty('--mx', `${event.clientX - r.left}px`);
                card.style.setProperty('--my', `${event.clientY - r.top}px`);
            };
            card.addEventListener('pointermove', onMove);
            cleanups.push(() =>
                card.removeEventListener('pointermove', onMove),
            );
        });

        // Category filter (Download + Berita) — [data-filter-group] holds [data-filter]
        // chips; [data-filter-target] selects the container whose [data-category] items
        // are toggled. No-op on pages without a group.
        root.querySelectorAll<HTMLElement>('[data-filter-group]').forEach(
            (group) => {
                const chips = Array.from(
                    group.querySelectorAll<HTMLElement>('[data-filter]'),
                );
                const scope: ParentNode = group.dataset.filterTarget
                    ? (root.querySelector(group.dataset.filterTarget) ?? root)
                    : root;
                const items = Array.from(
                    scope.querySelectorAll<HTMLElement>('[data-category]'),
                );
                const onClick = (event: Event): void => {
                    const target = event.target as HTMLElement;
                    const chip = target.closest<HTMLElement>('[data-filter]');

                    if (!chip) {
                        return;
                    }

                    const value = chip.dataset.filter;
                    chips.forEach((c) => {
                        const active = c === chip;
                        c.classList.toggle('is-active', active);
                        c.setAttribute('aria-pressed', String(active));
                    });
                    items.forEach((item) => {
                        const show =
                            value === 'all' || item.dataset.category === value;
                        item.style.display = show ? '' : 'none';
                    });
                };
                group.addEventListener('click', onClick);
                cleanups.push(() =>
                    group.removeEventListener('click', onClick),
                );
            },
        );

        // Contact form (Kontak) — prototype stub: acknowledge without a backend.
        root.querySelectorAll<HTMLFormElement>('[data-form]').forEach(
            (form) => {
                const message = form.querySelector<HTMLElement>(
                    '[data-form-message]',
                );
                const onSubmit = (event: Event): void => {
                    event.preventDefault();
                    const company = String(
                        new FormData(form).get('company') ?? '',
                    );

                    if (message) {
                        message.textContent = `Terima kasih, ${company}. Tim PGL akan menindaklanjuti permintaan Anda untuk konsultasi teknis.`;
                    }

                    form.reset();
                };
                form.addEventListener('submit', onSubmit);
                cleanups.push(() =>
                    form.removeEventListener('submit', onSubmit),
                );
            },
        );

        return () => cleanups.forEach((fn) => fn());
    }, [rootRef, url]);
}
