import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Shield, FileText, Music, Zap, Volume2, Trello, BarChart3, Users, Sparkles, Cloud, Gauge } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FloatHeading } from "@/components/ui/ScrollFloat";

export const metadata: Metadata = {
  title: "Pr3sence - Discord Presence & Engagement Bot | GrayVally Apps",
  description: "Make every Discord entrance unforgettable with Pr3sence. Custom sounds, TTS announcements, intelligent leveling, and server personality profiles.",
};

export default function DiscordBotPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <NavBar />
      <main className="w-full">
        {/* Hero Section */}
        <section className="relative px-4 py-16 sm:py-24 overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-cyan-400 mb-6">
                  ✨ Revolutionary Bot
                </span>
                <FloatHeading as="h1" className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                  Pr3sence <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Makes Every Entrance Unforgettable</span>
                </FloatHeading>
                <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                  Transform your Discord community with personalized voice experiences. From custom join sounds to intelligent leveling, Pr3sence makes your server more interactive, fun, and alive.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <a
                    href="https://discord.com/oauth2/authorize?client_id=1409228713949663444"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold transition-colors transition-transform transition-shadow hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <Sparkles className="h-5 w-5" />
                    Invite Pr3sence to Your Server
                  </a>
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                    Easy to Set Up
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    Highly Customizable
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                    Always Reliable
                  </div>
                </div>
              </div>

              {/* Bot Logo */}
              <div className="flex justify-center md:justify-end">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <Image
                      src="/pr3sence.png"
                      alt="Pr3sence Bot Logo"
                      width={280}
                      height={280}
                      className="drop-shadow-2xl rounded-3xl"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="relative px-4 py-16 sm:py-24 border-t border-border bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent">
          <div className="max-w-6xl mx-auto">
            <FloatHeading as="h2" className="text-3xl sm:text-4xl font-bold text-center mb-4">Powerful Features</FloatHeading>
            <p className="text-center text-text-secondary mb-12 max-w-2xl mx-auto">Everything you need to make your Discord server unforgettable</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Custom Join Sounds */}
              <div className="group p-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-cyan-500/20 text-cyan-400 group-hover:text-cyan-300">
                    <Music className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <FloatHeading as="h3" className="font-semibold mb-2">Custom Join Sounds</FloatHeading>
                    <p className="text-sm text-text-secondary">Upload personal MP3 / WAV / OGG join sounds. Set, change, or reset your sound anytime. Perfect for intros, memes, or signature themes.</p>
                  </div>
                </div>
              </div>

              {/* Text-to-Speech */}
              <div className="group p-6 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400 group-hover:text-blue-300">
                    <Volume2 className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <FloatHeading as="h3" className="font-semibold mb-2">Text-to-Speech Announcements</FloatHeading>
                    <p className="text-sm text-text-secondary">Hear your name spoken when you join a voice channel. Powered by Google Translate TTS, supports multiple languages with clean, real-time voice output.</p>
                  </div>
                </div>
              </div>

              {/* Follow Mode */}
              <div className="group p-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-cyan-500/20 text-cyan-400 group-hover:text-cyan-300">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <FloatHeading as="h3" className="font-semibold mb-2">Follow Mode</FloatHeading>
                    <p className="text-sm text-text-secondary">Automatically follows members across voice channels. No manual summoning required. Keep up with the action effortlessly.</p>
                  </div>
                </div>
              </div>

              {/* Smart Commands */}
              <div className="group p-6 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400 group-hover:text-blue-300">
                    <Trello className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <FloatHeading as="h3" className="font-semibold mb-2">Smart Slash Commands</FloatHeading>
                    <p className="text-sm text-text-secondary"><code className="text-xs bg-background px-1.5 py-0.5 rounded">/setsound</code> <code className="text-xs bg-background px-1.5 py-0.5 rounded">/mytts</code> <code className="text-xs bg-background px-1.5 py-0.5 rounded">/volume</code> <code className="text-xs bg-background px-1.5 py-0.5 rounded">/rank</code> <code className="text-xs bg-background px-1.5 py-0.5 rounded">/leaderboard</code></p>
                  </div>
                </div>
              </div>

              {/* Server Personalities */}
              <div className="group p-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-cyan-500/20 text-cyan-400 group-hover:text-cyan-300">
                    <Users className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <FloatHeading as="h3" className="font-semibold mb-2">Intelligent Server Profiles</FloatHeading>
                    <p className="text-sm text-text-secondary">Pr3sence analyzes your server and assigns personalities: Night Owls, Early Birds, Chatters, Loudmouths, Balanced, Weekend Warriors, Workaholics.</p>
                  </div>
                </div>
              </div>

              {/* XP & Leveling */}
              <div className="group p-6 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400 group-hover:text-blue-300">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <FloatHeading as="h3" className="font-semibold mb-2">XP & Leveling System</FloatHeading>
                    <p className="text-sm text-text-secondary">Earn XP from messages (15–25 XP, 60s cooldown) and voice chat (5 XP/min). Progressive leveling with level-up announcements and visual rank cards.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* XP System Details */}
        <section className="relative px-4 py-16 sm:py-24">
          <div className="max-w-6xl mx-auto">
            <FloatHeading as="h2" className="text-3xl sm:text-4xl font-bold text-center mb-12">Advanced Progression System</FloatHeading>

            <div className="grid md:grid-cols-2 gap-8">
              {/* XP Earnings */}
              <div className="p-8 rounded-xl border border-cyan-500/20 bg-cyan-500/5">
                <FloatHeading as="h3" className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-cyan-400" />
                  How XP Is Earned
                </FloatHeading>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">💬</div>
                    <div>
                      <p className="font-medium">Messages</p>
                      <p className="text-sm text-text-secondary">15–25 XP with 60-second cooldown</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">🎤</div>
                    <div>
                      <p className="font-medium">Voice Chat</p>
                      <p className="text-sm text-text-secondary">5 XP per minute (AFK excluded)</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 rounded-lg bg-background border border-cyan-500/10">
                  <p className="text-sm text-text-secondary">Leveling becomes progressively more challenging as you advance, keeping competition exciting!</p>
                </div>
              </div>

              {/* Visual Rank Cards */}
              <div className="p-8 rounded-xl border border-blue-500/20 bg-blue-500/5">
                <FloatHeading as="h3" className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-blue-400" />
                  Visual Rank Cards
                </FloatHeading>
                <div className="space-y-4">
                  <p className="text-text-secondary">The <code className="text-xs bg-background px-2 py-1 rounded">/rank</code> command generates a stunning card showing:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400"></div>
                      User avatar & identity
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400"></div>
                      Level badge & XP progress bar
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400"></div>
                      Server ranking position
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400"></div>
                      Total messages & voice time
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Features */}
        <section className="relative px-4 py-16 sm:py-24 border-t border-border bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-cyan-500/20 text-cyan-400 mb-4">
                  <Shield className="h-6 w-6" />
                </div>
                <FloatHeading as="h3" className="font-semibold mb-2">Admin & Moderation</FloatHeading>
                <p className="text-sm text-text-secondary">Manage user join sounds, view custom sound users, and maintain server-wide control.</p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-blue-500/20 text-blue-400 mb-4">
                  <Cloud className="h-6 w-6" />
                </div>
                <FloatHeading as="h3" className="font-semibold mb-2">Cloud-Ready & Scalable</FloatHeading>
                <p className="text-sm text-text-secondary">Optional Supabase integration. Designed for multi-server deployments with reliable storage.</p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-cyan-500/20 text-cyan-400 mb-4">
                  <Gauge className="h-6 w-6" />
                </div>
                <FloatHeading as="h3" className="font-semibold mb-2">Stability & Performance</FloatHeading>
                <p className="text-sm text-text-secondary">Optimized memory usage, improved error handling, and stable voice connections built for long-running servers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative px-4 py-16 sm:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <FloatHeading as="h2" className="text-3xl sm:text-4xl font-bold mb-6">Ready to Transform Your Discord Server?</FloatHeading>
            <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              Add Pr3sence today and watch your community come alive with personalized voice experiences, engaging leveling, and intelligent server analytics.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://discord.com/oauth2/authorize?client_id=1409228713949663444"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold transition-colors transition-transform transition-shadow hover:scale-105 shadow-lg"
              >
                <Sparkles className="h-5 w-5" />
                Invite Now
              </a>
            </div>
          </div>
        </section>

        {/* Footer Links */}
        <section className="relative px-4 py-12 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/apps/discord-bot/terms-of-service"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-500/50 text-cyan-400 font-medium transition-colors"
              >
                <FileText className="h-4 w-4" />
                Terms of Service
              </Link>
              <Link
                href="/apps/discord-bot/privacy-policy"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-500/50 text-cyan-400 font-medium transition-colors"
              >
                <Shield className="h-4 w-4" />
                Privacy Policy
              </Link>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

