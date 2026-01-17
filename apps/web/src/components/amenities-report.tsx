'use client';

import { useState, useEffect } from 'react';
import { Map, School, Utensils, HeartPulse, TreePine, Star, Info } from 'lucide-react';

interface Amenity {
    name: string;
    distance: string;
    rating: number;
}

interface Category {
    name: string;
    items: Amenity[];
}

interface AmenitiesReportProps {
    lat: number;
    lng: number;
}

export function AmenitiesReport({ lat, lng }: AmenitiesReportProps) {
    const [data, setData] = useState<{ summary: string, categories: Category[] } | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`/api/amenities?lat=${lat}&lng=${lng}`);
                const json = await res.json();
                setData(json);
            } catch (error) {
                console.error('Failed to fetch amenities', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [lat, lng]);

    if (isLoading) {
        return (
            <div className="animate-pulse space-y-4">
                <div className="h-8 bg-muted rounded w-1/3"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="h-32 bg-muted rounded"></div>
                    <div className="h-32 bg-muted rounded"></div>
                </div>
            </div>
        );
    }

    if (!data) return null;

    const getIcon = (name: string) => {
        switch (name.toLowerCase()) {
            case 'schools': return <School className="w-5 h-5" />;
            case 'restaurants': return <Utensils className="w-5 h-5" />;
            case 'health': return <HeartPulse className="w-5 h-5" />;
            case 'park': return <TreePine className="w-5 h-5" />;
            default: return <Info className="w-5 h-5" />;
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl font-bold flex items-center">
                    <Map className="w-6 h-6 mr-3 text-secondary" />
                    Neighborhood Insights
                </h2>
                <span className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground uppercase tracking-widest">
                    AI Analysis
                </span>
            </div>

            <p className="text-muted-foreground italic border-l-2 border-secondary pl-4 leading-relaxed">
                {data.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.categories.map((cat, i) => (
                    <div key={i} className="bg-muted/30 border border-border/50 rounded-lg p-5 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-2 mb-4 text-primary">
                            {getIcon(cat.name)}
                            <h3 className="font-bold uppercase text-xs tracking-wider">{cat.name}</h3>
                        </div>
                        <ul className="space-y-4">
                            {cat.items.map((item, j) => (
                                <li key={j} className="flex flex-col">
                                    <div className="flex justify-between items-start">
                                        <span className="text-sm font-medium">{item.name}</span>
                                        <div className="flex items-center text-[10px] text-amber-500 font-bold">
                                            <Star className="w-3 h-3 mr-1 fill-current" />
                                            {item.rating || 'N/A'}
                                        </div>
                                    </div>
                                    <span className="text-xs text-muted-foreground">{item.distance}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
