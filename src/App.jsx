import React, { useState, useEffect, useMemo } from 'react';
import { formatInTimeZone } from 'date-fns-tz';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { Globe, Plus, Trash2, RotateCcw, Clock, Sun, Moon, Info, GripHorizontal } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import AddCityDialog from './components/AddCityDialog';
import BackgroundEffects from './components/BackgroundEffects';
import { useLanguage } from './i18n/LanguageContext';
import './App.css';

const CONTINENT_ORDER = ['north-america', 'south-america', 'europe', 'asia', 'oceania', 'others'];
const TRACK_WIDTH = 4032; // 14 days * 24 hours * 12px per hour
const TOTAL_MINUTES = 20160; // 14 days * 1440 minutes

const CONTINENT_COLORS = {
  'north-america': '#ff4d4d', // Vibrant Red
  'south-america': '#ff9f43', // Warm Orange
  'europe': '#feca57',        // Sunshine Amber
  'asia': '#1dd1a1',         // Lush Green
  'oceania': '#48dbfb',       // Sky Blue
  'others': '#a29bfe'         // Soft Purple
};

const CONTINENT_NAMES = {
  'asia': 'Asia',
  'europe': 'Europe',
  'north-america': 'North America',
  'south-america': 'South America',
  'oceania': 'Oceania',
  'others': 'Others / ME'
};

const DEFAULT_CITIES = [
  { id: '1', name: 'Seoul', timezone: 'Asia/Seoul', country: 'South Korea', continentId: 'asia' },
  { id: '2', name: 'London', timezone: 'Europe/London', country: 'United Kingdom', continentId: 'europe' },
  { id: '3', name: 'New York', timezone: 'America/New_York', country: 'United States', continentId: 'north-america' },
  { id: '4', name: 'Singapore', timezone: 'Asia/Singapore', country: 'Singapore', continentId: 'asia' },
  { id: '5', name: 'Tokyo', timezone: 'Asia/Tokyo', country: 'Japan', continentId: 'asia' },
  { id: '6', name: 'Paris', timezone: 'Europe/Paris', country: 'France', continentId: 'europe' },
  { id: '7', name: 'Sydney', timezone: 'Australia/Sydney', country: 'Australia', continentId: 'oceania' },
  { id: '8', name: 'Dubai', timezone: 'Asia/Dubai', country: 'UAE', continentId: 'others' },
  { id: '9', name: 'Sao Paulo', timezone: 'America/Sao_Paulo', country: 'Brazil', continentId: 'south-america' },
];

function App() {
  const { language, setLanguage, t } = useLanguage();
  
  const [cities, setCities] = useState(() => {
    const saved = localStorage.getItem('global-calc-cities');
    return saved ? JSON.parse(saved) : DEFAULT_CITIES;
  });
  const [baseCityId, setBaseCityId] = useState(() => {
    const saved = localStorage.getItem('global-calc-base-city');
    return saved ? saved : (DEFAULT_CITIES[0].id);
  });
  const [minutesOffset, setMinutesOffset] = useState(() => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Persistence
  useEffect(() => {
    localStorage.setItem('global-calc-cities', JSON.stringify(cities));
  }, [cities]);

  useEffect(() => {
    localStorage.setItem('global-calc-base-city', baseCityId);
  }, [baseCityId]);

  const baseCity = useMemo(() => {
    let city = cities.find(c => c.id === baseCityId);
    if (!city && cities.length > 0) return cities[0];
    return city || DEFAULT_CITIES[0];
  }, [cities, baseCityId]);

  // Sorting is now handled by drag and drop (order in array)

  const baseDate = useMemo(() => {
    const now = new Date();
    // Get start of today in base timezone
    const dateStr = formatInTimeZone(now, baseCity.timezone, 'yyyy-MM-dd');
    const offsetStr = formatInTimeZone(now, baseCity.timezone, 'XXX'); 
    const midnightBaseIso = `${dateStr}T00:00:00${offsetStr}`;
    const midnightDate = new Date(midnightBaseIso);
    
    // Add minutesOffset
    return new Date(midnightDate.getTime() + minutesOffset * 60000);
  }, [minutesOffset, baseCity]);

  const timelineDays = useMemo(() => {
    const days = [];
    const now = new Date();
    const dateStr = formatInTimeZone(now, baseCity.timezone, 'yyyy-MM-dd');
    const offsetStr = formatInTimeZone(now, baseCity.timezone, 'XXX'); 
    const midnightBaseIso = `${dateStr}T00:00:00${offsetStr}`;
    const midnightDate = new Date(midnightBaseIso);

    // Native Localized Formatters
    const dateFormatter = new Intl.DateTimeFormat(language, { month: 'short', day: 'numeric' });
    const dayFormatter = new Intl.DateTimeFormat(language, { weekday: 'short' });

    for (let i = 0; i < 14; i++) { // Extend to 14 days
        const d = new Date(midnightDate.getTime() + i * 86400000); // add days
        days.push({
            dateStr: dateFormatter.format(d),
            dayStr: dayFormatter.format(d),
            isToday: i === 0,
            fullDate: d
        });
    }
    return days;
  }, [baseCity.timezone, language]);

  const isBaseDayTime = useMemo(() => {
    const baseHour24 = parseInt(formatInTimeZone(baseDate, baseCity.timezone, 'HH'));
    return baseHour24 >= 6 && baseHour24 < 18;
  }, [baseDate, baseCity]);

  // Force sorting by time (west to east chronologically)
  const sortedCities = useMemo(() => {
    return [...cities].sort((a, b) => {
      const offsetA = parseInt(formatInTimeZone(new Date(), a.timezone, 'xxxx'), 10);
      const offsetB = parseInt(formatInTimeZone(new Date(), b.timezone, 'xxxx'), 10);
      return offsetA - offsetB;
    });
  }, [cities]);

  // Global Theme Sync
  useEffect(() => {
    if (isBaseDayTime) {
      document.body.classList.add('global-day-theme');
    } else {
      document.body.classList.remove('global-day-theme');
    }
  }, [isBaseDayTime]);



  const removeCity = (id) => {
    setCities(cities.filter(c => c.id !== id));
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement required before drag starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setCities((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Motion value for timeline synchronization
  const x = useMotionValue(0);
  
  useEffect(() => {
    // Current minutes to X position: (minutes / totalMinutes) * -trackWidth
    const newX = (minutesOffset / TOTAL_MINUTES) * -TRACK_WIDTH;
    x.set(newX);
  }, [minutesOffset]);

  return (
    <>
      <BackgroundEffects isDay={isBaseDayTime} />
      <div className="app-container">
        <header style={{ textAlign: 'center', marginBottom: '2.5rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, right: 0 }}>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              background: 'var(--card-bg)', color: 'var(--text-primary)', border: '2px solid #000',
              padding: '6px 12px', borderRadius: '12px', cursor: 'pointer', outline: 'none', fontSize: '0.9rem',
              transition: 'all 0.3s'
            }}
          >
            <option value="en" style={{ color: 'black' }}>English</option>
            <option value="ko" style={{ color: 'black' }}>한국어</option>
            <option value="ja" style={{ color: 'black' }}>日本語</option>
            <option value="zh-CN" style={{ color: 'black' }}>简体中文</option>
            <option value="zh-TW" style={{ color: 'black' }}>繁體中文</option>
            <option value="es" style={{ color: 'black' }}>Español</option>
            <option value="de" style={{ color: 'black' }}>Deutsch</option>
          </select>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="logo"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
        >
          <Globe size={40} className="glow-text" />
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700 }}>
            {t('appTitle')} <span className="glow-text">{t('appTitleHighlight')}</span>
          </h1>
        </motion.div>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontWeight: 300 }}>
          {t('appSubtitle')}
        </p>
      </header>

      <main style={{ flex: 1 }}>
        <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem', marginBottom: '1.5rem' }}>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            style={{ 
              background: 'linear-gradient(135deg, var(--accent-color), #7f5af0)', 
              color: 'white', 
              border: '2px solid #000', 
              padding: '1rem 2.5rem', 
              borderRadius: '30px', 
              cursor: 'pointer', 
              fontWeight: 700,
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 10px 20px rgba(100, 200, 255, 0.2)'
            }}
          >
            <Plus size={24} />
            {t('addCity')}
          </motion.button>
          
          {/* Continent Legend */}
          <div className="continent-legend glass">
            {CONTINENT_ORDER.map(id => (
              <div key={id} className="legend-item">
                <span className="color-dot" style={{ backgroundColor: CONTINENT_COLORS[id], boxShadow: `0 0 10px ${CONTINENT_COLORS[id]}` }}></span>
                <span className="legend-name">{t('continents', id) || CONTINENT_NAMES[id]}</span>
              </div>
            ))}
          </div>

          {/* Golden Time Recommendation removed */}
        </section>

        <div className="cities-grid">
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={sortedCities.map(c => c.id)}
              strategy={rectSortingStrategy}
            >
              <AnimatePresence mode="popLayout">
                {sortedCities.map((city, index) => (
                  <SortableCityCard 
                    key={city.id} 
                    city={city} 
                    baseDate={baseDate} 
                    onRemove={() => removeCity(city.id)} 
                    onSetBase={() => setBaseCityId(city.id)}
                    isBase={city.id === baseCityId}
                    index={index}
                    continentColor={CONTINENT_COLORS[city.continentId || 'others']}
                  />
                ))}
              </AnimatePresence>
            </SortableContext>
          </DndContext>
        </div>
      </main>

      <footer className="glass" style={{ position: 'sticky', bottom: '2rem', marginTop: '3rem', padding: '1.5rem', borderRadius: '25px', zIndex: 100 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={28} color="var(--accent-color)" />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>{t('baseTime')}</span>
                <span style={{ fontWeight: 800, fontSize: '2.5rem', letterSpacing: '-1px', lineHeight: '1.2' }}>
                  <span style={{ color: 'var(--accent-color)' }}>{formatInTimeZone(baseDate, baseCity.timezone, 'yyyy-MM-dd')}</span>
                  <span style={{ color: 'var(--text-primary)', marginLeft: '8px' }}>{formatInTimeZone(baseDate, baseCity.timezone, 'HH:mm')}</span>
                  <span style={{ color: 'var(--text-primary)', marginLeft: '12px', fontSize: '1.4rem', fontWeight: 600 }}>({baseCity.name})</span>
                </span>
              </div>
            </div>
            <button 
              onClick={() => {
                const now = new Date();
                const h = parseInt(formatInTimeZone(now, baseCity.timezone, 'H'));
                const m = parseInt(formatInTimeZone(now, baseCity.timezone, 'm'));
                setMinutesOffset(h * 60 + m); // Set to today's current time
              }}
              style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)', padding: '5px 15px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              <RotateCcw size={14} /> {t('currentTime')}
            </button>
          </div>
          
          <div className="premium-timeline-outer glass">
            <div className="custom-timeline-container">
              <motion.div 
                className="timeline-scroll-wrapper"
                drag="x"
                dragConstraints={{ left: -TRACK_WIDTH, right: 0 }}
                style={{ x }}
                onDrag={(event, info) => {
                  const currentX = x.get();
                  const percentage = Math.abs(currentX / TRACK_WIDTH);
                  const newOffset = Math.round((percentage * TOTAL_MINUTES) / 10) * 10;
                  if (newOffset >= 0 && newOffset <= TOTAL_MINUTES) {
                    setMinutesOffset(newOffset);
                  }
                }}
              >
                {/* Labels and Ticks move together */}
                <div className="timeline-labels-inner">
                  {timelineDays.map((day, dIdx) => (
                    <div key={dIdx} className="day-label-group">
                      <span className={`day-title ${day.isToday ? 'today' : ''}`}>{day.dateStr}</span>
                    </div>
                  ))}
                </div>
                
                <div className="timeline-scroll-track">
                  {timelineDays.map((day, idx) => (
                    <div key={idx} className="timeline-day-block">
                      <div className="time-ticks">
                        {[...Array(24)].map((_, h) => (
                          <div key={h} className={`tick ${h % 6 === 0 ? 'major' : ''}`}>
                            {h % 6 === 0 && <span className="tick-label">{h}h</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Fixed Glass Indicator */}
              <div className="fixed-time-indicator">
                <div className="indicator-line"></div>
                <div className="indicator-glass-card">
                  <span className="current-time-tooltip">{formatInTimeZone(baseDate, baseCity.timezone, 'HH:mm')}</span>
                </div>
              </div>

              {/* Keep the native range hidden but synced for ARIA/Accessibility */}
              <input 
                type="range" 
                min="0" 
                max={TOTAL_MINUTES} 
                step="10"
                value={minutesOffset} 
                onChange={(e) => setMinutesOffset(parseInt(e.target.value))}
                className="timeline-slider-hidden"
              />
            </div>
          </div>
        </div>
      </footer>

      <AddCityDialog 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onAddCity={(cityData) => {
          // Robust Duplicate Check
          const isDuplicate = cities.some(
            c => (c.name.toLowerCase() === cityData.name.toLowerCase() && c.timezone === cityData.timezone) ||
                 (c.timezone === cityData.timezone && c.name.toLowerCase() === cityData.name.toLowerCase())
          );

          if (isDuplicate) {
            alert(`${cityData.name} ${t('alreadyAdded')}`);
            return;
          }

          setCities([...cities, {
            id: Date.now().toString(),
            name: cityData.name,
            country: cityData.country,
            timezone: cityData.timezone,
            continentId: cityData.continentId
          }]);
        }}
      />
      </div>
    </>
  );
}

function SortableCityCard({ city, baseDate, onRemove, onSetBase, isBase, index, continentColor }) {
  const { t } = useLanguage();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: city.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 2 : 1,
  };

  const timeStr = formatInTimeZone(baseDate, city.timezone, 'hh:mm');
  const ampm = formatInTimeZone(baseDate, city.timezone, 'aa');
  const dateStr = formatInTimeZone(baseDate, city.timezone, 'MMM d (eee)');
  const hour24 = parseInt(formatInTimeZone(baseDate, city.timezone, 'HH'));

  // Get status
  let status = 'business';
  let statusColor = '#2ecc71'; 
  let statusText = t('statusWorking');

  if (hour24 >= 8 && hour24 < 18) {
    status = 'business';
    statusColor = '#2ecc71';
    statusText = t('statusWorking');
  } else if (hour24 >= 18 && hour24 < 22) {
    status = 'evening';
    statusColor = '#f39c12';
    statusText = t('statusEvening');
  } else if (hour24 >= 22 || hour24 < 6) {
    status = 'night';
    statusColor = '#9b59b6';
    statusText = t('statusNight');
  } else {
    status = 'morning';
    statusColor = '#3498db';
    statusText = t('statusMorning');
  }

  const isDayTime = hour24 >= 6 && hour24 < 18;
  const themeClass = isDayTime ? 'theme-day' : 'theme-night';

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      key={city.id}
      ref={setNodeRef}
      className={`glass city-card ${themeClass} ${isDragging ? 'dragging' : ''}`}
      style={{ 
        ...style,
        padding: '1.2rem', 
        borderRadius: '24px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0.8rem',
        borderLeft: `5px solid ${continentColor}`,
        position: 'relative',
        transition: transition || 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
          <button 
            onClick={onSetBase}
            style={{ 
              background: 'transparent', border: 'none', cursor: 'pointer', padding: '0 4px',
              fontSize: '1.1rem', opacity: isBase ? 1 : 0.4,
              filter: isBase ? 'drop-shadow(0 0 5px gold)' : 'none',
              transform: isBase ? 'scale(1.2)' : 'scale(0.9)',
              transition: 'all 0.2s', marginTop: '1px'
            }}
            title={isBase ? "Current Base City" : "Set as Base City"}
          >
            📌
          </button>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600, color: isBase ? 'var(--accent-color)' : 'var(--text-primary)', transition: 'color 0.3s' }}>{city.name}</h3>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{city.country}</p>
          </div>
        </div>
        <button 
          onClick={onRemove}
          className="remove-btn"
          style={{ background: 'transparent', border: 'none', color: '#ff4b4b', cursor: 'pointer', padding: '5px', borderRadius: '50%', display: 'flex', opacity: 0.6 }}
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
        <span className="time-text" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', transition: 'color 0.3s' }}>{timeStr}</span>
        <span className="ampm-text" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', transition: 'color 0.3s' }}>{ampm}</span>
      </div>

      <div className="date-str-text" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', transition: 'color 0.3s' }}>
        {dateStr}
      </div>
    </motion.div>
  );
}

export default App;
