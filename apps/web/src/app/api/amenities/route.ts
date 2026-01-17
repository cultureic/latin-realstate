import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    if (!lat || !lng) {
        return NextResponse.json({ error: 'Missing coordinates' }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        // Fallback for demo
        return NextResponse.json({
            summary: "Luxury neighborhood with high-end amenities.",
            categories: [
                {
                    name: "Schools",
                    items: [
                        { name: "Metropolitan International School", distance: "0.8 km", rating: 4.8 },
                        { name: "Royal Academy", distance: "1.2 km", rating: 4.5 }
                    ]
                },
                {
                    name: "Restaurants",
                    items: [
                        { name: "La Boheme (Fine Dining)", distance: "0.3 km", rating: 4.9 },
                        { name: "The Grill", distance: "0.5 km", rating: 4.4 }
                    ]
                },
                {
                    name: "Health",
                    items: [
                        { name: "St. Jude Medical Center", distance: "2.1 km", rating: 4.7 }
                    ]
                }
            ]
        });
    }

    try {
        // Define types of places to search for
        const types = ['school', 'restaurant', 'hospital', 'park', 'shopping_mall'];

        const results = await Promise.all(types.map(async (type) => {
            const res = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=3000&type=${type}&key=${apiKey}`);
            const data = await res.json();
            return {
                name: type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' '),
                items: data.results?.slice(0, 3).map((item: any) => ({
                    name: item.name,
                    distance: "Nearby", // Would need Distance Matrix API for precise distance
                    rating: item.rating
                })) || []
            };
        }));

        return NextResponse.json({
            summary: `Analysis of properties within 3km of the location.`,
            categories: results.filter(r => r.items.length > 0)
        });
    } catch (error) {
        console.error('Amenities API error:', error);
        return NextResponse.json({ error: 'Failed to fetch amenities' }, { status: 500 });
    }
}
