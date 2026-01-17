
import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

const CITIES = [
    { name: 'Mexico City', lat: 19.4326, lng: -99.1332 },
    { name: 'Cancun', lat: 21.1619, lng: -86.8515 },
    { name: 'Guadalajara', lat: 20.6597, lng: -103.3496 },
    { name: 'Monterrey', lat: 25.6866, lng: -100.3161 },
    { name: 'Bogota', lat: 4.7110, lng: -74.0721 }
]

const PROPERTY_TYPES = ['Apartment', 'House', 'Villa', 'Penthouse', 'Condo']

const IMAGES = [
    'https://images.unsplash.com/photo-1600596542815-2a4d04774c13?w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
    'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80'
]

function getRandomCoordinates(centerLat: number, centerLng: number, radius = 0.05) {
    const y0 = centerLat
    const x0 = centerLng
    const u = Math.random()
    const v = Math.random()
    const w = radius * Math.sqrt(u)
    const t = 2 * Math.PI * v
    const x = w * Math.cos(t)
    const y0_lat = w * Math.sin(t)
    const x_new = x / Math.cos(y0)

    return {
        lat: y0 + y0_lat,
        lng: x0 + x_new
    }
}

async function main() {
    console.log('Start seeding ...')

    // Create Agents
    const agents = []
    const agentData = [
        { name: 'Maria Rodriguez', email: 'maria@latinrealestate.com', wallet: '0x123...abc' },
        { name: 'Carlos Santana', email: 'carlos@latinrealestate.com', wallet: '0x456...def' },
        { name: 'Sofia Vergara', email: 'sofia@latinrealestate.com', wallet: '0x789...ghi' }
    ]

    for (const data of agentData) {
        const agent = await prisma.user.upsert({
            where: { email: data.email },
            update: {},
            create: {
                email: data.email,
                name: data.name,
                walletAddress: data.wallet,
                role: Role.AGENT
            },
        })
        agents.push(agent)
        console.log(`Created agent: ${agent.name}`)
    }

    // Create Properties
    const propertiesToCreate = []

    for (let i = 0; i < 50; i++) {
        const city = CITIES[Math.floor(Math.random() * CITIES.length)]
        const type = PROPERTY_TYPES[Math.floor(Math.random() * PROPERTY_TYPES.length)]
        const coords = getRandomCoordinates(city.lat, city.lng)
        const agent = agents[Math.floor(Math.random() * agents.length)]
        const price = Math.floor(Math.random() * 2000000) + 100000 // 100k to 2.1m

        propertiesToCreate.push({
            title: `Luxury ${type} in ${city.name} - ${i + 1}`,
            description: `Beautiful ${type.toLowerCase()} located in the heart of ${city.name}. Featuring modern amenities and stunning views.`,
            location: `${city.name}, Mexico`,
            lat: coords.lat,
            lng: coords.lng,
            price: price,
            images: [IMAGES[Math.floor(Math.random() * IMAGES.length)]],
            features: { bedrooms: Math.floor(Math.random() * 5) + 1, bathrooms: Math.floor(Math.random() * 4) + 1, sqft: Math.floor(Math.random() * 3000) + 500 },
            ownerId: agent.id,
            status: 'LISTED'
        })
    }

    // Batch create properties
    for (const prop of propertiesToCreate) {
        await prisma.property.create({
            data: prop
        })
    }

    console.log(`Created 50 properties`)
    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
