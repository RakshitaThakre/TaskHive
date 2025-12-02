import React, { useState } from 'react';
import { Sparkles, Loader } from 'lucide-react';
import './AISuggestions.css';

function AISuggestions({ apiUrl }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);


  const fetchSuggestions = async () => {
    setLoading(true);
    
    try {
      const response = await fetch(`${apiUrl}/ai/suggestions`);
      const data = await response.json();
      setSuggestions(data.suggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      
 
      setSuggestions([
        "Organize your project folder structure",
        "Write documentation for your current project",
        "Learn one new React hook today"
      ]);
      setShowSuggestions(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-suggestions-section">
      <button
        className="ai-button"
        onClick={fetchSuggestions}
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader size={18} className="spinner" />
            Getting Suggestions...
          </>
        ) : (
          <>
            <Sparkles size={18} />
            Get AI Suggestions
          </>
        )}
      </button>

      {/* Show suggestions if available */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-box">
          <h3 className="suggestions-title">✨ AI Suggestions</h3>
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="suggestion-item">
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AISuggestions;