// QBO Code Reference Table
// Total entries: 127

const QBO_CODES = {
  "BCHQ": {
    "type": "Bank",
    "detailType": "Chequing"
  },
  "BCASH": {
    "type": "Bank",
    "detailType": "Cash on hand"
  },
  "BSAV": {
    "type": "Bank",
    "detailType": "Savings"
  },
  "BTRUST": {
    "type": "Bank",
    "detailType": "Trust account"
  },
  "BRT": {
    "type": "Bank",
    "detailType": "Rents Held in Trust"
  },
  "BMM": {
    "type": "Bank",
    "detailType": "Money Market"
  },
  "AR": {
    "type": "Accounts receivable (A/R)",
    "detailType": "Accounts Receivable (A/R)"
  },
  "CURASSET": {
    "type": "Current assets",
    "detailType": "Other current assets"
  },
  "CURINVENTORY": {
    "type": "Current assets",
    "detailType": "Inventory"
  },
  "CUREMPADVANCE": {
    "type": "Current assets",
    "detailType": "Employee cash advances"
  },
  "CURPREPAID": {
    "type": "Current assets",
    "detailType": "Prepaid expenses"
  },
  "CURUNDEPOSIT": {
    "type": "Current assets",
    "detailType": "Undeposited funds"
  },
  "CURDEVCOSTS": {
    "type": "Current assets",
    "detailType": "Development costs"
  },
  "CURINVEST": {
    "type": "Current assets",
    "detailType": "Investments - Other"
  },
  "CURALLOWBAD": {
    "type": "Current assets",
    "detailType": "Allowance for bad debts"
  },
  "CURSHARELOAN": {
    "type": "Current assets",
    "detailType": "Loans to Shareholders"
  },
  "CUROFFICERLOAN": {
    "type": "Current assets",
    "detailType": "Loans to officers"
  },
  "CUROTHERLOAN": {
    "type": "Current assets",
    "detailType": "Loans to others"
  },
  "CURRETAINAGE": {
    "type": "Current assets",
    "detailType": "Retainage"
  },
  "FAACCUMAMORT": {
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "FA": {
    "type": "Property, plant and equipment",
    "detailType": "Depletable assets"
  },
  "FALEASEHOLD": {
    "type": "Property, plant and equipment",
    "detailType": "Leasehold improvements"
  },
  "FAOTHER": {
    "type": "Property, plant and equipment",
    "detailType": "Other fixed assets"
  },
  "FABUILDING": {
    "type": "Property, plant and equipment",
    "detailType": "Buildings"
  },
  "FAACCUMDEPR": {
    "type": "Property, plant and equipment",
    "detailType": "Accumulated Depreciation"
  },
  "FAEQUIP": {
    "type": "Property, plant and equipment",
    "detailType": "Machinery and equipment"
  },
  "FAFURN": {
    "type": "Property, plant and equipment",
    "detailType": "Furniture and fixtures"
  },
  "FAVEHICLE": {
    "type": "Property, plant and equipment",
    "detailType": "Vehicles"
  },
  "LTGOODWILL": {
    "type": "Long-term Assets",
    "detailType": "Goodwill"
  },
  "LTA": {
    "type": "Long-term Assets",
    "detailType": "Other long-term assets"
  },
  "LTAMORT": {
    "type": "Long-term Assets",
    "detailType": "Accumulated amortization of other assets"
  },
  "LTAORGCOST": {
    "type": "Long-term Assets",
    "detailType": "Organizational costs"
  },
  "LTAVS": {
    "type": "Long-term Assets",
    "detailType": "Available-for-sale financial assets"
  },
  "LTAINTANGIBLE": {
    "type": "Long-term Assets",
    "detailType": "Intangible assets"
  },
  "LTAOTHINTANG": {
    "type": "Long-term Assets",
    "detailType": "Other intangible assets"
  },
  "LTASECDEP": {
    "type": "Long-term Assets",
    "detailType": "Security deposits"
  },
  "LTADEFTAX": {
    "type": "Long-term Assets",
    "detailType": "Deferred tax"
  },
  "LTALICENSE": {
    "type": "Long-term Assets",
    "detailType": "Licences"
  },
  "LTAINVEST": {
    "type": "Long-term Assets",
    "detailType": "Investments"
  },
  "LTAPREPAY": {
    "type": "Long-term Assets",
    "detailType": "Prepayments and accrued income"
  },
  "LTALEASEBUYOUT": {
    "type": "Long-term Assets",
    "detailType": "Lease buyout"
  },
  "AP": {
    "type": "Accounts payable (A/P)",
    "detailType": "Accounts Payable (A/P)"
  },
  "CC": {
    "type": "Credit Card",
    "detailType": "Credit Card"
  },
  "CURLIAB": {
    "type": "Other Current Liabilities",
    "detailType": "Current liabilities"
  },
  "LIABINSURANCE": {
    "type": "Other Current Liabilities",
    "detailType": "Insurance payable"
  },
  "LIABPAYCLEAR": {
    "type": "Other Current Liabilities",
    "detailType": "Payroll clearing"
  },
  "LIABTRUST": {
    "type": "Other Current Liabilities",
    "detailType": "Trust accounts - liabilities"
  },
  "LIABPREPAID": {
    "type": "Other Current Liabilities",
    "detailType": "Prepaid expenses payable"
  },
  "LIABSHTERMRELATED": {
    "type": "Other Current Liabilities",
    "detailType": "Short term borrowings from related parties"
  },
  "LIABINTEREST": {
    "type": "Other Current Liabilities",
    "detailType": "Interest payables"
  },
  "LIABLINECREDIT": {
    "type": "Other Current Liabilities",
    "detailType": "Line of credit"
  },
  "LIABRT": {
    "type": "Other Current Liabilities",
    "detailType": "Rents in trust - liability"
  },
  "LIABPAYROLL": {
    "type": "Other Current Liabilities",
    "detailType": "Payroll liabilities"
  },
  "LIABLEASE": {
    "type": "Other Current Liabilities",
    "detailType": "Current portion of obligations under finance leases"
  },
  "LIABEMPBEN": {
    "type": "Other Current Liabilities",
    "detailType": "Current portion of employee benefits obligations"
  },
  "LIABWARRANTY": {
    "type": "Other Current Liabilities",
    "detailType": "Provision for warranty obligations"
  },
  "LIABLOAN": {
    "type": "Other Current Liabilities",
    "detailType": "Loan Payable"
  },
  "LIABTAX": {
    "type": "Other Current Liabilities",
    "detailType": "Current tax liability"
  },
  "LTLIAB": {
    "type": "Long-term liabilities",
    "detailType": "Other long term liabilities"
  },
  "LTLDEFERINC": {
    "type": "Long-term liabilities",
    "detailType": "Accruals and deferred income"
  },
  "LTLNOTE": {
    "type": "Long-term liabilities",
    "detailType": "Notes payable"
  },
  "LTLSHNOTE": {
    "type": "Long-term liabilities",
    "detailType": "Shareholder notes payable"
  },
  "LTLBORROW": {
    "type": "Long-term liabilities",
    "detailType": "Long term borrowings"
  },
  "LTLEMPBEN": {
    "type": "Long-term liabilities",
    "detailType": "Long term employee benefit obligations"
  },
  "LTLEASE": {
    "type": "Long-term liabilities",
    "detailType": "Obligations under finance leases"
  },
  "LTLOAN": {
    "type": "Long-term liabilities",
    "detailType": "Bank loans"
  },
  "EQSTOCK": {
    "type": "Equity",
    "detailType": "Common stock"
  },
  "EQPREFSTOCK": {
    "type": "Equity",
    "detailType": "Preferred Stock"
  },
  "EQOE": {
    "type": "Equity",
    "detailType": "Owner's equity"
  },
  "EQTREASSHARE": {
    "type": "Equity",
    "detailType": "Treasury shares"
  },
  "RE": {
    "type": "Equity",
    "detailType": "Retained Earnings"
  },
  "EQSURPLUS": {
    "type": "Equity",
    "detailType": "Paid-in capital or surplus"
  },
  "EQOBEQ": {
    "type": "Equity",
    "detailType": "Opening balance equity"
  },
  "EQSHARECAP": {
    "type": "Equity",
    "detailType": "Share capital"
  },
  "EQDISTRIBUTIONS": {
    "type": "Equity",
    "detailType": "Partner Distributions"
  },
  "EQCONTRIBUTIONS": {
    "type": "Equity",
    "detailType": "Partner Contributions"
  },
  "EQACCUMAMORT": {
    "type": "Equity",
    "detailType": "Accumulated adjustment"
  },
  "EQPARTNEREQUITY": {
    "type": "Equity",
    "detailType": "Partner's equity"
  },
  "INC": {
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "INCDISCOUNT": {
    "type": "Income",
    "detailType": "Discounts/refunds given"
  },
  "INCNONPROFIT": {
    "type": "Income",
    "detailType": "Non-profit income"
  },
  "INCSERVICE": {
    "type": "Income",
    "detailType": "Service/Fee Income"
  },
  "INCPRODUCT": {
    "type": "Income",
    "detailType": "Sales of product income"
  },
  "OI": {
    "type": "Other income",
    "detailType": "Income"
  },
  "OIINVEST": {
    "type": "Other income",
    "detailType": "Other investment income"
  },
  "OIGAINLOSSFA": {
    "type": "Other income",
    "detailType": "Gain/loss on sale of fixed assets"
  },
  "OIGAINLOSSINVEST": {
    "type": "Other income",
    "detailType": "Gain/loss on sale of investments"
  },
  "OITAXEXEMPTINTEREST": {
    "type": "Other income",
    "detailType": "Tax-exempt interest"
  },
  "OIINTEREST": {
    "type": "Other income",
    "detailType": "Interest earned"
  },
  "OIDIVIDEND": {
    "type": "Other income",
    "detailType": "Dividend income"
  },
  "COGS": {
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "COGSCOS": {
    "type": "Cost of Goods Sold",
    "detailType": "Other costs of service - COS"
  },
  "COGSLAB": {
    "type": "Cost of Goods Sold",
    "detailType": "Cost of labour - COS"
  },
  "COGSSHIP": {
    "type": "Cost of Goods Sold",
    "detailType": "Shipping, freight and delivery - COS"
  },
  "COGSSUPPLY": {
    "type": "Cost of Goods Sold",
    "detailType": "Supplies and materials - COS"
  },
  "COGSEQUIPRENT": {
    "type": "Cost of Goods Sold",
    "detailType": "Equipment rental - COS"
  },
  "EXP": {
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "EXPINS": {
    "type": "Expenses",
    "detailType": "Insurance"
  },
  "EXPAUTO": {
    "type": "Expenses",
    "detailType": "Auto"
  },
  "EXPLAB": {
    "type": "Expenses",
    "detailType": "Cost of labour"
  },
  "EXPBADDEBT": {
    "type": "Expenses",
    "detailType": "Bad debts"
  },
  "EXPENTERTAIN": {
    "type": "Expenses",
    "detailType": "Entertainment"
  },
  "EXPDONATION": {
    "type": "Expenses",
    "detailType": "Charitable contributions"
  },
  "EXPDUES": {
    "type": "Expenses",
    "detailType": "Dues and subscriptions"
  },
  "EXPPAYROLL": {
    "type": "Expenses",
    "detailType": "Payroll expenses"
  },
  "EXPTRAVEL": {
    "type": "Expenses",
    "detailType": "Travel"
  },
  "EXPSHIP": {
    "type": "Expenses",
    "detailType": "Shipping, Freight, and Delivery"
  },
  "EXPSUPPLY": {
    "type": "Expenses",
    "detailType": "Supplies"
  },
  "EXPBANKCHARGE": {
    "type": "Expenses",
    "detailType": "Bank charges"
  },
  "EXPOFFICE": {
    "type": "Expenses",
    "detailType": "Office/General Administrative Expenses"
  },
  "EXPDISTRIBUTION": {
    "type": "Expenses",
    "detailType": "Distribution costs"
  },
  "EXPPROFESSIONAL": {
    "type": "Expenses",
    "detailType": "Legal and professional fees"
  },
  "EXPINTEREST": {
    "type": "Expenses",
    "detailType": "Interest paid"
  },
  "EXPEQUIPRENT": {
    "type": "Expenses",
    "detailType": "Equipment rental"
  },
  "EXPRENT": {
    "type": "Expenses",
    "detailType": "Rent or lease of buildings"
  },
  "EXPADVERTISING": {
    "type": "Expenses",
    "detailType": "Advertising/promotional"
  },
  "EXPPROMOMEALS": {
    "type": "Expenses",
    "detailType": "Promotional meals"
  },
  "EXPTRAVELMEAL": {
    "type": "Expenses",
    "detailType": "Travel meals"
  },
  "EXPMEAL": {
    "type": "Expenses",
    "detailType": "Meals and entertainment"
  },
  "EXPREPAIR": {
    "type": "Expenses",
    "detailType": "Repair and maintenance"
  },
  "EXPUTILITIES": {
    "type": "Expenses",
    "detailType": "Utilities"
  },
  "EXPTAXES": {
    "type": "Expenses",
    "detailType": "Taxes paid"
  },
  "OE": {
    "type": "Other Expense",
    "detailType": "Other miscellaneous expense"
  },
  "OEPENALTIES": {
    "type": "Other Expense",
    "detailType": "Penalties and settlements"
  },
  "OEAMORT": {
    "type": "Other Expense",
    "detailType": "Amortization"
  },
  "OEDEPRECIATION": {
    "type": "Other Expense",
    "detailType": "Depreciation"
  },
  "OEEXCHANGE": {
    "type": "Other Expense",
    "detailType": "Exchange Gain or Loss"
  }
};

export default QBO_CODES;
