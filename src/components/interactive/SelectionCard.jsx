/**
 * 
 * SelectionCard - A radio-style selection card for interactive choices
 * 
 * @param {string} field - The field name this selection belongs to
 * @param {string} value - The value when selected
 * @param {string} label - Display label for the option
 * @param {string} description - Description text for the option
 * @param {boolean} selected - Whether this option is currently selected
 * @param {function} onSelect - Callback when selected (field, value) => void
 */
const SelectionCard = ({ field, value, label, description, selected, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(field, value)}
    className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
      selected
        ? "border-brand-indigo bg-brand-yellow-soft"
        : "border-brand-indigo/20 bg-white hover:border-brand-blue hover:bg-brand-yellow-soft/50"
    }`}
    aria-pressed={selected}
  >
    <div className="flex items-start gap-3">
      <div
        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${
          selected ? "border-brand-indigo bg-brand-indigo" : "border-brand-indigo/30"
        }`}
        aria-hidden="true"
      >
        {selected && (
          <svg
            className="w-3 h-3 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      <div>
        <div className="font-semibold text-brand-indigo">{label}</div>
        <div className="text-sm text-brand-indigo/70 mt-1">{description}</div>
      </div>
    </div>
  </button>
);

export default SelectionCard;
