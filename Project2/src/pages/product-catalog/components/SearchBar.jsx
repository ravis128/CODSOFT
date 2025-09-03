import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, placeholder = "Search products..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Mock suggestions data
  const mockSuggestions = [
    { id: 1, text: 'iPhone 15 Pro', category: 'Electronics', type: 'product' },
    { id: 2, text: 'Samsung Galaxy S24', category: 'Electronics', type: 'product' },
    { id: 3, text: 'Nike Air Max', category: 'Footwear', type: 'product' },
    { id: 4, text: 'MacBook Pro', category: 'Electronics', type: 'product' },
    { id: 5, text: 'AirPods Pro', category: 'Electronics', type: 'product' },
    { id: 6, text: 'iPad Air', category: 'Electronics', type: 'product' },
    { id: 7, text: 'Apple Watch', category: 'Electronics', type: 'product' },
    { id: 8, text: 'Sony WH-1000XM5', category: 'Electronics', type: 'product' }
  ];

  const popularSearches = [
    'iPhone', 'Samsung', 'Nike', 'Adidas', 'MacBook', 'iPad', 'AirPods', 'PlayStation'
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef?.current && 
        !searchRef?.current?.contains(event?.target) &&
        suggestionsRef?.current &&
        !suggestionsRef?.current?.contains(event?.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setSearchTerm(value);

    if (value?.trim()?.length > 0) {
      setIsLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const filteredSuggestions = mockSuggestions?.filter(suggestion =>
          suggestion?.text?.toLowerCase()?.includes(value?.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
        setShowSuggestions(true);
        setIsLoading(false);
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
    }
  };

  const handleSearch = (term = searchTerm) => {
    if (term?.trim()) {
      onSearch(term?.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion?.text);
    handleSearch(suggestion?.text);
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      handleSearch();
    }
  };

  const handleFocus = () => {
    if (searchTerm?.trim()?.length === 0) {
      setShowSuggestions(true);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch('');
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div ref={searchRef} className="relative">
        <div className="relative">
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <Input
            type="search"
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onFocus={handleFocus}
            className="pl-10 pr-10 h-12 text-base"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>
      </div>
      {/* Search Suggestions */}
      {showSuggestions && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-1100 max-h-96 overflow-y-auto"
        >
          {isLoading ? (
            <div className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-muted-foreground">Searching...</span>
              </div>
            </div>
          ) : (
            <>
              {/* Search Results */}
              {suggestions?.length > 0 && (
                <div className="p-2">
                  <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Suggestions
                  </div>
                  {suggestions?.map((suggestion) => (
                    <button
                      key={suggestion?.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left hover:bg-muted transition-colors duration-200"
                    >
                      <Icon name="Search" size={16} className="text-muted-foreground" />
                      <div className="flex-1">
                        <div className="text-sm text-foreground">{suggestion?.text}</div>
                        <div className="text-xs text-muted-foreground">{suggestion?.category}</div>
                      </div>
                      <Icon name="ArrowUpRight" size={14} className="text-muted-foreground" />
                    </button>
                  ))}
                </div>
              )}

              {/* Popular Searches */}
              {searchTerm?.trim()?.length === 0 && (
                <div className="p-2">
                  <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Popular Searches
                  </div>
                  {popularSearches?.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick({ text: search })}
                      className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left hover:bg-muted transition-colors duration-200"
                    >
                      <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">{search}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* No Results */}
              {searchTerm?.trim()?.length > 0 && suggestions?.length === 0 && (
                <div className="p-4 text-center">
                  <Icon name="Search" size={32} className="text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No suggestions found</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Try searching for something else
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;