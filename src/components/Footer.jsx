import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const { personalInfo, socialLinks } = portfolioData;

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#07080c]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Brand */}
          <div className="space-y-1">
            <div className="font-black text-white tracking-tight text-lg">ARYAN DADWAL</div>
            <div className="font-mono text-[10px] text-white/25 tracking-[0.22em] uppercase">
              Full Stack Developer · LPU · 2026
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-5">
            {[
              { href: socialLinks.github, Icon: Github, label: 'GitHub' },
              { href: socialLinks.linkedin, Icon: Linkedin, label: 'LinkedIn' },
              { href: personalInfo.whatsAppUrl, Icon: MessageCircle, label: 'WhatsApp' },
              { href: socialLinks.email, Icon: Mail, label: 'Email' },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-white/25 hover:text-white/70 transition-colors duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-mono text-[10px] tracking-[0.22em] text-white/25 hover:text-white/60 uppercase transition-colors"
          >
            ↑ BACK TO TOP
          </button>
        </div>
      </div>
    </footer>
  );
}
