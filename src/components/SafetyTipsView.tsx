import React, { useState } from 'react';
import { 
  PhoneCall, 
  Copy, 
  Check, 
  HeartPulse, 
  Droplets,
  ShieldCheck
} from 'lucide-react';
import { FloodSafetyBasicsBanner } from './FloodSafetyBasicsBanner';

export const SafetyTipsView: React.FC = () => {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  const handleCopy = (number: string) => {
    navigator.clipboard.writeText(number);
    setCopiedNumber(number);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  const emergencyContacts = [
    {
      name: 'Kerala State Disaster Management Authority (KSDMA)',
      number: '1070',
      description: 'State Emergency Operations Centre (SEOC) 24x7 Toll Free',
    },
    {
      name: 'Malappuram District Emergency Operation Centre (DEOC)',
      number: '1077',
      altNumber: '0483-2736920',
      description: 'District Collectorate Malappuram Control Room',
    },
    {
      name: 'National Emergency Response Support System (ERSS)',
      number: '112',
      description: 'All-in-one Police, Fire & Emergency SOS',
    },
    {
      name: 'Fire & Rescue Services',
      number: '101',
      description: 'Boat rescue teams, tree fall clearing, river rescue',
    },
    {
      name: 'Ambulance Emergency Medical Services',
      number: '108',
      description: 'Medical rescue and hospital dispatch',
    },
    {
      name: 'Childline & Student Emergency',
      number: '1098',
      description: 'Emergency assistance for stranded schoolchildren',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* High-Tech Futuristic Flood Safety Basics Digital Banner */}
      <FloodSafetyBasicsBanner />

      {/* Post-Flood Health Advisory & Water Sanitation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl holo-panel space-y-4 border border-emerald-500/30">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <HeartPulse className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white font-mono">
              Kerala Health Advisory: Leptospirosis &amp; Infection Prevention
            </h3>
          </div>
          <ul className="space-y-3.5 text-xs text-slate-300 leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-400 font-bold font-mono">01.</span>
              <span><strong className="text-emerald-200">Rat Fever (Leptospirosis) Prophylaxis:</strong> Anyone who stepped into flood water or muddy slush must take <strong>Doxycycline 200mg</strong> once a week as recommended by the Kerala Health Department. Leptospira bacteria enter through microscopic skin abrasions.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-400 font-bold font-mono">02.</span>
              <span><strong className="text-emerald-200">Wound Hygiene:</strong> Wash any scratches or cuts immediately with clean water and antiseptic. Never allow open cuts to remain exposed to stagnant mud.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-400 font-bold font-mono">03.</span>
              <span><strong className="text-emerald-200">Early Medical Attention:</strong> Seek instant medical consultation if developing sudden fever, severe muscle pain (especially calves), or reddish eye inflammation.</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl holo-panel space-y-4 border border-cyan-500/30">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <Droplets className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white font-mono">
              Drinking Water Safety &amp; Campus Sanitation
            </h3>
          </div>
          <ul className="space-y-3.5 text-xs text-slate-300 leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="text-cyan-400 font-bold font-mono">01.</span>
              <span><strong className="text-cyan-200">Super-Chlorinate Drinking Water:</strong> Bleach and chlorinate all campus wells and storage sumps (2.5 grams of bleaching powder per 1,000 litres of water) before drawing water.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-cyan-400 font-bold font-mono">02.</span>
              <span><strong className="text-cyan-200">Roll-Boil Water for 20 Minutes:</strong> Filter and roll-boil all water used for drinking, cooking, or tooth-brushing to eliminate water-borne enteric viruses and cholera.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-cyan-400 font-bold font-mono">03.</span>
              <span><strong className="text-cyan-200">Disinfect Mud &amp; Silt:</strong> Use bleaching powder and chlorine solution to sanitize floors, benches, and toilets to eradicate fungal growth and coliform bacteria.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Emergency Helpline Directory */}
      <div className="p-6 rounded-2xl holo-panel space-y-4 border border-cyan-500/30">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">
              Emergency Helpline Directory (Kerala &amp; Malappuram)
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
            24x7 Hotlines
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {emergencyContacts.map((contact, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-colors space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="text-xs font-bold text-white font-mono">{contact.name}</div>
                <div className="text-[11px] text-slate-400">{contact.description}</div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <div className="text-base font-extrabold font-mono text-cyan-300">
                  {contact.number}
                  {contact.altNumber && (
                    <span className="text-xs font-normal text-slate-400 block font-mono">
                      {contact.altNumber}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(contact.number)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Copy number"
                  >
                    {copiedNumber === contact.number ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <a
                    href={`tel:${contact.number}`}
                    className="px-2.5 py-1 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-[11px] font-mono text-cyan-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <PhoneCall className="w-3 h-3" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
