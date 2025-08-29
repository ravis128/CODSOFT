// components/ui/Select.jsx - Shadcn style Select
import React, { useState, useEffect } from "react";
import { ChevronDown, Check, Search, X } from "lucide-react";
import { cn } from "../../utils/cn";
import Button from "./Button";
import Input from "./Input";

const Select = React.forwardRef(({
    className,
    options = [],
    value,
    defaultValue,
    placeholder = "Select an option",
    multiple = false,
    disabled = false,
    required = false,
    label,
    description,
    error,
    searchable = false,
    clearable = false,
    loading = false,
    id,
    name,
    onChange,
    onOpenChange,
    ...props
}, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

    // Generate unique ID if not provided
    const selectId = id || `select-${Math.random()?.toString(36)?.substr(2, 9)}`;

    // Update dropdown position when opening
    useEffect(() => {
        if (isOpen && ref?.current) {
            const rect = ref.current.getBoundingClientRect();
            setDropdownPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width
            });
        }
    }, [isOpen, ref]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref?.current && !ref.current.contains(event.target)) {
                setIsOpen(false);
                onOpenChange?.(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen, ref, onOpenChange]);

    // Filter options based on search
    const filteredOptions = searchable && searchTerm
        ? options?.filter(option =>
            option?.label?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
            (option?.value && option?.value?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase()))
        )
        : options;

    // Get selected option(s) for display
    const getSelectedDisplay = () => {
        if (!value) return placeholder;

        if (multiple) {
            const selectedOptions = options?.filter(opt => value?.includes(opt?.value));
            if (selectedOptions?.length === 0) return placeholder;
            if (selectedOptions?.length === 1) return selectedOptions?.[0]?.label;
            return `${selectedOptions?.length} items selected`;
        }

        const selectedOption = options?.find(opt => opt?.value === value);
        return selectedOption ? selectedOption?.label : placeholder;
    };

    const handleToggle = () => {
        if (!disabled) {
            const newIsOpen = !isOpen;
            setIsOpen(newIsOpen);
            onOpenChange?.(newIsOpen);
            if (!newIsOpen) {
                setSearchTerm("");
            }
        }
    };

    const handleOptionSelect = (option) => {
        if (multiple) {
            const newValue = value || [];
            const updatedValue = newValue?.includes(option?.value)
                ? newValue?.filter(v => v !== option?.value)
                : [...newValue, option?.value];
            onChange?.(updatedValue);
        } else {
            onChange?.(option?.value);
            setIsOpen(false);
            onOpenChange?.(false);
        }
    };

    const handleClear = (e) => {
        e?.stopPropagation();
        onChange?.(multiple ? [] : '');
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e?.target?.value);
    };

    const isSelected = (optionValue) => {
        if (multiple) {
            return value?.includes(optionValue) || false;
        }
        return value === optionValue;
    };

    const hasValue = multiple ? value?.length > 0 : value !== undefined && value !== '';

    return (
        <div className={cn("relative", className)}>
            {label && (
                <label
                    htmlFor={selectId}
                    className={cn(
                        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block",
                        error ? "text-destructive" : "text-foreground"
                    )}
                >
                    {label}
                    {required && <span className="text-destructive ml-1">*</span>}
                </label>
            )}
            <div className="relative">
                <button
                    ref={ref}
                    id={selectId}
                    type="button"
                    className={cn(
                        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-white text-black px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        error && "border-destructive focus:ring-destructive",
                        !hasValue && "text-muted-foreground"
                    )}
                    onClick={handleToggle}
                    disabled={disabled}
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    {...props}
                >
                    <span className="flex-1 text-left">{getSelectedDisplay()}</span>
                    
                    {clearable && hasValue && !loading && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4"
                            onClick={handleClear}
                        >
                            <X className="h-3 w-3" />
                        </Button>
                    )}

                    <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
                </button>

                {/* Hidden native select for form submission */}
                <select
                    name={name}
                    value={value || ''}
                    onChange={() => { }} // Controlled by our custom logic
                    className="sr-only"
                    tabIndex={-1}
                    multiple={multiple}
                    required={required}
                >
                    <option value="">Select...</option>
                    {options?.map(option => (
                        <option key={option?.value} value={option?.value}>
                            {option?.label}
                        </option>
                    ))}
                </select>

                {/* Dropdown */}
                {isOpen && (
                    <>
                        {/* Portal-based dropdown positioned absolutely relative to viewport */}
                        <div 
                            className="dropdown-overlay bg-popover text-popover-foreground border border-border rounded-md shadow-elevation-3"
                            style={{
                                position: 'fixed',
                                top: dropdownPosition.top,
                                left: dropdownPosition.left,
                                width: dropdownPosition.width,
                                zIndex: 999999,
                                maxHeight: '300px',
                                overflow: 'auto'
                            }}
                        >
                            {searchable && (
                                <div className="p-2 border-b border-border">
                                    <div className="relative">
                                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search options..."
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                            className="pl-8"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="py-1">
                                {filteredOptions?.length === 0 ? (
                                    <div className="px-3 py-2 text-sm text-muted-foreground">
                                        {searchTerm ? 'No options found' : 'No options available'}
                                    </div>
                                ) : (
                                    filteredOptions?.map((option) => (
                                        <div
                                            key={option?.value}
                                            className={cn(
                                                "relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                                                isSelected(option?.value) && "bg-primary text-primary-foreground",
                                                option?.disabled && "pointer-events-none opacity-50"
                                            )}
                                            onClick={() => !option?.disabled && handleOptionSelect(option)}
                                        >
                                            <span className="flex-1">{option?.label}</span>
                                            {multiple && isSelected(option?.value) && (
                                                <Check className="h-4 w-4" />
                                            )}
                                            {option?.description && (
                                                <span className="text-xs text-muted-foreground ml-2">
                                                    {option?.description}
                                                </span>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
            {description && !error && (
                <p className="text-sm text-muted-foreground mt-1">
                    {description}
                </p>
            )}
            {error && (
                <p className="text-sm text-destructive mt-1">
                    {error}
                </p>
            )}
        </div>
    );
});

Select.displayName = "Select";

export default Select;