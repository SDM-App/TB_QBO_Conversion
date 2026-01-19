// QBO Account Type Hierarchy
// Category -> Type -> Detail Type

const CATEGORY_TO_TYPES = {
  "Asset": [
    "Bank",
    "Accounts receivable (A/R)",
    "Current assets",
    "Property, plant and equipment",
    "Long-term Assets"
  ],
  "Liability": [
    "Accounts payable (A/P)",
    "Credit Card",
    "Other Current Liabilities",
    "Long-term liabilities"
  ],
  "Equity": [
    "Equity"
  ],
  "Income": [
    "Income",
    "Other income"
  ],
  "COGS": [
    "Cost of Goods Sold"
  ],
  "Expense": [
    "Expenses",
    "Other Expense"
  ]
};

const QBO_TYPES = {
  "Bank": {
    "category": "Asset",
    "detailTypes": [
      {
        "code": "BCHQ",
        "name": "Chequing"
      },
      {
        "code": "BCASH",
        "name": "Cash on hand"
      },
      {
        "code": "BSAV",
        "name": "Savings"
      },
      {
        "code": "BTRUST",
        "name": "Trust account"
      },
      {
        "code": "BRT",
        "name": "Rents Held in Trust"
      },
      {
        "code": "BMM",
        "name": "Money Market"
      }
    ]
  },
  "Accounts receivable (A/R)": {
    "category": "Asset",
    "detailTypes": [
      {
        "code": "AR",
        "name": "Accounts Receivable (A/R)"
      }
    ]
  },
  "Current assets": {
    "category": "Asset",
    "detailTypes": [
      {
        "code": "CURASSET",
        "name": "Other current assets"
      },
      {
        "code": "CURINVENTORY",
        "name": "Inventory"
      },
      {
        "code": "CUREMPADVANCE",
        "name": "Employee cash advances"
      },
      {
        "code": "CURPREPAID",
        "name": "Prepaid expenses"
      },
      {
        "code": "CURUNDEPOSIT",
        "name": "Undeposited funds"
      },
      {
        "code": "CURDEVCOSTS",
        "name": "Development costs"
      },
      {
        "code": "CURINVEST",
        "name": "Investments - Other"
      },
      {
        "code": "CURALLOWBAD",
        "name": "Allowance for bad debts"
      },
      {
        "code": "CURSHARELOAN",
        "name": "Loans to Shareholders"
      },
      {
        "code": "CUROFFICERLOAN",
        "name": "Loans to officers"
      },
      {
        "code": "CUROTHERLOAN",
        "name": "Loans to others"
      },
      {
        "code": "CURRETAINAGE",
        "name": "Retainage"
      }
    ]
  },
  "Property, plant and equipment": {
    "category": "Asset",
    "detailTypes": [
      {
        "code": "FAACCUMAMORT",
        "name": "Accumulated amortization"
      },
      {
        "code": "FA",
        "name": "Depletable assets"
      },
      {
        "code": "FALEASEHOLD",
        "name": "Leasehold improvements"
      },
      {
        "code": "FAOTHER",
        "name": "Other fixed assets"
      },
      {
        "code": "FABUILDING",
        "name": "Buildings"
      },
      {
        "code": "FAACCUMDEPR",
        "name": "Accumulated Depreciation"
      },
      {
        "code": "FAEQUIP",
        "name": "Machinery and equipment"
      },
      {
        "code": "FAFURN",
        "name": "Furniture and fixtures"
      },
      {
        "code": "FAVEHICLE",
        "name": "Vehicles"
      }
    ]
  },
  "Long-term Assets": {
    "category": "Asset",
    "detailTypes": [
      {
        "code": "LTGOODWILL",
        "name": "Goodwill"
      },
      {
        "code": "LTA",
        "name": "Other long-term assets"
      },
      {
        "code": "LTAMORT",
        "name": "Accumulated amortization of other assets"
      },
      {
        "code": "LTAORGCOST",
        "name": "Organizational costs"
      },
      {
        "code": "LTAVS",
        "name": "Available-for-sale financial assets"
      },
      {
        "code": "LTAINTANGIBLE",
        "name": "Intangible assets"
      },
      {
        "code": "LTAOTHINTANG",
        "name": "Other intangible assets"
      },
      {
        "code": "LTASECDEP",
        "name": "Security deposits"
      },
      {
        "code": "LTADEFTAX",
        "name": "Deferred tax"
      },
      {
        "code": "LTALICENSE",
        "name": "Licences"
      },
      {
        "code": "LTAINVEST",
        "name": "Investments"
      },
      {
        "code": "LTAPREPAY",
        "name": "Prepayments and accrued income"
      },
      {
        "code": "LTALEASEBUYOUT",
        "name": "Lease buyout"
      }
    ]
  },
  "Accounts payable (A/P)": {
    "category": "Liability",
    "detailTypes": [
      {
        "code": "AP",
        "name": "Accounts Payable (A/P)"
      }
    ]
  },
  "Credit Card": {
    "category": "Liability",
    "detailTypes": [
      {
        "code": "CC",
        "name": "Credit Card"
      }
    ]
  },
  "Other Current Liabilities": {
    "category": "Liability",
    "detailTypes": [
      {
        "code": "CURLIAB",
        "name": "Current liabilities"
      },
      {
        "code": "LIABINSURANCE",
        "name": "Insurance payable"
      },
      {
        "code": "LIABPAYCLEAR",
        "name": "Payroll clearing"
      },
      {
        "code": "LIABTRUST",
        "name": "Trust accounts - liabilities"
      },
      {
        "code": "LIABPREPAID",
        "name": "Prepaid expenses payable"
      },
      {
        "code": "LIABSHTERMRELATED",
        "name": "Short term borrowings from related parties"
      },
      {
        "code": "LIABINTEREST",
        "name": "Interest payables"
      },
      {
        "code": "LIABLINECREDIT",
        "name": "Line of credit"
      },
      {
        "code": "LIABRT",
        "name": "Rents in trust - liability"
      },
      {
        "code": "LIABPAYROLL",
        "name": "Payroll liabilities"
      },
      {
        "code": "LIABLEASE",
        "name": "Current portion of obligations under finance leases"
      },
      {
        "code": "LIABEMPBEN",
        "name": "Current portion of employee benefits obligations"
      },
      {
        "code": "LIABWARRANTY",
        "name": "Provision for warranty obligations"
      },
      {
        "code": "LIABLOAN",
        "name": "Loan Payable"
      },
      {
        "code": "LIABTAX",
        "name": "Current tax liability"
      }
    ]
  },
  "Long-term liabilities": {
    "category": "Liability",
    "detailTypes": [
      {
        "code": "LTLIAB",
        "name": "Other long term liabilities"
      },
      {
        "code": "LTLDEFERINC",
        "name": "Accruals and deferred income"
      },
      {
        "code": "LTLNOTE",
        "name": "Notes payable"
      },
      {
        "code": "LTLSHNOTE",
        "name": "Shareholder notes payable"
      },
      {
        "code": "LTLBORROW",
        "name": "Long term borrowings"
      },
      {
        "code": "LTLEMPBEN",
        "name": "Long term employee benefit obligations"
      },
      {
        "code": "LTLEASE",
        "name": "Obligations under finance leases"
      },
      {
        "code": "LTLOAN",
        "name": "Bank loans"
      }
    ]
  },
  "Equity": {
    "category": "Equity",
    "detailTypes": [
      {
        "code": "EQSTOCK",
        "name": "Common stock"
      },
      {
        "code": "EQPREFSTOCK",
        "name": "Preferred Stock"
      },
      {
        "code": "EQOE",
        "name": "Owner's equity"
      },
      {
        "code": "EQTREASSHARE",
        "name": "Treasury shares"
      },
      {
        "code": "RE",
        "name": "Retained Earnings"
      },
      {
        "code": "EQSURPLUS",
        "name": "Paid-in capital or surplus"
      },
      {
        "code": "EQOBEQ",
        "name": "Opening balance equity"
      },
      {
        "code": "EQSHARECAP",
        "name": "Share capital"
      },
      {
        "code": "EQDISTRIBUTIONS",
        "name": "Partner Distributions"
      },
      {
        "code": "EQCONTRIBUTIONS",
        "name": "Partner Contributions"
      },
      {
        "code": "EQACCUMAMORT",
        "name": "Accumulated adjustment"
      },
      {
        "code": "EQPARTNEREQUITY",
        "name": "Partner's equity"
      }
    ]
  },
  "Income": {
    "category": "Income",
    "detailTypes": [
      {
        "code": "INC",
        "name": "Other Primary Income"
      },
      {
        "code": "INCDISCOUNT",
        "name": "Discounts/refunds given"
      },
      {
        "code": "INCNONPROFIT",
        "name": "Non-profit income"
      },
      {
        "code": "INCSERVICE",
        "name": "Service/Fee Income"
      },
      {
        "code": "INCPRODUCT",
        "name": "Sales of product income"
      }
    ]
  },
  "Other income": {
    "category": "Income",
    "detailTypes": [
      {
        "code": "OI",
        "name": "Income"
      },
      {
        "code": "OIINVEST",
        "name": "Other investment income"
      },
      {
        "code": "OIGAINLOSSFA",
        "name": "Gain/loss on sale of fixed assets"
      },
      {
        "code": "OIGAINLOSSINVEST",
        "name": "Gain/loss on sale of investments"
      },
      {
        "code": "OITAXEXEMPTINTEREST",
        "name": "Tax-exempt interest"
      },
      {
        "code": "OIINTEREST",
        "name": "Interest earned"
      },
      {
        "code": "OIDIVIDEND",
        "name": "Dividend income"
      }
    ]
  },
  "Cost of Goods Sold": {
    "category": "COGS",
    "detailTypes": [
      {
        "code": "COGS",
        "name": "Cost of goods sold"
      },
      {
        "code": "COGSCOS",
        "name": "Other costs of service - COS"
      },
      {
        "code": "COGSLAB",
        "name": "Cost of labour - COS"
      },
      {
        "code": "COGSSHIP",
        "name": "Shipping, freight and delivery - COS"
      },
      {
        "code": "COGSSUPPLY",
        "name": "Supplies and materials - COS"
      },
      {
        "code": "COGSEQUIPRENT",
        "name": "Equipment rental - COS"
      }
    ]
  },
  "Expenses": {
    "category": "Expense",
    "detailTypes": [
      {
        "code": "EXP",
        "name": "Other miscellaneous service cost"
      },
      {
        "code": "EXPINS",
        "name": "Insurance"
      },
      {
        "code": "EXPAUTO",
        "name": "Auto"
      },
      {
        "code": "EXPLAB",
        "name": "Cost of labour"
      },
      {
        "code": "EXPBADDEBT",
        "name": "Bad debts"
      },
      {
        "code": "EXPENTERTAIN",
        "name": "Entertainment"
      },
      {
        "code": "EXPDONATION",
        "name": "Charitable contributions"
      },
      {
        "code": "EXPDUES",
        "name": "Dues and subscriptions"
      },
      {
        "code": "EXPPAYROLL",
        "name": "Payroll expenses"
      },
      {
        "code": "EXPTRAVEL",
        "name": "Travel"
      },
      {
        "code": "EXPSHIP",
        "name": "Shipping, Freight, and Delivery"
      },
      {
        "code": "EXPSUPPLY",
        "name": "Supplies"
      },
      {
        "code": "EXPBANKCHARGE",
        "name": "Bank charges"
      },
      {
        "code": "EXPOFFICE",
        "name": "Office/General Administrative Expenses"
      },
      {
        "code": "EXPDISTRIBUTION",
        "name": "Distribution costs"
      },
      {
        "code": "EXPPROFESSIONAL",
        "name": "Legal and professional fees"
      },
      {
        "code": "EXPINTEREST",
        "name": "Interest paid"
      },
      {
        "code": "EXPEQUIPRENT",
        "name": "Equipment rental"
      },
      {
        "code": "EXPRENT",
        "name": "Rent or lease of buildings"
      },
      {
        "code": "EXPADVERTISING",
        "name": "Advertising/promotional"
      },
      {
        "code": "EXPPROMOMEALS",
        "name": "Promotional meals"
      },
      {
        "code": "EXPTRAVELMEAL",
        "name": "Travel meals"
      },
      {
        "code": "EXPMEAL",
        "name": "Meals and entertainment"
      },
      {
        "code": "EXPREPAIR",
        "name": "Repair and maintenance"
      },
      {
        "code": "EXPUTILITIES",
        "name": "Utilities"
      },
      {
        "code": "EXPTAXES",
        "name": "Taxes paid"
      }
    ]
  },
  "Other Expense": {
    "category": "Expense",
    "detailTypes": [
      {
        "code": "OE",
        "name": "Other miscellaneous expense"
      },
      {
        "code": "OEPENALTIES",
        "name": "Penalties and settlements"
      },
      {
        "code": "OEAMORT",
        "name": "Amortization"
      },
      {
        "code": "OEDEPRECIATION",
        "name": "Depreciation"
      },
      {
        "code": "OEEXCHANGE",
        "name": "Exchange Gain or Loss"
      }
    ]
  }
};

export { CATEGORY_TO_TYPES, QBO_TYPES };
