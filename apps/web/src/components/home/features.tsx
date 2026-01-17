import { ShieldCheck, Coins, Globe2 } from "lucide-react";

const features = [
    {
        title: "Tokenized Ownership",
        description: "Fractionalize real estate assets on the Celo blockchain for accessible investment.",
        icon: Coins,
    },
    {
        title: "Instant Liquidity",
        description: "Trade your property tokens instantly on our decentralized marketplace.",
        icon: Globe2,
    },
    {
        title: "Legal Compliance",
        description: "Fully compliant legal framework bridging DeFi with real-world assets.",
        icon: ShieldCheck,
    },
];

export function Features() {
    return (
        <section className="py-24 bg-muted/30">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16 underline-offset-4">
                    <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight mb-4 text-primary">
                        Why Choose Latin Luxury?
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
                        We bridge the gap between traditional real estate and decentralized finance.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 bg-card rounded-lg border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="mb-6 inline-block p-4 rounded-full bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                                <feature.icon className="w-8 h-8" />
                            </div>
                            <h3 className="font-serif text-xl font-bold mb-3 text-card-foreground">
                                {feature.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
