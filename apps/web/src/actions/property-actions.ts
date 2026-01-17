'use server'

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProperty(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const price = formData.get("price") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const walletAddress = formData.get("walletAddress") as string;

    if (!title || !description || !price || !walletAddress) {
        throw new Error("Missing required fields");
    }

    // 1. Find or Create User based on Wallet Address
    let user = await prisma.user.findUnique({
        where: { walletAddress },
    });

    if (!user) {
        user = await prisma.user.create({
            data: { walletAddress },
        });
    }

    // 2. Create Property
    await prisma.property.create({
        data: {
            title,
            description,
            location,
            price: parseFloat(price),
            images: [imageUrl],
            ownerId: user.id,
            status: "DRAFT", // Default status
        },
    });

    revalidatePath("/properties");
    redirect("/properties");
}

export async function getProperties() {
    return await prisma.property.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export async function getPropertyById(id: string) {
    return await prisma.property.findUnique({
        where: { id },
        include: { owner: true }
    })
}

export async function createBooking(propertyId: string, userId: string, agentId: string, scheduledAt: Date) {
    const booking = await (prisma as any).booking.create({
        data: {
            propertyId,
            userId,
            agentId,
            scheduledAt,
            status: "PENDING",
        },
    });

    revalidatePath(`/properties/${propertyId}`);
    return booking;
}

export async function getUserByWallet(walletAddress: string) {
    return await prisma.user.findUnique({
        where: { walletAddress },
    });
}

export async function createUser(walletAddress: string) {
    return await prisma.user.create({
        data: { walletAddress },
    });
}
