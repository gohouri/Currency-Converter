/**
 * Currency Converter Application
 * 
 * This application demonstrates:
 * 1. Display output to the screen (Browser HTML/DOM)
 * 2. Native Array ES6 functions (map, filter, reduce, find, some, every, forEach, sort)
 * 3. Recursion (compound interest calculator)
 * 4. External JavaScript library (Chart.js for data visualization)
 * 5. Exception handling (try/catch/throw)
 * 6. DOM manipulation with CSS styling
 */

// ============================================================
// EXCHANGE RATES DATA
// ============================================================

// Exchange rates relative to USD (base currency)
const exchangeRates = {
    USD: { rate: 1, name: 'US Dollar', symbol: '$' },
    EUR: { rate: 0.92, name: 'Euro', symbol: '€' },
    GBP: { rate: 0.79, name: 'British Pound', symbol: '£' },
    JPY: { rate: 149.50, name: 'Japanese Yen', symbol: '¥' },
    CAD: { rate: 1.36, name: 'Canadian Dollar', symbol: 'C$' },
    AUD: { rate: 1.53, name: 'Australian Dollar', symbol: 'A$' },
    CHF: { rate: 0.88, name: 'Swiss Franc', symbol: 'CHF' },
    CNY: { rate: 7.24, name: 'Chinese Yuan', symbol: '¥' },
    INR: { rate: 83.12, name: 'Indian Rupee', symbol: '₹' },
    MXN: { rate: 17.15, name: 'Mexican Peso', symbol: '$' },
    BRL: { rate: 4.97, name: 'Brazilian Real', symbol: 'R$' },
    KRW: { rate: 1328.45, name: 'South Korean Won', symbol: '₩' },
    SGD: { rate: 1.34, name: 'Singapore Dollar', symbol: 'S$' },
    HKD: { rate: 7.82, name: 'Hong Kong Dollar', symbol: 'HK$' },
    NOK: { rate: 10.62, name: 'Norwegian Krone', symbol: 'kr' },
    SEK: { rate: 10.42, name: 'Swedish Krona', symbol: 'kr' },
    DKK: { rate: 6.87, name: 'Danish Krone', symbol: 'kr' },
    NZD: { rate: 1.64, name: 'New Zealand Dollar', symbol: 'NZ$' },
    ZAR: { rate: 18.65, name: 'South African Rand', symbol: 'R' },
    RUB: { rate: 92.50, name: 'Russian Ruble', symbol: '₽' },
    TRY: { rate: 30.25, name: 'Turkish Lira', symbol: '₺' },
    AED: { rate: 3.67, name: 'UAE Dirham', symbol: 'د.إ' },
    SAR: { rate: 3.75, name: 'Saudi Riyal', symbol: '﷼' },
    PLN: { rate: 4.02, name: 'Polish Zloty', symbol: 'zł' },
    THB: { rate: 35.50, name: 'Thai Baht', symbol: '฿' },
    XOF: { rate: 603.50, name: 'CFA Franc (BCEAO)', symbol: 'CFA' }
};

// ============================================================
// CUSTOM EXCEPTION CLASSES (Exception Handling Demonstration)
// ============================================================

class CurrencyError extends Error {
    constructor(message, currencyCode) {
        super(message);
        this.name = 'CurrencyError';
        this.currencyCode = currencyCode;
    }
}

class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
    }
}

// ============================================================
// DOM ELEMENTS
// ============================================================

const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const swapBtn = document.getElementById('swapBtn');
const convertBtn = document.getElementById('convertBtn');
const resultDiv = document.getElementById('result');
const resultAmount = document.getElementById('resultAmount');
const exchangeRateText = document.getElementById('exchangeRate');
const conversionPath = document.getElementById('conversionPath');
const ratesGrid = document.getElementById('ratesGrid');
const errorMessage = document.getElementById('errorMessage');

// Compound interest calculator elements
const principalInput = document.getElementById('principal');
const interestRateInput = document.getElementById('interestRate');
const yearsInput = document.getElementById('years');
const calculateBtn = document.getElementById('calculateBtn');
const calcResult = document.getElementById('calcResult');
const futureValueEl = document.getElementById('futureValue');
const recursionStepsEl = document.getElementById('recursionSteps');

// Chart and stats
const statsGrid = document.getElementById('statsGrid');
let ratesChart = null;

// ============================================================
// INITIALIZATION
// ============================================================

function init() {
    try {
        populateCurrencySelects();
        displayExchangeRates();
        calculateAndDisplayStats();  // ES6 Array functions demonstration
        createRatesChart();          // Chart.js integration
        setupEventListeners();
        console.log('✅ Application initialized successfully');
    } catch (error) {
        console.error('❌ Initialization failed:', error);
        showError('Failed to initialize application. Please refresh the page.');
    }
}

// ============================================================
// ES6 ARRAY FUNCTIONS DEMONSTRATION
// ============================================================

/**
 * Calculate and display statistics using ES6 array functions
 * Demonstrates: map, filter, reduce, sort, find, some, every
 */
function calculateAndDisplayStats() {
    // Get all currency entries as an array
    const currencyEntries = Object.entries(exchangeRates);
    
    // ES6: map() - Transform entries to get just the rates
    const allRates = currencyEntries.map(([code, data]) => ({
        code,
        rate: data.rate,
        name: data.name
    }));
    
    // ES6: filter() - Get currencies stronger than USD (rate < 1)
    const strongerThanUSD = allRates.filter(currency => currency.rate < 1);
    
    // ES6: filter() - Get currencies weaker than USD (rate > 1)
    const weakerThanUSD = allRates.filter(currency => currency.rate > 1);
    
    // ES6: reduce() - Calculate the sum of all rates
    const sumOfRates = allRates.reduce((sum, currency) => sum + currency.rate, 0);
    
    // ES6: reduce() - Calculate average rate
    const averageRate = sumOfRates / allRates.length;
    
    // ES6: sort() - Find highest rate (create a copy first to avoid mutation)
    const sortedByRateDesc = [...allRates].sort((a, b) => b.rate - a.rate);
    const highestRate = sortedByRateDesc[0];
    
    // ES6: sort() - Find lowest rate
    const sortedByRateAsc = [...allRates].sort((a, b) => a.rate - b.rate);
    const lowestRate = sortedByRateAsc[0];
    
    // ES6: find() - Find a specific currency
    const euroCurrency = allRates.find(currency => currency.code === 'EUR');
    
    // ES6: some() - Check if any currency has rate > 1000
    const hasHighRateCurrency = allRates.some(currency => currency.rate > 1000);
    
    // ES6: every() - Check if all currencies have positive rates
    const allPositiveRates = allRates.every(currency => currency.rate > 0);
    
    // ES6: includes() with map - Get array of currency codes
    const currencyCodes = allRates.map(c => c.code);
    const hasEuro = currencyCodes.includes('EUR');
    
    // Display stats in the DOM
    const stats = [
        { label: 'Total Currencies', value: allRates.length },
        { label: 'Stronger than USD', value: strongerThanUSD.length },
        { label: 'Weaker than USD', value: weakerThanUSD.length },
        { label: 'Average Rate', value: averageRate.toFixed(2) },
        { label: 'Highest Rate', value: `${highestRate.code} (${highestRate.rate})` },
        { label: 'Lowest Rate', value: `${lowestRate.code} (${lowestRate.rate})` }
    ];
    
    // ES6: forEach() - Create DOM elements
    statsGrid.innerHTML = '';
    stats.forEach(stat => {
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        statItem.innerHTML = `
            <div class="stat-label">${stat.label}</div>
            <div class="stat-value">${stat.value}</div>
        `;
        statsGrid.appendChild(statItem);
    });
    
    // Log ES6 demonstrations
    console.log('📊 ES6 Array Functions Demonstration:');
    console.log('  map():', allRates.slice(0, 3));
    console.log('  filter() stronger:', strongerThanUSD.map(c => c.code));
    console.log('  reduce() sum:', sumOfRates.toFixed(2));
    console.log('  sort() highest:', highestRate);
    console.log('  find() EUR:', euroCurrency);
    console.log('  some() rate>1000:', hasHighRateCurrency);
    console.log('  every() positive:', allPositiveRates);
    console.log('  includes() EUR:', hasEuro);
}

// ============================================================
// RECURSION DEMONSTRATION - Compound Interest Calculator
// ============================================================

/**
 * Calculate compound interest recursively
 * Formula: A = P(1 + r)^n
 * 
 * @param {number} principal - Initial investment
 * @param {number} rate - Annual interest rate (as decimal)
 * @param {number} years - Number of years remaining
 * @param {Array} steps - Array to track recursion steps
 * @returns {number} - Future value after compound interest
 */
function calculateCompoundInterestRecursive(principal, rate, years, steps = []) {
    // Base case: no more years to compound
    if (years === 0) {
        steps.push(`Year 0 (Base): $${principal.toFixed(2)}`);
        return principal;
    }
    
    // Recursive case: calculate for previous year, then add this year's interest
    const previousValue = calculateCompoundInterestRecursive(principal, rate, years - 1, steps);
    const currentValue = previousValue * (1 + rate);
    
    steps.push(`Year ${years}: $${previousValue.toFixed(2)} × ${(1 + rate).toFixed(4)} = $${currentValue.toFixed(2)}`);
    
    return currentValue;
}

/**
 * Recursive factorial function (bonus recursion example)
 */
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

/**
 * Recursive currency chain conversion
 * Converts through intermediate currencies to show the conversion path
 */
function convertThroughChain(amount, fromCurrency, toCurrency, chain = [], depth = 0) {
    // Prevent infinite recursion
    if (depth > 3) {
        return { amount, chain };
    }
    
    // Base case: same currency
    if (fromCurrency === toCurrency) {
        chain.push(`${fromCurrency}: ${amount.toFixed(4)}`);
        return { amount, chain };
    }
    
    // Always convert through USD as intermediary
    if (fromCurrency !== 'USD' && toCurrency !== 'USD') {
        // First convert to USD
        const toUSD = amount / exchangeRates[fromCurrency].rate;
        chain.push(`${fromCurrency} → USD: ${toUSD.toFixed(4)}`);
        
        // Then convert from USD to target (recursive call)
        return convertThroughChain(toUSD, 'USD', toCurrency, chain, depth + 1);
    }
    
    // Direct conversion
    let result;
    if (fromCurrency === 'USD') {
        result = amount * exchangeRates[toCurrency].rate;
        chain.push(`USD → ${toCurrency}: ${result.toFixed(4)}`);
    } else {
        result = amount / exchangeRates[fromCurrency].rate;
        chain.push(`${fromCurrency} → USD: ${result.toFixed(4)}`);
    }
    
    return { amount: result, chain };
}

/**
 * Handle compound interest calculation
 */
function handleCompoundInterestCalculation() {
    try {
        const principal = parseFloat(principalInput.value);
        const rate = parseFloat(interestRateInput.value) / 100;
        const years = parseInt(yearsInput.value);
        
        // Validate inputs with exception handling
        if (isNaN(principal) || principal < 0) {
            throw new ValidationError('Principal must be a positive number', 'principal');
        }
        if (isNaN(rate) || rate < 0 || rate > 1) {
            throw new ValidationError('Interest rate must be between 0% and 100%', 'interestRate');
        }
        if (isNaN(years) || years < 1 || years > 50) {
            throw new ValidationError('Years must be between 1 and 50', 'years');
        }
        
        // Calculate using recursion
        const steps = [];
        const futureValue = calculateCompoundInterestRecursive(principal, rate, years, steps);
        
        // Display result
        futureValueEl.textContent = `Future Value: $${futureValue.toLocaleString('en-US', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        })}`;
        
        // Show recursion steps (last 5 steps)
        const displaySteps = steps.slice(-5);
        recursionStepsEl.innerHTML = `<strong>Recursion Steps:</strong><br>${displaySteps.join('<br>')}`;
        
        calcResult.classList.add('show');
        hideError();
        
        console.log('🔄 Recursion demonstration - Compound Interest:');
        console.log('  Input:', { principal, rate: rate * 100 + '%', years });
        console.log('  Steps:', steps);
        console.log('  Result:', futureValue);
        
    } catch (error) {
        if (error instanceof ValidationError) {
            showError(`Validation Error: ${error.message}`);
            console.error('ValidationError:', error.message, 'Field:', error.field);
        } else {
            showError('An unexpected error occurred during calculation.');
            console.error('Unexpected error:', error);
        }
        calcResult.classList.remove('show');
    }
}

// ============================================================
// CHART.JS INTEGRATION (External Library)
// ============================================================

/**
 * Create a bar chart showing top currency rates using Chart.js
 */
function createRatesChart() {
    const ctx = document.getElementById('ratesChart').getContext('2d');
    
    // ES6: Get and prepare data using map, filter, sort
    const chartData = Object.entries(exchangeRates)
        .filter(([code]) => code !== 'USD')
        .map(([code, data]) => ({ code, rate: data.rate }))
        .sort((a, b) => b.rate - a.rate)
        .slice(0, 8);  // Top 8 currencies by rate
    
    const labels = chartData.map(d => d.code);
    const data = chartData.map(d => d.rate);
    
    // Chart.js - External library integration
    ratesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Exchange Rate (vs USD)',
                data: data,
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(118, 75, 162, 0.8)',
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(168, 85, 247, 0.8)',
                    'rgba(192, 132, 252, 0.8)',
                    'rgba(167, 139, 250, 0.8)',
                    'rgba(196, 181, 253, 0.8)'
                ],
                borderColor: [
                    'rgba(102, 126, 234, 1)',
                    'rgba(118, 75, 162, 1)',
                    'rgba(99, 102, 241, 1)',
                    'rgba(139, 92, 246, 1)',
                    'rgba(168, 85, 247, 1)',
                    'rgba(192, 132, 252, 1)',
                    'rgba(167, 139, 250, 1)',
                    'rgba(196, 181, 253, 1)'
                ],
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `1 USD = ${context.raw.toLocaleString()} ${context.label}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Rate'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Currency'
                    }
                }
            }
        }
    });
    
    console.log('📈 Chart.js library loaded and chart created');
}

// ============================================================
// CURRENCY CONVERSION WITH EXCEPTION HANDLING
// ============================================================

/**
 * Validate currency code exists
 * @throws {CurrencyError} if currency not found
 */
function validateCurrency(currencyCode) {
    if (!exchangeRates[currencyCode]) {
        throw new CurrencyError(`Currency '${currencyCode}' is not supported`, currencyCode);
    }
    return true;
}

/**
 * Validate amount input
 * @throws {ValidationError} if amount is invalid
 */
function validateAmount(amount) {
    if (typeof amount !== 'number' || isNaN(amount)) {
        throw new ValidationError('Amount must be a valid number', 'amount');
    }
    if (amount < 0) {
        throw new ValidationError('Amount cannot be negative', 'amount');
    }
    if (amount > 999999999999) {
        throw new ValidationError('Amount exceeds maximum limit', 'amount');
    }
    return true;
}

/**
 * Convert currency with full validation and error handling
 */
function convertCurrency() {
    try {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;
        
        // Validate inputs (throws exceptions if invalid)
        validateAmount(amount);
        validateCurrency(fromCurrency);
        validateCurrency(toCurrency);
        
        // Convert using recursive chain conversion
        const { amount: convertedAmount, chain } = convertThroughChain(
            amount, 
            fromCurrency, 
            toCurrency
        );
        
        // Calculate direct exchange rate
        const directRate = exchangeRates[toCurrency].rate / exchangeRates[fromCurrency].rate;
        
        // Display result
        const toSymbol = exchangeRates[toCurrency].symbol;
        
        resultAmount.textContent = `${toSymbol} ${formatCurrency(convertedAmount)}`;
        exchangeRateText.textContent = `1 ${fromCurrency} = ${formatRate(directRate)} ${toCurrency}`;
        conversionPath.textContent = `Path: ${chain.join(' → ')}`;
        
        resultDiv.classList.add('show');
        hideError();
        
    } catch (error) {
        resultDiv.classList.remove('show');
        
        if (error instanceof CurrencyError) {
            showError(`Currency Error: ${error.message}`);
            console.error('CurrencyError:', error.message, 'Code:', error.currencyCode);
        } else if (error instanceof ValidationError) {
            showError(`Validation Error: ${error.message}`);
            console.error('ValidationError:', error.message, 'Field:', error.field);
        } else {
            showError('An unexpected error occurred. Please try again.');
            console.error('Unexpected error:', error);
        }
    }
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
}

function hideError() {
    errorMessage.classList.remove('show');
}

function populateCurrencySelects() {
    // ES6: Object.keys() with forEach
    const currencies = Object.keys(exchangeRates);
    
    currencies.forEach(currency => {
        const option1 = createCurrencyOption(currency);
        const option2 = createCurrencyOption(currency);
        
        fromCurrencySelect.appendChild(option1);
        toCurrencySelect.appendChild(option2);
    });
    
    fromCurrencySelect.value = 'USD';
    toCurrencySelect.value = 'EUR';
}

function createCurrencyOption(currency) {
    const option = document.createElement('option');
    option.value = currency;
    option.textContent = `${currency} - ${exchangeRates[currency].name}`;
    return option;
}

function displayExchangeRates() {
    ratesGrid.innerHTML = '';
    
    // ES6: filter and slice
    const currencies = Object.keys(exchangeRates)
        .filter(c => c !== 'USD')
        .slice(0, 9);
    
    currencies.forEach(currency => {
        const rateItem = document.createElement('div');
        rateItem.className = 'rate-item';
        rateItem.innerHTML = `
            <div class="currency">${currency}</div>
            <div class="rate">${formatRate(exchangeRates[currency].rate)}</div>
        `;
        ratesGrid.appendChild(rateItem);
    });
}

function formatRate(rate) {
    if (rate >= 100) return rate.toFixed(2);
    if (rate >= 1) return rate.toFixed(4);
    return rate.toFixed(6);
}

function formatCurrency(amount) {
    if (Math.abs(amount) >= 1000000) {
        return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else if (Math.abs(amount) >= 1) {
        return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
    }
    return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
}

function swapCurrencies() {
    const temp = fromCurrencySelect.value;
    fromCurrencySelect.value = toCurrencySelect.value;
    toCurrencySelect.value = temp;
    convertCurrency();
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================================
// EVENT LISTENERS
// ============================================================

function setupEventListeners() {
    convertBtn.addEventListener('click', convertCurrency);
    swapBtn.addEventListener('click', swapCurrencies);
    calculateBtn.addEventListener('click', handleCompoundInterestCalculation);
    
    amountInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') convertCurrency();
    });
    
    amountInput.addEventListener('input', debounce(convertCurrency, 300));
    fromCurrencySelect.addEventListener('change', convertCurrency);
    toCurrencySelect.addEventListener('change', convertCurrency);
}

// ============================================================
// INITIALIZE APPLICATION
// ============================================================

document.addEventListener('DOMContentLoaded', init);
