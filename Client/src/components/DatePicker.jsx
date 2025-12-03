import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { DayPicker } from 'react-day-picker';
import { format, isValid, parseISO, addMonths } from 'date-fns';
import { Calendar as CalendarIcon, X, ChevronLeft, ChevronRight, Clock, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { MONTHS } from '../utils/dateHelpers';
import 'react-day-picker/style.css';

// Create a context to pass props/state to the CustomCaption component
const DatePickerContext = createContext(null);

function CustomCaption(props) {
    const {
        currentMonth,
        setCurrentMonth,
        showMonthYearSelector,
        autoSelectMonth,
        onMonthYearSelect,
        setSelectedDate,
        onChange,
        setIsOpen
    } = useContext(DatePickerContext);

    const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
    const [selectorYear, setSelectorYear] = useState(currentMonth.getFullYear());

    // Sync selector year when currentMonth changes
    useEffect(() => {
        setSelectorYear(currentMonth.getFullYear());
    }, [currentMonth]);

    const handleMonthClick = (year, monthIndex) => {
        const targetDate = new Date(year, monthIndex, 1);
        if (autoSelectMonth) {
            setSelectedDate(targetDate);
            onChange(targetDate);
            setIsOpen(false);
        } else {
            setCurrentMonth(targetDate);
        }
        setIsMonthPickerOpen(false);
        if (onMonthYearSelect) {
            onMonthYearSelect(year, monthIndex);
        }
    };

    const handlePrevMonth = () => setCurrentMonth(addMonths(currentMonth, -1));
    const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

    const handlePrevYear = () => setSelectorYear(y => y - 1);
    const handleNextYear = () => setSelectorYear(y => y + 1);

    return (
        <div className="relative pt-1 pb-2 px-2 flex items-center justify-between">
            <div className="flex items-center">
                <button
                    type="button"
                    className={clsx(
                        "flex items-center gap-2 font-bold text-gray-900 hover:bg-gray-100 px-2 py-1 rounded-md transition-colors",
                        !showMonthYearSelector && "cursor-default hover:bg-transparent"
                    )}
                    aria-haspopup="true"
                    aria-expanded={isMonthPickerOpen}
                    onClick={() => showMonthYearSelector && setIsMonthPickerOpen(v => !v)}
                    disabled={!showMonthYearSelector}
                >
                    <span>{format(currentMonth, 'MMMM yyyy')}</span>
                    {showMonthYearSelector && (
                        <ChevronDown className={clsx("h-4 w-4 text-gray-500 transition-transform duration-200", isMonthPickerOpen && "rotate-180")} />
                    )}
                </button>
            </div>

            {!isMonthPickerOpen && (
                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="h-7 w-7 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 p-1 rounded-md transition-all text-gray-600 hover:text-primary-600 hover:shadow-sm active:scale-95 flex items-center justify-center"
                        aria-label="Previous Month"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={handleNextMonth}
                        className="h-7 w-7 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 p-1 rounded-md transition-all text-gray-600 hover:text-primary-600 hover:shadow-sm active:scale-95 flex items-center justify-center"
                        aria-label="Next Month"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            )}

            {isMonthPickerOpen && (
                <div className="absolute top-full left-0 w-full bg-white z-[60] mt-2 p-2 rounded-lg shadow-lg border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <button
                            type="button"
                            aria-label="Previous year"
                            onClick={handlePrevYear}
                            className="p-1 hover:bg-gray-100 rounded-full text-gray-600"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <div className="font-bold text-gray-900 text-lg">{selectorYear}</div>
                        <button
                            type="button"
                            aria-label="Next year"
                            onClick={handleNextYear}
                            className="p-1 hover:bg-gray-100 rounded-full text-gray-600"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        {MONTHS.map((m, idx) => {
                            const isSelected = selectorYear === currentMonth.getFullYear() && idx === currentMonth.getMonth();
                            return (
                                <button
                                    key={m}
                                    type="button"
                                    className={clsx(
                                        "px-2 py-2 text-sm rounded-md transition-colors text-center",
                                        isSelected
                                            ? "bg-primary-50 font-semibold text-primary-700 ring-1 ring-primary-200"
                                            : "text-gray-700 hover:bg-gray-100"
                                    )}
                                    onClick={() => handleMonthClick(selectorYear, idx)}
                                    aria-pressed={isSelected}
                                >
                                    {m.slice(0, 3)}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function DatePicker({
    value,
    onChange,
    label,
    id,
    placeholder = 'Select date',
    min,
    max,
    className,
    disabled = false,
    showTime = false,
    leftIcon,
    showMonthYearSelector = true,
    autoSelectMonth = false,
    onMonthYearSelect,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const containerRef = useRef(null);

    useEffect(() => {
        if (value) {
            const date = typeof value === 'string' ? parseISO(value) : value;
            if (isValid(date)) {
                setSelectedDate(date);
                setCurrentMonth(date); // Sync view to selected date
            }
        } else {
            setSelectedDate(null);
        }
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDaySelect = (date) => {
        if (!date) {
            setSelectedDate(null);
            onChange(null);
            return;
        }

        let newDate = new Date(date);

        if (showTime && selectedDate) {
            newDate.setHours(selectedDate.getHours());
            newDate.setMinutes(selectedDate.getMinutes());
        } else if (showTime && !selectedDate) {
            newDate.setHours(9);
            newDate.setMinutes(0);
        }

        setSelectedDate(newDate);
        onChange(newDate);
        if (!showTime) {
            setIsOpen(false);
        }
    };

    const handleTimeChange = (type, val) => {
        if (!selectedDate) return;
        const newDate = new Date(selectedDate);
        if (type === 'hours') newDate.setHours(parseInt(val));
        if (type === 'minutes') newDate.setMinutes(parseInt(val));
        setSelectedDate(newDate);
        onChange(newDate);
    };

    const handleClear = (e) => {
        e.stopPropagation();
        setSelectedDate(null);
        onChange(null);
    };

    const formattedValue = selectedDate
        ? format(selectedDate, showTime ? 'PPP p' : 'PPP')
        : '';

    return (
        <DatePickerContext.Provider value={{
            showMonthYearSelector,
            autoSelectMonth,
            onMonthYearSelect,
            setSelectedDate,
            onChange,
            setIsOpen,
            currentMonth,
            setCurrentMonth
        }}>
            <div className={clsx("w-full", className)} ref={containerRef}>
                {label && (
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <button
                        type="button"
                        id={id}
                        onClick={() => !disabled && setIsOpen(!isOpen)}
                        disabled={disabled}
                        className={clsx(
                            "relative w-full cursor-pointer rounded-lg bg-white py-2 text-left border border-gray-200 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 sm:text-sm transition-all",
                            leftIcon ? "pl-10 pr-10" : "pl-3 pr-10",
                            disabled && "opacity-50 cursor-not-allowed bg-gray-50"
                        )}
                        aria-haspopup="dialog"
                        aria-expanded={isOpen}
                        aria-label={label || placeholder}
                    >
                        {leftIcon && (
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                {leftIcon}
                            </span>
                        )}
                        <span className={clsx("block truncate", !selectedDate && "text-gray-400")}>
                            {formattedValue || placeholder}
                        </span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 gap-1">
                            {selectedDate && !disabled && (
                                <div
                                    role="button"
                                    onClick={handleClear}
                                    className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </div>
                            )}
                            {!selectedDate && (
                                <CalendarIcon className="h-5 w-5 text-gray-400 pointer-events-none" />
                            )}
                        </span>
                    </button>

                    {isOpen && (
                        <div className="absolute z-50 mt-2 p-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200 ring-1 ring-black/5 min-w-[320px]">
                            <DayPicker
                                mode="single"
                                selected={selectedDate}
                                onSelect={handleDaySelect}
                                disabled={disabled || (min || max ? { before: min, after: max } : undefined)}
                                showOutsideDays
                                month={currentMonth}
                                onMonthChange={setCurrentMonth}
                                className="!m-0"
                                components={{
                                    Caption: CustomCaption
                                }}
                                classNames={{
                                    // nav: "hidden", // Removed to allow fallback if custom caption fails
                                    table: "w-full border-collapse mt-2",
                                    head_row: "flex mb-2",
                                    head_cell: "text-gray-400 rounded-md w-9 font-medium text-[0.8rem] uppercase tracking-wider",
                                    row: "flex w-full mt-1",
                                    cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-primary-50 first:[&:has([aria-selected])]:rounded-l-lg last:[&:has([aria-selected])]:rounded-r-lg focus-within:relative focus-within:z-20",
                                    day: "h-9 w-9 p-0 font-medium text-gray-700 aria-selected:opacity-100 hover:bg-gray-100 rounded-lg transition-all hover:scale-105 active:scale-95",
                                    day_selected: "!bg-gradient-to-br !from-primary-500 !to-primary-600 !text-white hover:!from-primary-600 hover:!to-primary-700 shadow-md shadow-primary-500/30",
                                    day_today: "bg-gray-50 text-primary-600 font-bold border border-gray-200",
                                    day_outside: "text-gray-300 opacity-50",
                                    day_disabled: "text-gray-300 opacity-50 hover:bg-transparent cursor-not-allowed hover:scale-100",
                                    day_hidden: "invisible",
                                }}
                            />

                            {showTime && (
                                <div className="border-t border-gray-100 mt-4 pt-4 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                                        <Clock className="h-4 w-4" />
                                        <span>Time</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="relative">
                                            <select
                                                className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none cursor-pointer hover:bg-gray-100 transition-colors pr-8"
                                                value={selectedDate ? selectedDate.getHours() : 9}
                                                onChange={(e) => handleTimeChange('hours', e.target.value)}
                                                disabled={!selectedDate}
                                            >
                                                {Array.from({ length: 24 }).map((_, i) => (
                                                    <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <span className="text-gray-400 font-bold">:</span>
                                        <div className="relative">
                                            <select
                                                className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none cursor-pointer hover:bg-gray-100 transition-colors pr-8"
                                                value={selectedDate ? selectedDate.getMinutes() : 0}
                                                onChange={(e) => handleTimeChange('minutes', e.target.value)}
                                                disabled={!selectedDate}
                                            >
                                                {Array.from({ length: 60 }).map((_, i) => (
                                                    <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {showTime && (
                                <button
                                    className="w-full mt-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white py-2.5 rounded-xl text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-600/20 active:scale-[0.98]"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Done
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </DatePickerContext.Provider>
    );
}
