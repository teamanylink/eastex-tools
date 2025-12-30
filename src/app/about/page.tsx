
import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
    title: 'About Us | Eastex Tools',
    description: 'Family-owned industrial equipment supplier in Coldspring, TX. Specializing in pipe threading equipment, refurbishment, and purchasing used tools.',
};

export default function AboutPage() {
    return (
        <div className="relative min-h-screen flex flex-col font-sans selection:bg-primary selection:text-black">
            {/* Background Dynamics */}
            <div className="fixed inset-0 pointer-events-none z-0 bg-noise opacity-40 mix-blend-overlay"></div>
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 bg-gradient-to-b from-[#050806] via-[#0a120d] to-[#050505]"></div>

            {/* Floating Ambient Effects */}
            <div className="fixed top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none z-0 animate-pulse-slow"></div>
            <div className="fixed bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

            <div className="relative z-10 flex min-h-screen flex-col">
                <Header />

                <main className="flex-grow pt-32 pb-20">
                    {/* Hero Section */}
                    <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors cursor-default">
                            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(13,242,89,0.5)]"></span>
                            <span className="text-xs font-bold text-white/90 tracking-widest uppercase">Est. 2019 • Coldspring, Texas</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.95] mb-8 drop-shadow-2xl">
                            TEXAS ROOTS. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#4dff88] to-primary">INDUSTRIAL STRENGTH.</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed">
                            We’re a family-owned operation serving the backbone of American manufacturing.
                            From pipe threaders to precision tooling, we keep the South-East powering forward.
                        </p>
                    </section>

                    {/* The Story & Location Grid */}
                    <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-32">
                        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
                            {/* Main Story Card */}
                            <div className="relative group rounded-[2.5rem] p-10 md:p-14 border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-xl overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-primary/5 transition-colors duration-700"></div>

                                <h2 className="text-3xl font-bold text-white mb-6 font-display">More Than Just a Supplier</h2>
                                <div className="space-y-6 text-lg text-white/70 leading-relaxed">
                                    <p>
                                        Making a deal here means more than just swapping cash for metal.
                                        Based in <strong>Coldspring, TX</strong>, we pride ourselves on repeat business and firm handshakes.
                                        We serve customers from all over the southern U.S. who know that when they visit our facility,
                                        they&apos;re getting quality they can trust.
                                    </p>
                                    <p>
                                        While we specialize in <strong>Pipe Threading equipment</strong>, our shop is stocked with
                                        diverse tools to support both manufacturing and service industries.
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 w-full">
                                    <Link href="/products" className="h-14 px-8 rounded-full bg-primary text-[#050505] text-base font-bold tracking-wide hover:shadow-neon hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto">
                                        Shop Inventory
                                    </Link>
                                    <Link href="/contact" className="h-14 px-8 rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-md text-base font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center w-full sm:w-auto">
                                        Contact Sales
                                    </Link>
                                </div>
                            </div>

                            {/* Quick Stats & Map Placeholder */}
                            <div className="flex flex-col gap-8">
                                {/* Map/Location Card */}
                                <div className="flex-1 relative rounded-[2.5rem] p-10 border border-white/10 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-95.13,30.59,10,0/600x400@2x?access_token=Pk.xyz')] bg-cover bg-center overflow-hidden min-h-[300px] group">
                                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500"></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                                    <div className="relative z-10 h-full flex flex-col justify-end">
                                        <h3 className="text-2xl font-bold text-white mb-2">Come Say Howdy</h3>
                                        <p className="text-white/80 mb-6">265 Evergreen Heights, Coldspring, TX 77331</p>
                                        <div className="flex gap-4">
                                            <a href="https://maps.google.com/?q=265+Evergreen+Heights,Coldspring,Texas+77331" target="_blank" className="flex-1 py-3 bg-white text-black font-bold rounded-xl text-center hover:scale-105 transition-transform">
                                                Get Directions
                                            </a>
                                            <div className="flex-1 py-3 bg-black/50 backdrop-blur-md border border-white/20 text-white font-medium rounded-xl text-center flex flex-col justify-center text-sm">
                                                <span>Mon - Fri</span>
                                                <span className="text-primary font-bold">8 AM - 5 PM</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Brands Ticker */}
                                <div className="rounded-[2.5rem] p-8 border border-white/10 bg-white/[0.02] backdrop-blur-md">
                                    <p className="text-sm font-bold text-white/40 uppercase tracking-widest text-center mb-6">Equipment We Deal In</p>
                                    <div className="flex justify-between items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                                        <span className="text-2xl font-black text-white/80">RIDGID</span>
                                        <span className="text-2xl font-black text-white/80">GREENLEE</span>
                                        <span className="text-2xl font-black text-white/80">VICTAULIC</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Refurbishment & Services Section */}
                    <section className="bg-white/[0.02] border-y border-white/5 py-32 relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px]"></div>

                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className="text-center mb-20">
                                <h2 className="text-4xl md:text-6xl font-black text-white mb-6">NEW LIFE FOR HARD-WORKING TOOLS</h2>
                                <p className="text-xl text-white/60 max-w-2xl mx-auto">
                                    Don&apos;t let good iron go to waste. Our complete refurbishment process brings tired equipment back to factory specs.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                {/* Service 1 */}
                                <div className="group p-8 rounded-3xl bg-black border border-white/10 hover:border-primary/50 hover:shadow-[0_0_50px_rgba(13,242,89,0.1)] transition-all duration-300">
                                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">Complete Refurbishment</h3>
                                    <p className="text-white/60 leading-relaxed">
                                        We strip it down, clean it up, and rebuild it better. Specialize in RIDGID 300, 535, 1224 and more.
                                    </p>
                                </div>
                                {/* Service 2 */}
                                <div className="group p-8 rounded-3xl bg-black border border-white/10 hover:border-primary/50 hover:shadow-[0_0_50px_rgba(13,242,89,0.1)] transition-all duration-300">
                                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">Fast Repairs</h3>
                                    <p className="text-white/60 leading-relaxed">
                                        Downtime is expensive. We prioritize getting your equipment back on the line with priority turnaround times.
                                    </p>
                                </div>
                                {/* Service 3 */}
                                <div className="group p-8 rounded-3xl bg-black border border-white/10 hover:border-primary/50 hover:shadow-[0_0_50px_rgba(13,242,89,0.1)] transition-all duration-300">
                                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">Parts & Accessories</h3>
                                    <p className="text-white/60 leading-relaxed">
                                        Need a part? We stock refurbished adapters, attachments, and components for major industrial brands.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Buying Process Section */}
                    <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                        <div className="relative rounded-[3rem] bg-gradient-to-b from-[#101210] to-black border border-white/10 overflow-hidden">
                            <div className="absolute top-0 right-0 p-40 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

                            <div className="relative z-10 px-8 py-20 md:p-20 text-center">
                                <div className="inline-block mb-6">
                                    <span className="py-1.5 px-4 rounded-full border border-primary/30 bg-primary/10 text-primary font-bold text-sm tracking-widest uppercase">
                                        We Buy Equipment
                                    </span>
                                </div>

                                <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                                    TURN SURPLUS INTO capital
                                </h2>

                                <p className="text-xl text-white/70 max-w-3xl mx-auto mb-16">
                                    Got old RIDGID, Greenlee, or Victaulic gear gathering dust? We buy tools in any condition, anywhere. And we handle the heavy lifting.
                                </p>

                                <div className="grid md:grid-cols-3 gap-12 text-left relative">
                                    {/* Connector Line (Desktop) */}
                                    <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -z-10"></div>

                                    {/* Step 1 */}
                                    <div className="relative group">
                                        <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-white/20 flex items-center justify-center text-2xl font-black text-primary mb-6 group-hover:scale-110 group-hover:border-primary transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] z-10">1</div>
                                        <h3 className="text-xl font-bold text-white mb-3">Strike a Deal</h3>
                                        <p className="text-white/60">Call or email us. We&apos;ll give you a fair price for your equipment, no haggling needed.</p>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="relative group">
                                        <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-white/20 flex items-center justify-center text-2xl font-black text-primary mb-6 group-hover:scale-110 group-hover:border-primary transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] z-10">2</div>
                                        <h3 className="text-xl font-bold text-white mb-3">Request Pick-up</h3>
                                        <p className="text-white/60">Fill out our simple pick-up request form. We just need the details.</p>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="relative group">
                                        <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-white/20 flex items-center justify-center text-2xl font-black text-primary mb-6 group-hover:scale-110 group-hover:border-primary transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] z-10">3</div>
                                        <h3 className="text-xl font-bold text-white mb-3">We Ship It</h3>
                                        <p className="text-white/60">Pack it up, send us a photo and dimensions. We organize and pay for the shipping.</p>
                                    </div>
                                </div>

                                <div className="mt-16 pt-16 border-t border-white/10 flex flex-col md:flex-row gap-6 justify-center items-center">
                                    <a href="mailto:sales@eastextool.com" className="btn-primary px-8 py-4 rounded-xl text-lg w-full md:w-auto flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(13,242,89,0.3)] hover:shadow-[0_0_30px_rgba(13,242,89,0.5)]">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                        Email Sales Team
                                    </a>
                                    <a href="tel:555-555-5555" className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-colors w-full md:w-auto flex items-center justify-center gap-2">
                                        <svg className="w-5 h-5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                        Call 24/7 Support
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Team & Contact Grid */}
                    <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Contact Card */}
                            <div className="lg:col-span-2 glass-panel p-10 rounded-3xl border border-white/10 relative overflow-hidden group">
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold text-white mb-8">Direct Lines</h3>
                                    <div className="grid sm:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <p className="text-xs font-bold text-primary uppercase tracking-widest">Logan Schneider</p>
                                            <a href="mailto:logan.schneider@eastextool.com" className="text-white/80 hover:text-white block transition-colors">logan.schneider@eastextool.com</a>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-xs font-bold text-primary uppercase tracking-widest">Scooter Franklin</p>
                                            <a href="mailto:scooter.franklin@eastextool.com" className="text-white/80 hover:text-white block transition-colors">scooter.franklin@eastextool.com</a>
                                        </div>
                                        <div className="space-y-2 sm:col-span-2 pt-4 border-t border-white/5">
                                            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">General Inquiries</p>
                                            <a href="mailto:sales@eastextool.com" className="text-2xl font-bold text-white hover:text-primary transition-colors">sales@eastextool.com</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Info */}
                            <div className="glass-panel p-10 rounded-3xl border border-white/10 flex flex-col justify-center items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                                    <span className="text-3xl">💳</span>
                                </div>
                                <h4 className="text-white font-bold mb-2">Secure Payments</h4>
                                <p className="text-white/50 text-sm mb-6">We accept all major credit cards.</p>
                                <div className="flex gap-2 opacity-50">
                                    <div className="w-10 h-6 bg-white/20 rounded"></div>
                                    <div className="w-10 h-6 bg-white/20 rounded"></div>
                                    <div className="w-10 h-6 bg-white/20 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </section>

                </main>

                <Footer />
            </div>
        </div>
    );
}
