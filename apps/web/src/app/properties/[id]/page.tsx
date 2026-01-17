import { BookingCalendar } from "@/components/booking-calendar";
import { PropertyChat } from "@/components/property-chat";
import { AmenitiesReport } from "@/components/amenities-report";
import { getPropertyById } from "@/actions/property-actions";
import { notFound } from "next/navigation";
import { MapPin, ShieldCheck, Ruler, BedDouble, Bath } from "lucide-react";
import Link from "next/link";

export default async function PropertyDetailsPage({ params }: { params: { id: string } }) {
    const property = await getPropertyById(params.id);

    if (!property) {
        notFound();
    }

    return (
        <div className="min-h-screen pb-20">
            {/* Hero Image */}
            <div className="w-full h-[70vh] relative bg-muted overflow-hidden group">
                <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 container px-4 md:px-6 pb-20">
                    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                        <div className="inline-flex items-center bg-secondary/90 text-secondary-foreground px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-xl backdrop-blur-md border border-white/10">
                            {property.status} • LUXURY COLLECTION
                        </div>
                        <h1 className="font-serif text-5xl md:text-8xl text-foreground font-bold mb-6 leading-tight max-w-4xl tracking-tighter">
                            {property.title}
                        </h1>
                        <div className="flex items-center text-xl text-muted-foreground font-light tracking-wide">
                            <MapPin className="w-5 h-5 mr-3 text-secondary animate-pulse" />
                            {property.location}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 -mt-16 relative z-10">
                {/* Main Content */}
                <div className="lg:col-span-8 space-y-12">
                    <div className="bg-card/50 backdrop-blur-xl p-10 rounded-2xl border shadow-2xl space-y-12">
                        <div className="space-y-6">
                            <h2 className="font-serif text-3xl font-bold border-b border-border pb-6">About this Estate</h2>
                            <p className="text-muted-foreground leading-relaxed font-light text-xl">
                                {property.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-6 py-10 border-y border-border/50">
                            <div className="flex flex-col items-center justify-center p-6 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                                <Ruler className="w-8 h-8 text-secondary mb-3" />
                                <span className="text-2xl font-bold tracking-tighter">2,500</span>
                                <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Sq Ft</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-6 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                                <BedDouble className="w-8 h-8 text-secondary mb-3" />
                                <span className="text-2xl font-bold tracking-tighter">4</span>
                                <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Bedrooms</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-6 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                                <Bath className="w-8 h-8 text-secondary mb-3" />
                                <span className="text-2xl font-bold tracking-tighter">3</span>
                                <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Bathrooms</span>
                            </div>
                        </div>

                        {/* Neighborhood Analysis */}
                        <div className="pt-6">
                            <AmenitiesReport lat={(property as any).lat || 40.7128} lng={(property as any).lng || -74.0060} />
                        </div>

                        <div className="pt-12 border-t border-border/50">
                            <h2 className="font-serif text-2xl font-bold mb-6">Secured on Celo Blockchain</h2>
                            <div className="flex items-center p-6 bg-emerald-500/5 text-emerald-600 rounded-xl border border-emerald-500/20 shadow-inner">
                                <ShieldCheck className="w-10 h-10 mr-4" />
                                <div>
                                    <p className="font-bold text-lg text-emerald-700">Ownership Authenticity Verified</p>
                                    <p className="text-sm opacity-80 leading-relaxed">This asset is legally verified and tokenized. All transactions are settled on the Celo network with institutional-grade security.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Pricing & CTA */}
                    <div className="bg-card p-8 rounded-2xl border shadow-2xl sticky top-24 space-y-8 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl -mr-16 -mt-16" />

                        <div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-black mb-2">Total Acquisition Price</p>
                            <div className="font-serif text-5xl font-bold text-primary tracking-tighter">
                                ${property.price.toNumber().toLocaleString()}
                                <span className="text-sm font-sans text-muted-foreground ml-2">USDC</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <button className="w-full bg-secondary text-secondary-foreground font-black py-5 rounded-xl hover:bg-secondary/90 transition-all uppercase tracking-[0.2em] shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 duration-200 text-sm">
                                Invest in Property
                            </button>

                            <p className="text-[10px] text-center text-muted-foreground font-bold tracking-widest uppercase opacity-60">
                                Secured by Smart Contracts • Powered by Celo
                            </p>
                        </div>

                        <div className="pt-8 border-t border-border/50">
                            <BookingCalendar propertyId={property.id} agentId={property.ownerId} />
                        </div>
                    </div>

                    {/* AI Guide Widget */}
                    <div className="sticky top-[80vh]">
                        <PropertyChat property={property} />
                    </div>
                </div>
            </div>
        </div>
    );
}
