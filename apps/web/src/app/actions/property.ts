'use server'

import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export type PropertyData = {
    title: string
    description: string
    location: string
    price: number
    images: string[]
    features?: any
}

export async function createProperty(data: PropertyData, walletAddress: string) {
    if (!walletAddress) {
        throw new Error('Wallet address is required')
    }

    try {
        // Find the user by wallet address
        const user = await prisma.user.findUnique({
            where: { walletAddress },
        })

        if (!user) {
            throw new Error('User not found. Please connect your wallet first.')
        }

        // Create the property linked to the user
        const property = await prisma.property.create({
            data: {
                title: data.title,
                description: data.description,
                location: data.location,
                price: new Prisma.Decimal(data.price),
                images: data.images,
                features: data.features ?? Prisma.JsonNull,
                ownerId: user.id,
                status: 'DRAFT', // Default status
            },
        })

        return { success: true, property }
    } catch (error) {
        console.error('Error creating property:', error)
        return { success: false, error: 'Failed to create property' }
    }
}

export async function getProperties() {
    try {
        const properties = await prisma.property.findMany({
            where: { status: 'LISTED' }, // Only show listed properties by default
            orderBy: { createdAt: 'desc' },
            include: { owner: true },
        })
        return { success: true, properties }
    } catch (error) {
        console.error('Error fetching properties:', error)
        return { success: false, error: 'Failed to fetch properties' }
    }
}

export async function getUserProperties(walletAddress: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { walletAddress },
        })

        if (!user) {
            return { success: false, error: 'User not found' }
        }

        const properties = await prisma.property.findMany({
            where: { ownerId: user.id },
            orderBy: { createdAt: 'desc' },
        })

        return { success: true, properties }
    } catch (error) {
        console.error('Error fetching user properties:', error)
        return { success: false, error: 'Failed to fetch user properties' }
    }
}
