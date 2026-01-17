import Link from "next/link";
import { getProperties } from "@/actions/property-actions";
import { MapPin } from "lucide-react";

export default async function PropertiesPage() {
    const properties = await getProperties();

    return (
        <div className="container py-12">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2">Exclusive Properties</h1>
                    <p className="text-muted-foreground">Discover tokenized luxury real estate.</p>
                </div>
                <Link
                    href="/properties/create"
                    className="inline-flex h-10 items-center justify-center rounded-sm bg-secondary px-6 text-sm font-medium text-secondary-foreground shadow transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 uppercase tracking-widest"
                >
                    List Property
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((property) => (
                    <Link
                        key={property.id}
                        href={`/properties/${property.id}`}
                        className="group block bg-card rounded-lg overflow-hidden border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="relative aspect-[4/3] overflow-hidden">
                            <img
                                src={property.images[0]}
                                alt={property.title}
                                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm backdrop-blur-sm">
                                {property.status}
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center text-xs text-secondary font-bold uppercase tracking-widest mb-2">
                                <MapPin className="w-3 h-3 mr-1" />
                                {property.location}
                            </div>
                            <h3 className="font-serif text-xl font-bold text-card-foreground mb-2 line-clamp-1 group-hover:text-secondary transition-colors">
                                {property.title}
                            </h3>
                            <p className="text-muted-foreground text-sm line-clamp-2 mb-4 font-light">
                                {property.description}
                            </p>
                            <div className="flex justify-between items-center pt-4 border-t border-border/50">
                                <div className="text-2xl font-serif text-primary font-bold">
                                    ${property.price.toLocaleString()}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    Tokenized Ownership
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}

                {properties.length === 0 && (
                    <div className="col-span-full text-center py-20 bg-muted/20 rounded-lg border border-dashed border-muted-foreground/20">
                        <h3 className="font-serif text-xl font-bold text-primary mb-2">No Properties Listed Yet</h3>
                        <p className="text-muted-foreground mb-6">Be the first to list a luxury property on our platform.</p>
                        <Link
                            href="/properties/create"
                            className="text-secondary hover:underline underline-offset-4 font-medium"
                        >
                            create a listing now
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
