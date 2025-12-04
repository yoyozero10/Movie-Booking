import { Mail, Phone, MapPin, Send, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast.success('Message sent successfully! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSubmitting(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16 animate-fade-in">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="apple-text-gradient font-display">Get In Touch</span>
                    </h1>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contact Form */}
                    <div className="lg:col-span-2 animate-slide-right">
                        <div className="apple-glass rounded-3xl p-8 md:p-12">
                            <h2 className="text-2xl font-bold text-white mb-6 font-display">Send us a Message</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-white/80 mb-2 font-medium">Your Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="auth-input-field"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white/80 mb-2 font-medium">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="auth-input-field"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-white/80 mb-2 font-medium">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="auth-input-field"
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white/80 mb-2 font-medium">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className="auth-input-field resize-none"
                                        placeholder="Tell us more about your inquiry..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full apple-button py-4 rounded-2xl font-medium text-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5 mr-3" />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6 animate-slide-left">
                        {/* Contact Cards */}
                        <div className="apple-glass rounded-2xl p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-apple-blue/20 flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6 text-apple-blue" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-1">Email</h3>
                                    <p className="text-white/60 text-sm">support@cinemavision.com</p>
                                    <p className="text-white/60 text-sm">info@cinemavision.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="apple-glass rounded-2xl p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-6 h-6 text-green-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-1">Phone</h3>
                                    <p className="text-white/60 text-sm">+84 (028) 1234 5678</p>
                                    <p className="text-white/60 text-sm">+84 (028) 8765 4321</p>
                                </div>
                            </div>
                        </div>

                        <div className="apple-glass rounded-2xl p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-1">Address</h3>
                                    <p className="text-white/60 text-sm">123 Cinema Street</p>
                                    <p className="text-white/60 text-sm">District 1, Ho Chi Minh City</p>
                                    <p className="text-white/60 text-sm">Vietnam</p>
                                </div>
                            </div>
                        </div>

                        <div className="apple-glass rounded-2xl p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-6 h-6 text-orange-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-1">Business Hours</h3>
                                    <p className="text-white/60 text-sm">Monday - Friday: 9AM - 10PM</p>
                                    <p className="text-white/60 text-sm">Saturday - Sunday: 10AM - 11PM</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="apple-glass rounded-2xl p-6">
                            <h3 className="font-semibold text-white mb-4">Follow Us</h3>
                            <div className="flex gap-3">
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 flex items-center justify-center transition-colors"
                                >
                                    <Facebook className="w-5 h-5 text-blue-400" />
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 flex items-center justify-center transition-colors"
                                >
                                    <Instagram className="w-5 h-5 text-pink-400" />
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 flex items-center justify-center transition-colors"
                                >
                                    <Twitter className="w-5 h-5 text-sky-400" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="mt-16 animate-scale-in delay-400">
                    <div className="apple-glass rounded-3xl p-4 overflow-hidden">
                        <div className="aspect-video bg-gradient-to-br from-apple-blue/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                            <div className="text-center">
                                <MapPin className="w-16 h-16 text-white/30 mx-auto mb-4" />
                                <p className="text-white/60">Map integration coming soon</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
