import { useState, useCallback } from 'react';

/**
 * useArticleSelections - Hook for managing article selections state
 * 
 * @param {Object} initialState - Initial selection values
 * @returns {Object} - { selections, handleSelect, handleEmailChange, handleSubmit, handleBack, resetSelections }
 */
const useArticleSelections = (initialState = {}) => {
  const [selections, setSelections] = useState({
    ...initialState,
    email: '',
    submitted: false,
  });

  const handleSelect = useCallback((field, value) => {
    setSelections((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleEmailChange = useCallback((email) => {
    setSelections((prev) => ({ ...prev, email }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (selections.email && selections.email.includes('@')) {
      setSelections((prev) => ({ ...prev, submitted: true }));
      return true;
    }
    return false;
  }, [selections.email]);

  const handleBack = useCallback(() => {
    setSelections((prev) => ({ ...prev, submitted: false }));
  }, []);

  const resetSelections = useCallback(() => {
    setSelections({
      ...initialState,
      email: '',
      submitted: false,
    });
  }, [initialState]);

  return {
    selections,
    handleSelect,
    handleEmailChange,
    handleSubmit,
    handleBack,
    resetSelections,
  };
};

export default useArticleSelections;

