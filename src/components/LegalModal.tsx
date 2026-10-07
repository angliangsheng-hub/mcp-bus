import React from 'react';
import { X, Shield, Phone, Mail, MapPin } from 'lucide-react';

interface LegalModalProps {
  topic: string | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ topic, onClose }) => {
  if (!topic) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
        <div className="bg-[#4a154b] text-white p-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-300" />
            <span>{topic}</span>
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-purple-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 max-h-[60vh] overflow-y-auto text-xs sm:text-sm text-slate-700 space-y-3">
          {topic === 'Privacy Policy' && (
            <>
              <p>
                SBS Transit Ltd is committed to safeguarding your personal data in compliance with the Singapore Personal Data Protection Act 2012 (PDPA).
              </p>
              <p>
                We collect personal information solely for purpose of journey planning, customer assistance inquiries, transit card transactions, and enhancing transport network reliability.
              </p>
              <p className="text-slate-500 text-xs">
                For questions regarding data protection, please contact our Data Protection Officer at dpo@sbstransit.com.sg.
              </p>
            </>
          )}

          {topic === 'Terms of Use' && (
            <>
              <p>
                By accessing SBS Transit digital services and NextBus live timings portal, you agree to comply with our Terms of Use and Conditions of Carriage.
              </p>
              <p>
                Arrival times are estimates calculated using real-time GPS telemetry from Land Transport Authority (LTA) Datamall. Actual timings may vary depending on road traffic conditions, weather events, and passenger boarding dwell times.
              </p>
            </>
          )}

          {topic === 'Contact Us' && (
            <div className="space-y-3">
              <p>Have an inquiry or feedback about SBS Transit bus or train services?</p>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-800">
                  <Phone className="w-4 h-4 text-[#ff5722]" />
                  <span>Customer Relations Hotline: <strong>1800-287 2727</strong> (Daily 7:30am - 8:00pm)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-800">
                  <Mail className="w-4 h-4 text-[#ff5722]" />
                  <span>Email: <strong>customercare@sbstransit.com.sg</strong></span>
                </div>
                <div className="flex items-center gap-2 text-slate-800">
                  <MapPin className="w-4 h-4 text-[#ff5722]" />
                  <span>Headquarters: 205 Braddell Road, Singapore 579701</span>
                </div>
              </div>
            </div>
          )}

          {topic === 'Sitemap' && (
            <div className="space-y-2 text-xs">
              <p className="font-semibold text-slate-900">SBS Transit Portal Directory:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                <li>Bus: Service Information, Wheelchair-Accessible Bus Services, NextBus Arrival Timings</li>
                <li>Rail: North East Line, Downtown Line, Sengkang & Punggol LRT</li>
                <li>Corporate: About Us, Board of Directors, Sustainability Commitments</li>
                <li>Career: Join Us as Bus Captain, Station Manager, Rail Engineer</li>
              </ul>
            </div>
          )}
        </div>

        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#4a154b] text-white rounded text-xs font-bold hover:bg-[#5e196c] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
