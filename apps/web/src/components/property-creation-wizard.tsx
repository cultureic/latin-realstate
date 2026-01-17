'use client';

import { useState } from 'react';
import { Search, MapPin, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

export function PropertyCreationWizard() {
    const [step, setStep] = useState(1);
    const [address, setAddress] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [aiSuggesting, setAiSuggesting] = useState(false);

    // Mocked AI suggestions
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        lat: 0,
        lng: 0
    });

    const handleAddressSearch = async () => {
        if (!address) return;
        setIsSearching(true);
        // Simulate Google Maps Autocomplete/Geocoding
        setTimeout(() => {
            setFormData(prev => ({
                ...prev,
                location: address,
                lat: 40.7128, // Mocked lat
                lng: -74.0060  // Mocked lng
            }));
            setIsSearching(false);
            setStep(2);
        }, 1500);
    };

    const handleAiEnhance = async () => {
        setAiSuggesting(true);
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: `Generate a luxury real estate title and a 3-sentence description for a property at ${formData.location}. Return it in JSON format like: {"title": "...", "description": "..."}`,
                    history: [],
                    propertyContext: {
                        title: "New Property",
                        description: "New property listing",
                        location: formData.location,
                        price: "Market Price"
                    }
                })
            });
            const data = await res.json();

            // Try to parse JSON from AI response if it follows instructions
            try {
                // Remove potential markdown code blocks
                const cleanJson = data.reply.replace(/```json|```/g, '').trim();
                const parsed = JSON.parse(cleanJson);
                setFormData(prev => ({
                    ...prev,
                    title: parsed.title,
                    description: parsed.description,
                    price: '1250000'
                }));
            } catch (e) {
                // Fallback to simple title/description split if AI just returns text
                setFormData(prev => ({
                    ...prev,
                    title: `Exclusive Residence at ${prev.location.split(',')[0]}`,
                    description: data.reply,
                    price: '1250000'
                }));
            }
        } catch (error) {
            console.error('AI Generation failed', error);
        } finally {
            setAiSuggesting(false);
        }
    };

    return (
        <div className="bg-card border rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-primary/5 p-6 border-b border-primary/10">
                <div className="flex items-center space-x-3 mb-2">
                    <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <h2 className="font-serif text-2xl font-bold">Listing Assistant Pro</h2>
                </div>
                <p className="text-muted-foreground text-sm">
                    Let AI help you create a premium listing in seconds.
                </p>
            </div>

            <div className="p-8">
                {step === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                        <div className="space-y-4">
                            <label className="text-sm font-bold uppercase tracking-widest opacity-70">Step 1: Locate Property</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Enter address or place name..."
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full bg-muted/30 border border-border p-4 pl-12 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-lg"
                                />
                            </div>
                            <div className="h-48 bg-muted/50 rounded-xl border border-dashed border-border flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=40.7128,-74.0060&zoom=13&size=600x300&key=')] bg-cover opacity-20 grayscale" />
                                <div className="z-10 text-center">
                                    <MapPin className="w-8 h-8 mx-auto mb-2 text-primary animate-bounce" />
                                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Map Preview Area</p>
                                </div>
                            </div>
                            <Button
                                onClick={handleAddressSearch}
                                disabled={!address || isSearching}
                                className="w-full h-14 text-lg font-bold group"
                            >
                                {isSearching ? <Loader2 className="animate-spin mr-2" /> : 'Select on Map & Continue'}
                                {!isSearching && <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                            </Button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-bold uppercase tracking-widest opacity-70">Step 2: AI Details Generation</label>
                            <button
                                onClick={handleAiEnhance}
                                disabled={aiSuggesting}
                                className="flex items-center text-xs font-bold text-primary hover:underline"
                            >
                                {aiSuggesting ? <Loader2 className="animate-spin mr-1 w-3 h-3" /> : <Sparkles className="mr-1 w-3 h-3" />}
                                RE-GENERATE CONTENT
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Generated Title</label>
                                <input
                                    value={formData.title}
                                    onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))}
                                    className="w-full bg-background border border-border p-3 rounded-lg font-serif text-xl font-bold"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">AI Narrative</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
                                    rows={4}
                                    className="w-full bg-background border border-border p-3 rounded-lg text-sm leading-relaxed"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Price (USDC)</label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData(p => ({ ...p, price: e.target.value }))}
                                        className="w-full bg-background border border-border p-3 rounded-lg font-bold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Location</label>
                                    <input
                                        value={formData.location}
                                        disabled
                                        className="w-full bg-muted/30 border border-border p-3 rounded-lg text-xs opacity-70"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 flex space-x-4">
                            <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
                            <Button className="flex-[2] bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12">
                                Publish Listing
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
