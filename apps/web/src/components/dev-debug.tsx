"use client";

import { useConnect } from "wagmi";
import { mock } from "wagmi/connectors";
import { useEffect, useState } from "react";

const mockConnector = mock({
    accounts: ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"], // Hardhat #0
    features: {
        reconnect: true,
    },
});

export function DevDebug() {
    const { connect, connectors } = useConnect();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;
    if (process.env.NODE_ENV !== "development") return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 p-4 bg-black/80 text-white rounded-lg text-xs">
            <p className="mb-2 font-bold text-yellow-500">Dev Tools (Test Agent)</p>
            <button
                onClick={() => connect({ connector: mockConnector })}
                className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-500 transition-colors"
            >
                Simulate Login
            </button>
        </div>
    );
}
