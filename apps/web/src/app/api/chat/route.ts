import { NextResponse } from 'next/server';
import { getICLlmReply } from '@/lib/ic-agent';

export async function POST(req: Request) {
    try {
        const { message, history, propertyContext } = await req.json();

        // System prompt to give context to the LLM
        const systemPrompt = `You are a helpful real estate assistant for a luxury property listing platform.
        You are currently assisting a potential buyer with the property: "${propertyContext.title}".
        Details:
        - Location: ${propertyContext.location}
        - Price: $${propertyContext.price}
        - Description: ${propertyContext.description}
        
        Answer questions specifically about this property. If you don't know something, suggest they schedule a visit with the agent.
        Be professional, luxurious, and helpful.`;

        // Format history for IC Canister
        const messages = [
            { role: 'system', content: systemPrompt },
            ...history.slice(-5).map((m: any) => ({
                role: m.role,
                content: m.content
            })),
            { role: 'user', content: message }
        ];

        const reply = await getICLlmReply(messages);

        return NextResponse.json({ reply });
    } catch (error) {
        console.error('Chat API error:', error);
        return NextResponse.json({
            reply: "I'm having trouble connecting to my brain on the Internet Computer. Please try again in a moment."
        }, { status: 500 });
    }
}
