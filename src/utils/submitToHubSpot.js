/**
 * Submit form data to HubSpot Forms API
 * 
 * @param {Object} selections - User selections from the form
 * @returns {Promise<Object>} - Response from HubSpot API
 */
export const submitToHubSpot = async (selections) => {
  const PORTAL_ID = '4467140';
  const FORM_GUID = '923d640c-d921-434d-9202-9dee5b1e7e9c';
  
  const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_GUID}`;
  
  // Map selections to HubSpot fields (using GTM__ prefix pattern)
  const fields = [
    {
      name: 'email',
      value: selections.email || '',
    },
    {
      name: 'gtm_program_goal',
      value: selections.primaryGoal || '',
    },
    {
      name: 'gtm__employee_size',
      value: selections.employeeSize || '',
    },
    {
      name: 'gtm__program_type',
      value: selections.programType || '',
    },
    {
      name: 'gtm__participants',
      value: selections.audienceSize || '',
    },
    {
      name: 'gtm__matching_type',
      value: selections.matchingApproach || '',
    },
    {
      name: 'gtm__measurement',
      value: selections.measurementFocus || '',
    },
    {
      name: 'gtm__timeline',
      value: selections.timeline || '',
    },
  ];
  
  // Add context information
  const context = {
    pageUri: window.location.href,
    pageName: document.title,
  };
  
  const requestBody = {
    fields,
    context,
  };
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HubSpot API error: ${errorData.message || response.statusText}`);
    }
    
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Failed to submit to HubSpot:', error);
    return { success: false, error: error.message };
  }
};

export default submitToHubSpot;

