import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-slate-900 text-white px-4 py-16">
      <div className="max-w-2xl w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-8 shadow-xl">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        <span className="block text-xs uppercase tracking-widest font-semibold text-amber-400 mb-2">
          HTTP 404 • Page Not Found
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          This Destination is Off the Blueprint
        </h1>
        <p className="text-slate-400 text-lg mb-8 max-w-lg mx-auto">
          The requested URL does not exist or has been relocated within the Brentra Ventures ecosystem. Let us guide you back to our primary divisions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-left">
          <Link
            to="/bentra-facility"
            className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-500/40 transition-all flex items-center justify-between group"
          >
            <div>
              <div className="font-semibold text-white group-hover:text-amber-400 transition-colors">
                Brentra Facility Services
              </div>
              <div className="text-xs text-slate-400">Doorstep AC, water tank & home care in Patna</div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            to="/realty-infrastructure"
            className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-500/40 transition-all flex items-center justify-between group"
          >
            <div>
              <div className="font-semibold text-white group-hover:text-amber-400 transition-colors">
                Realty & Infrastructure
              </div>
              <div className="text-xs text-slate-400">Architectural construction from ₹1,900/sq.ft.</div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            to="/events-hospitality"
            className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-500/40 transition-all flex items-center justify-between group"
          >
            <div>
              <div className="font-semibold text-white group-hover:text-amber-400 transition-colors">
                Events & Luxury Hospitality
              </div>
              <div className="text-xs text-slate-400">Conclaves, banquets & royal wedding decors</div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            to="/it-digital"
            className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-500/40 transition-all flex items-center justify-between group"
          >
            <div>
              <div className="font-semibold text-white group-hover:text-amber-400 transition-colors">
                IT & Cloud Engineering
              </div>
              <div className="text-xs text-slate-400">Enterprise software, ERP & digital growth</div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-500 text-slate-950 font-semibold hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
          >
            <Home className="w-4 h-4" />
            Back to Corporate Home
          </Link>

          <a
            href={SITE_CONFIG.contacts.phoneTel}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-500 font-medium transition-colors"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            Call Patna Support ({SITE_CONFIG.contacts.phoneFormatted})
          </a>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Brentra Ventures • Headquarters: {SITE_CONFIG.headquarters.fullFormatted}
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

