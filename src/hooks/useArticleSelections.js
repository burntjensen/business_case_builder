import { useState, useCallback } from 'react';
import { submitToHubSpot } from '../utils/submitToHubSpot';

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

  const handleSubmit = useCallback(async () => {
    if (selections.email && selections.email.includes('@')) {
      // Submit to HubSpot (fire-and-forget)
      submitToHubSpot(selections).then((result) => {
        if (result.success) {
          console.log('Successfully submitted to HubSpot');
          // Push event to GTM data layer
          if (window.dataLayer) {
            window.dataLayer.push({
              event: 'form_submission',
              form_name: 'business_case_builder',
              employee_size: selections.employeeSize,
              primary_goal: selections.primaryGoal,
            });
          }
        } else {
          console.error('HubSpot submission failed:', result.error);
        }
      });
      
      // Update UI immediately (don't wait for HubSpot)
      setSelections((prev) => ({ ...prev, submitted: true }));
      return true;
    }
    return false;
  }, [selections]);

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

