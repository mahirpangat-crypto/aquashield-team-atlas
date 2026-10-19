import React from 'react';
import { 
  Users, 
  Award, 
  Terminal, 
  ChevronRight,
  Sparkles,
  GraduationCap
} from 'lucide-react';
import atlasAvatar from '../assets/images/team_atlas_avatar.jpg';

interface AboutViewProps {
  onOpenDeployModal: () => void;
  onNavigateToSimulator: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onOpenDeployModal,
  onNavigateToSimulator,
}) => {
  const teamMembers = [
    {
      name: 'Mahir',
      classGrade: 'Class 8',
    },
    {
      name: 'Shisna',
      classGrade: 'Class 9',
    },
    {
      name: 'Asil',
      classGrade: 'Class 10',
    },
    {
      name: 'Shidha',
      classGrade: 'Class 10',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Top Header Card */}
      <div className="p-6 sm:p-8 rounded-2xl holo-panel border border-cyan-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative group shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2.5px] bg-gradient-to-tr from-cyan-400 via-teal-300 to-emerald-400 shadow-[0_0_30px_rgba(6,182,212,0.6)] ring-1 ring-cyan-400/50">
                <img
                  src={atlasAvatar}
                  alt="AQUASHIELD FloodGuard System Official Team Atlas Emblem"
                  className="w-full h-full rounded-full object-cover bg-[#050B14]"
                />
              </div>
              <span className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-emerald-400 border-2 border-[#050B14] rounded-full shadow-[0_0_10px_#34d399] animate-pulse" />
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/70 px-3 py-1 rounded-full border border-cyan-500/40">
                <Award className="w-3.5 h-3.5 text-cyan-400" />
                <span>School Science & Technology Fair 2026 · Malappuram</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans flex items-center gap-2.5">
                <Users className="w-6 h-6 text-cyan-400" />
                <span>Team Atlas · Student Research Squad</span>
              </h2>
              <p className="text-xs sm:text-sm font-mono text-cyan-300">
                Classes 8, 9 &amp; 10 · Malappuram, Kerala
              </p>
            </div>
          </div>

          <button
            onClick={onOpenDeployModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 text-xs font-mono text-cyan-300 transition-colors cursor-pointer self-start sm:self-auto shadow-[0_0_15px_rgba(6,182,212,0.2)]"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>View Run & Deploy Instructions</span>
          </button>
        </div>

        {/* Student Profiles Grid - Clean cards with Name and Class */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-all flex items-center justify-between group shadow-sm hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-mono font-bold text-base shadow-[0_0_12px_rgba(6,182,212,0.3)] group-hover:scale-105 group-hover:border-cyan-400 transition-all">
                  {member.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {member.name}
                  </div>
                  <div className="text-xs font-mono text-slate-400 flex items-center gap-1 mt-0.5">
                    <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Student Researcher</span>
                  </div>
                </div>
              </div>

              <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                {member.classGrade}
              </span>
            </div>
          ))}
        </div>

        {/* Mentor Attribution Bar */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <strong>Faculty &amp; Science Department Mentor:</strong> Mrs. Radhika M., PGT Physics &amp; Environmental Studies
          </div>
          <span className="font-mono text-cyan-400">Malappuram Educational District, Kerala</span>
        </div>
      </div>

      {/* Science Fair Presentation & Judge Rubric */}
      <div className="p-6 sm:p-8 rounded-2xl holo-panel border border-cyan-500/30 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base sm:text-lg font-bold text-white font-mono">
              Science Fair Presentation &amp; Defense Summary
            </h3>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-500/30 self-start sm:self-auto">
            Team Atlas Defense Dossier
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="text-xs font-mono text-cyan-400 uppercase font-semibold">
                1. Novelty &amp; Originality
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Unlike existing municipal setups that broadcast broad district-level alerts hours later, AquaShield provides <strong>hyper-local, sub-kilometer early warning</strong> directly tailored to school compound elevations and student commute arteries.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="text-xs font-mono text-cyan-400 uppercase font-semibold">
                2. Technical &amp; Scientific Rigor
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Combines hydrostatic river elevation with dynamic rational runoff modeling ($Q = C \cdot I \cdot A$). The interactive simulator demonstrates how varying soil saturation accelerates overtopping crest times from 14 hours down to less than 1 hour during cloudbursts.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="text-xs font-mono text-cyan-400 uppercase font-semibold">
                3. Zero-Cost Open Access
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Built strictly using open-source tools: React, TypeScript, Leaflet, and open Esri/OSM aerial tile servers. It requires <strong>no paid Google Maps API keys</strong>, no proprietary subscriptions, and runs smoothly on computers, tablets, and smartphones.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-end">
          <button
            onClick={onNavigateToSimulator}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            <span>Launch Flood Simulator Demo</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
