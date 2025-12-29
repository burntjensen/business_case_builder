/**
 * CodeBlock - Display code/formula blocks
 * 
 * @param {ReactNode} children - Code content
 * @param {string} comment - Optional comment/label
 */
const CodeBlock = ({ children, comment }) => (
  <div className="bg-slate-100 rounded-xl p-6 my-6 font-mono text-sm">
    {comment && (
      <p className="text-slate-500 mb-2">// {comment}</p>
    )}
    {children}
  </div>
);

export default CodeBlock;

