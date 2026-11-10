import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  Filter, 
  ArrowUpDown, 
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';
import { EventCategory, EventFilterState } from '../../types/events';

interface EventFilterBarProps {
  filterState: EventFilterState;
  onFilterChange: (newFilters: Partial<EventFilterState>) => void;
  onResetFilters: () => void;
  totalResults: number;
}

const CATEGORIES: EventCategory[] = [
  'All',
  'Conferences',
  'Corporate Galas',
  'Luxury Hospitality',
  'Private Events',
  'Exhibitions'
];

export const EventFilterBar: React.FC<EventFilterBarProps> = ({
  filterState,
  onFilterChange,
  onResetFilters,
  totalResults
}) => {
  const [searchInput, setSearchInput] = useState(filterState.searchQuery);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== filterState.searchQuery) {
        onFilterChange({ searchQuery: searchInput });
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [searchInput, filterState.searchQuery, onFilterChange]);

  // Synchronize if filterState resets
  useEffect(() => {
    setSearchInput(filterState.searchQuery);
  }, [filterState.searchQuery]);

  const hasActiveFilters = 
    filterState.category !== 'All' || 
    filterState.status !== 'All' || 
    filterState.searchQuery.trim() !== '' || 
    filterState.sortBy !== 'date-asc';

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4">
      
      {/* Top Row: Search Input + Status Filter + Sort Dropdown */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Search Bar with clear button */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by event title, location, landmark, or keyword..."
            className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm focus:bg-white focus:border-[#0A192F] focus:outline-none transition-all placeholder:text-slate-400"
          />
          {searchInput && (
            <button
              onClick={() => {
                setSearchInput('');
                onFilterChange({ searchQuery: '' });
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition-colors"
              title="Clear search"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Status Toggle & Sort */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Status Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200">
            {(['All', 'Upcoming', 'Past'] as const).map((status) => (
              <button
                key={status}
                onClick={() => onFilterChange({ status })}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterState.status === status
                    ? 'bg-[#0A192F] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {status === 'Past' ? 'Past Portfolio' : status}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative flex items-center">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 absolute left-3 pointer-events-none" />
            <select
              value={filterState.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
              className="pl-8 pr-8 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-bold appearance-none cursor-pointer focus:outline-none transition-colors"
            >
              <option value="date-asc">Date: Soonest First</option>
              <option value="date-desc">Date: Latest First</option>
              <option value="capacity-desc">Capacity: High to Low</option>
              <option value="featured">Featured First</option>
            </select>
          </div>

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="px-3 py-2 rounded-xl bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}

        </div>

      </div>

      {/* Bottom Row: Category Pills Scrollable Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar border-t border-slate-100">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0 flex items-center gap-1 mr-1">
          <Filter className="w-3.5 h-3.5" /> Category:
        </span>

        {CATEGORIES.map((cat) => {
          const isSelected = filterState.category === cat;
          return (
            <button
              key={cat}
              onClick={() => onFilterChange({ category: cat })}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md shadow-pink-600/20'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/60'
              }`}
            >
              {cat}
            </button>
          );
        })}

        <div className="ml-auto text-xs font-semibold text-slate-500 shrink-0 pl-2">
          Showing <span className="font-bold text-[#0A192F]">{totalResults}</span> {totalResults === 1 ? 'event' : 'events'}
        </div>
      </div>

    </div>
  );
};

