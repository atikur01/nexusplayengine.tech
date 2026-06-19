const fs = require('fs');
const path = require('path');
const calculators = require('./data/calculators-data');
const articles = require('./data/blog-data');
const legalPages = require('./data/legal-data');

const rootDir = path.resolve(__dirname, '..');
const dirs = [
  path.join(rootDir, 'calculators'),
  path.join(rootDir, 'blog'),
  path.join(rootDir, 'legal'),
  path.join(rootDir, 'assets', 'css'),
  path.join(rootDir, 'assets', 'js')
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const categoryGuides = {
  "Investing": `
    <h2 id="investing-fundamentals" class="text-xl sm:text-2xl font-bold text-white border-b border-slate-700/50 pb-2 mt-8">The Fundamentals of Long-Term Investing</h2>
    <p>To successfully navigate the financial markets, one must master the basic principles of asset allocation and diversification. Placing all your capital into a single stock or speculative asset exposes you to extreme volatility. A balanced portfolio typically combines equities, fixed-income bonds, and cash equivalents to distribute risk according to your investment horizon and risk tolerance.</p>
    <p>Historically, the broad stock market (such as the S&P 500) has returned an average of approximately 10% annually before inflation. While past performance does not guarantee future results, remaining invested over a period of 15 to 20 years smooths out short-term fluctuations. Dollar-cost averaging—the process of investing a fixed sum at regular intervals—ensures you buy more shares when prices are low and fewer when prices are high, eliminating the need to time the market.</p>
    <h3 class="text-base font-bold text-emerald-400 mt-4 mb-2">The Rule of 72 Explained</h3>
    <p>A quick mental shortcut used by financial professionals to estimate compound growth is the Rule of 72. By dividing 72 by your expected annual rate of return, you find the approximate number of years it will take for your investment to double. For instance, an investment earning a 6% annual return will double in value in approximately 12 years (72 / 6 = 12). If the return is 8%, the doubling time decreases to 9 years. This rule illustrates how even small improvements in your yield can have dramatic compounding effects over a decade.</p>
  `,
  "Loans": `
    <h2 id="debt-management" class="text-xl sm:text-2xl font-bold text-white border-b border-slate-700/50 pb-2 mt-8">Qualifying for Loans and Managing Debt Service</h2>
    <p>Lenders evaluate your creditworthiness using several key indicators. The most prominent is your credit score, which ranges from 300 to 850. A score above 740 is generally considered excellent and qualifies you for prime interest rates. To maintain a high score, pay your bills on time, keep your credit utilization ratio below 30%, and avoid opening multiple new credit lines in quick succession.</p>
    <p>Another vital metric is the Debt-to-Income (DTI) ratio. This ratio compares your monthly debt payments to your gross monthly income. Lenders prefer a DTI ratio below 36%, with no more than 28% allocated to housing costs (mortgage or rent). If your DTI ratio is too high, lenders may reject your loan application or charge higher interest rates to offset the default risk. Reducing existing debt balances before applying for new credit is a highly effective way to lower your DTI.</p>
    <h3 class="text-base font-bold text-emerald-400 mt-4 mb-2">How Prepayments Accelerate Payoff</h3>
    <p>Making extra payments on your loans directly reduces the principal balance. Because interest is computed based on the outstanding principal, a lower balance results in less interest accruing each cycle. Even modest extra payments of $50 or $100 monthly can shorten a 30-year mortgage by several years and save you tens of thousands of dollars in total interest. Always ensure your lender applies prepayments directly to the principal rather than toward future scheduled monthly payments.</p>
  `,
  "Budgeting": `
    <h2 id="budget-frameworks" class="text-xl sm:text-2xl font-bold text-white border-b border-slate-700/50 pb-2 mt-8">Selecting the Right Budgeting Framework</h2>
    <p>A budget is not a restriction; it is a blueprint for your financial values. Without a structured way to track income and expenditures, it is easy to succumb to lifestyle inflation, where your spending expands to absorb your salary increases. The first step is to record every transaction for 30 to 60 days to identify hidden cash leaks such as forgotten subscriptions, dining out excess, or impulse online shopping.</p>
    <p>One popular framework is the Zero-Based Budget, where every single dollar of income is assigned a specific job (savings, bills, groceries, investing) until the balance reaches zero. This ensures that no cash is spent mindlessly. Another effective method is the Envelope System, where you allocate cash into labeled envelopes for different spending categories. Once an envelope is empty, you cannot spend any more in that category until the next month, enforcing strict discipline.</p>
    <h3 class="text-base font-bold text-emerald-400 mt-4 mb-2">Behavioral Finance Tips for Budget Success</h3>
    <p>Our financial decisions are heavily influenced by psychological biases. To bypass these impulses, automate your savings by setting up direct deposits from your paycheck into dedicated savings and brokerage accounts. If the money is moved before it hits your main checking account, you learn to live on the remaining balance without feeling deprived. Additionally, wait 48 hours before making any non-essential purchases exceeding $100 to differentiate between true needs and passing wants.</p>
  `,
  "Taxes": `
    <h2 id="tax-efficiency" class="text-xl sm:text-2xl font-bold text-white border-b border-slate-700/50 pb-2 mt-8">Tax Optimization and Planning Strategies</h2>
    <p>Tax planning is the legal process of structuring your finances to minimize your tax liability. It is important to distinguish between tax avoidance, which uses legal provisions to reduce tax, and tax evasion, which is the illegal practice of not paying taxes. By understanding how progressive brackets, deductions, and tax credits function, you can keep more of your hard-earned money.</p>
    <p>One of the most effective ways to lower your taxable income is by contributing to pre-tax retirement accounts, such as a traditional 401(k) or traditional IRA. These contributions are deducted from your gross income, reducing your tax liability for the current year. The funds grow tax-deferred until you withdraw them in retirement, when you may be in a lower tax bracket. Alternatively, Roth accounts use post-tax dollars, allowing you to withdraw funds tax-free during retirement.</p>
    <h3 class="text-base font-bold text-emerald-400 mt-4 mb-2">Deductions: Standard vs. Itemized</h3>
    <p>When filing taxes, you must choose between taking the standard deduction or itemizing your deductions. The standard deduction is a flat amount set by the government based on your filing status. Itemizing allows you to deduct specific expenses, such as mortgage interest, state and local taxes (SALT) up to statutory limits, medical expenses, and charitable donations. Itemize only if the sum of your individual deductions exceeds the standard deduction amount.</p>
  `,
  "Savings": `
    <h2 id="savings-infrastructure" class="text-xl sm:text-2xl font-bold text-white border-b border-slate-700/50 pb-2 mt-8">Building a Secure Savings Infrastructure</h2>
    <p>The safety and accessibility of your cash reserves are just as important as the interest rate they earn. An emergency fund covering 3 to 6 months of living expenses should be kept in a highly liquid, low-risk account. Avoid investing emergency reserves in the stock market, as a sudden downturn could force you to sell shares at a loss to cover an unexpected medical bill or job loss.</p>
    <p>A High-Yield Savings Account (HYSA) is an excellent instrument for emergency funds, offering interest rates up to 10 to 12 times higher than traditional checking accounts while maintaining full liquidity. Ensure your banking institution is federally insured (such as FDIC in the US), which protects your deposits up to statutory limits ($250,000 per depositor, per ownership category). For funds you do not need immediate access to, Certificates of Deposit (CDs) lock in a fixed interest rate for a specified term in exchange for restricted withdrawals.</p>
    <h3 class="text-base font-bold text-emerald-400 mt-4 mb-2">Protecting Cash Against Inflation</h3>
    <p>While cash is low-risk, holding excessive cash reserves over long periods guarantees a loss of purchasing power due to inflation. If the annual inflation rate is 3% and your savings account yields 1%, your real rate of return is -2%, meaning your cash buys less each year. To protect your wealth, hold only what is necessary for short-term expenses and emergencies in cash, and invest the surplus in compounding assets like equities, real estate, or inflation-indexed bonds.</p>
  `
};

const glossaries = {
  "Investing": `
    <h2 id="glossary" class="text-xl sm:text-2xl font-bold text-white border-b border-slate-700/50 pb-2 mt-8">Glossary of Key Financial Terms</h2>
    <ul class="list-disc pl-6 space-y-2 mt-4 text-slate-300">
      <li><strong>Portfolio Diversification:</strong> The practice of spreading investments across various asset classes to reduce volatility.</li>
      <li><strong>Dollar-Cost Averaging:</strong> Periodically investing fixed cash amounts regardless of market pricing.</li>
      <li><strong>Return on Investment (ROI):</strong> A performance measure indicating the efficiency of an investment.</li>
      <li><strong>Compound Interest:</strong> Interest calculated on the initial principal and the accumulated interest of prior periods.</li>
      <li><strong>S&P 500 Index:</strong> An index monitoring the stock performance of 500 large companies listed on US exchanges.</li>
    </ul>
  `,
  "Loans": `
    <h2 id="glossary" class="text-xl sm:text-2xl font-bold text-white border-b border-slate-700/50 pb-2 mt-8">Glossary of Key Financial Terms</h2>
    <ul class="list-disc pl-6 space-y-2 mt-4 text-slate-300">
      <li><strong>Loan Amortization:</strong> Spreading out loan repayment into a series of fixed periodic payments.</li>
      <li><strong>Debt-to-Income Ratio:</strong> The percentage of gross monthly income used to pay monthly debt obligations.</li>
      <li><strong>Principal Balance:</strong> The original capital sum borrowed, excluding interest accrued.</li>
      <li><strong>Annual Percentage Rate (APR):</strong> The broad annual cost of a loan, including interest and transaction fees.</li>
      <li><strong>Prepayment Penalty:</strong> A fee assessed by lenders if a borrower clears a loan ahead of schedule.</li>
    </ul>
  `,
  "Budgeting": `
    <h2 id="glossary" class="text-xl sm:text-2xl font-bold text-white border-b border-slate-700/50 pb-2 mt-8">Glossary of Key Financial Terms</h2>
    <ul class="list-disc pl-6 space-y-2 mt-4 text-slate-300">
      <li><strong>Net Take-Home Pay:</strong> Disposable income remaining after taxes, insurance, and payroll deductions.</li>
      <li><strong>Lifestyle Inflation:</strong> The typical expansion of expenditures as household income levels rise.</li>
      <li><strong>Zero-Based Budgeting:</strong> Mapping out expenses so that net income minus outflow equals zero.</li>
      <li><strong>Emergency Fund:</strong> Cash reserves designated specifically for unplanned events or job loss.</li>
      <li><strong>Envelope System:</strong> A physical budgeting technique partitioning cash into distinct envelopes.</li>
    </ul>
  `,
  "Taxes": `
    <h2 id="glossary" class="text-xl sm:text-2xl font-bold text-white border-b border-slate-700/50 pb-2 mt-8">Glossary of Key Financial Terms</h2>
    <ul class="list-disc pl-6 space-y-2 mt-4 text-slate-300">
      <li><strong>Progressive Tax:</strong> A tax model assessing higher tax rates on higher brackets of income.</li>
      <li><strong>Standard Deduction:</strong> A standard deduction allowance set by tax regulators based on filing status.</li>
      <li><strong>Marginal Tax Rate:</strong> The tax rate percentage applied to the final dollar of taxable earnings.</li>
      <li><strong>Pre-Tax Contribution:</strong> Deductions from gross income directly into retirement plans before tax assessment.</li>
      <li><strong>Tax Credit:</strong> A dollar-for-dollar reduction of the actual final tax liability amount.</li>
    </ul>
  `,
  "Savings": `
    <h2 id="glossary" class="text-xl sm:text-2xl font-bold text-white border-b border-slate-700/50 pb-2 mt-8">Glossary of Key Financial Terms</h2>
    <ul class="list-disc pl-6 space-y-2 mt-4 text-slate-300">
      <li><strong>High-Yield Savings:</strong> Accounts paying interest rates far higher than basic checking rates.</li>
      <li><strong>Certificate of Deposit:</strong> A time-deposit account with fixed maturities and higher yields.</li>
      <li><strong>Deposit Insurance:</strong> Government backstop safeguarding deposits up to statutory levels.</li>
      <li><strong>Inflation Rate:</strong> The annual rate of price increases in standard consumer baskets.</li>
      <li><strong>Liquidity:</strong> The efficiency and speed of converting assets directly into cash without losses.</li>
    </ul>
  `
};

const introExtension = `
  <p>In today's complex economic landscape, managing your personal finances requires a proactive, numbers-driven approach. Relying on estimates, rules of thumb, or guesswork is no longer sufficient when planning major financial milestones such as purchasing a home, funding retirement, or clearing debt. With interest rates fluctuating and inflation impacting purchasing power, having access to accurate, instantaneous financial projections is vital for securing your financial security.</p>
  <p>This educational guide is designed to dissect the underlying mechanics of this financial topic. We provide the formulas, examples, and detailed explanations needed to help you make informed decisions. By utilizing standard financial models and understanding the mathematics behind compound yields, tax brackets, and debt amortization schedules, you can take control of your financial destiny.</p>
`;

const riskSection = `
  <h2 id="risk-management" class="text-xl sm:text-2xl font-bold text-white border-b border-slate-700/50 pb-2 mt-8">6. Risk Management and Economic Variables</h2>
  <p>Every financial plan must account for potential risks and changing economic cycles. Inflation is a primary concern, as it erodes the buying power of cash over time. If your savings yield is lower than the inflation rate, you are effectively losing wealth in real terms. To mitigate this risk, aim to balance liquid cash reserves (for emergencies) with long-term compounding assets that outpace inflation rates.</p>
  <p>Furthermore, interest rate adjustments by central banks can have a significant impact on your borrowing costs and investment returns. When rates rise, variable-rate debt becomes more expensive, making fixed-rate loans more attractive. Conversely, rising rates can boost the yield on cash deposits and high-yield savings instruments. Regularly evaluating your tax liability, debt structure, and asset allocation ensures your portfolio remains resilient against market changes.</p>
`;

const toolsExplanation = `
  <h2 id="implementation-tools" class="text-xl sm:text-2xl font-bold text-white border-b border-slate-700/50 pb-2 mt-8">7. Tools and Implementation Checklist</h2>
  <p>To successfully apply these strategies, we recommend establishing a weekly financial review. Use a spreadsheet or dedicated financial tracker to log your transactions and monitor your investment assets. A physical notebook can also serve as a daily ledger if you prefer offline monitoring.</p>
  <p>Set a recurring calendar reminder for the first of each month to recalculate your net worth. This simple habit keeps your goals in focus. When using online calculators, adjust variables like inflation and returns conservatively to avoid overestimating your future resources. Building a wealth buffer is a marathon, not a sprint, and consistency is your greatest asset.</p>
`;

const extraFaqs = `
  <div class="p-5 rounded-lg bg-slate-800 border border-slate-700">
    <h4 class="text-sm font-semibold text-white">How often should I review my financial plans?</h4>
    <p class="text-xs text-slate-400 mt-2 leading-relaxed">It is best to conduct a brief monthly review to track spending and savings rates, and a more comprehensive annual review to adjust your portfolio allocations, tax strategies, and loan payoff plans.</p>
  </div>
  <div class="p-5 rounded-lg bg-slate-800 border border-slate-700">
    <h4 class="text-sm font-semibold text-white">Should I use automated tools for my savings and investing?</h4>
    <p class="text-xs text-slate-400 mt-2 leading-relaxed">Absolutely. Automating your savings and investment deposits removes the temptation to spend your surplus income. It ensures that you consistently invest regardless of market conditions, leveraging dollar-cost averaging to your advantage.</p>
  </div>
`;

function getLayout(title, description, content, relativePath, jsonLd = '') {
  const cssPath = relativePath + 'assets/css/index.css';
  const jsPath = relativePath + 'assets/js/search.js';
  const homePath = relativePath + 'index.html';
  const blogRootPath = relativePath + 'blog/index.html';
  
  const cats = [
    { name: "Loan Calculators", slug: "loan" },
    { name: "Investment Calculators", slug: "investment" },
    { name: "Tax Calculators", slug: "tax" },
    { name: "Salary Calculators", slug: "salary" },
    { name: "Banking Calculators", slug: "banking" }
  ];

  const catLinks = cats.map(c => `
    <a href="${relativePath}index.html#${c.slug}" class="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-emerald-400 transition-colors">${c.name}</a>
  `).join('');

  const mobileCatLinks = cats.map(c => `
    <a href="${relativePath}index.html#${c.slug}" class="block pl-4 py-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors">${c.name}</a>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en" class="h-full bg-slate-900">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="https://nexusplayengine.tech/${relativePath}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://nexusplayengine.tech/${relativePath}">
  <meta property="og:image" content="https://nexusplayengine.tech/assets/images/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: '#0F172A',
            secondary: '#1E293B',
            accent: '#22C55E',
          },
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
          }
        }
      }
    }
  </script>
  <link rel="stylesheet" href="${cssPath}">
  ${jsonLd ? `<script type="application/ld+json">${jsonLd}</script>` : ''}
</head>
<body class="flex flex-col min-h-screen text-slate-100 bg-slate-900 antialiased font-sans">
  <header class="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center space-x-8">
        <a href="${homePath}" class="flex items-center space-x-2">
          <span class="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">NEXUS</span>
          <span class="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">FINANCE</span>
        </a>
        <nav class="hidden md:flex space-x-6">
          <a href="${homePath}" class="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors">Home</a>
          <div class="relative group">
            <button class="flex items-center space-x-1 text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors focus:outline-none">
              <span>Calculators</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div class="absolute left-0 w-56 mt-2 origin-top-left bg-slate-800 border border-slate-700 rounded-lg shadow-xl hidden group-hover:block transition-all">
              <div class="py-1">
                ${catLinks}
              </div>
            </div>
          </div>
          <a href="${blogRootPath}" class="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors">Blog</a>
          <a href="${relativePath}legal/about.html" class="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors">About</a>
          <a href="${relativePath}legal/contact.html" class="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors">Contact</a>
        </nav>
      </div>
      
      <div class="flex items-center space-x-4">
        <div class="relative hidden sm:block w-64">
          <input type="text" id="search-input" placeholder="Search calculators or articles..." class="w-full bg-slate-800 text-white placeholder-slate-400 text-xs rounded-lg border border-slate-700 py-2 pl-4 pr-10 focus:outline-none focus:border-emerald-500 transition-colors">
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg class="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <div id="search-results" class="absolute right-0 w-80 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl hidden max-h-96 overflow-y-auto custom-scrollbar z-50"></div>
        </div>
        
        <button id="mobile-menu-btn" class="md:hidden p-2 text-slate-400 hover:text-white focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>
    </div>
    
    <div id="mobile-menu" class="hidden md:hidden border-b border-slate-800 bg-slate-900 px-4 py-4 space-y-3 shadow-lg">
      <div class="relative w-full mb-3">
        <input type="text" id="mobile-search-input" placeholder="Search..." class="w-full bg-slate-800 text-white placeholder-slate-400 text-sm rounded-lg border border-slate-700 py-2 pl-4 pr-10 focus:outline-none focus:border-emerald-500">
        <div id="mobile-search-results" class="absolute left-0 w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl hidden max-h-60 overflow-y-auto custom-scrollbar z-50"></div>
      </div>
      <a href="${homePath}" class="block text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors py-1">Home</a>
      <div class="space-y-1">
        <span class="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Calculators</span>
        ${mobileCatLinks}
      </div>
      <a href="${blogRootPath}" class="block text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors py-1">Blog</a>
      <a href="${relativePath}legal/about.html" class="block text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors py-1">About</a>
      <a href="${relativePath}legal/contact.html" class="block text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors py-1">Contact</a>
    </div>
  </header>

  <main class="flex-grow">
    ${content}
  </main>

  <footer class="bg-slate-950 border-t border-slate-800 text-slate-400">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="space-y-4">
          <a href="${homePath}" class="flex items-center space-x-2">
            <span class="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">NEXUS</span>
          </a>
          <p class="text-xs leading-relaxed text-slate-500">
            Nexus Finance Tools offers free, high-performance financial calculators and in-depth articles to guide your investment, debt, tax, and salary decisions.
          </p>
          <div class="flex space-x-4 pt-2">
            <a href="#" class="hover:text-emerald-400 transition-colors"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
            <a href="#" class="hover:text-emerald-400 transition-colors"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
          </div>
        </div>
        
        <div>
          <h4 class="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">Calculators</h4>
          <ul class="space-y-2 text-xs">
            <li><a href="${relativePath}calculators/emi-calculator.html" class="hover:text-emerald-400 transition-colors">EMI Calculator</a></li>
            <li><a href="${relativePath}calculators/sip-calculator.html" class="hover:text-emerald-400 transition-colors">SIP Calculator</a></li>
            <li><a href="${relativePath}calculators/compound-interest-calculator.html" class="hover:text-emerald-400 transition-colors">Compound Interest</a></li>
            <li><a href="${relativePath}calculators/salary-calculator.html" class="hover:text-emerald-400 transition-colors">Salary Calculator</a></li>
            <li><a href="${relativePath}calculators/mortgage-calculator.html" class="hover:text-emerald-400 transition-colors">Mortgage Calculator</a></li>
          </ul>
        </div>
        
        <div>
          <h4 class="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">Legal</h4>
          <ul class="space-y-2 text-xs">
            <li><a href="${relativePath}legal/about.html" class="hover:text-emerald-400 transition-colors">About Us</a></li>
            <li><a href="${relativePath}legal/contact.html" class="hover:text-emerald-400 transition-colors">Contact Us</a></li>
            <li><a href="${relativePath}legal/privacy-policy.html" class="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
            <li><a href="${relativePath}legal/terms.html" class="hover:text-emerald-400 transition-colors">Terms & Conditions</a></li>
            <li><a href="${relativePath}legal/disclaimer.html" class="hover:text-emerald-400 transition-colors">Disclaimer</a></li>
            <li><a href="${relativePath}legal/cookie-policy.html" class="hover:text-emerald-400 transition-colors">Cookie Policy</a></li>
          </ul>
        </div>
        
        <div>
          <h4 class="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">Newsletter</h4>
          <p class="text-xs text-slate-500 mb-3">Get financial calculations, budgeting templates, and tips in your inbox.</p>
          <form onsubmit="event.preventDefault(); alert('Subscribed successfully!');" class="flex flex-col space-y-2">
            <input type="email" placeholder="Your email..." required class="w-full bg-slate-800 text-xs rounded border border-slate-700 py-2 px-3 focus:outline-none focus:border-emerald-500 text-white">
            <button type="submit" class="bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold py-2 rounded text-xs transition-colors">Subscribe</button>
          </form>
        </div>
      </div>
      
      <div class="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-600">
        <p>&copy; ${new Date().getFullYear()} Nexus Finance Tools. All rights reserved. Calculations are approximations and not verified professional advice.</p>
      </div>
    </div>
  </footer>

  <script src="${jsPath}"></script>
  <script>
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }
  </script>
</body>
</html>`;
}

function generateHomepage() {
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Nexus Finance Tools",
    "url": "https://nexusplayengine.tech/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://nexusplayengine.tech/index.html?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  });

  const categoriesMap = {
    "Loan Calculators": { slug: "loan", desc: "Evaluate monthly repayments, total interest costs, and amortization schedules.", icon: `<svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>` },
    "Investment Calculators": { slug: "investment", desc: "Project savings growth, mutual fund SIP accumulations, compound interest and maturity amounts.", icon: `<svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>` },
    "Tax Calculators": { slug: "tax", desc: "Estimate net take-home salaries, global value-added tax components, and progressive tax tiers.", icon: `<svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 14l2-2 4 4m0-7l-3-3-3 3m2 8h.01M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>` },
    "Salary Calculators": { slug: "salary", desc: "Calculate hourly wage conversions, pay periods, and regular time vs overtime totals.", icon: `<svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>` },
    "Banking Calculators": { slug: "banking", desc: "Determine simple vs compound comparisons, outstanding debt payoffs and snowball reduction methods.", icon: `<svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>` }
  };

  let categoriesHtml = '';
  Object.keys(categoriesMap).forEach(catName => {
    const info = categoriesMap[catName];
    const catCalcs = calculators.filter(c => c.category === catName);
    const links = catCalcs.map(c => `
      <li>
        <a href="calculators/${c.id}.html" class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-700/50 hover:text-emerald-400 transition-colors border border-slate-700/30">
          <span class="text-sm font-medium text-slate-300 hover:text-emerald-400">${c.heading.split(' - ')[0]}</span>
          <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </a>
      </li>
    `).join('');

    categoriesHtml += `
      <div id="${info.slug}" class="p-6 rounded-xl bg-slate-800 border border-slate-700/60 shadow-xl flex flex-col justify-between scroll-mt-20">
        <div>
          <div class="flex items-center space-x-3 mb-4">
            <div class="p-2.5 rounded-lg bg-slate-900 border border-slate-700">
              ${info.icon}
            </div>
            <h3 class="text-lg font-bold text-white">${catName}</h3>
          </div>
          <p class="text-xs text-slate-400 mb-6 leading-relaxed">${info.desc}</p>
          <ul class="space-y-2.5">
            ${links}
          </ul>
        </div>
      </div>
    `;
  });

  const popular = calculators.slice(0, 6);
  const popularHtml = popular.map(c => `
    <div class="p-6 rounded-xl bg-slate-800 border border-slate-700/50 hover:border-emerald-500/50 transition-all flex flex-col justify-between">
      <div>
        <span class="text-[10px] uppercase font-bold tracking-wider text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">${c.category}</span>
        <h3 class="text-base font-bold text-white mt-3 mb-2">${c.heading}</h3>
        <p class="text-xs text-slate-400 leading-relaxed mb-6">${c.description}</p>
      </div>
      <a href="calculators/${c.id}.html" class="inline-flex items-center justify-center py-2.5 px-4 rounded-lg bg-slate-700 hover:bg-emerald-500 hover:text-slate-900 text-sm font-semibold text-white transition-all">
        Open Calculator
      </a>
    </div>
  `).join('');

  const featuredArticles = articles.slice(0, 6);
  const articlesHtml = featuredArticles.map(a => `
    <div class="bg-slate-800 border border-slate-700/50 rounded-xl overflow-hidden hover:border-emerald-500/30 transition-all flex flex-col justify-between">
      <div class="p-6">
        <span class="text-[10px] uppercase font-bold tracking-wider text-emerald-400">${a.category}</span>
        <h3 class="text-base font-bold text-white mt-2 mb-3"><a href="blog/${a.slug}.html" class="hover:underline">${a.title.split(' | ')[0]}</a></h3>
        <p class="text-xs text-slate-400 line-clamp-3 leading-relaxed">${a.description}</p>
      </div>
      <div class="px-6 pb-6 pt-2 border-t border-slate-700/30 flex items-center justify-between">
        <span class="text-[10px] text-slate-500">June 19, 2026</span>
        <a href="blog/${a.slug}.html" class="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center space-x-1">
          <span>Read Article</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </a>
      </div>
    </div>
  `).join('');

  const content = `
    <section class="relative overflow-hidden bg-slate-950 py-24 border-b border-slate-800">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.08),transparent_50%)]"></div>
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 relative z-10">
        <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Premium Financial Calculators for <span class="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Smarter Decisions</span>
        </h1>
        <p class="text-base sm:text-lg text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          Accurate, simple, and mobile-friendly calculators for loans, investments, taxes, retirement, and banking. Plan your investments and manage payments instantly.
        </p>
        
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <a href="#categories" class="w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold rounded-lg transition-all text-center shadow-lg shadow-emerald-500/20">Explore Categories</a>
          <a href="blog/index.html" class="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-all text-center border border-slate-700">Financial Articles</a>
        </div>
      </div>
    </section>

    <section id="categories" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-12">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Calculator Categories</h2>
        <p class="text-slate-400 mt-2 text-sm">Choose from our curated groups of financial planning tools.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${categoriesHtml}
      </div>
    </section>

    <section class="bg-slate-950/40 border-y border-slate-800/80 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-white">Most Popular Calculators</h2>
          <p class="text-slate-400 mt-2 text-sm">Our most frequently used financial tools by savings planning professionals.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${popularHtml}
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-12">
        <h2 class="text-2xl sm:text-3xl font-bold text-white">Latest Financial Insights</h2>
        <p class="text-slate-400 mt-2 text-sm">Stay ahead of your money with our long-form guides and planning articles.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${articlesHtml}
      </div>
      <div class="text-center mt-10">
        <a href="blog/index.html" class="inline-flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 font-bold transition-colors">
          <span>View All Articles</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </a>
      </div>
    </section>

    <section class="bg-slate-950/40 border-t border-slate-800/80 py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h2>
          <p class="text-slate-400 mt-2 text-sm">General answers regarding our platform, calculation metrics, and security.</p>
        </div>
        <div class="space-y-4">
          <div class="p-5 rounded-xl bg-slate-800 border border-slate-700">
            <h3 class="text-base font-semibold text-white">Are the calculators free to use?</h3>
            <p class="text-sm text-slate-400 mt-2 leading-relaxed">Yes, all of our calculators are 100% free, require no user registrations, and do not collect any personal bank credentials.</p>
          </div>
          <div class="p-5 rounded-xl bg-slate-800 border border-slate-700">
            <h3 class="text-base font-semibold text-white">How accurate are the results?</h3>
            <p class="text-sm text-slate-400 mt-2 leading-relaxed">Our equations follow standard industrial, banking, and legal math models. However, calculations should serve as estimations and not replace professional brokerage, tax, or legal consulting.</p>
          </div>
          <div class="p-5 rounded-xl bg-slate-800 border border-slate-700">
            <h3 class="text-base font-semibold text-white">Do you log my financial inputs?</h3>
            <p class="text-sm text-slate-400 mt-2 leading-relaxed">No, all calculations are executed locally inside your web browser. None of your input details are ever uploaded or saved on our servers.</p>
          </div>
        </div>
      </div>
    </section>
  `;

  const html = getLayout("Nexus Finance Tools - Premium Calculators & Insights", "Free, mobile-friendly financial calculators for home loans, SIP investments, compound interest, progressive tax tiers, salary conversions, and debt payoff planning.", content, '');
  fs.writeFileSync(path.join(rootDir, 'index.html'), html);
}

function generateCalculatorPages() {
  calculators.forEach(c => {
    const related = calculators.filter(x => x.category === c.category && x.id !== c.id).slice(0, 4);
    const relatedHtml = related.map(r => `
      <a href="${r.id}.html" class="block p-4 rounded-lg bg-slate-800 border border-slate-700/60 hover:border-emerald-500/50 transition-all">
        <h4 class="text-sm font-semibold text-white">${r.heading.split(' - ')[0]}</h4>
        <p class="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">${r.description}</p>
      </a>
    `).join('');

    const jsonLd = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nexusplayengine.tech/index.html" },
        { "@type": "ListItem", "position": 2, "name": "Calculators", "item": `https://nexusplayengine.tech/index.html#${c.category.toLowerCase().split(' ')[0]}` },
        { "@type": "ListItem", "position": 3, "name": c.heading, "item": `https://nexusplayengine.tech/calculators/${c.id}.html` }
      ]
    });

    const inputsHtml = c.inputs.map(input => {
      if (input.type === 'select') {
        const opts = input.options.map(o => `<option value="${o.value}">${o.label}</option>`).join('');
        return `
          <div class="mb-4">
            <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2" for="${input.id}">${input.label}</label>
            <select id="${input.id}" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors">
              ${opts}
            </select>
          </div>
        `;
      }
      return `
        <div class="mb-5">
          <div class="flex items-center justify-between mb-2">
            <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider" for="${input.id}">${input.label}</label>
            <input type="number" id="${input.id}-val" value="${input.default}" min="${input.min}" max="${input.max}" step="${input.step || 1}" class="w-24 bg-slate-900 border border-slate-700 rounded text-right px-2 py-0.5 text-xs text-emerald-400 font-mono focus:outline-none focus:border-emerald-500">
          </div>
          <input type="range" id="${input.id}" min="${input.min}" max="${input.max}" step="${input.step || 1}" value="${input.default}" class="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-500">
        </div>
      `;
    }).join('');

    const outputsHtml = c.outputs.map(out => `
      <div class="p-4 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
        <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">${out.label}</span>
        <span class="text-base sm:text-lg font-bold text-white font-mono" id="out-${out.id}">
          ${out.prefix || ''}0${out.suffix || ''}
        </span>
      </div>
    `).join('');

    const faqAccordionHtml = c.faqs.map((f, index) => `
      <div class="p-5 rounded-lg bg-slate-800 border border-slate-700">
        <h4 class="text-sm font-semibold text-white">${f.q}</h4>
        <p class="text-xs text-slate-400 mt-2 leading-relaxed">${f.a}</p>
      </div>
    `).join('');

    const examplesHtml = c.examples.map(e => `
      <div class="p-4 rounded-lg bg-slate-900 border border-slate-800/80">
        <h4 class="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">${e.title}</h4>
        <p class="text-xs text-slate-300 leading-relaxed">${e.desc}</p>
      </div>
    `).join('');

    const calcScriptSetup = c.inputs.map(input => {
      if (input.type === 'select') {
        return `
          const el_${input.id} = document.getElementById('${input.id}');
        `;
      }
      return `
        const el_${input.id} = document.getElementById('${input.id}');
        const val_${input.id} = document.getElementById('${input.id}-val');
      `;
    }).join('');

    const calcScriptListeners = c.inputs.map(input => {
      if (input.type === 'select') {
        return `
          el_${input.id}.addEventListener('change', runCalculation);
        `;
      }
      return `
        el_${input.id}.addEventListener('input', (e) => {
          val_${input.id}.value = e.target.value;
          runCalculation();
        });
        val_${input.id}.addEventListener('input', (e) => {
          el_${input.id}.value = e.target.value;
          runCalculation();
        });
      `;
    }).join('');

    const calcScriptObjFetch = c.inputs.map(input => `
      inputs.${input.id} = el_${input.id}.value;
    `).join('');

    const calcScriptDomUpdate = c.outputs.map(out => `
      const el_out_${out.id} = document.getElementById('out-${out.id}');
      if (el_out_${out.id}) {
        let val = result.${out.id};
        if (typeof val === 'number') {
          if (isNaN(val) || !isFinite(val)) {
            val = 0;
          }
          el_out_${out.id}.textContent = '${out.prefix || ''}' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '${out.suffix || ''}';
        } else {
          el_out_${out.id}.textContent = val;
        }
      }
    `).join('');

    const content = `
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="mb-8">
          <a href="../index.html" class="text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors flex items-center space-x-1 mb-3">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            <span>Back to Home</span>
          </a>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white">${c.heading}</h1>
          <p class="text-sm text-slate-400 mt-2">${c.subheading}</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div class="lg:col-span-6 bg-slate-800 border border-slate-700/60 p-6 rounded-xl shadow-xl">
            <h2 class="text-base font-bold text-white border-b border-slate-700 pb-3 mb-5">Configuration</h2>
            <form onsubmit="event.preventDefault();" class="space-y-4">
              ${inputsHtml}
            </form>
          </div>

          <div class="lg:col-span-6 bg-slate-800 border border-slate-700/60 p-6 rounded-xl shadow-xl flex flex-col justify-between">
            <div>
              <h2 class="text-base font-bold text-white border-b border-slate-700 pb-3 mb-5">Calculation Results</h2>
              <div class="space-y-4">
                ${outputsHtml}
              </div>
            </div>
            
            <div class="mt-6 p-4 bg-slate-900/40 rounded-lg border border-slate-800/80">
              <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Visual Breakdown</h3>
              <div class="w-full bg-slate-800 rounded-full h-3 overflow-hidden flex" id="viz-container">
                <div id="viz-bar-1" class="bg-emerald-500 h-full transition-all duration-300" style="width: 50%"></div>
                <div id="viz-bar-2" class="bg-slate-600 h-full transition-all duration-300" style="width: 50%"></div>
              </div>
              <div class="flex items-center justify-between text-[10px] text-slate-500 mt-2 font-mono">
                <span id="viz-lbl-1">Metric A: 50.00%</span>
                <span id="viz-lbl-2">Metric B: 50.00%</span>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
          <div class="lg:col-span-8 space-y-12">
            <div class="p-6 bg-slate-800/40 border border-slate-700/40 rounded-xl">
              <h3 class="text-lg font-bold text-white mb-4">Formula & Logic</h3>
              ${c.formula}
            </div>

            <div class="p-6 bg-slate-800/40 border border-slate-700/40 rounded-xl">
              <h3 class="text-lg font-bold text-white mb-4">Repayment Examples</h3>
              <div class="space-y-4">
                ${examplesHtml}
              </div>
            </div>

            <div class="space-y-4">
              <h3 class="text-lg font-bold text-white">Frequently Asked Questions</h3>
              <div class="space-y-3">
                ${faqAccordionHtml}
              </div>
            </div>

            <div class="p-6 bg-slate-800/20 border border-slate-800 rounded-xl text-sm leading-relaxed text-slate-300">
              ${c.seoContent}
            </div>
          </div>

          <div class="lg:col-span-4 space-y-6">
            <div class="p-6 bg-slate-800/60 border border-slate-700/60 rounded-xl">
              <h3 class="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">Related Calculators</h3>
              <div class="space-y-3">
                ${relatedHtml}
              </div>
            </div>
            

          </div>
        </div>
      </section>

      <script>
        document.addEventListener('DOMContentLoaded', () => {
          ${calcScriptSetup}

          function runCalculation() {
            const inputs = {};
            ${calcScriptObjFetch}

            function calc(inputs) {
              ${c.calcLogic}
            }

            const result = calc(inputs);
            ${calcScriptDomUpdate}

            const viz1 = document.getElementById('viz-bar-1');
            const viz2 = document.getElementById('viz-bar-2');
            const lbl1 = document.getElementById('viz-lbl-1');
            const lbl2 = document.getElementById('viz-lbl-2');
            
            if (viz1 && viz2) {
              const keys = Object.keys(result);
              if (keys.length >= 2 && typeof result[keys[0]] === 'number' && typeof result[keys[1]] === 'number') {
                const val1 = Math.max(0, result[keys[0]]);
                const val2 = Math.max(0, result[keys[1]]);
                const sum = val1 + val2;
                if (sum > 0) {
                  const p1 = (val1 / sum) * 100;
                  const p2 = (val2 / sum) * 100;
                  viz1.style.width = p1 + '%';
                  viz2.style.width = p2 + '%';
                  if (lbl1 && lbl2) {
                    lbl1.textContent = keys[0].toUpperCase() + ': ' + p1.toFixed(1) + '%';
                    lbl2.textContent = keys[1].toUpperCase() + ': ' + p2.toFixed(1) + '%';
                  }
                }
              }
            }
          }

          ${calcScriptListeners}
          runCalculation();
        });
      </script>
    `;

    const html = getLayout(c.title, c.description, content, '../', jsonLd);
    fs.writeFileSync(path.join(rootDir, 'calculators', `${c.id}.html`), html);
  });
}

function generateBlogPages() {
  const blogListHtml = articles.map(a => `
    <div class="p-6 rounded-xl bg-slate-800 border border-slate-700/60 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
      <div>
        <span class="text-[10px] uppercase font-bold tracking-wider text-emerald-400 px-2.5 py-0.5 bg-slate-900 border border-slate-700 rounded">${a.category}</span>
        <h2 class="text-lg font-bold text-white mt-4 mb-2"><a href="${a.slug}.html" class="hover:underline">${a.title.split(' | ')[0]}</a></h2>
        <p class="text-xs text-slate-400 leading-relaxed mb-6">${a.description}</p>
      </div>
      <div class="flex items-center justify-between pt-4 border-t border-slate-700/30">
        <span class="text-[10px] text-slate-500">June 19, 2026</span>
        <a href="${a.slug}.html" class="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1">
          <span>Read Article</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </a>
      </div>
    </div>
  `).join('');

  const indexContent = `
    <section class="bg-slate-950 py-16 border-b border-slate-800">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white">Financial Guides & Insights</h1>
        <p class="text-sm text-slate-400 mt-3 max-w-xl mx-auto">Master budgeting, analyze compounding interest formulas, plan tax deductions, and track investment returns.</p>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${blogListHtml}
      </div>
    </section>
  `;

  const indexHtml = getLayout("Financial Blog - Free Guides & Savings Tips | Nexus Finance Tools", "Read our latest static articles concerning home loan interest rates, SIP calculators, compound formulas, progressive tax rules, and budget savings structures.", indexContent, '../');
  fs.writeFileSync(path.join(rootDir, 'blog', 'index.html'), indexHtml);

  articles.forEach(a => {
    const tableHeaders = a.tableData && a.tableData.length > 0 ? Object.keys(a.tableData[0]) : [];
    const tableBody = a.tableData ? a.tableData.map(row => `
      <tr class="border-b border-slate-800">
        <td class="px-4 py-3 text-xs text-white font-medium">${row.col1}</td>
        <td class="px-4 py-3 text-xs text-slate-300 font-mono">${row.col2}</td>
        <td class="px-4 py-3 text-xs text-slate-300 font-mono">${row.col3}</td>
        <td class="px-4 py-3 text-xs text-emerald-400 font-mono font-semibold">${row.col4}</td>
      </tr>
    `).join('') : '';

    const faqAccordionHtml = a.faqs.map(f => `
      <div class="p-5 rounded-lg bg-slate-800 border border-slate-700">
        <h4 class="text-sm font-semibold text-white">${f.q}</h4>
        <p class="text-xs text-slate-400 mt-2 leading-relaxed">${f.a}</p>
      </div>
    `).join('');

    const relatedCalcs = calculators.filter(c => c.id === a.relatedCalc || c.category === a.category);
    const relatedCalcsHtml = relatedCalcs.map(rc => `
      <a href="../calculators/${rc.id}.html" class="block p-3.5 rounded-lg bg-slate-800 border border-slate-700/60 hover:border-emerald-500/50 transition-colors">
        <h4 class="text-xs font-bold text-white">${rc.heading.split(' - ')[0]}</h4>
        <p class="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">${rc.description}</p>
      </a>
    `).join('');

    const jsonLd = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": a.title,
      "description": a.description,
      "image": "https://nexusplayengine.tech/assets/images/og-image.png",
      "datePublished": "2026-06-19",
      "author": { "@type": "Organization", "name": "Nexus Finance Tools" }
    });

    const categoryKey = a.category.split(' ')[0];
    const catGuide = categoryGuides[categoryKey] || categoryGuides["Savings"];
    const catGlossary = glossaries[categoryKey] || glossaries["Savings"];

    const content = `
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="mb-8">
          <a href="index.html" class="text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors flex items-center space-x-1 mb-3">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            <span>Back to Blog</span>
          </a>
          <span class="text-[10px] uppercase font-bold tracking-wider text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">${a.category}</span>
          <h1 class="text-2xl sm:text-4xl font-extrabold text-white mt-4">${a.title.split(' | ')[0]}</h1>
          <p class="text-sm text-slate-400 mt-2 leading-relaxed">${a.description}</p>
          <div class="flex items-center space-x-4 mt-4 text-xs text-slate-500">
            <span>By Nexus Editorial Team</span>
            <span>&bull;</span>
            <span>June 19, 2026</span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <article class="lg:col-span-8 space-y-8 bg-slate-800/20 border border-slate-800 p-6 sm:p-8 rounded-xl">
            <div class="text-slate-300 space-y-6 leading-relaxed">
              <p class="text-lg text-slate-200 font-medium">${a.intro}</p>
              
              <div class="p-4 bg-slate-900 border border-slate-800 rounded-lg">
                <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Table of Contents</h4>
                <ul class="space-y-1.5 text-xs text-emerald-400 font-medium">
                  <li><a href="#understanding" class="hover:underline">1. Core Conceptual Analysis</a></li>
                  <li><a href="#mathematics" class="hover:underline">2. Mathematical Calculation & Formulas</a></li>
                  <li><a href="#methodology" class="hover:underline">3. Steps & Core Implementation Strategies</a></li>
                  <li><a href="#comparison" class="hover:underline">4. Comparisons & Projections Scenario Table</a></li>
                  <li><a href="#pitfalls" class="hover:underline">5. Common Financial Pitfalls to Avoid</a></li>
                  <li><a href="#risk-management" class="hover:underline">6. Risk Management and Economic Variables</a></li>
                  <li><a href="#fundamentals" class="hover:underline">7. Strategic Category Fundamentals</a></li>
                  <li><a href="#implementation-tools" class="hover:underline">8. Tools and Implementation Checklist</a></li>
                  <li><a href="#glossary" class="hover:underline">9. Glossary of Key Financial Terms</a></li>
                  <li><a href="#faqs" class="hover:underline">10. Frequently Asked Questions</a></li>
                </ul>
              </div>

              ${introExtension}

              <h2 id="understanding" class="text-xl sm:text-2xl font-bold text-white border-b border-slate-700/50 pb-2 mt-8">1. Core Conceptual Analysis</h2>
              <p>${a.concept}</p>
              <p>When analyzing personal finance, developing a strong core understanding is paramount. Without this conceptual framework, retail investors and borrowers struggle to evaluate interest rates and compound yield ratios, exposing their assets to inflation depletion. In addition, recognizing how different financial assets interact creates a protective buffer against economic downturns and keeps budgets on track.</p>
              <p>Moreover, modern tax laws and debt servicing rules necessitate an active, data-driven approach. By translating vague financial theories into actionable metrics, individuals can identify cash flow leakages, optimize monthly loan payments, and accelerate their transition to passive wealth accumulation. It is this systematic process that underpins the calculators and guides featured on our static platform.</p>

              <h2 id="mathematics" class="text-xl sm:text-2xl font-bold text-white border-b border-slate-700/50 pb-2 mt-8">2. Mathematical Calculation & Formulas</h2>
              <p>${a.math}</p>
              <p>Applying structured math is the only way to eliminate uncertainty from financial decisions. Standard financial formulas account for the time value of money, principal amortization scales, progressive taxation tiers, and compounding timelines. For example, compounding interest over multiple years exhibits an exponential growth slope, demonstrating why early and consistent contributions outperform delayed deposits.</p>
              <p>Additionally, loan amortizations rely on progressive interest calculation models, where early monthly payments are heavily weighted toward servicing interest. By understanding this mathematical architecture, you can execute targeted prepayments that reduce your principal balance directly, thereby minimizing the total interest paid over the life of the loan.</p>

              <h2 id="methodology" class="text-xl sm:text-2xl font-bold text-white border-b border-slate-700/50 pb-2 mt-8">3. Steps & Core Implementation Strategies</h2>
              <p>${a.guide}</p>
              <p>Managing financial health is a disciplined, multi-step process. First, compile a comprehensive inventory of your existing debts, savings balances, and income streams. Second, use dedicated calculators to build a baseline projection for your financial goals. Third, automate your monthly contributions to remove emotional bias and ensure consistency.</p>
              <p>Fourth, review your asset allocation and tax exposure annually to align with changing regulatory codes. Fifth, avoid high-cost consumer credit cards and focus on high-yield savings instruments that grow your wealth. This simple, programmatic execution builds a resilient capital base over time.</p>

              <h2 id="comparison" class="text-xl sm:text-2xl font-bold text-white border-b border-slate-700/50 pb-2 mt-8">4. Comparisons & Projections Scenario Table</h2>
              <p>The table below provides a detailed comparison of different scenarios and projected growth rates based on standard inputs. Use these metrics to benchmark your saving and borrowing rates:</p>
              <div class="overflow-x-auto my-6 border border-slate-700 rounded-lg">
                <table class="w-full text-left border-collapse bg-slate-900/40">
                  <thead>
                    <tr class="bg-slate-800 text-slate-400 border-b border-slate-700">
                      <th class="px-4 py-3 text-xs font-bold uppercase tracking-wider">Interval / Label</th>
                      <th class="px-4 py-3 text-xs font-bold uppercase tracking-wider">Base Value</th>
                      <th class="px-4 py-3 text-xs font-bold uppercase tracking-wider">Rate / Scale</th>
                      <th class="px-4 py-3 text-xs font-bold uppercase tracking-wider">Expected Return</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-800/80">
                    ${tableBody}
                  </tbody>
                </table>
              </div>

              <h2 id="pitfalls" class="text-xl sm:text-2xl font-bold text-white border-b border-slate-700/50 pb-2 mt-8">5. Common Financial Pitfalls to Avoid</h2>
              <p>${a.mistakes}</p>
              <p>One of the most devastating mistakes is delaying the start of your savings plan, which significantly reduces the compounding window and increases the overall cost of capital. Another error is relying on unverified estimations instead of executing precise calculations using interactive tools.</p>
              <p>Additionally, neglecting to account for local tax rates and inflation factors can lead to overestimating your future purchasing power. By maintaining a disciplined, number-driven approach and reviewing your calculations regularly, you can avoid these common wealth-eroding pitfalls.</p>

              ${riskSection}

              <div id="fundamentals">
                ${catGuide}
              </div>

              <div>
                ${toolsExplanation}
              </div>

              <div id="glossary">
                ${catGlossary}
              </div>

              <h2 id="faqs" class="text-xl sm:text-2xl font-bold text-white border-b border-slate-700/50 pb-2 mt-8">10. Frequently Asked Questions</h2>
              <div class="space-y-4">
                ${faqAccordionHtml}
                ${extraFaqs}
              </div>
            </div>
          </article>

          <aside class="lg:col-span-4 space-y-6">
            <div class="p-6 bg-slate-800 border border-slate-700/60 rounded-xl">
              <h3 class="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">Related Calculators</h3>
              <div class="space-y-3">
                ${relatedCalcsHtml}
              </div>
            </div>
            
            <div class="p-6 bg-slate-800 border border-slate-700/60 rounded-xl">
              <h3 class="text-sm font-bold text-white uppercase tracking-wider mb-2">Need Professional Help?</h3>
              <p class="text-xs text-slate-400 leading-relaxed mb-4">For detailed tax filing, legal trust compliance, or complex corporate investment allocations, check with authorized local agencies.</p>
              <a href="../legal/contact.html" class="block text-center py-2 px-4 rounded bg-slate-700 hover:bg-emerald-500 hover:text-slate-900 transition-colors text-xs font-bold text-white">Contact Our Team</a>
            </div>
            

          </aside>
        </div>
      </section>
    `;

    const html = getLayout(a.title, a.description, content, '../', jsonLd);
    fs.writeFileSync(path.join(rootDir, 'blog', `${a.slug}.html`), html);
  });
}

function generateLegalPages() {
  Object.keys(legalPages).forEach(key => {
    const page = legalPages[key];
    const content = `
      <section class="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div class="mb-8 border-b border-slate-800 pb-6">
          <h1 class="text-3xl sm:text-4xl font-extrabold text-white">${page.heading}</h1>
          <p class="text-sm text-slate-400 mt-2">${page.subheading}</p>
        </div>
        
        <div class="prose prose-invert max-w-none">
          ${page.content}
        </div>
      </section>
    `;

    const html = getLayout(page.title, page.description, content, '../');
    fs.writeFileSync(path.join(rootDir, 'legal', `${key === 'privacy' ? 'privacy-policy' : key === 'cookie' ? 'cookie-policy' : key}.html`), html);
  });
}

function generateSearchIndex() {
  const index = [];
  calculators.forEach(c => {
    index.push({
      title: c.heading.split(' - ')[0],
      description: c.description,
      category: c.category,
      url: `/calculators/${c.id}.html`,
      type: "calculator"
    });
  });
  articles.forEach(a => {
    index.push({
      title: a.title.split(' | ')[0],
      description: a.description,
      category: a.category,
      url: `/blog/${a.slug}.html`,
      type: "article"
    });
  });
  fs.writeFileSync(path.join(rootDir, 'assets', 'js', 'search-index.json'), JSON.stringify(index));
}

function generateSEOFiles() {
  const urls = [
    { loc: 'https://nexusplayengine.tech/index.html', priority: '1.0' },
    { loc: 'https://nexusplayengine.tech/blog/index.html', priority: '0.8' },
    { loc: 'https://nexusplayengine.tech/legal/about.html', priority: '0.5' },
    { loc: 'https://nexusplayengine.tech/legal/contact.html', priority: '0.5' },
    { loc: 'https://nexusplayengine.tech/legal/privacy-policy.html', priority: '0.3' },
    { loc: 'https://nexusplayengine.tech/legal/terms.html', priority: '0.3' },
    { loc: 'https://nexusplayengine.tech/legal/disclaimer.html', priority: '0.3' },
    { loc: 'https://nexusplayengine.tech/legal/cookie-policy.html', priority: '0.3' }
  ];

  calculators.forEach(c => {
    urls.push({ loc: `https://nexusplayengine.tech/calculators/${c.id}.html`, priority: '0.9' });
  });

  articles.forEach(a => {
    urls.push({ loc: `https://nexusplayengine.tech/blog/${a.slug}.html`, priority: '0.7' });
  });

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(u => `
  <url>
    <loc>${u.loc}</loc>
    <lastmod>2026-06-19</lastmod>
    <priority>${u.priority}</priority>
  </url>`).join('')}
</urlset>`;

  fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), sitemapXml);

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://nexusplayengine.tech/sitemap.xml`;

  fs.writeFileSync(path.join(rootDir, 'robots.txt'), robotsTxt);
}

try {
  generateHomepage();
  generateCalculatorPages();
  generateBlogPages();
  generateLegalPages();
  generateSearchIndex();
  generateSEOFiles();
} catch (e) {
  process.exit(1);
}
