'use server'

import { prisma } from '@/lib/prisma'

export async function loginOrRegister(walletAddress: string) {
    if (!walletAddress) {
        throw new Error('Wallet address is required')
    }

    try {
        // Check if user exists
        let user = await prisma.user.findUnique({
            where: {
                walletAddress: walletAddress,
            },
        })

        // If not, create new user
        if (!user) {
            user = await prisma.user.create({
                data: {
                    walletAddress: walletAddress,
                },
            })
            console.log(`Created new user for wallet: ${walletAddress}`)
        } else {
            console.log(`Found existing user for wallet: ${walletAddress}`)
        }

        return { success: true, user }
    } catch (error) {
        console.error('Error in loginOrRegister:', error)
        return { success: false, error: 'Failed to authenticate' }
    }
}
