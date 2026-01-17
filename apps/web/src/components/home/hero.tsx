import Link from "next/link";

export function Hero() {
    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
            {/* Parallax Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80 z-10" />
                <div
                    className="w-full h-full bg-cover bg-center opacity-80 scale-110 animate-pulse-slow"
                    style={{ backgroundImage: 'url("/hero-bg.png")' }}
                />
            </div>

            <div className="relative z-20 container px-4 md:px-6 flex flex-col items-center">
                <div className="bg-white/5 backdrop-blur-2xl p-12 md:p-20 rounded-3xl border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] max-w-5xl w-full text-center">
                    <div className="mb-8 inline-block px-6 py-2 border border-secondary/30 rounded-full text-[10px] tracking-[0.4em] text-secondary font-black uppercase animate-fade-in-up shadow-inner">
                        ESTATE TOKENIZATION PROTOCOL
                    </div>

                    <h1 className="font-serif text-6xl md:text-9xl tracking-tighter mb-10 animate-fade-in-up delay-100 text-white leading-[0.8]">
                        Latin <span className="text-secondary italic font-light drop-shadow-[0_0_20px_rgba(182,143,77,0.3)]">Residences</span>
                    </h1>

                    <p className="mx-auto max-w-2xl text-xl md:text-2xl text-white/70 mb-12 font-light tracking-wide leading-relaxed animate-fade-in-up delay-200">
                        Institutional-grade real estate acquisition via the Celo blockchain. <br className="hidden md:block" />
                        Accessible. Secure. Transparent.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-8 justify-center animate-fade-in-up delay-300">
                        <Link
                            href="/properties"
                            className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-secondary px-10 text-sm font-black text-secondary-foreground shadow-2xl transition-all hover:scale-105 active:scale-95 uppercase tracking-[0.2em]"
                        >
                            <span className="relative z-10">Portfolio</span>
                        </Link>
                        <Link
                            href="/properties/create"
                            className="inline-flex h-14 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-10 text-sm font-black text-white shadow-xl transition-all hover:bg-white/10 hover:border-white/40 uppercase tracking-[0.2em]"
                        >
                            List Asset
                        </Link>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
                    <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
                        <div className="w-1 h-2 bg-white rounded-full" />
                    </div>
                </div>
            </div>
        </section>
    );
}
