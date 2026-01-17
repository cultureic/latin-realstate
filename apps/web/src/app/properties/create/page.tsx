'use client';

import { useAccount } from "wagmi";
import { createProperty } from "@/actions/property-actions";
import { Button } from "@/components/ui/button"; // Assuming you have/will have a Button component
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";

import { PropertyCreationWizard } from "@/components/property-creation-wizard";

export default function CreatePropertyPage() {
    const { address, isConnected } = useAccount();

    if (!isConnected) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
                <h1 className="font-serif text-3xl font-bold text-primary">Connect Wallet to List Property</h1>
                <p className="text-muted-foreground text-center max-w-md">
                    You must connect your blockchain wallet to verify ownership and list properties on our platform.
                </p>
                <ConnectButton />
            </div>
        );
    }

    return (
        <div className="container py-12">
            <div className="max-w-4xl mx-auto space-y-12">
                <header className="text-center space-y-4">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary">List a New Property</h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Join our exclusive network of luxury real estate. Our AI assistant will guide you through the process.
                    </p>
                </header>

                <PropertyCreationWizard />
            </div>
        </div>
    );
}
