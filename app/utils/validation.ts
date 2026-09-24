export interface ValidationResult {
    isValid: boolean;
    error?: string;
}

export function validateAmount(
    amount: number, 
    fieldName: string = "Amount", 
    minAmount: number = 0, 
    maxAmount: number = 1000000000, 
    allowZero: boolean = false
): ValidationResult {
    if (isNaN(amount) || !isFinite(amount)) return { isValid: false, error: "Invalid numeric input." };
    
    if (!allowZero && amount <= 0) {
        return { isValid: false, error: `${fieldName} must be greater than ₹0.` };
    }
    if (allowZero && amount < 0) {
        return { isValid: false, error: `${fieldName} cannot be negative.` };
    }
    if (amount > 0 && amount < minAmount) {
        return { isValid: false, error: `Minimum ${fieldName.toLowerCase()} is ₹${minAmount.toLocaleString('en-IN')}.` };
    }
    if (amount > maxAmount) {
        return { isValid: false, error: `Maximum ${fieldName.toLowerCase()} is ₹${maxAmount.toLocaleString('en-IN')}.` };
    }
    return { isValid: true };
}

export function validateRate(rate: number, minRate: number = 0, maxRate: number = 50, fieldName: string = "Interest rate"): ValidationResult {
    if (isNaN(rate) || !isFinite(rate)) return { isValid: false, error: "Invalid numeric input." };
    
    if (rate < minRate || rate > maxRate) {
        return { isValid: false, error: `${fieldName} must be between ${minRate}% and ${maxRate}%.` };
    }
    return { isValid: true };
}

export function validateTenure(
    value: number, 
    min: number = 1, 
    max: number = 600, 
    unit: string = "months", 
    fieldName: string = "Tenure"
): ValidationResult {
    if (isNaN(value) || !isFinite(value)) return { isValid: false, error: "Invalid numeric input." };
    
    if (value <= 0) {
        return { isValid: false, error: `${fieldName} must be greater than 0.` };
    }
    if (value < min || value > max) {
        return { isValid: false, error: `${fieldName} must be between ${min} and ${max} ${unit}.` };
    }
    return { isValid: true };
}

export function validateAge(currentAge: number, retirementAge: number, minAge: number = 1, maxAge: number = 100): ValidationResult {
    if (isNaN(currentAge) || isNaN(retirementAge)) return { isValid: false, error: "Invalid numeric input." };
    
    if (currentAge < minAge || currentAge > maxAge) {
        return { isValid: false, error: `Current age must be between ${minAge} and ${maxAge}.` };
    }
    if (retirementAge <= currentAge) {
        return { isValid: false, error: "Retirement age must be greater than current age." };
    }
    if (retirementAge > maxAge) {
         return { isValid: false, error: `Retirement age cannot exceed ${maxAge}.` };
    }
    return { isValid: true };
}
