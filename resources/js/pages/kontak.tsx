import { Head, useForm, usePage } from '@inertiajs/react';
import type { FormEvent } from 'react';
import LandingLayout from '@/layouts/landing-layout';
import { useHeroBackground } from '@/lib/hero-background';
import { store as submitKontak } from '@/routes/kontak';

const SERVICE_OPTIONS = [
    'Water Treatment & WWTP',
    'Industrial Chemicals',
    'Power & Diesel Rental',
    'Protection Systems',
];

/**
 * Kontak (Contact) — ported from the prototype's kontak.html.
 * The consultation form is a real Inertia submission into the admin inbox
 * (Fase 1 CMS); `website` is an off-screen honeypot the backend rejects.
 */
export default function Kontak() {
    const heroBg = useHeroBackground('kontak');
    const flashSuccess = usePage<{ flash: { success?: string } }>().props.flash
        .success;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        company: '',
        email: '',
        phone: '',
        service: '',
        message: '',
        website: '', // honeypot — must stay empty
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();
        post(submitKontak().url, {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <LandingLayout title="Kontak | PT. Pacific Gitalestari">
            <Head>
                <meta
                    name="description"
                    content="Hubungi PT. Pacific Gitalestari - kantor pusat Wisma Mitra Sunter Jakarta Utara, telepon, fax, email, dan formulir konsultasi teknis."
                />
            </Head>

            <section className="page-hero">
                {/* Foto full-bleed page-hero. SWAP: ganti dengan foto proyek asli approved. */}
                <img
                    className="hero-bg"
                    src={heroBg}
                    alt="Kompleks pengolahan air tampak atas"
                />
                <div className="hero-scrim" aria-hidden="true" />
                <div className="hero-orbs" aria-hidden="true">
                    <div className="hero-orb hero-orb-1" />
                    <div className="hero-orb hero-orb-2" />
                </div>
                <div className="container">
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <a href="/">Beranda</a>
                        <span aria-hidden="true">/</span>Kontak
                    </nav>
                    <p className="eyebrow">Kontak</p>
                    <h1>Mari bicarakan kebutuhan teknis Anda.</h1>
                    <p>
                        Hubungi kantor pusat PGL di Jakarta Utara, atau kirim
                        kebutuhan awal Anda lewat formulir konsultasi di bawah
                        ini.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="contact-grid container">
                    <div className="contact-info">
                        <p className="eyebrow">Kantor pusat</p>
                        <h2>PT. Pacific Gitalestari</h2>
                        <address>
                            Perkantoran Wisma Mitra Sunter Lt. 15-06
                            <br />
                            Jl. Boulevard Mitra Sunter Blok C2
                            <br />
                            Jakarta Utara 14350
                        </address>
                        <div className="contact-line">
                            <b>Telepon</b>
                            <a href="tel:+62216514815">+62 21 6514815</a>
                            <a href="tel:+622165305141">+62 21 65305141</a>
                        </div>
                        <div className="contact-line">
                            <b>Fax</b>
                            <a href="tel:+62216514814">+62 21 6514814</a>
                        </div>
                        <div className="contact-line">
                            <b>Email</b>
                            <a href="mailto:ptpacificgitalestari@yahoo.com">
                                ptpacificgitalestari@yahoo.com
                            </a>
                        </div>
                    </div>
                    <div
                        className="map-placeholder"
                        role="img"
                        aria-label="Placeholder peta lokasi kantor pusat"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z" />
                            <circle cx="12" cy="9" r="2.5" />
                        </svg>
                        <span>
                            Peta lokasi — Wisma Mitra Sunter, Jakarta Utara
                            <br />
                            (embed peta menyusul di versi produksi)
                        </span>
                    </div>
                </div>
            </section>

            <section id="form" className="consultation">
                <div className="consultation-box container">
                    <div>
                        <p className="eyebrow eyebrow-light">
                            Formulir konsultasi teknis
                        </p>
                        <h2>Butuh solusi teknis untuk fasilitas Anda?</h2>
                        <p>
                            Bagikan kebutuhan awal Anda. Tim PGL akan
                            menindaklanjuti untuk konsultasi teknis dan langkah
                            berikutnya.
                        </p>
                    </div>
                    <form className="consultation-form" onSubmit={submit}>
                        <label>
                            Nama lengkap
                            <input
                                required
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                placeholder="Nama Anda"
                            />
                            {errors.name && (
                                <span className="form-error">
                                    {errors.name}
                                </span>
                            )}
                        </label>
                        <label>
                            Nama perusahaan
                            <input
                                required
                                name="company"
                                value={data.company}
                                onChange={(e) =>
                                    setData('company', e.target.value)
                                }
                                placeholder="Nama perusahaan"
                            />
                            {errors.company && (
                                <span className="form-error">
                                    {errors.company}
                                </span>
                            )}
                        </label>
                        <label>
                            Email
                            <input
                                required
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                placeholder="nama@perusahaan.com"
                            />
                            {errors.email && (
                                <span className="form-error">
                                    {errors.email}
                                </span>
                            )}
                        </label>
                        <label>
                            Telepon{' '}
                            <span className="field-optional">(opsional)</span>
                            <input
                                name="phone"
                                value={data.phone}
                                onChange={(e) =>
                                    setData('phone', e.target.value)
                                }
                                placeholder="+62 ..."
                            />
                        </label>
                        <label>
                            Jenis kebutuhan
                            <select
                                required
                                name="service"
                                value={data.service}
                                onChange={(e) =>
                                    setData('service', e.target.value)
                                }
                            >
                                <option value="">Pilih solusi</option>
                                {SERVICE_OPTIONS.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            {errors.service && (
                                <span className="form-error">
                                    {errors.service}
                                </span>
                            )}
                        </label>
                        <label className="field-full">
                            Pesan{' '}
                            <span className="field-optional">(opsional)</span>
                            <textarea
                                name="message"
                                rows={4}
                                value={data.message}
                                onChange={(e) =>
                                    setData('message', e.target.value)
                                }
                                placeholder="Ceritakan kebutuhan teknis awal Anda"
                            />
                        </label>

                        {/* Honeypot — hidden from users, tempting to bots. */}
                        <input
                            type="text"
                            name="website"
                            tabIndex={-1}
                            autoComplete="off"
                            aria-hidden="true"
                            className="honeypot"
                            value={data.website}
                            onChange={(e) => setData('website', e.target.value)}
                        />

                        <button
                            className="button button-light"
                            type="submit"
                            disabled={processing}
                        >
                            {processing ? 'Mengirim…' : 'Kirim permintaan'}{' '}
                            <span aria-hidden="true">→</span>
                        </button>

                        {flashSuccess && (
                            <p
                                className="form-message form-success"
                                role="status"
                                aria-live="polite"
                            >
                                {flashSuccess}
                            </p>
                        )}
                    </form>
                </div>
            </section>
        </LandingLayout>
    );
}
