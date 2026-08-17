/**
 * Decorative brand motifs for the landing/marketing pages (brand revision 2026).
 *
 * The client's visual brief calls for water flow, chemical/molecule structure,
 * cooling towers + industrial pipes, and "digital monitoring" high-tech cues,
 * all in the navy/sky-blue/white/gray palette. These are hand-authored SVGs
 * (no photo assets exist for them) rather than images so they scale crisply and
 * pick up the `.pgl` palette via CSS. Everything here is presentational: the
 * whole file is `aria-hidden` except `MonitoringReadout`, which carries the real
 * "18+ years" stat and so stays in the a11y tree.
 *
 * Styling + motion live in `landing.css` (`.wave-divider`, `.molecule-field`,
 * `.facility-silhouette`, `.monitoring-readout`, …) so `prefers-reduced-motion`
 * can neutralise every animation in one place.
 */

type Point = [number, number];

/** Flat-top hexagon vertices — the benzene-ring backbone of the molecule motif. */
function hexagon(cx: number, cy: number, r: number): Point[] {
    return Array.from({ length: 6 }, (_, i) => {
        const angle = (Math.PI / 180) * (60 * i - 30);

        return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
    });
}

const toPoints = (pts: Point[]): string =>
    pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

/* ===== Wave divider — "aliran air" ======================================= */

interface WaveDividerProps {
    /** Colour the wave fills with — the section it flows *into*. */
    tone?: 'white' | 'mist' | 'navy';
}

/**
 * Full-bleed water-wave section boundary. Meant to be dropped as an absolutely
 * positioned last child of a `position:relative; overflow:hidden` section so the
 * wave laps over that section's bottom edge (see `.wave-divider` in landing.css).
 * Two layered paths drift in opposite phases to read as moving water.
 */
export function WaveDivider({ tone = 'white' }: WaveDividerProps) {
    return (
        <div className={`wave-divider wave-to-${tone}`} aria-hidden="true">
            <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
                <path
                    className="wave-layer wave-layer-back"
                    d="M0,40 C240,80 480,4 720,34 C960,64 1200,10 1440,42 L1440,90 L0,90 Z"
                />
                <path
                    className="wave-layer wave-layer-front"
                    d="M0,54 C240,88 480,20 720,48 C960,76 1200,26 1440,56 L1440,90 L0,90 Z"
                />
            </svg>
        </div>
    );
}

/* ===== Molecule field — "molekul / struktur kimia" ======================= */

const MOLECULE_RINGS: Point[][] = [
    hexagon(170, 210, 70),
    hexagon(430, 168, 60),
    hexagon(560, 300, 46),
];

/** Free-floating nodes + the bonds that tie the rings together. */
const MOLECULE_NODES: Array<{ p: Point; glow?: boolean }> = [
    { p: [300, 190], glow: true },
    { p: [498, 234] },
    { p: [96, 96], glow: true },
    { p: [610, 118] },
];

const MOLECULE_BONDS: Array<[Point, Point]> = [
    [
        [240, 210],
        [360, 190],
    ],
    [
        [490, 168],
        [560, 254],
    ],
    [
        [170, 140],
        [96, 96],
    ],
    [
        [490, 168],
        [610, 118],
    ],
];

/**
 * Faint chemistry-structure backdrop (benzene rings + bonds). Absolutely fills
 * its host; colour + opacity come from `.molecule-field` so it can read as sky
 * on light panels and pale-sky on navy ones.
 */
export function MoleculeField({ className = '' }: { className?: string }) {
    return (
        <svg
            className={`molecule-field ${className}`.trim()}
            viewBox="0 0 640 420"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
        >
            {MOLECULE_BONDS.map(([a, b], i) => (
                <line
                    key={`bond-${i}`}
                    className="mol-bond"
                    x1={a[0]}
                    y1={a[1]}
                    x2={b[0]}
                    y2={b[1]}
                />
            ))}
            {MOLECULE_RINGS.map((ring, i) => (
                <polygon
                    key={`ring-${i}`}
                    className="mol-bond"
                    points={toPoints(ring)}
                />
            ))}
            {MOLECULE_RINGS.flatMap((ring, ri) =>
                ring.map(([x, y], vi) => (
                    <circle
                        key={`v-${ri}-${vi}`}
                        className="mol-node"
                        cx={x}
                        cy={y}
                        r={4.5}
                    />
                )),
            )}
            {MOLECULE_NODES.map(({ p, glow }, i) => (
                <circle
                    key={`n-${i}`}
                    className={glow ? 'mol-node mol-node--glow' : 'mol-node'}
                    cx={p[0]}
                    cy={p[1]}
                    r={glow ? 6 : 4.5}
                />
            ))}
        </svg>
    );
}

/* ===== Facility silhouette — "cooling tower + pipa industri" ============== */

/** Hyperboloid cooling-tower outline (wide base, pinched waist, flared top). */
function coolingTower(
    cx: number,
    baseW: number,
    topW: number,
    h: number,
    baseY: number,
): string {
    const bl = cx - baseW / 2;
    const br = cx + baseW / 2;
    const tl = cx - topW / 2;
    const tr = cx + topW / 2;
    const waistW = topW * 0.72;
    const wl = cx - waistW / 2;
    const wr = cx + waistW / 2;
    const top = baseY - h;
    const waistY = baseY - h * 0.58;

    return `M${bl},${baseY} Q${wl},${waistY} ${tl},${top} L${tr},${top} Q${wr},${waistY} ${br},${baseY} Z`;
}

/**
 * Thin industrial skyline band — two cooling towers, storage tanks, and a run of
 * pipes with flanged joints. Presentational; sits as a faint footer band or
 * section base (see `.facility-silhouette`).
 */
export function FacilitySilhouette({ className = '' }: { className?: string }) {
    const baseY = 150;

    return (
        <svg
            className={`facility-silhouette ${className}`.trim()}
            viewBox="0 0 1440 160"
            preserveAspectRatio="xMidYMax slice"
            aria-hidden="true"
        >
            {/* cooling towers */}
            <path
                className="fac-solid"
                d={coolingTower(210, 190, 128, 132, baseY)}
            />
            <path
                className="fac-solid"
                d={coolingTower(430, 150, 104, 108, baseY)}
            />
            {/* storage tanks */}
            <rect
                className="fac-solid"
                x="720"
                y="66"
                width="96"
                height="84"
                rx="14"
            />
            <rect
                className="fac-solid"
                x="838"
                y="92"
                width="72"
                height="58"
                rx="12"
            />
            {/* pipe run with flanged joints */}
            <path
                className="fac-pipe"
                d="M0,132 H150 M150,132 V150 M980,150 V108 H1180 V150 M1180,120 H1440"
            />
            {[150, 980, 1180].map((x, i) => (
                <circle
                    key={`joint-${i}`}
                    className="fac-node"
                    cx={x}
                    cy={i === 1 ? 108 : 132}
                    r="7"
                />
            ))}
            <rect
                className="fac-solid"
                x="1240"
                y="70"
                width="60"
                height="80"
                rx="10"
            />
            <line className="fac-ground" x1="0" y1="150" x2="1440" y2="150" />
        </svg>
    );
}

/* ===== Monitoring readout — "teknologi & digital monitoring" ============== */

/** Illustrative telemetry sparkline (static values, animated draw). */
function MonitoringSparkline() {
    const points =
        '0,30 12,22 24,26 36,14 48,20 60,9 72,17 84,7 96,13 108,5 120,10';

    return (
        <svg
            className="mon-spark"
            viewBox="0 0 120 40"
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            <polyline
                className="mon-spark-area"
                points={`0,40 ${points} 120,40`}
            />
            <polyline className="mon-spark-line" points={points} />
            <circle className="mon-spark-dot" cx="120" cy="10" r="3" />
        </svg>
    );
}

/**
 * Hero stat card reframed as a live water-quality monitor. Keeps the count-up
 * "18+ years" figure (`data-count-to`, animated by `useLandingEffects`) as the
 * accessible payload; the live dot, sparkline, and telemetry chips are decorative
 * high-tech dressing and are hidden from assistive tech.
 */
export function MonitoringReadout() {
    return (
        <div className="hero-card monitoring-readout">
            <div className="mon-head">
                <span className="mon-live" aria-hidden="true" />
                <span className="mon-label">Live monitoring</span>
                <span className="mon-status" aria-hidden="true">
                    ONLINE
                </span>
            </div>
            <div className="mon-stat">
                <strong data-count-to="18" data-count-suffix="+">
                    18+
                </strong>
                <span>
                    Tahun pengalaman
                    <br />
                    di solusi industri
                </span>
            </div>
            <MonitoringSparkline />
            {/* The 4 solution pillars — honest capability tags. (Replaced fabricated
                pH/TDS/Uptime readings that implied a live sensor feed we don't have.) */}
            <div className="mon-metrics" aria-hidden="true">
                <span>Air</span>
                <span>Kimia</span>
                <span>Daya</span>
                <span>Proteksi</span>
            </div>
        </div>
    );
}

/* ===== Sugarcane → white crystal sugar ==================================== */

/** One arching sugarcane leaf blade springing from a cane tip. */
function caneLeaf(x: number, baseY: number, dir: number): string {
    const tipX = x + dir * 22;
    const tipY = baseY - 30;

    return `M${x},${baseY} Q${x + dir * 20},${baseY - 10} ${tipX},${tipY} Q${x + dir * 6},${baseY - 16} ${x},${baseY} Z`;
}

/** A single upright crown leaf. */
function caneCrownLeaf(x: number, baseY: number): string {
    return `M${x},${baseY} Q${x - 7},${baseY - 18} ${x},${baseY - 34} Q${x + 7},${baseY - 18} ${x},${baseY} Z`;
}

/**
 * Stylised sugarcane: three jointed canes, each a stack of a few TALL solid
 * internode segments split by a thin node gap (bamboo-like) — reads as cane, not a
 * hollow ladder or a bead string. Topped with a small leaf tuft (crown on the tall
 * middle cane, one outward blade on each side cane). Centred; sky/white palette.
 */
export function SugarcaneMotif({ className = '' }: { className?: string }) {
    const w = 15;
    const segH = 32;
    const gap = 3;
    const bottomY = 188;
    const canes = [
        { x: 52, segs: 3 },
        { x: 80, segs: 4 },
        { x: 108, segs: 3 },
    ];

    return (
        <svg
            className={`sugarcane-motif ${className}`.trim()}
            viewBox="0 0 160 200"
            aria-hidden="true"
        >
            {canes.map(({ x, segs }, ci) => {
                const base = bottomY - segs * segH - (segs - 1) * gap + 3;

                return (
                    <g key={`cane-${ci}`}>
                        {Array.from({ length: segs }, (_, i) => (
                            <rect
                                className="cane-seg"
                                key={`seg-${ci}-${i}`}
                                x={x - w / 2}
                                y={bottomY - (i + 1) * segH - i * gap}
                                width={w}
                                height={segH}
                                rx={3}
                            />
                        ))}
                        {ci === 1 ? (
                            <>
                                <path
                                    className="cane-leaf"
                                    d={caneLeaf(x, base, -1)}
                                />
                                <path
                                    className="cane-leaf"
                                    d={caneCrownLeaf(x, base)}
                                />
                                <path
                                    className="cane-leaf"
                                    d={caneLeaf(x, base, 1)}
                                />
                            </>
                        ) : (
                            <path
                                className="cane-leaf"
                                d={caneLeaf(x, base, ci === 0 ? -1 : 1)}
                            />
                        )}
                    </g>
                );
            })}
        </svg>
    );
}

/**
 * Clean isometric sugar cube (three shaded faces + a glint) — an unambiguous read
 * of "gula kristal putih", tidier than a faceted gem.
 */
export function CrystalMotif({ className = '' }: { className?: string }) {
    return (
        <svg
            className={`crystal-motif ${className}`.trim()}
            viewBox="0 0 120 120"
            aria-hidden="true"
        >
            {/* top → light, left → mid, right → dark: standard isometric shading */}
            <polygon
                className="cube-face cube-top"
                points="60,20 98,42 60,64 22,42"
            />
            <polygon
                className="cube-face cube-left"
                points="22,42 60,64 60,106 22,84"
            />
            <polygon
                className="cube-face cube-right"
                points="98,42 98,84 60,106 60,64"
            />
            <path
                className="cube-spark"
                d="M76,30 L78,36 L84,38 L78,40 L76,46 L74,40 L68,38 L74,36 Z"
            />
        </svg>
    );
}
