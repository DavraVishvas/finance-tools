export interface FAQ {
    question: string;
    answer: string;
    category: string;
}

export const faqs: FAQ[] = [
    // General Questions
    {
        category: "General Questions",
        question: "What is Finance Tools?",
        answer: "Finance Tools provides a suite of online calculators designed to help you estimate loans, investments, and personal finances in your web browser."
    },
    {
        category: "General Questions",
        question: "Is Finance Tools free to use?",
        answer: "Yes, our core calculators are free to use. We do not require a credit card or a subscription."
    },
    {
        category: "General Questions",
        question: "Do I need to create an account to use the tools?",
        answer: "No account creation is required. You can start planning your finances without signing up."
    },
    {
        category: "General Questions",
        question: "Can I use these calculators on my mobile device?",
        answer: "Yes, our website is designed to be responsive and optimized for mobile browsers, allowing you to estimate loan EMIs or SIP returns from your smartphone."
    },
    {
        category: "General Questions",
        question: "Do I need to download any software?",
        answer: "No. Finance Tools is a web-based application, and calculations happen within your web browser."
    },
    {
        category: "General Questions",
        question: "How do I contact support if I encounter an issue?",
        answer: "You can contact us through the Contact Us page for questions or issues."
    },

    // Financial Planning
    {
        category: "Financial Planning",
        question: "How do I calculate my monthly loan EMI?",
        answer: "Navigate to our <a href='/tools/emi-calculator' class='text-blue-600 hover:underline dark:text-blue-400'>EMI Calculator</a>, enter your loan amount, interest rate, and tenure, and click calculate. The tool will provide an estimate of your monthly payment and total interest."
    },
    {
        category: "Financial Planning",
        question: "Can I estimate my mutual fund returns?",
        answer: "Our <a href='/tools/sip-calculator' class='text-blue-600 hover:underline dark:text-blue-400'>SIP Calculator</a> is designed to project the potential future value of your regular investments based on an expected rate of return."
    },
    {
        category: "Financial Planning",
        question: "How do I compare compound interest vs simple interest?",
        answer: "Using our <a href='/tools/compound-interest-calculator' class='text-blue-600 hover:underline dark:text-blue-400'>Compound Interest Calculator</a>, you can see how compounding can affect the future value of money over time."
    },
    {
        category: "Financial Planning",
        question: "Is it possible to estimate returns for a Fixed Deposit (FD)?",
        answer: "Yes, our <a href='/tools/fd-calculator' class='text-blue-600 hover:underline dark:text-blue-400'>FD Calculator</a> allows you to input your deposit amount, tenure, assumed interest rate, and compounding frequency to estimate the maturity value."
    },
    {
        category: "Financial Planning",
        question: "How do I know how much I need for retirement?",
        answer: "Our <a href='/tools/retirement-calculator' class='text-blue-600 hover:underline dark:text-blue-400'>Retirement Calculator</a> helps you estimate a retirement corpus based on inputs like your current age, retirement age, current savings, monthly investment, and expected return."
    },
    {
        category: "Financial Planning",
        question: "What is a credit utilization ratio?",
        answer: "It is the percentage of your available credit that you are currently using. You can use our <a href='/tools/credit-utilization-calculator' class='text-blue-600 hover:underline dark:text-blue-400'>Credit Utilization Calculator</a> to calculate this ratio, which is one of several factors used in credit scoring models."
    },

    // Privacy & Security
    {
        category: "Privacy & Security",
        question: "Is my financial data safe when using these tools?",
        answer: "Calculator calculations are processed locally in your web browser, and calculator inputs are not transmitted to our servers for calculation processing. For information about analytics, cookies, and other website data handling, please refer to our Privacy Policy."
    },
    {
        category: "Privacy & Security",
        question: "Do you store my calculator inputs on your servers?",
        answer: "No. According to our Privacy Policy, calculator inputs are not transmitted to our servers for calculation processing, and the financial numbers entered into calculators are not stored or retained."
    },
    {
        category: "Privacy & Security",
        question: "Can anyone else access the numbers I enter?",
        answer: "Calculator inputs are processed in your browser and are not transmitted to our servers for calculation processing. However, the security of your device, browser, and network is also important when entering financial information."
    },
    {
        category: "Privacy & Security",
        question: "Do you sell user financial data to third parties?",
        answer: "We do not sell, trade, or rent your personal information to third parties. Calculator inputs are not transmitted to our servers for calculation processing."
    },

    // Supported Calculations
    {
        category: "Supported Calculations",
        question: "Which currencies do your calculators support?",
        answer: "Our calculators work with numeric values and do not rely on a specific currency selector. The results should be interpreted in the same unit you entered. The underlying mathematical formulas remain the same."
    },
    {
        category: "Supported Calculations",
        question: "Can I calculate both monthly and yearly compounding?",
        answer: "Yes, our <a href='/tools/compound-interest-calculator' class='text-blue-600 hover:underline dark:text-blue-400'>Compound Interest tool</a> allows you to adjust the compounding frequency (annually, semi-annually, quarterly, or monthly) to match your specific terms."
    },
    {
        category: "Supported Calculations",
        question: "Do you support inflation-adjusted calculations?",
        answer: "Yes, our <a href='/tools/inflation-calculator' class='text-blue-600 hover:underline dark:text-blue-400'>Inflation Calculator</a> helps you estimate how the purchasing power of money might change over time."
    },
    {
        category: "Supported Calculations",
        question: "Are there any complex tax scenarios supported?",
        answer: "Currently, our tools provide gross estimates. They do not automatically account for complex, country-specific tax brackets or deductions."
    },

    // Usage & Limits
    {
        category: "Usage & Limits",
        question: "What is the maximum amount I can enter?",
        answer: "Input limits depend on the specific calculator, but they generally accommodate standard personal and business financial figures."
    },
    {
        category: "Usage & Limits",
        question: "How can I compare two different loan offers?",
        answer: "You can open the <a href='/tools/loan-calculator' class='text-blue-600 hover:underline dark:text-blue-400'>Loan Calculator</a> in two separate browser tabs and enter the different rates to compare the estimated interest."
    },
    {
        category: "Usage & Limits",
        question: "Will entering large numbers crash the browser?",
        answer: "Very large inputs may require additional processing time depending on the calculator and your device."
    },
    {
        category: "Usage & Limits",
        question: "Why is the calculator not accepting my input?",
        answer: "Ensure you are entering valid numerical digits. Some fields may prevent the entry of negative numbers or letters."
    },
    {
        category: "Usage & Limits",
        question: "How do I calculate a step-up SIP?",
        answer: "Currently, the <a href='/tools/sip-calculator' class='text-blue-600 hover:underline dark:text-blue-400'>SIP Calculator</a> supports fixed regular investments. Step-up SIP calculations are not currently available."
    },
    {
        category: "Usage & Limits",
        question: "Can I print my calculation results?",
        answer: "Yes, you can use your browser's built-in print function (Ctrl+P or Cmd+P) to print the results."
    },

    // Advanced Tools
    {
        category: "Advanced Tools",
        question: "How do I determine if I am eligible for a loan?",
        answer: "Navigate to our <a href='/tools/loan-eligibility-calculator' class='text-blue-600 hover:underline dark:text-blue-400'>Loan Eligibility Calculator</a> to get an estimate based on your inputs. Actual eligibility depends on the specific lender's criteria."
    },
    {
        category: "Advanced Tools",
        question: "Can I calculate my overall net worth?",
        answer: "Yes. Use our <a href='/tools/net-worth-calculator' class='text-blue-600 hover:underline dark:text-blue-400'>Net Worth Calculator</a> to estimate your net worth by inputting your assets and liabilities."
    },
    {
        category: "Advanced Tools",
        question: "How do I account for prepayments on my loan?",
        answer: "Our standard EMI calculator assumes consistent payments. For prepayments, you would need to adjust the principal balance manually and recalculate."
    },
    {
        category: "Advanced Tools",
        question: "How do I calculate the future value of a lump sum?",
        answer: "Use the <a href='/tools/compound-interest-calculator' class='text-blue-600 hover:underline dark:text-blue-400'>Compound Interest Calculator</a> and enter your lump sum as the principal amount."
    },
    {
        category: "Advanced Tools",
        question: "Is it possible to calculate reverse mortgages?",
        answer: "Currently, our suite focuses on standard forward-amortizing loans and investments."
    },

    // Troubleshooting & Performance
    {
        category: "Troubleshooting",
        question: "Why is the calculator taking a moment to load?",
        answer: "Loading times depend on your internet connection. Once the interface is loaded, the calculations are performed locally."
    },
    {
        category: "Troubleshooting",
        question: "Why did my EMI calculation differ slightly from my bank's quote?",
        answer: "Differences may arise from rounding, payment dates, specific interest calculation methodologies, loan disbursement dates, or fees applied by the lender. Our tools provide an estimate using standard amortization formulas."
    },
    {
        category: "Troubleshooting",
        question: "I can't find a way to save my results. How do I do this?",
        answer: "We do not save calculation data to databases. You can bookmark the page or print the screen to keep a record of your calculations."
    },
    {
        category: "Troubleshooting",
        question: "Does this website work on Safari and Firefox?",
        answer: "The website is designed to work with modern browsers such as Chrome, Safari, Firefox, and Edge."
    },
    {
        category: "Troubleshooting",
        question: "The website layout looks broken on my screen.",
        answer: "If the layout appears distorted, you may be using an outdated browser version. Please update your browser."
    },

    // Advanced Usage
    {
        category: "Advanced Usage",
        question: "Can I integrate Finance Tools calculators via an API?",
        answer: "Currently, Finance Tools is a consumer-facing web application. We do not offer a public API at this time."
    },
    {
        category: "Advanced Usage",
        question: "How do I embed these calculators on my own website?",
        answer: "We currently do not offer iframe embedding or widgets for external websites. You are welcome to link directly to our tools."
    },
    {
        category: "Advanced Usage",
        question: "Is there a downloadable version available?",
        answer: "No, Finance Tools is a web-based application. There is no downloadable desktop version."
    },
    {
        category: "Advanced Usage",
        question: "Can I use the calculators offline?",
        answer: "An internet connection is required to load the website. After the calculator interface has loaded, calculations that run locally do not require a separate calculation server."
    },
    {
        category: "Advanced Usage",
        question: "Do you support importing data from spreadsheets?",
        answer: "Currently, our tools require manual data entry. We do not support bulk importing from CSV or Excel files."
    },

    // Accuracy & Assumptions
    {
        category: "Accuracy & Assumptions",
        question: "How accurate are the investment returns shown?",
        answer: "The tools provide illustrative estimates based on the assumed rate you provide. Real-world investments are subject to market risks, and actual returns will vary."
    },
    {
        category: "Accuracy & Assumptions",
        question: "Are the calculations guaranteed?",
        answer: "No. All calculators are provided for educational and estimation purposes only. They do not constitute financial advice or guarantees of returns or loan approvals."
    },
    {
        category: "Accuracy & Assumptions",
        question: "Does the EMI calculation include taxes or insurance?",
        answer: "Our standard EMI calculator computes only the principal and interest components. It does not include property taxes or insurance."
    },
    {
        category: "Accuracy & Assumptions",
        question: "Why does the net worth tool not update automatically?",
        answer: "The Net Worth Calculator relies on the inputs you enter manually. It does not connect to external financial institutions."
    }
];
