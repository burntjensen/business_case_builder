/**
 * StatBox - Display a highlighted statistic
 * 
 * @param {string} value - The stat value (e.g., "$3.2M")
 * @param {string} label - Description of the stat
 */
const StatBox = ({ value, label }) => (
  <div className="bg-brand-yellow-soft rounded-xl p-5 border border-brand-yellow/30">
    <div className="text-3xl font-bold text-brand-indigo">{value}</div>
    <div className="text-sm text-brand-indigo/70 mt-1">{label}</div>
  </div>
);

export default StatBox;
