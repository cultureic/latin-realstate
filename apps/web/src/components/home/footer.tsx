import Link from "next/link";
import { Building2 } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground py-12 border-t border-primary-foreground/10">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Building2 className="h-6 w-6 text-secondary" />
                            <span className="font-serif text-xl font-bold">Latin Luxury</span>
                        </div>
                        <p className="text-sm text-primary-foreground/70 font-light">
                            Pioneering the future of Latin American real estate through blockchain technology.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-serif font-bold mb-4 text-secondary">Platform</h3>
                        <ul className="space-y-2 text-sm text-primary-foreground/80">
                            <li><Link href="/properties" className="hover:text-secondary transition-colors">Properties</Link></li>
                            <li><Link href="/map" className="hover:text-secondary transition-colors">Map View</Link></li>
                            <li><Link href="/technology" className="hover:text-secondary transition-colors">Technology</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-serif font-bold mb-4 text-secondary">Legal</h3>
                        <ul className="space-y-2 text-sm text-primary-foreground/80">
                            <li><Link href="/terms" className="hover:text-secondary transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="hover:text-secondary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/compliance" className="hover:text-secondary transition-colors">Compliance</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-serif font-bold mb-4 text-secondary">Connect</h3>
                        <ul className="space-y-2 text-sm text-primary-foreground/80">
                            <li><a href="#" className="hover:text-secondary transition-colors">Twitter / X</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Discord</a></li>
                            <li><a href="#" className="hover:text-secondary transition-colors">Telegram</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-xs text-primary-foreground/50">
                    <p>&copy; {new Date().getFullYear()} Latin Luxury Real Estate. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
