'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle2 } from 'lucide-react';
import { createBooking, getUserByWallet, createUser } from '@/actions/property-actions';
import { useAccount } from 'wagmi';
import { Button } from './ui/button';

interface BookingCalendarProps {
    propertyId: string;
    agentId: string;
}

export function BookingCalendar({ propertyId, agentId }: BookingCalendarProps) {
    const { address, isConnected } = useAccount();
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const timeSlots = [
        '09:00 AM', '10:00 AM', '11:00 AM',
        '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
    ];

    const handleBooking = async () => {
        if (!selectedDate || !selectedTime || !isConnected || !address) return;

        setIsSubmitting(true);
        try {
            // Find or create user
            let user = await getUserByWallet(address);
            if (!user) {
                user = await createUser(address);
            }

            const scheduledAt = new Date(`${selectedDate} ${selectedTime}`);
            await createBooking(propertyId, user.id, agentId, scheduledAt);
            setIsSuccess(true);
        } catch (error) {
            console.error('Booking failed', error);
            alert('Failed to schedule meeting. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                <h3 className="text-xl font-bold text-foreground">Meeting Scheduled!</h3>
                <p className="text-muted-foreground text-sm">
                    The agent has been notified. You'll receive a confirmation soon.
                </p>
                <Button variant="outline" onClick={() => setIsSuccess(false)}>
                    Schedule Another
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h3 className="font-serif text-xl font-bold flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-secondary" />
                Schedule a Visit
            </h3>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Select Date</label>
                    <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-background border border-border p-3 rounded-md outline-none focus:ring-1 focus:ring-secondary"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Available Slots</label>
                    <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((time) => (
                            <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`p-2 text-sm rounded-md border transition-all ${selectedTime === time
                                        ? 'bg-secondary text-secondary-foreground border-secondary font-bold shadow-md'
                                        : 'bg-muted/50 text-muted-foreground border-transparent hover:border-border hover:bg-muted'
                                    }`}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>

                <Button
                    onClick={handleBooking}
                    disabled={!selectedDate || !selectedTime || !isConnected || isSubmitting}
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground h-12 text-lg font-bold"
                >
                    {isSubmitting ? 'Scheduling...' : isConnected ? 'Confirm Meeting' : 'Connect Wallet to Book'}
                </Button>
            </div>
        </div>
    );
}
