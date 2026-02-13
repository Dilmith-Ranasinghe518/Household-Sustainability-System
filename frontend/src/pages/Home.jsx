import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Recycle, Globe, Users } from 'lucide-react';
import { Link } from 'react-router-dom';


const Home = () => {
    const features = [
        { icon: <Zap />, title: 'Energy Tracking', desc: 'Monitor your electricity and gas usage in real-time.' },
        { icon: <Recycle />, title: 'Waste Management', desc: 'Get smart tips on composting and recycling effectively.' },
        { icon: <Globe />, title: 'Carbon Footprint', desc: 'Calculate and offset your household emissions.' },
        { icon: <Users />, title: 'Community Impact', desc: 'See how your neighborhood is making a difference.' }
    ];

    return (
        <div className="overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="min-h-screen pt-[120px] relative flex items-center overflow-hidden bg-off-white">
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                    <div className="absolute rounded-full blur-[80px] opacity-15 w-[500px] h-[500px] bg-primary-teal -top-[100px] -right-[100px]"></div>
                    <div className="absolute rounded-full blur-[80px] opacity-15 w-[400px] h-[400px] bg-forest-dark -bottom-[50px] -left-[50px]"></div>
                </div>

                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-[650px]"
                    >
                        <span className="inline-block px-5 py-2 bg-teal-soft-bg text-teal-hover rounded-full font-semibold text-sm mb-6 tracking-wide uppercase">Welcome to the Future</span>
                        <h1 className="text-[3.5rem] leading-[1.1] mb-6 text-forest-dark font-bold">Lead a <span className="bg-gradient-to-r from-primary-teal to-bright-teal bg-clip-text text-transparent">Greener</span> Life with Data</h1>
                        <p className="text-xl text-text-muted mb-10 leading-relaxed">Sustaincity helps you track, manage, and improve your household's environmental impact through smart analytics and community insights.</p>
                        <div className="flex flex-wrap gap-5">
                            <Link to="/register" className="flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all bg-forest-dark text-white shadow-[0_10px_25px_rgba(15,46,36,0.2)] hover:bg-deep-eco hover:-translate-y-0.5 hover:shadow-[0_15px_30px_rgba(15,46,36,0.3)]">
                                Start Free Trial <ArrowRight size={20} />
                            </Link>
                            <Link to="/login" className="flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all bg-white text-forest-dark border border-border hover:bg-off-white hover:border-text-muted hover:-translate-y-0.5">
                                View Demo
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex justify-center items-center"
                    >
                        <div className="w-full max-w-[450px] rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] border-4 border-forest-dark backdrop-blur-md bg-white/70">
                            <div className="p-4 bg-forest-dark flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                            </div>
                            <div className="p-8 bg-white">
                                <div className="grid grid-cols-2 gap-6 mb-8">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-text-muted uppercase tracking-wide mb-2">Sustainability Score</span>
                                        <strong className="text-2xl text-forest-dark">84/100</strong>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-text-muted uppercase tracking-wide mb-2">CO2 Saved</span>
                                        <strong className="text-2xl text-forest-dark">12.4 kg</strong>
                                    </div>
                                </div>
                                <div className="h-[150px] flex items-end gap-3 pt-4 border-t border-border">
                                    <div className="flex-1 bg-primary-teal rounded-t transition-all duration-1000 min-h-[20%]" style={{ height: '40%' }}></div>
                                    <div className="flex-1 bg-primary-teal rounded-t transition-all duration-1000 min-h-[20%]" style={{ height: '60%' }}></div>
                                    <div className="flex-1 bg-primary-teal rounded-t transition-all duration-1000 min-h-[20%]" style={{ height: '50%' }}></div>
                                    <div className="flex-1 bg-primary-teal rounded-t transition-all duration-1000 min-h-[20%]" style={{ height: '80%' }}></div>
                                    <div className="flex-1 bg-primary-teal rounded-t transition-all duration-1000 min-h-[20%]" style={{ height: '45%' }}></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-[100px] bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-[700px] mx-auto mb-16">
                        <h2 className="text-[2.5rem] font-bold mb-4 text-forest-dark">Everything you need for a <span className="text-primary-teal">Sustainable Home</span></h2>
                        <p className="text-lg text-text-muted">Powerful tools designed to make environmental responsibility easy and rewarding.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-10 rounded-3xl bg-off-white transition-all border border-transparent hover:bg-white hover:border-teal-soft-bg hover:-translate-y-2 hover:shadow-lg"
                            >
                                <div className="w-14 h-14 bg-teal-soft-bg text-primary-teal rounded-2xl flex items-center justify-center mb-6 text-3xl">
                                    {React.cloneElement(feature.icon, { size: 28 })}
                                </div>
                                <h3 className="mb-4 text-xl font-bold text-forest-dark">{feature.title}</h3>
                                <p className="text-text-muted leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-[100px]">
                <div className="container mx-auto px-6">
                    <div className="bg-gradient-to-br from-forest-dark to-deep-eco py-20 px-8 rounded-[2rem] text-center text-white">
                        <h2 className="text-white text-5xl font-bold mb-6">Ready to make an impact?</h2>
                        <p className="text-xl mb-10 opacity-90 max-w-[600px] mx-auto">Join thousands of households making the world a better place, one small step at a time.</p>
                        <Link to="/register" className="inline-block px-8 py-4 rounded-full font-semibold text-lg transition-all bg-warm-yellow text-forest-dark shadow-[0_8px_20px_rgba(250,204,21,0.3)] hover:bg-golden-accent hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(250,204,21,0.4)]">
                            Join the Community
                        </Link>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default Home;
