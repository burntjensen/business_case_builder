import SelectionCard from './SelectionCard';

/**
 * SelectionGroup - A container for a group of selection cards
 * 
 * @param {number} number - The selection step number
 * @param {string} question - The question/prompt for this selection
 * @param {string} field - The field name for this selection
 * @param {Array} options - Array of { value, label, description }
 * @param {*} selectedValue - The currently selected value
 * @param {function} onSelect - Selection handler (field, value) => void
 * @param {string} ariaLabel - Accessibility label for the group
 */
const SelectionGroup = ({ 
  number, 
  question, 
  field, 
  options, 
  selectedValue, 
  onSelect,
  ariaLabel,
  columns = 2
}) => (
  <div className="bg-white rounded-2xl border border-brand-indigo/20 p-6 my-8 shadow-sm">
    <div className="flex items-center gap-2 mb-4">
      <div className="w-6 h-6 rounded-full bg-brand-yellow flex items-center justify-center">
        <span className="text-brand-indigo text-xs font-bold">{number}</span>
      </div>
      <span className="font-semibold text-brand-indigo">Your Selection</span>
    </div>
    <p className="text-brand-indigo font-medium mb-4">{question}</p>
    <div 
      className={`grid gap-3 ${columns === 2 ? 'md:grid-cols-2' : columns === 3 ? 'md:grid-cols-3' : 'grid-cols-1'}`} 
      role="group" 
      aria-label={ariaLabel || question}
    >
      {options.map((option) => (
        <SelectionCard
          key={option.value}
          field={field}
          value={option.value}
          label={option.label}
          description={option.description}
          selected={selectedValue === option.value}
          onSelect={onSelect}
        />
      ))}
    </div>
  </div>
);

export default SelectionGroup;
