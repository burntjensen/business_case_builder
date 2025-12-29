/**
 * StatBox - Display a highlighted statistic
 * 
 * @param {string} value - The stat value (e.g., "$3.2M")
 * @param {string} label - Description of the stat
 */
const StatBox = ({ value, label }) => (
  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-100">
    <div className="text-3xl font-bold text-emerald-700">{value}</div>
    <div className="text-sm text-slate-600 mt-1">{label}</div>
  </div>
);

export default StatBox;

