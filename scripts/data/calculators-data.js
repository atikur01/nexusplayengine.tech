const calculators = [
  {
    id: "emi-calculator",
    title: "EMI Calculator - Calculate Loan Equated Monthly Installment",
    description: "Calculate your Equated Monthly Installment (EMI) for home, car, or personal loans. See detailed principal vs interest breakdowns and total costs.",
    category: "Loan Calculators",
    heading: "Equated Monthly Installment (EMI) Calculator",
    subheading: "Calculate your monthly loan payments and overall interest cost instantly.",
    inputs: [
      { id: "amount", label: "Loan Amount ($)", type: "number", default: 50000, min: 1000, max: 10000000, step: 1000 },
      { id: "rate", label: "Interest Rate (% per annum)", type: "number", default: 7.5, min: 0.1, max: 30, step: 0.05 },
      { id: "tenure", label: "Loan Tenure (Years)", type: "number", default: 10, min: 1, max: 40, step: 1 }
    ],
    outputs: [
      { id: "emi", label: "Monthly Payment (EMI)", prefix: "$" },
      { id: "interest", label: "Total Interest Payable", prefix: "$" },
      { id: "total", label: "Total Payment (Principal + Interest)", prefix: "$" }
    ],
    formula: `
      <p class="text-sm text-slate-300 leading-relaxed">
        The Equated Monthly Installment (EMI) is calculated using the following mathematical formula:
      </p>
      <div class="my-4 p-4 bg-slate-900 rounded-lg text-center font-mono text-emerald-400 text-lg">
        E = P &times; r &times; (1 + r)<sup>n</sup> / ((1 + r)<sup>n</sup> - 1)
      </div>
      <p class="text-xs text-slate-400">
        Where:<br>
        <strong>E</strong> = Equated Monthly Installment<br>
        <strong>P</strong> = Principal Loan Amount<br>
        <strong>r</strong> = Monthly Interest Rate (Annual Rate / 12 / 100)<br>
        <strong>n</strong> = Loan Tenure in Months (Years &times; 12)
      </p>
    `,
    examples: [
      { title: "Home Loan EMI Example", desc: "A loan of $200,000 at 6.5% interest rate for 20 years results in a monthly payment of approximately $1,491.09." },
      { title: "Car Loan EMI Example", desc: "A car loan of $30,000 at 5% interest rate for 5 years results in a monthly payment of approximately $566.14." }
    ],
    faqs: [
      { q: "What is an EMI?", a: "An Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are applied to both interest and principal each month so that over a specified number of years, the loan is paid off in full." },
      { q: "How can I lower my monthly EMI?", a: "You can lower your EMI by opting for a longer loan tenure, negotiating a lower interest rate, or making a larger down payment to reduce the initial loan amount." }
    ],
    seoContent: `
      <h3 class="text-xl font-bold text-white mb-2">Understanding Your Loan EMI Structure</h3>
      <p class="text-slate-300 mb-4 leading-relaxed">
        When you take out a loan, your monthly installment contains components for both the principal amount and the accrued interest. In the initial months of the loan tenure, the interest component makes up the majority of the EMI. Over time, as the principal balance decreases, the interest contribution falls, and more of your payment goes towards clearing the principal.
      </p>
      <h3 class="text-xl font-bold text-white mb-2">Why Use an EMI Calculator?</h3>
      <p class="text-slate-300 mb-4 leading-relaxed">
        Using an online calculator before taking a loan helps you evaluate your monthly budget capacity. It ensures you do not over-borrow and provides full clarity regarding the total cost of the credit, which includes the interest charged over the years.
      </p>
    `,
    calcLogic: `
      const p = Number(inputs.amount);
      const r = Number(inputs.rate) / 12 / 100;
      const n = Number(inputs.tenure) * 12;
      const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const total = emi * n;
      const interest = total - p;
      return { emi, interest, total };
    `
  },
  {
    id: "personal-loan-calculator",
    title: "Personal Loan Calculator - Monthly Payment Estimator",
    description: "Estimate monthly payments, total interest, and the final payout cost for personal loans. Fast, free, and optimized for mobile screens.",
    category: "Loan Calculators",
    heading: "Personal Loan Calculator",
    subheading: "Estimate your monthly budget requirements for unsecured personal loans.",
    inputs: [
      { id: "amount", label: "Loan Amount ($)", type: "number", default: 15000, min: 500, max: 100000, step: 500 },
      { id: "rate", label: "Interest Rate (APR %)", type: "number", default: 10.99, min: 2, max: 36, step: 0.05 },
      { id: "term", label: "Loan Term (Months)", type: "number", default: 36, min: 6, max: 84, step: 6 }
    ],
    outputs: [
      { id: "monthly", label: "Monthly Payment", prefix: "$" },
      { id: "interest", label: "Total Interest Cost", prefix: "$" },
      { id: "total", label: "Total Cost of Loan", prefix: "$" }
    ],
    formula: `
      <p class="text-sm text-slate-300">Uses the standard amortized loan repayment formula to find the monthly installment over the term in months:</p>
      <div class="my-4 p-4 bg-slate-900 rounded-lg text-center font-mono text-emerald-400 text-lg">
        M = P &times; (r(1+r)<sup>n</sup>) / ((1+r)<sup>n</sup> - 1)
      </div>
      <p class="text-xs text-slate-400">Where <strong>r</strong> is the annual interest rate divided by 12, and <strong>n</strong> is the term in months.</p>
    `,
    examples: [
      { title: "Standard 3-Year Personal Loan", desc: "$10,000 borrowed at 12% APR for 36 months requires a monthly payment of $332.14, with total interest of $1,957.15." }
    ],
    faqs: [
      { q: "What is APR in personal loans?", a: "Annual Percentage Rate (APR) represents the true yearly cost of the loan, incorporating both the basic interest rate and any administrative fees or origination fees charged by the lender." }
    ],
    seoContent: `
      <p class="text-slate-300 mb-4 leading-relaxed">
        Personal loans are typically unsecured, meaning they do not require collateral like a house or a vehicle. Because they are unsecured, their interest rates are highly dependent on your credit history and score. A higher credit rating enables you to qualify for lower APRs, which significantly decreases your monthly financial liability.
      </p>
    `,
    calcLogic: `
      const p = Number(inputs.amount);
      const r = Number(inputs.rate) / 12 / 100;
      const n = Number(inputs.term);
      const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const total = monthly * n;
      const interest = total - p;
      return { monthly, interest, total };
    `
  },
  {
    id: "home-loan-calculator",
    title: "Home Loan Calculator - Calculate Home Loan Payments",
    description: "Plan your home purchase using our interactive home loan calculator. Calculate monthly payments, interest totals, and required down payments.",
    category: "Loan Calculators",
    heading: "Home Loan Calculator",
    subheading: "Accurately compute the monthly obligations for your primary or secondary property purchase.",
    inputs: [
      { id: "price", label: "Property Purchase Price ($)", type: "number", default: 350000, min: 10000, max: 10000000, step: 5000 },
      { id: "down", label: "Down Payment ($)", type: "number", default: 70000, min: 0, max: 8000000, step: 5000 },
      { id: "rate", label: "Annual Interest Rate (%)", type: "number", default: 6.25, min: 0.1, max: 20, step: 0.05 },
      { id: "term", label: "Loan Term (Years)", type: "number", default: 30, min: 5, max: 40, step: 1 }
    ],
    outputs: [
      { id: "loanAmount", label: "Principal Loan Amount", prefix: "$" },
      { id: "monthly", label: "Monthly Principal & Interest", prefix: "$" },
      { id: "interest", label: "Total Interest Paid", prefix: "$" },
      { id: "total", label: "Total Repayment Value", prefix: "$" }
    ],
    formula: `
      <p class="text-sm text-slate-300">Determines loan principal as Property Price minus Down Payment, then calculates monthly amortization:</p>
      <div class="my-4 p-4 bg-slate-900 rounded-lg text-center font-mono text-emerald-400">
        Loan Principal = Purchase Price - Down Payment
      </div>
    `,
    examples: [
      { title: "Typical 30-Year Mortgage Option", desc: "A $300,000 home purchase with 20% down ($60,000) at 6% interest results in a loan principal of $240,000 and a monthly payment of $1,438.92." }
    ],
    faqs: [
      { q: "Is a 20% down payment mandatory?", a: "No, but a down payment of at least 20% allows you to avoid paying Private Mortgage Insurance (PMI) on conventional loans, saving you money each month." }
    ],
    seoContent: `
      <p class="text-slate-300 mb-4 leading-relaxed">
        Buying a home is one of the most significant financial steps you will take. Our calculator simplifies the planning stages by allowing you to test different down payment options. By increasing your initial deposit, you reduce the loan balance, which directly reduces both your monthly installment and the total interest burden.
      </p>
    `,
    calcLogic: `
      const price = Number(inputs.price);
      const down = Number(inputs.down);
      const loanAmount = Math.max(0, price - down);
      const r = Number(inputs.rate) / 12 / 100;
      const n = Number(inputs.term) * 12;
      let monthly = 0;
      if (r > 0) {
        monthly = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      } else {
        monthly = loanAmount / n;
      }
      const total = monthly * n;
      const interest = total - loanAmount;
      return { loanAmount, monthly, interest, total };
    `
  },
  {
    id: "car-loan-calculator",
    title: "Car Loan Calculator - Auto Loan Payment Calculator",
    description: "Determine your monthly auto loan installments and interest costs. Plan your next vehicle purchase with confidence.",
    category: "Loan Calculators",
    heading: "Car Loan Calculator",
    subheading: "Plan your automobile budget using our straightforward payment estimator.",
    inputs: [
      { id: "price", label: "Vehicle Purchase Price ($)", type: "number", default: 28000, min: 1000, max: 250000, step: 500 },
      { id: "down", label: "Down Payment / Trade-In ($)", type: "number", default: 4000, min: 0, max: 200000, step: 500 },
      { id: "rate", label: "Interest Rate (%)", type: "number", default: 5.5, min: 0.1, max: 25, step: 0.05 },
      { id: "term", label: "Loan Term (Months)", type: "number", default: 60, min: 12, max: 84, step: 12 }
    ],
    outputs: [
      { id: "loan", label: "Car Loan Principal", prefix: "$" },
      { id: "monthly", label: "Monthly Auto Payment", prefix: "$" },
      { id: "interest", label: "Total Auto Interest", prefix: "$" },
      { id: "total", label: "Total Cost", prefix: "$" }
    ],
    formula: `
      <p class="text-sm text-slate-300">The monthly payment formula is matching the standard amortized payment structure, with inputs adjusted for vehicle depreciation terms.</p>
    `,
    examples: [
      { title: "Standard 5-Year Car Purchase", desc: "A $25,000 vehicle with a $5,000 down payment at 5% APR over 60 months yields a $377.42 monthly payment." }
    ],
    faqs: [
      { q: "How long should an auto loan be?", a: "Most financial advisors recommend terms of 60 months or fewer to prevent your vehicle's value from depreciating faster than the loan balance." }
    ],
    seoContent: `
      <p class="text-slate-300 mb-4 leading-relaxed">
        Car loans are secured by the vehicle itself. Before committing to a specific model, remember to factor in peripheral costs such as auto insurance, fuel, registration, and routine maintenance alongside your estimated monthly loan payment.
      </p>
    `,
    calcLogic: `
      const price = Number(inputs.price);
      const down = Number(inputs.down);
      const loan = Math.max(0, price - down);
      const r = Number(inputs.rate) / 12 / 100;
      const n = Number(inputs.term);
      let monthly = 0;
      if (r > 0) {
        monthly = (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      } else {
        monthly = loan / n;
      }
      const total = monthly * n;
      const interest = total - loan;
      return { loan, monthly, interest, total };
    `
  },
  {
    id: "mortgage-calculator",
    title: "Mortgage Calculator - Estimates Monthly Housing Expenses",
    description: "Calculate your complete monthly mortgage payments, including property tax, insurance, and interest breakdown.",
    category: "Loan Calculators",
    heading: "Mortgage Payment Calculator",
    subheading: "Analyze the total monthly cost of home ownership including taxes and insurance.",
    inputs: [
      { id: "value", label: "Home Market Value ($)", type: "number", default: 400000, min: 10000, max: 10000000, step: 10000 },
      { id: "down", label: "Down Payment ($)", type: "number", default: 80000, min: 0, max: 9000000, step: 5000 },
      { id: "rate", label: "Interest Rate (%)", type: "number", default: 6.5, min: 0.1, max: 20, step: 0.05 },
      { id: "term", label: "Term (Years)", type: "number", default: 30, min: 10, max: 40, step: 5 },
      { id: "tax", label: "Annual Property Tax Rate (%)", type: "number", default: 1.2, min: 0, max: 5, step: 0.1 },
      { id: "insurance", label: "Annual Home Insurance ($)", type: "number", default: 1200, min: 0, max: 10000, step: 100 }
    ],
    outputs: [
      { id: "pi", label: "Principal & Interest Payment", prefix: "$" },
      { id: "ti", label: "Monthly Tax & Insurance", prefix: "$" },
      { id: "total", label: "Total Monthly Payment", prefix: "$" }
    ],
    formula: `
      <p class="text-sm text-slate-300">Combines monthly principal and interest payments with monthly distributions for taxes and insurance:</p>
      <div class="my-3 p-3 bg-slate-900 rounded font-mono text-emerald-400">
        Total Monthly = PI + (Annual Tax / 12) + (Annual Insurance / 12)
      </div>
    `,
    examples: [
      { title: "Standard Suburban Home Purchase", desc: "A $400,000 home with 20% down, 6.5% interest rate, 1.2% tax, and $1,200 annual insurance results in a total monthly payment of $2,522.42." }
    ],
    faqs: [
      { q: "What does PITI stand for?", a: "PITI stands for Principal, Interest, Taxes, and Insurance. It represents the four fundamental components of a monthly mortgage payment." }
    ],
    seoContent: `
      <p class="text-slate-300 mb-4 leading-relaxed">
        Calculating just the principal and interest of your mortgage is not enough. Property taxes and homeowners insurance are persistent costs that must be paid as long as you own the home. Use this calculator to see your true monthly commitment.
      </p>
    `,
    calcLogic: `
      const val = Number(inputs.value);
      const down = Number(inputs.down);
      const p = Math.max(0, val - down);
      const r = Number(inputs.rate) / 12 / 100;
      const n = Number(inputs.term) * 12;
      let pi = 0;
      if (r > 0) {
        pi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      } else {
        pi = p / n;
      }
      const monthlyTax = (val * (Number(inputs.tax) / 100)) / 12;
      const monthlyIns = Number(inputs.insurance) / 12;
      const ti = monthlyTax + monthlyIns;
      const total = pi + ti;
      return { pi, ti, total };
    `
  },
  {
    id: "sip-calculator",
    title: "SIP Calculator - Systematic Investment Plan Returns",
    description: "Calculate potential returns from your Systematic Investment Plan (SIP) investments in mutual funds and index funds.",
    category: "Investment Calculators",
    heading: "Systematic Investment Plan (SIP) Calculator",
    subheading: "Estimate the wealth you can accumulate over time through regular monthly contributions.",
    inputs: [
      { id: "monthly", label: "Monthly Investment ($)", type: "number", default: 500, min: 10, max: 100000, step: 50 },
      { id: "rate", label: "Expected Annual Return (%)", type: "number", default: 12, min: 1, max: 30, step: 0.5 },
      { id: "years", label: "Investment Period (Years)", type: "number", default: 15, min: 1, max: 40, step: 1 }
    ],
    outputs: [
      { id: "invested", label: "Total Invested Amount", prefix: "$" },
      { id: "returns", label: "Estimated Wealth Gains", prefix: "$" },
      { id: "value", label: "Total Projected Value", prefix: "$" }
    ],
    formula: `
      <p class="text-sm text-slate-300">Calculates future value of regular monthly annuity payments compounded at a monthly interval:</p>
      <div class="my-4 p-4 bg-slate-900 rounded-lg text-center font-mono text-emerald-400 text-lg">
        FV = P &times; [ (1 + i)<sup>n</sup> - 1 ] &times; (1 + i) / i
      </div>
      <p class="text-xs text-slate-400">Where <strong>i</strong> is the monthly returns rate, and <strong>n</strong> is the total number of months.</p>
    `,
    examples: [
      { title: "Wealth Creation Example", desc: "A monthly SIP of $300 at an expected annual return of 12% for 20 years results in total investments of $72,000, and a maturity value of approximately $299,744.38." }
    ],
    faqs: [
      { q: "What is a Systematic Investment Plan?", a: "A Systematic Investment Plan (SIP) is an investment path offered by mutual funds, allowing investors to contribute fixed sums at regular intervals (typically monthly) to acquire units in a structured portfolio." }
    ],
    seoContent: `
      <p class="text-slate-300 mb-4 leading-relaxed">
        Investing small amounts consistently is often more productive than trying to time the financial markets with lump-sum investments. Through compounding interest, your periodic deposits buy more fund units when prices are down, and fewer when prices are up, smoothing out market volatility.
      </p>
    `,
    calcLogic: `
      const monthly = Number(inputs.monthly);
      const r = Number(inputs.rate) / 12 / 100;
      const n = Number(inputs.years) * 12;
      const invested = monthly * n;
      let value = 0;
      if (r > 0) {
        value = monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      } else {
        value = invested;
      }
      const returns = value - invested;
      return { invested, returns, value };
    `
  },
  {
    id: "compound-interest-calculator",
    title: "Compound Interest Calculator - Calculate Compound Growth",
    description: "Compute daily, monthly, or yearly compound interest returns. Visualize interest accumulation on your savings and assets.",
    category: "Investment Calculators",
    heading: "Compound Interest Calculator",
    subheading: "Project the growth of your investments over time using compounding interest.",
    inputs: [
      { id: "principal", label: "Initial Investment ($)", type: "number", default: 10000, min: 100, max: 10000000, step: 500 },
      { id: "rate", label: "Annual Interest Rate (%)", type: "number", default: 6, min: 0.1, max: 40, step: 0.1 },
      { id: "frequency", label: "Compounding Frequency", type: "select", options: [{value: "12", label: "Monthly"}, {value: "4", label: "Quarterly"}, {value: "1", label: "Annually"}], default: "12" },
      { id: "years", label: "Time Horizon (Years)", type: "number", default: 10, min: 1, max: 50, step: 1 }
    ],
    outputs: [
      { id: "principalOut", label: "Initial Principal Amount", prefix: "$" },
      { id: "interest", label: "Interest Accumulated", prefix: "$" },
      { id: "total", label: "Accumulated Value", prefix: "$" }
    ],
    formula: `
      <p class="text-sm text-slate-300">The basic equation for compound interest over multiple cycles:</p>
      <div class="my-4 p-4 bg-slate-900 rounded-lg text-center font-mono text-emerald-400 text-lg">
        A = P(1 + r/n)<sup>nt</sup>
      </div>
      <p class="text-xs text-slate-400">Where <strong>n</strong> represents compounding occurrences per annum and <strong>t</strong> is the time frame in years.</p>
    `,
    examples: [
      { title: "Standard 10-Year Accumulation", desc: "$10,000 at 7% compounded annually for 15 years yields an accrued balance of $27,590.32." }
    ],
    faqs: [
      { q: "Why is compounding so powerful?", a: "Because interest earns interest. Over longer timeframes, the interest portion of your balance begins growing faster than your original principal contribution." }
    ],
    seoContent: `
      <p class="text-slate-300 mb-4 leading-relaxed">
        Compounding interest is often described as the eighth wonder of the world. It reward early savers, as even modest savings left alone for decades can swell to substantial nest eggs due to continuous compounded cycles.
      </p>
    `,
    calcLogic: `
      const p = Number(inputs.principal);
      const r = Number(inputs.rate) / 100;
      const n = Number(inputs.frequency);
      const t = Number(inputs.years);
      const total = p * Math.pow(1 + r / n, n * t);
      const interest = total - p;
      return { principalOut: p, interest, total };
    `
  },
  {
    id: "fixed-deposit-calculator",
    title: "Fixed Deposit (FD) Calculator - maturity interest estimator",
    description: "Check the maturity returns and interest rates for your bank fixed deposits. Calculate earnings instantly.",
    category: "Investment Calculators",
    heading: "Fixed Deposit (FD) Calculator",
    subheading: "Find out exactly how much your cash deposits will return upon reaching maturity.",
    inputs: [
      { id: "principal", label: "FD Deposit Amount ($)", type: "number", default: 10000, min: 500, max: 5000000, step: 500 },
      { id: "rate", label: "Rate of Interest (% p.a.)", type: "number", default: 6.5, min: 0.5, max: 20, step: 0.05 },
      { id: "years", label: "Deposit Duration (Years)", type: "number", default: 5, min: 1, max: 25, step: 1 }
    ],
    outputs: [
      { id: "invested", label: "Deposited Principal", prefix: "$" },
      { id: "interest", label: "Interest Earned", prefix: "$" },
      { id: "maturity", label: "Maturity Payoff", prefix: "$" }
    ],
    formula: `
      <p class="text-sm text-slate-300">Fixed deposits traditionally compound quarterly (4 times a year) using the compound interest model.</p>
    `,
    examples: [
      { title: "Standard 5-Year Bank FD", desc: "A deposit of $10,000 at 6.5% interest rate compounded quarterly for 5 years matures at $13,804.20." }
    ],
    faqs: [
      { q: "Are fixed deposits safe?", a: "Yes, in most nations, retail bank fixed deposits are insured up to statutory limits by government authorities, rendering them low-risk savings assets." }
    ],
    seoContent: `
      <p class="text-slate-300 mb-4 leading-relaxed">
        Fixed Deposits are ideal for conservative investors who require absolute return certainty. Knowing the exact maturity payout ahead of time helps coordinate future cash flow needs without exposure to stock market fluctuations.
      </p>
    `,
    calcLogic: `
      const p = Number(inputs.principal);
      const r = Number(inputs.rate) / 100;
      const t = Number(inputs.years);
      const n = 4;
      const maturity = p * Math.pow(1 + r / n, n * t);
      const interest = maturity - p;
      return { invested: p, interest, maturity };
    `
  },
  {
    id: "recurring-deposit-calculator",
    title: "Recurring Deposit (RD) Calculator - Estimate RD Earnings",
    description: "Determine interest accumulated and maturity amounts for periodic recurring bank deposits.",
    category: "Investment Calculators",
    heading: "Recurring Deposit (RD) Calculator",
    subheading: "Plan monthly savings allocations and project their future cumulative maturity payout.",
    inputs: [
      { id: "monthly", label: "Monthly Deposit ($)", type: "number", default: 200, min: 10, max: 100000, step: 20 },
      { id: "rate", label: "Interest Rate (% p.a.)", type: "number", default: 6.0, min: 1, max: 20, step: 0.1 },
      { id: "months", label: "Tenure (Months)", type: "number", default: 24, min: 3, max: 120, step: 6 }
    ],
    outputs: [
      { id: "invested", label: "Total Capital Deposited", prefix: "$" },
      { id: "interest", label: "Total Interest Accrued", prefix: "$" },
      { id: "maturity", label: "Projected Maturity Amount", prefix: "$" }
    ],
    formula: `
      <p class="text-sm text-slate-300">RD compounding uses standard quarterly compounding logic applied to sequentially added monthly savings:</p>
    `,
    examples: [
      { title: "2-Year Savings Goal", desc: "A monthly commitment of $200 for 24 months at 6% interest rate yields $4,800 in total deposits and matures with $5,107.49." }
    ],
    faqs: [
      { q: "How is RD interest compounded?", a: "Most banking networks calculate RD interest using quarterly compound compounding intervals, although payments are credited at maturity." }
    ],
    seoContent: `
      <p class="text-slate-300 mb-4 leading-relaxed">
        A recurring deposit functions as an entry-level investment instrument. By locking in a monthly savings quota, you establish financial discipline while collecting a reliable return rate higher than generic savings checking accounts.
      </p>
    `,
    calcLogic: `
      const p = Number(inputs.monthly);
      const R = Number(inputs.rate) / 100;
      const n = Number(inputs.months);
      const invested = p * n;
      let maturity = 0;
      for (let i = 1; i <= n; i++) {
        const t = (n - i + 1) / 12;
        maturity += p * Math.pow(1 + R / 4, 4 * t);
      }
      const interest = maturity - invested;
      return { invested, interest, maturity };
    `
  },
  {
    id: "retirement-calculator",
    title: "Retirement Calculator - Estimate Nest Egg and Income",
    description: "Determine the savings needed to achieve financial freedom by your retirement age. Test returns and post-retirement longevity variables.",
    category: "Investment Calculators",
    heading: "Retirement Planning Calculator",
    subheading: "Project the future size of your retirement assets and estimate monthly pension payouts.",
    inputs: [
      { id: "age", label: "Current Age", type: "number", default: 30, min: 18, max: 80, step: 1 },
      { id: "retireAge", label: "Target Retirement Age", type: "number", default: 65, min: 40, max: 90, step: 1 },
      { id: "currentSavings", label: "Current Savings ($)", type: "number", default: 25000, min: 0, max: 5000000, step: 5000 },
      { id: "monthly", label: "Monthly Retirement Savings ($)", type: "number", default: 400, min: 0, max: 50000, step: 50 },
      { id: "rate", label: "Annual Pre-Retirement Return (%)", type: "number", default: 8.0, min: 1, max: 20, step: 0.1 }
    ],
    outputs: [
      { id: "years", label: "Years Until Retirement", prefix: "" },
      { id: "nestEgg", label: "Projected Nest Egg at Retirement", prefix: "$" },
      { id: "estIncome", label: "Est. Monthly Post-Retirement Withdrawal (4% rule)", prefix: "$" }
    ],
    formula: `
      <p class="text-sm text-slate-300">Calculates compound growth on initial savings and aggregates future values of monthly contributions until retirement age is reached.</p>
    `,
    examples: [
      { title: "Standard 35-Year Plan", desc: "Starting at age 30 with $25,000, saving $400 monthly at 8% returns results in a retirement fund of $1,260,378 at age 65, yielding roughly $4,201 per month under the 4% rule." }
    ],
    faqs: [
      { q: "What is the 4% rule in retirement?", a: "The 4% rule suggests that an individual can withdraw 4% from their retirement assets during their first year of retirement, and then adjust that rate for inflation each subsequent year, with a low risk of outliving their capital." }
    ],
    seoContent: `
      <p class="text-slate-300 mb-4 leading-relaxed">
        Retirement planning hinges on time. The sooner you begin saving, the less money you have to set aside out of pocket, as compounding interest performs the heavy lifting of multiplying your wealth over decades.
      </p>
    `,
    calcLogic: `
      const age = Number(inputs.age);
      const retireAge = Number(inputs.retireAge);
      const years = Math.max(0, retireAge - age);
      const current = Number(inputs.currentSavings);
      const monthly = Number(inputs.monthly);
      const r = Number(inputs.rate) / 100;
      const mr = r / 12;
      const totalMonths = years * 12;
      let nestEgg = current * Math.pow(1 + r, years);
      if (mr > 0) {
        nestEgg += monthly * ((Math.pow(1 + mr, totalMonths) - 1) / mr);
      } else {
        nestEgg += monthly * totalMonths;
      }
      const estIncome = (nestEgg * 0.04) / 12;
      return { years, nestEgg, estIncome };
    `
  },
  {
    id: "income-tax-calculator",
    title: "Income Tax Calculator - Simple Progressive Tax Estimator",
    description: "Estimate your federal/local income tax liability and take-home pay based on simplified progressive tax structures.",
    category: "Tax Calculators",
    heading: "Simplified Income Tax Calculator",
    subheading: "Estimate your tax bracket, tax liability, and take-home salary.",
    inputs: [
      { id: "income", label: "Gross Annual Income ($)", type: "number", default: 75000, min: 1000, max: 10000000, step: 1000 },
      { id: "deductions", label: "Deductions & Exemptions ($)", type: "number", default: 13850, min: 0, max: 500000, step: 100 }
    ],
    outputs: [
      { id: "taxable", label: "Taxable Net Income", prefix: "$" },
      { id: "tax", label: "Estimated Income Tax Liability", prefix: "$" },
      { id: "takeHome", label: "Estimated Annual Take-Home Pay", prefix: "$" },
      { id: "rate", label: "Effective Tax Rate", suffix: "%" }
    ],
    formula: `
      <p class="text-sm text-slate-300">Applies taxable income (Gross minus Deductions) through standard progressive tax tiers:</p>
      <ul class="text-xs text-slate-400 mt-2 list-disc pl-6 space-y-1">
        <li>10% on income up to $11,000</li>
        <li>12% on income between $11,001 and $44,725</li>
        <li>22% on income between $44,726 and $95,375</li>
        <li>24% on income above $95,375</li>
      </ul>
    `,
    examples: [
      { title: "Standard Salary Example", desc: "A gross income of $75,000 with a standard deduction of $13,850 results in a taxable income of $61,150, estimated tax of $8,758, and an effective rate of 11.68%." }
    ],
    faqs: [
      { q: "What is a progressive tax?", a: "A progressive tax is a tax system where the tax rate increases as the taxable amount increases. You are not taxed at a single rate for your entire income, but rather in chunks corresponding to progressive tiers." }
    ],
    seoContent: `
      <p class="text-slate-300 mb-4 leading-relaxed">
        Understanding tax brackets is vital for financial planning. Making pre-tax contributions to accounts like traditional 401(k) plans reduces your gross taxable income, potentially shifting you into a lower tax bracket.
      </p>
    `,
    calcLogic: `
      const gross = Number(inputs.income);
      const ded = Number(inputs.deductions);
      const taxable = Math.max(0, gross - ded);
      let tax = 0;
      if (taxable > 95375) {
        tax += (taxable - 95375) * 0.24 + (95375 - 44725) * 0.22 + (44725 - 11000) * 0.12 + 11000 * 0.10;
      } else if (taxable > 44725) {
        tax += (taxable - 44725) * 0.22 + (44725 - 11000) * 0.12 + 11000 * 0.10;
      } else if (taxable > 11000) {
        tax += (taxable - 11000) * 0.12 + 11000 * 0.10;
      } else {
        tax += taxable * 0.10;
      }
      const takeHome = gross - tax;
      const rate = gross > 0 ? (tax / gross) * 100 : 0;
      return { taxable, tax, takeHome, rate };
    `
  },
  {
    id: "vat-calculator",
    title: "VAT Calculator - Value Added Tax Estimator",
    description: "Quickly add or subtract Value Added Tax (VAT) from transactions. Supports standard global VAT rates.",
    category: "Tax Calculators",
    heading: "VAT Calculator",
    subheading: "Add or remove Value Added Tax from price figures instantly.",
    inputs: [
      { id: "amount", label: "Amount ($)", type: "number", default: 120, min: 1, max: 10000000, step: 1 },
      { id: "rate", label: "VAT Rate (%)", type: "number", default: 20, min: 1, max: 50, step: 0.5 },
      { id: "type", label: "Calculation Action", type: "select", options: [{value: "add", label: "Add VAT (Inclusive Price)"}, {value: "remove", label: "Remove VAT (Exclusive Price)"}], default: "add" }
    ],
    outputs: [
      { id: "net", label: "Net Amount (Excl. VAT)", prefix: "$" },
      { id: "vat", label: "VAT Component Amount", prefix: "$" },
      { id: "gross", label: "Gross Amount (Incl. VAT)", prefix: "$" }
    ],
    formula: `
      <p class="text-sm text-slate-300">To add VAT: Gross = Net &times; (1 + Rate / 100)</p>
      <p class="text-sm text-slate-300">To remove VAT: Net = Gross / (1 + Rate / 100)</p>
    `,
    examples: [
      { title: "Standard UK/EU VAT Example", desc: "A price of £100 with 20% VAT added equals a gross price of £120. Conversely, removing 20% VAT from £120 returns the net price of £100." }
    ],
    faqs: [
      { q: "What is Value Added Tax?", a: "Value Added Tax (VAT) is a consumption tax assessed on the value added in each production stage of a product or service. The ultimate consumer pays the cumulative VAT cost." }
    ],
    seoContent: `
      <p class="text-slate-300 mb-4 leading-relaxed">
        VAT is common throughout the UK, European Union, and various global jurisdictions. It represents a flat-rate consumption tax applied to sales. Business owners must distinguish between gross revenues (inclusive of VAT) and net income to maintain correct bookkeeping.
      </p>
    `,
    calcLogic: `
      const amt = Number(inputs.amount);
      const r = Number(inputs.rate) / 100;
      const act = inputs.type;
      let net = 0, vat = 0, gross = 0;
      if (act === "add") {
        net = amt;
        vat = amt * r;
        gross = amt + vat;
      } else {
        net = amt / (1 + r);
        vat = amt - net;
        gross = amt;
      }
      return { net, vat, gross };
    `
  },
  {
    id: "sales-tax-calculator",
    title: "Sales Tax Calculator - Calculate Sales Tax and Total Cost",
    description: "Determine the final price of an item after local state and county sales taxes have been added.",
    category: "Tax Calculators",
    heading: "Sales Tax Calculator",
    subheading: "Find the total retail cost of purchases after adding state sales taxes.",
    inputs: [
      { id: "price", label: "Original Retail Price ($)", type: "number", default: 75, min: 0.1, max: 1000000, step: 1 },
      { id: "taxRate", label: "Sales Tax Rate (%)", type: "number", default: 8.25, min: 0, max: 30, step: 0.05 }
    ],
    outputs: [
      { id: "salesTax", label: "Sales Tax Cost", prefix: "$" },
      { id: "totalPrice", label: "Total Out-of-Pocket Cost", prefix: "$" }
    ],
    formula: `
      <div class="my-3 p-3 bg-slate-900 rounded font-mono text-emerald-400">
        Sales Tax = Retail Price &times; (Tax Rate / 100)
      </div>
    `,
    examples: [
      { title: "Standard State Sales Tax", desc: "A retail purchase of $150 with an 8.25% sales tax rate results in $12.38 in sales tax, totaling $162.38." }
    ],
    faqs: [
      { q: "Is sales tax national?", a: "In countries like the United States, sales tax is assessed at state, county, and local municipal levels, meaning tax rates differ significantly depending on the point of sale." }
    ],
    seoContent: `
      <p class="text-slate-300 mb-4 leading-relaxed">
        Keep track of sales tax rates when planning purchases. Because price tags in various regions are displayed exclusive of sales taxes, the final checkout value will include these added statutory percentages.
      </p>
    `,
    calcLogic: `
      const price = Number(inputs.price);
      const rate = Number(inputs.taxRate) / 100;
      const salesTax = price * rate;
      const totalPrice = price + salesTax;
      return { salesTax, totalPrice };
    `
  },
  {
    id: "salary-calculator",
    title: "Salary Calculator - Compare Weekly and Monthly Income",
    description: "Convert annual salary into monthly, bi-weekly, weekly, and hourly pay metrics. Plan budgeting benchmarks.",
    category: "Salary Calculators",
    heading: "Salary Pay Frequency Calculator",
    subheading: "Convert your annual base compensation package into regular paycycle increments.",
    inputs: [
      { id: "annual", label: "Annual Base Salary ($)", type: "number", default: 60000, min: 1000, max: 5000000, step: 1000 },
      { id: "hours", label: "Weekly Work Hours", type: "number", default: 40, min: 10, max: 80, step: 1 }
    ],
    outputs: [
      { id: "monthly", label: "Monthly Income", prefix: "$" },
      { id: "semimonthly", label: "Semi-Monthly Pay (24x/yr)", prefix: "$" },
      { id: "biweekly", label: "Bi-Weekly Pay (26x/yr)", prefix: "$" },
      { id: "weekly", label: "Weekly Income", prefix: "$" },
      { id: "hourly", label: "Equivalent Hourly Rate", prefix: "$" }
    ],
    formula: `
      <p class="text-sm text-slate-300">Converts annual salary based on fixed calendar durations (e.g. 12 months, 52 weeks, or 2080 standard annual work hours):</p>
    `,
    examples: [
      { title: "$60,000 Base Conversion", desc: "An annual salary of $60,000 translates to $5,000 monthly, $2,307.69 bi-weekly, and $28.85 per hour (assuming 40 hours per week)." }
    ],
    faqs: [
      { q: "What is the difference between bi-weekly and semi-monthly?", a: "Bi-weekly pay occurs every two weeks (26 times a year), resulting in two months with three paychecks. Semi-monthly occurs twice a month on specific dates (24 times a year)." }
    ],
    seoContent: `
      <p class="text-slate-300 mb-4 leading-relaxed">
        Calculating pay cycle splits helps align financial plans and loan amortizations with incoming salary. Many mortgage lenders configure automated drafts on a bi-weekly cycle to reduce interest balances.
      </p>
    `,
    calcLogic: `
      const annual = Number(inputs.annual);
      const hours = Number(inputs.hours);
      const monthly = annual / 12;
      const semimonthly = annual / 24;
      const biweekly = annual / 26;
      const weekly = annual / 52;
      const hourly = weekly / hours;
      return { monthly, semimonthly, biweekly, weekly, hourly };
    `
  },
  {
    id: "hourly-wage-calculator",
    title: "Hourly Wage Calculator - Convert Hourly Wage to Salary",
    description: "Convert your hourly wage into annual, monthly, and weekly salary figures. Estimate gross earnings before taxes.",
    category: "Salary Calculators",
    heading: "Hourly Wage to Salary Converter",
    subheading: "Translate hourly rates into long-term cumulative compensation figures.",
    inputs: [
      { id: "rate", label: "Hourly Pay Rate ($)", type: "number", default: 25, min: 1, max: 500, step: 0.5 },
      { id: "hours", label: "Average Work Hours / Week", type: "number", default: 40, min: 1, max: 100, step: 1 },
      { id: "weeks", label: "Work Weeks / Year", type: "number", default: 52, min: 10, max: 52, step: 1 }
    ],
    outputs: [
      { id: "weekly", label: "Gross Weekly Salary", prefix: "$" },
      { id: "monthly", label: "Gross Monthly Salary", prefix: "$" },
      { id: "annual", label: "Gross Annual Salary", prefix: "$" }
    ],
    formula: `
      <div class="my-3 p-3 bg-slate-900 rounded font-mono text-emerald-400 text-center">
        Annual Salary = Hourly Rate &times; Weekly Hours &times; Work Weeks
      </div>
    `,
    examples: [
      { title: "$25 Per Hour Full-Time", desc: "Working 40 hours per week for 52 weeks at $25/hr results in $1,000 weekly, $4,333.33 monthly, and $52,000 annually." }
    ],
    faqs: [
      { q: "Does this include paid time off?", a: "This calculator bases outputs on actual working hours. If you receive paid time off (PTO), you should count those weeks toward your annual totals." }
    ],
    seoContent: `
      <p class="text-slate-300 mb-4 leading-relaxed">
        Converting hourly wages to annual equivalents is the first step in applying for home mortgages or auto loans, where lenders require verification of gross yearly salary levels.
      </p>
    `,
    calcLogic: `
      const rate = Number(inputs.rate);
      const hours = Number(inputs.hours);
      const weeks = Number(inputs.weeks);
      const weekly = rate * hours;
      const annual = weekly * weeks;
      const monthly = annual / 12;
      return { weekly, monthly, annual };
    `
  },
  {
    id: "overtime-calculator",
    title: "Overtime Calculator - Calculate Overtime Earnings",
    description: "Determine regular and overtime wages. Calculate total pay incorporating custom overtime rate multipliers.",
    category: "Salary Calculators",
    heading: "Overtime Pay Calculator",
    subheading: "Estimate total earnings including time-and-a-half or double-time schedules.",
    inputs: [
      { id: "rate", label: "Regular Hourly Rate ($)", type: "number", default: 22, min: 1, max: 400, step: 0.5 },
      { id: "regularHours", label: "Regular Hours Worked", type: "number", default: 40, min: 0, max: 80, step: 1 },
      { id: "overtimeHours", label: "Overtime Hours Worked", type: "number", default: 10, min: 0, max: 60, step: 1 },
      { id: "multiplier", label: "Overtime Rate Multiplier", type: "number", default: 1.5, min: 1, max: 3, step: 0.1 }
    ],
    outputs: [
      { id: "regularPay", label: "Regular Base Pay", prefix: "$" },
      { id: "overtimePay", label: "Overtime Wages", prefix: "$" },
      { id: "total", label: "Total Gross Wages", prefix: "$" }
    ],
    formula: `
      <div class="my-3 p-3 bg-slate-900 rounded font-mono text-emerald-400">
        Overtime Pay = Regular Hourly Rate &times; Multiplier &times; Overtime Hours
      </div>
    `,
    examples: [
      { title: "Standard Time-and-a-Half Example", desc: "A base rate of $20/hr, with 40 regular hours and 5 overtime hours at a 1.5x multiplier, returns $800 regular pay, $150 overtime pay, totaling $950 gross pay." }
    ],
    faqs: [
      { q: "What is time-and-a-half?", a: "Time-and-a-half is a payment rate equal to 1.5 times an employee's regular hourly wage, commonly mandated for working more than 40 hours per week in various jurisdictions." }
    ],
    seoContent: `
      <p class="text-slate-300 mb-4 leading-relaxed">
        Calculating overtime pay accurately prevents payroll errors and ensures compliance with local labor acts. Extra earnings from overtime shifts can be earmarked for emergency savings accounts.
      </p>
    `,
    calcLogic: `
      const rate = Number(inputs.rate);
      const regHrs = Number(inputs.regularHours);
      const otHrs = Number(inputs.overtimeHours);
      const mult = Number(inputs.multiplier);
      const regularPay = rate * regHrs;
      const overtimePay = rate * mult * otHrs;
      const total = regularPay + overtimePay;
      return { regularPay, overtimePay, total };
    `
  },
  {
    id: "savings-calculator",
    title: "Savings Goal Calculator - Plan and Achieve Savings Targets",
    description: "Determine how much you can save over time by combining starting balances with periodic monthly deposits and interest.",
    category: "Banking Calculators",
    heading: "Savings Growth Calculator",
    subheading: "Project future cash reserves based on regular monthly savings plans.",
    inputs: [
      { id: "start", label: "Starting Cash Balance ($)", type: "number", default: 5000, min: 0, max: 1000000, step: 100 },
      { id: "monthly", label: "Monthly Deposit ($)", type: "number", default: 250, min: 0, max: 50000, step: 50 },
      { id: "rate", label: "Annual Interest Rate (%)", type: "number", default: 4.5, min: 0, max: 20, step: 0.1 },
      { id: "years", label: "Timeframe (Years)", type: "number", default: 5, min: 1, max: 30, step: 1 }
    ],
    outputs: [
      { id: "deposits", label: "Total Capital Deposited", prefix: "$" },
      { id: "interest", label: "Interest Compounded", prefix: "$" },
      { id: "total", label: "Ending Balance", prefix: "$" }
    ],
    formula: `
      <p class="text-sm text-slate-300">Combines compound interest on starting capital with annuity interest on monthly deposits.</p>
    `,
    examples: [
      { title: "5-Year Mid-term Savings Goal", desc: "$5,000 start balance and $250 monthly deposits at 4.5% interest rate yields $21,399.78 in 5 years." }
    ],
    faqs: [
      { q: "What is a High-Yield Savings Account (HYSA)?", a: "An HYSA is a bank account that pays interest rates significantly higher than the national average, allowing cash reserves to grow faster." }
    ],
    seoContent: `
      <p class="text-slate-300 mb-4 leading-relaxed">
        Building cash savings secures against emergency events and gives you the flexibility to invest in opportunities. High interest savings checking can offset inflation impacts on your idle capital.
      </p>
    `,
    calcLogic: `
      const start = Number(inputs.start);
      const monthly = Number(inputs.monthly);
      const r = Number(inputs.rate) / 100;
      const mr = r / 12;
      const t = Number(inputs.years);
      const totalMonths = t * 12;
      const deposits = start + (monthly * totalMonths);
      let total = start * Math.pow(1 + mr, totalMonths);
      if (mr > 0) {
        total += monthly * ((Math.pow(1 + mr, totalMonths) - 1) / mr);
      } else {
        total += monthly * totalMonths;
      }
      const interest = total - deposits;
      return { deposits, interest, total };
    `
  },
  {
    id: "interest-calculator",
    title: "Interest Calculator - Compare Simple and Compound Interest",
    description: "Compare interest earned using simple interest versus compounding growth models. Essential for students and investors.",
    category: "Banking Calculators",
    heading: "Interest Comparison Calculator",
    subheading: "Compare the return difference between simple and compounding options.",
    inputs: [
      { id: "principal", label: "Principal Balance ($)", type: "number", default: 10000, min: 100, max: 10000000, step: 500 },
      { id: "rate", label: "Annual Rate of Interest (%)", type: "number", default: 5, min: 0.1, max: 30, step: 0.1 },
      { id: "years", label: "Timeframe (Years)", type: "number", default: 10, min: 1, max: 40, step: 1 }
    ],
    outputs: [
      { id: "simple", label: "Simple Interest Earned", prefix: "$" },
      { id: "compound", label: "Compound Interest Earned (Annual Compounding)", prefix: "$" },
      { id: "difference", label: "Compounding Growth Advantage", prefix: "$" }
    ],
    formula: `
      <p class="text-sm text-slate-300">Simple Interest: I = P &times; r &times; t</p>
      <p class="text-sm text-slate-300">Compound Interest: I = P &times; (1 + r)<sup>t</sup> - P</p>
    `,
    examples: [
      { title: "10-Year Growth Comparison", desc: "$10,000 at 5% for 10 years yields $5,000 in simple interest, compared to $6,288.95 in compounding interest, a difference of $1,288.95." }
    ],
    faqs: [
      { q: "Where is simple interest used?", a: "Simple interest is typically used in short-term loans, personal advances, and select checking accounts. Long-term assets utilize compound interest." }
    ],
    seoContent: `
      <p class="text-slate-300 mb-4 leading-relaxed">
        Comparing growth profiles visually highlights why compounding is preferred for long-term investments. Over extended periods, the simple growth model behaves linearly, while compound interest displays exponential acceleration.
      </p>
    `,
    calcLogic: `
      const p = Number(inputs.principal);
      const r = Number(inputs.rate) / 100;
      const t = Number(inputs.years);
      const simple = p * r * t;
      const compound = p * Math.pow(1 + r, t) - p;
      const difference = Math.max(0, compound - simple);
      return { simple, compound, difference };
    `
  },
  {
    id: "loan-payoff-calculator",
    title: "Loan Payoff Calculator - Calculate Early Payoff Savings",
    description: "Determine how much time and interest you can save by adding extra payments to your outstanding loans.",
    category: "Banking Calculators",
    heading: "Loan Payoff & Acceleration Calculator",
    subheading: "Find out how much interest you can save by paying extra each month.",
    inputs: [
      { id: "balance", label: "Current Loan Balance ($)", type: "number", default: 45000, min: 500, max: 2000000, step: 500 },
      { id: "rate", label: "Annual Interest Rate (%)", type: "number", default: 6.8, min: 0.1, max: 30, step: 0.05 },
      { id: "payment", label: "Minimum Monthly Payment ($)", type: "number", default: 500, min: 10, max: 20000, step: 10 },
      { id: "extra", label: "Extra Monthly Payment ($)", type: "number", default: 150, min: 0, max: 10000, step: 10 }
    ],
    outputs: [
      { id: "standardMonths", label: "Standard Repayment (Months)", prefix: "" },
      { id: "acceleratedMonths", label: "Accelerated Repayment (Months)", prefix: "" },
      { id: "interestSaved", label: "Total Interest Capital Saved", prefix: "$" }
    ],
    formula: `
      <p class="text-sm text-slate-300">Determines amortization schedules under base and accelerated payment rates, then calculates total interest differences.</p>
    `,
    examples: [
      { title: "Student Loan Acceleration Example", desc: "A balance of $45,000 at 6.8% with a $500 minimum payment requires 120 months. Adding $150 extra monthly reduces the payoff time to 84 months and saves $3,845 in interest." }
    ],
    faqs: [
      { q: "Are there penalties for paying off loans early?", a: "Some lenders impose prepayment penalties. Check your original loan agreement to ensure early repayments are fee-free." }
    ],
    seoContent: `
      <p class="text-slate-300 mb-4 leading-relaxed">
        Adding even small amounts to your monthly payment pays down the loan principal directly. Since interest is calculated based on the outstanding principal balance, reducing the principal accelerates the schedule.
      </p>
    `,
    calcLogic: `
      const balance = Number(inputs.balance);
      const r = Number(inputs.rate) / 12 / 100;
      const minPay = Number(inputs.payment);
      const extraPay = Number(inputs.extra);
      function getSchedule(p, rate, monthlyPay) {
        let bal = p;
        let months = 0;
        let totalInterest = 0;
        while (bal > 0 && months < 600) {
          const interest = bal * rate;
          totalInterest += interest;
          const principalPaid = Math.min(bal, monthlyPay - interest);
          if (principalPaid <= 0) {
            return { months: 999, totalInterest: 999999 };
          }
          bal -= principalPaid;
          months++;
        }
        return { months, totalInterest };
      }
      const standard = getSchedule(balance, r, minPay);
      const accelerated = getSchedule(balance, r, minPay + extraPay);
      const interestSaved = Math.max(0, standard.totalInterest - accelerated.totalInterest);
      return { 
        standardMonths: standard.months === 999 ? "N/A" : standard.months, 
        acceleratedMonths: accelerated.months === 999 ? "N/A" : accelerated.months, 
        interestSaved 
      };
    `
  },
  {
    id: "debt-reduction-calculator",
    title: "Debt Reduction Calculator - Snowball and Avalanche Methods",
    description: "Analyze debt payoff strategies. Compare repayment terms using extra payment allocations.",
    category: "Banking Calculators",
    heading: "Debt Reduction Estimator",
    subheading: "Estimate payoff timelines for multiple debts under a consolidated plan.",
    inputs: [
      { id: "debt1", label: "Debt 1 Balance ($)", type: "number", default: 8000, min: 100, max: 500000, step: 100 },
      { id: "rate1", label: "Debt 1 Interest Rate (%)", type: "number", default: 18.9, min: 0, max: 40, step: 0.1 },
      { id: "pay1", label: "Debt 1 Minimum Payment ($)", type: "number", default: 240, min: 5, max: 5000, step: 10 },
      { id: "debt2", label: "Debt 2 Balance ($)", type: "number", default: 12000, min: 100, max: 500000, step: 100 },
      { id: "rate2", label: "Debt 2 Interest Rate (%)", type: "number", default: 8.5, min: 0, max: 40, step: 0.1 },
      { id: "pay2", label: "Debt 2 Minimum Payment ($)", type: "number", default: 280, min: 5, max: 5000, step: 10 },
      { id: "extra", label: "Additional Monthly Roll ($)", type: "number", default: 200, min: 0, max: 10000, step: 10 }
    ],
    outputs: [
      { id: "totalDebts", label: "Total Combined Debt", prefix: "$" },
      { id: "totalMin", label: "Combined Min. Monthly Payment", prefix: "$" },
      { id: "payoffMonths", label: "Estimated Time to Debt Free", suffix: " Months" }
    ],
    formula: `
      <p class="text-sm text-slate-300">Aggregates combined balances and allocates the additional monthly roll to pay down balances faster.</p>
    `,
    examples: [
      { title: "Credit Card and Loan Combo", desc: "A total debt of $20,000 ($8K card at 18.9%, $12K loan at 8.5%) requires $520/month in minimum payments. Adding an extra $200 monthly pays off the balance in roughly 30 months instead of 48." }
    ],
    faqs: [
      { q: "What is the difference between snowball and avalanche?", a: "The Debt Snowball method targets the smallest balance first to build momentum. The Debt Avalanche method targets the highest interest rate first to minimize interest cost." }
    ],
    seoContent: `
      <p class="text-slate-300 mb-4 leading-relaxed">
        Eliminating personal debt is key to building sustainable wealth. By combining minimum payments and rolling over balances into a single plan, you can clear debts systematically.
      </p>
    `,
    calcLogic: `
      const d1 = Number(inputs.debt1);
      const r1 = Number(inputs.rate1) / 12 / 100;
      const p1 = Number(inputs.pay1);
      const d2 = Number(inputs.debt2);
      const r2 = Number(inputs.rate2) / 12 / 100;
      const p2 = Number(inputs.pay2);
      const extra = Number(inputs.extra);
      const totalDebts = d1 + d2;
      const totalMin = p1 + p2;
      let bal1 = d1;
      let bal2 = d2;
      let months = 0;
      const totalPay = totalMin + extra;
      while ((bal1 > 0 || bal2 > 0) && months < 600) {
        let interest1 = bal1 > 0 ? bal1 * r1 : 0;
        let interest2 = bal2 > 0 ? bal2 * r2 : 0;
        let remPay = totalPay - interest1 - interest2;
        if (remPay <= 0) {
          months = 999;
          break;
        }
        if (bal1 > 0) {
          const paid1 = Math.min(bal1, p1 - interest1 + extra);
          bal1 -= paid1;
          remPay -= paid1;
          if (bal2 > 0) {
            const paid2 = Math.min(bal2, remPay);
            bal2 -= paid2;
          }
        } else if (bal2 > 0) {
          const paid2 = Math.min(bal2, remPay);
          bal2 -= paid2;
        }
        months++;
      }
      return { totalDebts, totalMin, payoffMonths: months === 999 ? "N/A" : months };
    `
  }
];

module.exports = calculators;
