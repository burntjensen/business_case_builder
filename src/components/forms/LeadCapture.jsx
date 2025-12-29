/**
 * LeadCapture - Email capture form with CTA
 * 
 * @param {string} title - Form title
 * @param {string} description - Form description
 * @param {string} buttonText - Submit button text
 * @param {string} email - Current email value
 * @param {function} onEmailChange - Email change handler
 * @param {function} onSubmit - Submit handler
 * @param {Array} secondaryLinks - Array of { href, text } for secondary CTAs
 */
const LeadCapture = ({ 
  title, 
  description, 
  buttonText = "Submit",
  email,
  onEmailChange,
  onSubmit,
  secondaryLinks = []
}) => {
  const isValidEmail = email && email.includes('@');
  
  return (
    <div className="bg-white rounded-2xl border-2 border-brand-yellow p-8 my-12">
      <h3 className="text-2xl font-bold text-brand-indigo mb-4">{title}</h3>
      {description && (
        <p className="text-brand-indigo/70 mb-6">{description}</p>
      )}
      
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          placeholder="Enter your work email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg border border-brand-indigo/30 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
          aria-label="Work email address"
        />
        <button
          type="button"
          onClick={onSubmit}
          disabled={!isValidEmail}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            isValidEmail
              ? "bg-brand-indigo text-white hover:bg-brand-blue"
              : "bg-brand-indigo/20 text-brand-indigo/40 cursor-not-allowed"
          }`}
        >
          {buttonText}
        </button>
      </div>
      
      {secondaryLinks.length > 0 && (
        <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-brand-indigo/10">
          <div className="text-sm text-brand-indigo/50">Or:</div>
          {secondaryLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-brand-blue hover:text-brand-indigo font-medium"
            >
              {link.text} →
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeadCapture;
