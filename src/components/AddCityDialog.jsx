import React, { useState, useEffect, useMemo } from 'react';
import { formatInTimeZone } from 'date-fns-tz';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Globe, Plus, ArrowLeft, Clock, Info, Map, MapPin } from 'lucide-react';
import { CONTINENTS, TIMEZONE_DATA } from '../data/timezones';
import { useLanguage } from '../i18n/LanguageContext';
import './AddCityDialog.css';

const AddCityDialog = ({ isOpen, onClose, onAddCity }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState('continent'); // continent, country, city
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Flattened city list for search
  const allCities = useMemo(() => {
    const list = [];
    Object.entries(TIMEZONE_DATA).forEach(([continentId, continentData]) => {
      continentData.countries.forEach(country => {
        country.cities.forEach(city => {
          list.push({
            ...city,
            countryName: country.name,
            continentId: continentId
          });
        });
      });
    });
    return list;
  }, []);

  const filteredCities = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    
    // Filter first
    const results = allCities.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.countryName.toLowerCase().includes(q)
    );
    
    // Sort
    results.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      
      const aStarts = aName.startsWith(q);
      const bStarts = bName.startsWith(q);
      
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      
      return aName.localeCompare(bName);
    });
    
    return results.slice(0, 20); // Limit results for performance
  }, [searchQuery, allCities]);
  
  // Manual entry state removed

  const reset = () => {
    setStep('continent');
    setSelectedContinent(null);
    setSelectedCountry(null);
    setSearchQuery('');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleAdd = (cityData) => {
    try {
      formatInTimeZone(new Date(), cityData.timezone, 'HH:mm');
      onAddCity(cityData);
      handleClose();
    } catch (e) {
      alert('Invalid timezone format. Please double check!');
    }
  };

  // useLocalTimezone removed

  const currentCountries = selectedContinent ? TIMEZONE_DATA[selectedContinent]?.countries || [] : [];
  const currentCities = selectedCountry ? selectedCountry.cities || [] : [];

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <motion.div 
        className="modal-content" 
        onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
      >
        <div className="modal-header">
          <div className="header-left">
            {(step !== 'continent' || searchQuery) && (
              <button className="back-btn" onClick={() => {
                if (searchQuery) {
                  setSearchQuery('');
                } else {
                  if (step === 'country') setStep('continent');
                  if (step === 'city') setStep('country');
                }
              }}>
                <ArrowLeft size={18} />
              </button>
            )}
            <h3>
              {searchQuery ? 'Search Results' : (
                <>
                  {step === 'continent' && 'Select Continent'}
                  {step === 'country' && `${CONTINENTS.find(c => c.id === selectedContinent)?.name || ''} - Select Country`}
                  {step === 'city' && `${selectedCountry?.name || ''} - Select City`}
                </>
              )}
            </h3>
          </div>
          <button className="close-btn" onClick={handleClose}><X size={20} /></button>
        </div>

        <div className="search-bar-container">
          <div className="search-input-wrapper glass">
            <Globe size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder={t('searchCity')} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery('')}>
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        <div className="modal-body">
          <AnimatePresence mode="wait">
            {searchQuery ? (
              <motion.div 
                key="search"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="selection-list"
              >
                {filteredCities.length > 0 ? (
                  filteredCities.map(city => (
                    <button 
                      key={`${city.continentId}-${city.id}`} 
                      className="select-list-item"
                      onClick={() => handleAdd({
                        name: city.name,
                        country: city.countryName,
                        timezone: city.tz,
                        continentId: city.continentId
                      })}
                    >
                      <div className="item-info" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <MapPin size={16} color="var(--text-secondary)" />
                        <span className="item-name">{city.name}</span>
                        <span className="item-sub-info">{city.countryName}</span>
                      </div>
                      <Plus size={16} className="add-icon" />
                    </button>
                  ))
                ) : (
                  <div className="no-results">
                    <p>{t('noResults')} "{searchQuery}"</p>
                  </div>
                )}
              </motion.div>
            ) : (
              <React.Fragment>
                {step === 'continent' && (
                  <motion.div 
                    key="continent"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="selection-grid"
                  >
                    {CONTINENTS.map(continent => (
                      <button 
                        key={continent.id} 
                        className="select-item continent-item"
                        onClick={() => {
                          setSelectedContinent(continent.id);
                          setStep('country');
                        }}
                      >
                        <span className="continent-icon">{continent.icon}</span>
                        <span className="item-name">{continent.name}</span>
                        <ChevronRight size={16} className="arrow" />
                      </button>
                    ))}
                  </motion.div>
                )}

                {step === 'country' && (
                  <motion.div 
                    key="country"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="selection-list"
                  >
                    {currentCountries.map(country => (
                      <button 
                        key={country.id} 
                        className="select-list-item"
                        onClick={() => {
                          setSelectedCountry(country);
                          setStep('city');
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Map size={18} color="var(--accent-color)" opacity={0.7} />
                          <span className="item-name">{country.name}</span>
                        </div>
                        <ChevronRight size={16} />
                      </button>
                    ))}
                  </motion.div>
                )}

                {step === 'city' && (
                  <motion.div 
                    key="city"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="selection-list"
                  >
                    {currentCities.map(city => (
                      <button 
                        key={city.id} 
                        className="select-list-item"
                        onClick={() => handleAdd({
                          name: city.name,
                          country: selectedCountry.name,
                          timezone: city.tz,
                          continentId: selectedContinent
                        })}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <MapPin size={18} color="var(--text-secondary)" opacity={0.7} />
                          <span className="item-name">{city.name}</span>
                        </div>
                        <Plus size={16} className="add-icon" />
                      </button>
                    ))}
                  </motion.div>
                )}

                {/* Manual form removed */}
              </React.Fragment>
            )}
          </AnimatePresence>
        </div>
      </motion.div>


    </div>
  );
};

export default AddCityDialog;
