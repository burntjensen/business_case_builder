/**
 * SectionDivider - Section header with number badge
 * 
 * @param {number|string} number - Section number
 * @param {string} title - Section title
 */
const SectionDivider = ({ number, title }) => (
  <div className="flex items-center gap-4 my-12">
    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
      {number}
    </div>
    <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
    <div className="flex-1 h-px bg-slate-200" aria-hidden="true"></div>
  </div>
);

export default SectionDivider;

