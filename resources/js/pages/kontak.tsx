import { Head, useForm, usePage } from '@inertiajs/react';
import { Mail, MapPin, Phone, Printer } from 'lucide-react';
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
 * Kontak (Contact) — finbest contact page port. Breadcrumb banner + two-column
 * layout (Inertia consultation form + contact-info block with a map). The form is
 * a real submission into the admin inbox (Fase 1 CMS); `website` is an off-screen
 * honeypot the backend rejects. Form logic/fields/flash preserved.
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
        <LandingLayout
            title="Kontak | PT. Pacific Gitalestari"
            breadcrumb={{ title: 'Kontak', image: heroBg }}
        >
            <Head>
                <meta
                    name="description"
                    content="Hubungi PT. Pacific Gitalestari - kantor pusat Wisma Mitra Sunter Jakarta Utara, telepon, fax, email, dan formulir konsultasi teknis."
                />
            </Head>

            <section id="form" className="pt-120 pb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="tp-contact-box">
                                <div className="tp-section-title-wrapper mb-40">
                                    <span className="tp-section-title-pre">
                                        Formulir konsultasi teknis
                                    </span>
                                    <h1 className="tp-section-title">
                                        Mari bicarakan kebutuhan teknis Anda.
                                    </h1>
                                </div>
                                <form className="tp-contact-form" onSubmit={submit}>
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
                                                setData(
                                                    'company',
                                                    e.target.value,
                                                )
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
                                        <span className="field-optional">
                                            (opsional)
                                        </span>
                                        <input
                                            name="phone"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData('phone', e.target.value)
                                            }
                                            placeholder="+62 ..."
                                        />
                                    </label>
                                    <label className="field-full">
                                        Jenis kebutuhan
                                        <select
                                            required
                                            name="service"
                                            value={data.service}
                                            onChange={(e) =>
                                                setData(
                                                    'service',
                                                    e.target.value,
                                                )
                                            }
                                        >
                                            <option value="">
                                                Pilih solusi
                                            </option>
                                            {SERVICE_OPTIONS.map((option) => (
                                                <option
                                                    key={option}
                                                    value={option}
                                                >
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
                                        <span className="field-optional">
                                            (opsional)
                                        </span>
                                        <textarea
                                            name="message"
                                            rows={4}
                                            value={data.message}
                                            onChange={(e) =>
                                                setData(
                                                    'message',
                                                    e.target.value,
                                                )
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
                                        onChange={(e) =>
                                            setData('website', e.target.value)
                                        }
                                    />

                                    <button
                                        className="tp-btn"
                                        type="submit"
                                        disabled={processing}
                                    >
                                        {processing
                                            ? 'Mengirim…'
                                            : 'Kirim permintaan'}
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
                        </div>

                        <div className="col-lg-5">
                            <div className="tp-contact-info">
                                <div className="tp-section-title-wrapper mb-40">
                                    <span className="tp-section-title-pre">
                                        Kantor pusat
                                    </span>
                                    <h2 className="tp-section-title">
                                        PT. Pacific Gitalestari
                                    </h2>
                                </div>
                                <div className="tp-contact-info-item">
                                    <span className="tp-contact-info-icon">
                                        <MapPin size={22} />
                                    </span>
                                    <div>
                                        <h3>Alamat</h3>
                                        <address>
                                            Perkantoran Wisma Mitra Sunter Lt.
                                            15-06, Jl. Boulevard Mitra Sunter
                                            Blok C2, Jakarta Utara 14350
                                        </address>
                                    </div>
                                </div>
                                <div className="tp-contact-info-item">
                                    <span className="tp-contact-info-icon">
                                        <Phone size={22} />
                                    </span>
                                    <div>
                                        <h3>Telepon</h3>
                                        <a href="tel:+62216514815">
                                            +62 21 6514815
                                        </a>
                                        <a href="tel:+622165305141">
                                            +62 21 65305141
                                        </a>
                                    </div>
                                </div>
                                <div className="tp-contact-info-item">
                                    <span className="tp-contact-info-icon">
                                        <Printer size={22} />
                                    </span>
                                    <div>
                                        <h3>Fax</h3>
                                        <a href="tel:+62216514814">
                                            +62 21 6514814
                                        </a>
                                    </div>
                                </div>
                                <div className="tp-contact-info-item">
                                    <span className="tp-contact-info-icon">
                                        <Mail size={22} />
                                    </span>
                                    <div>
                                        <h3>Email</h3>
                                        <a href="mailto:ptpacificgitalestari@yahoo.com">
                                            ptpacificgitalestari@yahoo.com
                                        </a>
                                    </div>
                                </div>
                                <div
                                    className="tp-contact-map"
                                    role="img"
                                    aria-label="Placeholder peta lokasi kantor pusat"
                                >
                                    <div className="map-placeholder">
                                        <MapPin size={40} />
                                        <span>
                                            Peta lokasi — Wisma Mitra Sunter,
                                            Jakarta Utara
                                            <br />
                                            (embed peta menyusul di versi
                                            produksi)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}
