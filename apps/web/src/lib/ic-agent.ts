import { HttpAgent, Actor } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";

export const idlFactory = ({ IDL }: any) => {
    const role = IDL.Variant({
        'user': IDL.Null,
        'assistant': IDL.Null,
        'system': IDL.Null,
    });
    const chat_message = IDL.Record({ 'content': IDL.Text, 'role': role });
    const chat_request = IDL.Record({
        'model': IDL.Text,
        'messages': IDL.Vec(chat_message),
    });
    return IDL.Service({ 'v0_chat': IDL.Func([chat_request], [IDL.Text], []) });
};

const CANISTER_ID = "w36hm-eqaaa-aaaal-qr76a-cai";

export async function getICLlmReply(messages: any[], model: string = "llama3.1:8b") {
    const agent = new HttpAgent({ host: "https://ic0.app" });

    // Convert roles for Candid
    const formattedMessages = messages.map(m => ({
        content: m.content,
        role: { [m.role]: null }
    }));

    const actor = Actor.createActor(idlFactory, {
        agent,
        canisterId: CANISTER_ID,
    });

    try {
        const response = await (actor as any).v0_chat({
            model,
            messages: formattedMessages
        });

        // The response might be quoted text as per the Rust logic
        return response.replace(/^"|"$/g, '');
    } catch (error) {
        console.error("IC Canister Call Error:", error);
        throw error;
    }
}
