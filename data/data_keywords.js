// Keyword to QBO Code Mapping
// Priority 1 = highest confidence, higher numbers = lower confidence

const KEYWORDS = {
  "Asset": [
    {
      "priority": 1,
      "keyword": "AMORT",
      "qboCode": "FAACCUMAMORT"
    },
    {
      "priority": 1,
      "keyword": "CHEQUING",
      "qboCode": "BCHQ"
    },
    {
      "priority": 1,
      "keyword": "EMPLOYEE",
      "qboCode": "CUREMPADVANCE"
    },
    {
      "priority": 1,
      "keyword": "GST",
      "qboCode": "CURASSET"
    },
    {
      "priority": 1,
      "keyword": "INCORPORATION",
      "qboCode": "LTAINTANGIBLE"
    },
    {
      "priority": 1,
      "keyword": "INVESTMENT",
      "qboCode": "LTAINVEST"
    },
    {
      "priority": 1,
      "keyword": "LAND",
      "qboCode": "FA"
    },
    {
      "priority": 1,
      "keyword": "LEASEHOLD",
      "qboCode": "FALEASEHOLD"
    },
    {
      "priority": 1,
      "keyword": "MACHINE",
      "qboCode": "FAEQUIP"
    },
    {
      "priority": 1,
      "keyword": "MARKETABLE",
      "qboCode": "BMM"
    },
    {
      "priority": 1,
      "keyword": "PETTY CASH",
      "qboCode": "BCASH"
    },
    {
      "priority": 1,
      "keyword": "PREPAID",
      "qboCode": "CURPREPAID"
    },
    {
      "priority": 1,
      "keyword": "SHAREHOLDER",
      "qboCode": "CURSHARELOAN"
    },
    {
      "priority": 1,
      "keyword": "UNDEPOSITED",
      "qboCode": "CURUNDEPOSIT"
    },
    {
      "priority": 1,
      "keyword": "VEHICLE",
      "qboCode": "FAVEHICLE"
    },
    {
      "priority": 1,
      "keyword": "VISA",
      "qboCode": "BCHQ"
    },
    {
      "priority": 2,
      "keyword": "A/R",
      "qboCode": "CURASSET"
    },
    {
      "priority": 2,
      "keyword": "ADVANCE",
      "qboCode": "CUREMPADVANCE"
    },
    {
      "priority": 2,
      "keyword": "AUTO",
      "qboCode": "FAVEHICLE"
    },
    {
      "priority": 2,
      "keyword": "BANK",
      "qboCode": "BCHQ"
    },
    {
      "priority": 2,
      "keyword": "BUILDING",
      "qboCode": "FABUILDING"
    },
    {
      "priority": 2,
      "keyword": "CASH",
      "qboCode": "BCASH"
    },
    {
      "priority": 2,
      "keyword": "CLIENTS",
      "qboCode": "CURASSET"
    },
    {
      "priority": 2,
      "keyword": "COMPUTER EQUIPMENT",
      "qboCode": "FAEQUIP"
    },
    {
      "priority": 2,
      "keyword": "DUE TO",
      "qboCode": "CURSHARELOAN"
    },
    {
      "priority": 2,
      "keyword": "FURNITURE",
      "qboCode": "FAEQUIP"
    },
    {
      "priority": 2,
      "keyword": "INTANGIBLE",
      "qboCode": "LTAINTANGIBLE"
    },
    {
      "priority": 2,
      "keyword": "LOAN",
      "qboCode": "CUROTHERLOAN"
    },
    {
      "priority": 2,
      "keyword": "RECEIVABLE",
      "qboCode": "CURASSET"
    },
    {
      "priority": 2,
      "keyword": "SAVINGS",
      "qboCode": "BSAV"
    },
    {
      "priority": 2,
      "keyword": "SECURITIES",
      "qboCode": "LTAINVEST"
    },
    {
      "priority": 2,
      "keyword": "STOCK",
      "qboCode": "LTAINVEST"
    },
    {
      "priority": 10,
      "keyword": "ACCT",
      "qboCode": "BCHQ"
    },
    {
      "priority": 10,
      "keyword": "SIGN",
      "qboCode": "FA"
    },
    {
      "priority": 99,
      "keyword": "CHQ",
      "qboCode": "BCHQ"
    },
    {
      "priority": 99,
      "keyword": "DEPOSIT",
      "qboCode": "CURUNDEPOSIT"
    },
    {
      "priority": 99,
      "keyword": "EQUIPMENT",
      "qboCode": "FAEQUIP"
    },
    {
      "priority": 99,
      "keyword": "INTERAC",
      "qboCode": "BCHQ"
    }
  ],
  "Liability": [
    {
      "priority": 1,
      "keyword": "AMERICAN EXPRESS",
      "qboCode": "CC"
    },
    {
      "priority": 1,
      "keyword": "CORPORATE INCOME TAX PAYABLE",
      "qboCode": "LIABTAX"
    },
    {
      "priority": 1,
      "keyword": "CPP",
      "qboCode": "LIABPAYROLL"
    },
    {
      "priority": 1,
      "keyword": "CURRENT PORTION",
      "qboCode": "LIABLOAN"
    },
    {
      "priority": 1,
      "keyword": "EI PAYABLE",
      "qboCode": "LIABPAYROLL"
    },
    {
      "priority": 1,
      "keyword": "GST",
      "qboCode": "LIABTAX"
    },
    {
      "priority": 1,
      "keyword": "INCOME TAX PAYABLE",
      "qboCode": "LIABTAX"
    },
    {
      "priority": 1,
      "keyword": "LINE OF CREDIT",
      "qboCode": "LIABLINECREDIT"
    },
    {
      "priority": 1,
      "keyword": "LOC",
      "qboCode": "LIABLINECREDIT"
    },
    {
      "priority": 1,
      "keyword": "MASTER-CARD",
      "qboCode": "CC"
    },
    {
      "priority": 1,
      "keyword": "MASTERCARD",
      "qboCode": "CC"
    },
    {
      "priority": 1,
      "keyword": "VISA",
      "qboCode": "CC"
    },
    {
      "priority": 2,
      "keyword": "ACCRUED",
      "qboCode": "CURLIAB"
    },
    {
      "priority": 2,
      "keyword": "ADVANCES",
      "qboCode": "CURLIAB"
    },
    {
      "priority": 2,
      "keyword": "LOAN",
      "qboCode": "LTLOAN"
    },
    {
      "priority": 2,
      "keyword": "NOTE",
      "qboCode": "LTLNOTE"
    },
    {
      "priority": 2,
      "keyword": "SHAREHOLDER",
      "qboCode": "LTLSHNOTE"
    },
    {
      "priority": 2,
      "keyword": "TAX PAYABLE",
      "qboCode": "LIABTAX"
    },
    {
      "priority": 3,
      "keyword": "DIVIDEND",
      "qboCode": "CURLIAB"
    },
    {
      "priority": 3,
      "keyword": "DUE TO",
      "qboCode": "LTLSHNOTE"
    },
    {
      "priority": 3,
      "keyword": "TAX",
      "qboCode": "LIABTAX"
    },
    {
      "priority": 10,
      "keyword": "PAYABLE",
      "qboCode": "CURLIAB"
    },
    {
      "priority": 10,
      "keyword": "RENT",
      "qboCode": "CURLIAB"
    },
    {
      "priority": 99,
      "keyword": "ACCOUNTS PAYABLE",
      "qboCode": "CURLIAB"
    },
    {
      "priority": 99,
      "keyword": "DEFERRED",
      "qboCode": "LTLDEFERINC"
    },
    {
      "priority": 99,
      "keyword": "INDUCEMENT",
      "qboCode": "CURLIAB"
    },
    {
      "priority": 99,
      "keyword": "PST",
      "qboCode": "LIABTAX"
    },
    {
      "priority": 99,
      "keyword": "WAGES",
      "qboCode": "LIABPAYROLL"
    }
  ],
  "Equity": [
    {
      "priority": 1,
      "keyword": "COMMON",
      "qboCode": "EQSTOCK"
    },
    {
      "priority": 1,
      "keyword": "DIVIDEND",
      "qboCode": "EQDISTRIBUTIONS"
    },
    {
      "priority": 1,
      "keyword": "EQUITY",
      "qboCode": "EQOE"
    },
    {
      "priority": 1,
      "keyword": "PREFERRED",
      "qboCode": "EQPREFSTOCK"
    },
    {
      "priority": 1,
      "keyword": "REFUNDABLE",
      "qboCode": "EQOE"
    },
    {
      "priority": 1,
      "keyword": "SHAREHOLDER",
      "qboCode": "EQOE"
    },
    {
      "priority": 1,
      "keyword": "SHARES",
      "qboCode": "EQSHARECAP"
    },
    {
      "priority": 2,
      "keyword": "RETAINED EARNING",
      "qboCode": "EQOE"
    },
    {
      "priority": 99,
      "keyword": "CAPITAL ASSET",
      "qboCode": "EQOE"
    },
    {
      "priority": 99,
      "keyword": "NET ASSETS",
      "qboCode": "EQOE"
    }
  ],
  "Income": [
    {
      "priority": 1,
      "keyword": "GAIN/LOSS",
      "qboCode": "OIGAINLOSSFA"
    },
    {
      "priority": 1,
      "keyword": "OTHER INCOME",
      "qboCode": "OI"
    },
    {
      "priority": 1,
      "keyword": "PST COMMISSION",
      "qboCode": "OI"
    },
    {
      "priority": 1,
      "keyword": "REVENUE",
      "qboCode": "INC"
    },
    {
      "priority": 1,
      "keyword": "SALES",
      "qboCode": "INC"
    },
    {
      "priority": 2,
      "keyword": "DISCOUNT",
      "qboCode": "INCDISCOUNT"
    },
    {
      "priority": 3,
      "keyword": "COMMISSION",
      "qboCode": "INC"
    },
    {
      "priority": 3,
      "keyword": "INCOME",
      "qboCode": "INC"
    },
    {
      "priority": 99,
      "keyword": "CASH",
      "qboCode": "OI"
    },
    {
      "priority": 99,
      "keyword": "CREDIT",
      "qboCode": "OI"
    },
    {
      "priority": 99,
      "keyword": "DONATION",
      "qboCode": "INC"
    },
    {
      "priority": 99,
      "keyword": "GRANT",
      "qboCode": "INC"
    },
    {
      "priority": 99,
      "keyword": "REBATE",
      "qboCode": "OI"
    },
    {
      "priority": 99,
      "keyword": "RECYCLING",
      "qboCode": "OI"
    },
    {
      "priority": 99,
      "keyword": "SURPLUS",
      "qboCode": "OI"
    },
    {
      "priority": 99,
      "keyword": "UTILITY",
      "qboCode": "OI"
    }
  ],
  "COGS": [
    {
      "priority": 1,
      "keyword": "Closing Inventory",
      "qboCode": "COGS"
    },
    {
      "priority": 1,
      "keyword": "Cost of Sales",
      "qboCode": "COGS"
    },
    {
      "priority": 1,
      "keyword": "Opening Inventory",
      "qboCode": "COGS"
    },
    {
      "priority": 2,
      "keyword": "Assembly",
      "qboCode": "COGS"
    },
    {
      "priority": 2,
      "keyword": "Inventory",
      "qboCode": "COGS"
    },
    {
      "priority": 2,
      "keyword": "Purchases",
      "qboCode": "COGS"
    },
    {
      "priority": 2,
      "keyword": "Shrinkage",
      "qboCode": "COGS"
    }
  ],
  "Expense": [
    {
      "priority": 1,
      "keyword": "ADVERTISING",
      "qboCode": "EXPADVERTISING"
    },
    {
      "priority": 1,
      "keyword": "AMERICAN EXPRESS",
      "qboCode": "EXPBANKCHARGE"
    },
    {
      "priority": 1,
      "keyword": "AUTO FUEL",
      "qboCode": "EXPAUTO"
    },
    {
      "priority": 1,
      "keyword": "AUTO INSURANCE",
      "qboCode": "EXPAUTO"
    },
    {
      "priority": 1,
      "keyword": "BANK",
      "qboCode": "EXPBANKCHARGE"
    },
    {
      "priority": 1,
      "keyword": "CELL",
      "qboCode": null
    },
    {
      "priority": 1,
      "keyword": "COST OF GOODS",
      "qboCode": null
    },
    {
      "priority": 1,
      "keyword": "CPP",
      "qboCode": null
    },
    {
      "priority": 1,
      "keyword": "EI",
      "qboCode": null
    },
    {
      "priority": 1,
      "keyword": "ELECTRICITY",
      "qboCode": null
    },
    {
      "priority": 1,
      "keyword": "EQUIPMENT RENT",
      "qboCode": null
    },
    {
      "priority": 1,
      "keyword": "INTERNET",
      "qboCode": null
    },
    {
      "priority": 1,
      "keyword": "MAINTENANCE",
      "qboCode": "EXPREPAIR"
    },
    {
      "priority": 1,
      "keyword": "MASTERCARD",
      "qboCode": null
    },
    {
      "priority": 1,
      "keyword": "MEAL",
      "qboCode": "EXPMEAL"
    },
    {
      "priority": 1,
      "keyword": "OHSC",
      "qboCode": null
    },
    {
      "priority": 1,
      "keyword": "PARKING",
      "qboCode": null
    },
    {
      "priority": 1,
      "keyword": "PAYROLL",
      "qboCode": "EXPLAB"
    },
    {
      "priority": 1,
      "keyword": "PENALTIES",
      "qboCode": "OEPENALTIES"
    },
    {
      "priority": 1,
      "keyword": "PHONE",
      "qboCode": "EXPUTILITIES"
    },
    {
      "priority": 1,
      "keyword": "REPAIRS",
      "qboCode": "EXPREPAIR"
    },
    {
      "priority": 1,
      "keyword": "SALARY",
      "qboCode": "EXPLAB"
    },
    {
      "priority": 1,
      "keyword": "SERVICES PUBLIC",
      "qboCode": "EXPUTILITIES"
    },
    {
      "priority": 1,
      "keyword": "VISA",
      "qboCode": "EXPBANKCHARGE"
    },
    {
      "priority": 1,
      "keyword": "WAGES",
      "qboCode": "EXPPAYROLL"
    },
    {
      "priority": 2,
      "keyword": "ASSURANCE",
      "qboCode": "EXPDUES"
    },
    {
      "priority": 2,
      "keyword": "AUTO",
      "qboCode": "EXPAUTO"
    },
    {
      "priority": 2,
      "keyword": "FUEL",
      "qboCode": "EXPAUTO"
    },
    {
      "priority": 2,
      "keyword": "GAS",
      "qboCode": "EXPAUTO"
    },
    {
      "priority": 2,
      "keyword": "INSURANCE",
      "qboCode": "EXPINS"
    },
    {
      "priority": 2,
      "keyword": "INTEREST",
      "qboCode": "EXPINTEREST"
    },
    {
      "priority": 2,
      "keyword": "LICENCE",
      "qboCode": "EXPDUES"
    },
    {
      "priority": 2,
      "keyword": "OFFICE",
      "qboCode": "EXPOFFICE"
    },
    {
      "priority": 2,
      "keyword": "RENT",
      "qboCode": "EXPRENT"
    },
    {
      "priority": 2,
      "keyword": "SUB CONTRACTOR",
      "qboCode": "EXPLAB"
    },
    {
      "priority": 2,
      "keyword": "TRAVEL",
      "qboCode": "EXPTRAVEL"
    },
    {
      "priority": 2,
      "keyword": "UTILITIES",
      "qboCode": "EXPUTILITIES"
    },
    {
      "priority": 2,
      "keyword": "UTILITY",
      "qboCode": "EXPUTILITIES"
    },
    {
      "priority": 2,
      "keyword": "VEHICLE",
      "qboCode": "EXPAUTO"
    },
    {
      "priority": 3,
      "keyword": "DNU",
      "qboCode": "OE"
    },
    {
      "priority": 3,
      "keyword": "DO NOT USE",
      "qboCode": "OE"
    },
    {
      "priority": 3,
      "keyword": "SUSPENSE",
      "qboCode": "OE"
    },
    {
      "priority": 8,
      "keyword": "ACCOUNTING",
      "qboCode": "EXPPROFESSIONAL"
    },
    {
      "priority": 8,
      "keyword": "LEGAL",
      "qboCode": "EXPPROFESSIONAL"
    },
    {
      "priority": 8,
      "keyword": "MARKETING",
      "qboCode": "EXPADVERTISING"
    },
    {
      "priority": 8,
      "keyword": "PROFESSIONAL",
      "qboCode": "EXPPROFESSIONAL"
    },
    {
      "priority": 9,
      "keyword": "OTHER EXPENSES",
      "qboCode": "OE"
    },
    {
      "priority": 9,
      "keyword": "TAX",
      "qboCode": "EXPTAXES"
    },
    {
      "priority": 99,
      "keyword": "AMORT",
      "qboCode": "OEAMORT"
    },
    {
      "priority": 99,
      "keyword": "COMPUTER",
      "qboCode": "EXPOFFICE"
    },
    {
      "priority": 99,
      "keyword": "DEPR",
      "qboCode": "OEDEPRECIATION"
    },
    {
      "priority": 99,
      "keyword": "DONATION",
      "qboCode": "EXPDONATION"
    },
    {
      "priority": 99,
      "keyword": "DUES",
      "qboCode": "EXPDUES"
    },
    {
      "priority": 99,
      "keyword": "EQUIPMENT LEASE",
      "qboCode": "EXPEQUIPRENT"
    },
    {
      "priority": 99,
      "keyword": "EXPENSES",
      "qboCode": "EXP"
    },
    {
      "priority": 99,
      "keyword": "GARBAGE",
      "qboCode": "EXPUTILITIES"
    },
    {
      "priority": 99,
      "keyword": "POS",
      "qboCode": "EXPBANKCHARGE"
    },
    {
      "priority": 99,
      "keyword": "PROCEEDS",
      "qboCode": "OE"
    },
    {
      "priority": 99,
      "keyword": "RECYCLING",
      "qboCode": "EXPUTILITIES"
    },
    {
      "priority": 99,
      "keyword": "SECURITY",
      "qboCode": "EXPUTILITIES"
    },
    {
      "priority": 99,
      "keyword": "STAFF",
      "qboCode": "EXPLAB"
    },
    {
      "priority": 99,
      "keyword": "STORAGE",
      "qboCode": "EXP"
    },
    {
      "priority": 99,
      "keyword": "SUPPLIES",
      "qboCode": "EXPSUPPLY"
    },
    {
      "priority": 99,
      "keyword": "SUPPLY",
      "qboCode": "EXPSUPPLY"
    },
    {
      "priority": 99,
      "keyword": "SURPLUS",
      "qboCode": "OE"
    },
    {
      "priority": 99,
      "keyword": "TRAINING",
      "qboCode": "EXPLAB"
    },
    {
      "priority": 99,
      "keyword": "VOLUNTEER",
      "qboCode": "EXPLAB"
    },
    {
      "priority": 99,
      "keyword": "WCB",
      "qboCode": "EXPLAB"
    },
    {
      "priority": 99,
      "keyword": "WORKER",
      "qboCode": "EXPLAB"
    }
  ]
};

export default KEYWORDS;
