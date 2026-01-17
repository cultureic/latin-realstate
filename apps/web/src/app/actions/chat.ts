'use server'

import { prisma } from '@/lib/prisma'

export async function getConversations(userId: string) {
    try {
        const conversations = await prisma.conversation.findMany({
            where: {
                participants: {
                    some: {
                        id: userId
                    }
                }
            },
            include: {
                participants: {
                    where: {
                        id: {
                            not: userId
                        }
                    }
                },
                messages: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    take: 1
                }
            },
            orderBy: {
                updatedAt: 'desc'
            }
        })
        return { success: true, conversations }
    } catch (error) {
        console.error('Error getting conversations:', error)
        return { success: false, error: 'Failed to fetch conversations' }
    }
}

export async function getMessages(conversationId: string) {
    try {
        const messages = await prisma.message.findMany({
            where: {
                conversationId
            },
            orderBy: {
                createdAt: 'asc'
            },
            include: {
                sender: true
            }
        })
        return { success: true, messages }
    } catch (error) {
        console.error('Error getting messages:', error)
        return { success: false, error: 'Failed to fetch messages' }
    }
}

export async function sendMessage(conversationId: string, senderId: string, content: string) {
    try {
        const message = await prisma.message.create({
            data: {
                conversationId,
                senderId,
                content
            }
        })

        // Update conversation updatedAt
        await prisma.conversation.update({
            where: { id: conversationId },
            data: { updatedAt: new Date() }
        })

        return { success: true, message }
    } catch (error) {
        console.error('Error sending message:', error)
        return { success: false, error: 'Failed to send message' }
    }
}

export async function createConversation(userId: string, agentId: string) {
    try {
        // Check if conversation already exists
        const existing = await prisma.conversation.findFirst({
            where: {
                AND: [
                    { participants: { some: { id: userId } } },
                    { participants: { some: { id: agentId } } }
                ]
            }
        })

        if (existing) {
            return { success: true, conversation: existing }
        }

        const conversation = await prisma.conversation.create({
            data: {
                participants: {
                    connect: [
                        { id: userId },
                        { id: agentId }
                    ]
                }
            }
        })
        return { success: true, conversation }
    } catch (error) {
        console.error('Error creating conversation:', error)
        return { success: false, error: 'Failed to create conversation' }
    }
}
