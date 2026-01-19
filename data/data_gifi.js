// GIFI Code to QBO Type Mapping
// Extracted from TB_IMPORT_V1_2024228_FINAL.xlsm
// Total entries: 748

const GIFI_MAP = {
  "1000": {
    "description": "Cash and deposits",
    "qboCode": "BCHQ",
    "type": "Bank",
    "detailType": "Chequing"
  },
  "1001": {
    "description": "Cash",
    "qboCode": "BCASH",
    "type": "Bank",
    "detailType": "Cash on hand"
  },
  "1002": {
    "description": "Deposits in Canadian banks and institutions -",
    "qboCode": "BCHQ",
    "type": "Bank",
    "detailType": "Chequing"
  },
  "1003": {
    "description": "Deposits in Canadian banks and institutions -",
    "qboCode": "BCHQ",
    "type": "Bank",
    "detailType": "Chequing"
  },
  "1004": {
    "description": "Deposits in foreign banks - Canadian currency",
    "qboCode": "BCHQ",
    "type": "Bank",
    "detailType": "Chequing"
  },
  "1005": {
    "description": "Deposits in foreign banks - Foreign currency",
    "qboCode": "BCHQ",
    "type": "Bank",
    "detailType": "Chequing"
  },
  "1006": {
    "description": "Credit union central deposits",
    "qboCode": "BCHQ",
    "type": "Bank",
    "detailType": "Chequing"
  },
  "1007": {
    "description": "Other cash-like instruments",
    "qboCode": "BCHQ",
    "type": "Bank",
    "detailType": "Chequing"
  },
  "1060": {
    "description": "Accounts receivable",
    "qboCode": "CURASSET",
    "type": "Current assets",
    "detailType": "Other current assets"
  },
  "1061": {
    "description": "Allowance for doubtful accounts",
    "qboCode": "CURASSET",
    "type": "Current assets",
    "detailType": "Other current assets"
  },
  "1062": {
    "description": "Trade accounts receivable",
    "qboCode": "CURASSET",
    "type": "Current assets",
    "detailType": "Other current assets"
  },
  "1063": {
    "description": "Allowance for doubtful trade accounts receivable",
    "qboCode": "CURASSET",
    "type": "Current assets",
    "detailType": "Other current assets"
  },
  "1064": {
    "description": "Trade accounts receivable from related parties",
    "qboCode": "CURASSET",
    "type": "Current assets",
    "detailType": "Other current assets"
  },
  "1065": {
    "description": "Allowance for doubtful trade accounts receivable",
    "qboCode": "CURALLOWBAD",
    "type": "Current assets",
    "detailType": "Allowance for bad debts"
  },
  "1066": {
    "description": "Taxes receivable",
    "qboCode": "CURASSET",
    "type": "Current assets",
    "detailType": "Other current assets"
  },
  "1067": {
    "description": "Interest receivable",
    "qboCode": "CURASSET",
    "type": "Current assets",
    "detailType": "Other current assets"
  },
  "1068": {
    "description": "Holdbacks receivable",
    "qboCode": "CURASSET",
    "type": "Current assets",
    "detailType": "Other current assets"
  },
  "1069": {
    "description": "Leases receivable",
    "qboCode": "CURASSET",
    "type": "Current assets",
    "detailType": "Other current assets"
  },
  "1070": {
    "description": "Allowance for doubtful amounts contained in",
    "qboCode": "CURALLOWBAD",
    "type": "Current assets",
    "detailType": "Allowance for bad debts"
  },
  "1071": {
    "description": "Accounts receivable from employees",
    "qboCode": "CUREMPADVANCE",
    "type": "Current assets",
    "detailType": "Employee cash advances"
  },
  "1072": {
    "description": "Allowance for doubtful accounts receivable from",
    "qboCode": "CURALLOWBAD",
    "type": "Current assets",
    "detailType": "Allowance for bad debts"
  },
  "1073": {
    "description": "Amounts receivable from members of NPOs",
    "qboCode": "CURASSET",
    "type": "Current assets",
    "detailType": "Other current assets"
  },
  "1120": {
    "description": "Inventories",
    "qboCode": "CURINVENTORY",
    "type": "Current assets",
    "detailType": "Inventory"
  },
  "1121": {
    "description": "Inventory of goods for sale",
    "qboCode": "CURINVENTORY",
    "type": "Current assets",
    "detailType": "Inventory"
  },
  "1122": {
    "description": "Inventory parts and supplies",
    "qboCode": "CURINVENTORY",
    "type": "Current assets",
    "detailType": "Inventory"
  },
  "1123": {
    "description": "Inventory properties",
    "qboCode": "CURINVENTORY",
    "type": "Current assets",
    "detailType": "Inventory"
  },
  "1124": {
    "description": "Inventory of aggregates",
    "qboCode": "CURINVENTORY",
    "type": "Current assets",
    "detailType": "Inventory"
  },
  "1125": {
    "description": "Work in progress",
    "qboCode": "CURINVENTORY",
    "type": "Current assets",
    "detailType": "Inventory"
  },
  "1126": {
    "description": "Raw materials",
    "qboCode": "CURINVENTORY",
    "type": "Current assets",
    "detailType": "Inventory"
  },
  "1127": {
    "description": "Inventory of securities",
    "qboCode": "CURINVEST",
    "type": "Current assets",
    "detailType": "Investments - Other"
  },
  "1180": {
    "description": "Short-term investments",
    "qboCode": "CURINVEST",
    "type": "Current assets",
    "detailType": "Investments - Other"
  },
  "1181": {
    "description": "Canadian term deposits",
    "qboCode": "CURINVEST",
    "type": "Current assets",
    "detailType": "Investments - Other"
  },
  "1182": {
    "description": "Canadian shares",
    "qboCode": "CURINVEST",
    "type": "Current assets",
    "detailType": "Investments - Other"
  },
  "1183": {
    "description": "Canadian bonds",
    "qboCode": "CURINVEST",
    "type": "Current assets",
    "detailType": "Investments - Other"
  },
  "1184": {
    "description": "Canadian treasury bills",
    "qboCode": "CURINVEST",
    "type": "Current assets",
    "detailType": "Investments - Other"
  },
  "1185": {
    "description": "Securities purchased under resale agreements",
    "qboCode": "CURINVEST",
    "type": "Current assets",
    "detailType": "Investments - Other"
  },
  "1186": {
    "description": "Other short-term Canadian investments",
    "qboCode": "CURINVEST",
    "type": "Current assets",
    "detailType": "Investments - Other"
  },
  "1187": {
    "description": "Short-term foreign investments",
    "qboCode": "CURINVEST",
    "type": "Current assets",
    "detailType": "Investments - Other"
  },
  "1240": {
    "description": "Loans and notes receivable",
    "qboCode": "CURINVEST",
    "type": "Current assets",
    "detailType": "Investments - Other"
  },
  "1241": {
    "description": "Demand loans receivable",
    "qboCode": "CURINVEST",
    "type": "Current assets",
    "detailType": "Investments - Other"
  },
  "1242": {
    "description": "Other loans receivable",
    "qboCode": "CURINVEST",
    "type": "Current assets",
    "detailType": "Investments - Other"
  },
  "1243": {
    "description": "Notes receivable",
    "qboCode": "CURINVEST",
    "type": "Current assets",
    "detailType": "Investments - Other"
  },
  "1244": {
    "description": "Mortgages receivable",
    "qboCode": "CURINVEST",
    "type": "Current assets",
    "detailType": "Investments - Other"
  },
  "1300": {
    "description": "Due from shareholder(s)/director(s)",
    "qboCode": "CUROFFICERLOAN",
    "type": "Current assets",
    "detailType": "Loans to officers"
  },
  "1301": {
    "description": "Due from individual shareholder(s)",
    "qboCode": "CURSHARELOAN",
    "type": "Current assets",
    "detailType": "Loans to Shareholders"
  },
  "1302": {
    "description": "Due from corporate shareholder(s)",
    "qboCode": "CURSHARELOAN",
    "type": "Current assets",
    "detailType": "Loans to Shareholders"
  },
  "1303": {
    "description": "Due from director(s)",
    "qboCode": "CUROFFICERLOAN",
    "type": "Current assets",
    "detailType": "Loans to officers"
  },
  "1310": {
    "description": "Due from member(s)/general partner(s)",
    "qboCode": "CURSHARELOAN",
    "type": "Current assets",
    "detailType": "Loans to Shareholders"
  },
  "1311": {
    "description": "Due from limited partners",
    "qboCode": "CURSHARELOAN",
    "type": "Current assets",
    "detailType": "Loans to Shareholders"
  },
  "1312": {
    "description": "Due from members that are partnerships",
    "qboCode": "CURSHARELOAN",
    "type": "Current assets",
    "detailType": "Loans to Shareholders"
  },
  "1313": {
    "description": "Due from general partners",
    "qboCode": "CURSHARELOAN",
    "type": "Current assets",
    "detailType": "Loans to Shareholders"
  },
  "1314": {
    "description": "Due from specified members who are not limited",
    "qboCode": "CUROTHERLOAN",
    "type": "Current assets",
    "detailType": "Loans to others"
  },
  "1360": {
    "description": "Investment in joint venture(s)/partnership(s)",
    "qboCode": "CURINVEST",
    "type": "Current assets",
    "detailType": "Investments - Other"
  },
  "1380": {
    "description": "Due from joint venture(s)/partnership(s) (item for",
    "qboCode": "CUROTHERLOAN",
    "type": "Current assets",
    "detailType": "Loans to others"
  },
  "1400": {
    "description": "Due from/investment in related parties",
    "qboCode": "CUROTHERLOAN",
    "type": "Current assets",
    "detailType": "Loans to others"
  },
  "1401": {
    "description": "Demand notes from related parties",
    "qboCode": "CUROTHERLOAN",
    "type": "Current assets",
    "detailType": "Loans to others"
  },
  "1402": {
    "description": "Interest receivable from related parties",
    "qboCode": "CUROTHERLOAN",
    "type": "Current assets",
    "detailType": "Loans to others"
  },
  "1403": {
    "description": "Loans/advances due from related parties",
    "qboCode": "CUROTHERLOAN",
    "type": "Current assets",
    "detailType": "Loans to others"
  },
  "1460": {
    "description": "Customers\u2019 liability under acceptances",
    "qboCode": "CURASSET",
    "type": "Current assets",
    "detailType": "Other current assets"
  },
  "1480": {
    "description": "Other current assets",
    "qboCode": "CURASSET",
    "type": "Current assets",
    "detailType": "Other current assets"
  },
  "1481": {
    "description": "Future (deferred) income taxes",
    "qboCode": "CURASSET",
    "type": "Current assets",
    "detailType": "Other current assets"
  },
  "1482": {
    "description": "Accrued investment income",
    "qboCode": "CURASSET",
    "type": "Current assets",
    "detailType": "Other current assets"
  },
  "1483": {
    "description": "Taxes recoverable/refundable",
    "qboCode": "CURASSET",
    "type": "Current assets",
    "detailType": "Other current assets"
  },
  "1484": {
    "description": "Prepaid expenses",
    "qboCode": "CURPREPAID",
    "type": "Current assets",
    "detailType": "Prepaid expenses"
  },
  "1485": {
    "description": "Drilling advances",
    "qboCode": "CURASSET",
    "type": "Current assets",
    "detailType": "Other current assets"
  },
  "1486": {
    "description": "Security/tender deposits",
    "qboCode": "CURASSET",
    "type": "Current assets",
    "detailType": "Other current assets"
  },
  "1599": {
    "description": "Total current assets",
    "qboCode": "CURASSET",
    "type": "Current assets",
    "detailType": "Other current assets"
  },
  "1600": {
    "description": "Land",
    "qboCode": "FA",
    "type": "Property, plant and equipment",
    "detailType": "Depletable assets"
  },
  "1601": {
    "description": "Land improvements",
    "qboCode": "FA",
    "type": "Property, plant and equipment",
    "detailType": "Depletable assets"
  },
  "1602": {
    "description": "Accumulated amortization of land improvements",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1620": {
    "description": "Depletable assets",
    "qboCode": "FA",
    "type": "Property, plant and equipment",
    "detailType": "Depletable assets"
  },
  "1621": {
    "description": "Accumulated amortization of depletable assets",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1622": {
    "description": "Petroleum and natural gas properties",
    "qboCode": "FA",
    "type": "Property, plant and equipment",
    "detailType": "Depletable assets"
  },
  "1623": {
    "description": "Accumulated amortization of petroleum and",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1624": {
    "description": "Mining properties",
    "qboCode": "FA",
    "type": "Property, plant and equipment",
    "detailType": "Depletable assets"
  },
  "1625": {
    "description": "Accumulated amortization of mining properties",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1626": {
    "description": "Deferred exploration and development charges",
    "qboCode": "LTAPREPAY",
    "type": "Long-term Assets",
    "detailType": "Prepayments and accrued income"
  },
  "1627": {
    "description": "Accumulated amortization of deferred exploration",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1628": {
    "description": "Quarries",
    "qboCode": "FA",
    "type": "Property, plant and equipment",
    "detailType": "Depletable assets"
  },
  "1629": {
    "description": "Accumulated amortization of quarries",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1630": {
    "description": "Gravel pits",
    "qboCode": "FA",
    "type": "Property, plant and equipment",
    "detailType": "Depletable assets"
  },
  "1631": {
    "description": "Accumulated amortization of gravel pits",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1632": {
    "description": "Timber limits",
    "qboCode": "FA",
    "type": "Property, plant and equipment",
    "detailType": "Depletable assets"
  },
  "1633": {
    "description": "Accumulated amortization of timber limits",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1680": {
    "description": "Buildings",
    "qboCode": "FA",
    "type": "Property, plant and equipment",
    "detailType": "Depletable assets"
  },
  "1681": {
    "description": "Accumulated amortization of buildings",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1682": {
    "description": "Manufacturing and processing plant",
    "qboCode": "FA",
    "type": "Property, plant and equipment",
    "detailType": "Depletable assets"
  },
  "1683": {
    "description": "Accumulated amortization of manufacturing and",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1684": {
    "description": "Buildings under construction",
    "qboCode": "LTA",
    "type": "Long-term Assets",
    "detailType": "Other long-term assets"
  },
  "1740": {
    "description": "Machinery, equipment, furniture, and fixtures",
    "qboCode": "FAEQUIP",
    "type": "Property, plant and equipment",
    "detailType": "Machinery and equipment"
  },
  "1741": {
    "description": "Accumulated amortization of machinery,",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1742": {
    "description": "Motor vehicles",
    "qboCode": "FAVEHICLE",
    "type": "Property, plant and equipment",
    "detailType": "Vehicles"
  },
  "1743": {
    "description": "Accumulated amortization of motor vehicles",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1744": {
    "description": "Tools and dies",
    "qboCode": "FA",
    "type": "Property, plant and equipment",
    "detailType": "Depletable assets"
  },
  "1745": {
    "description": "Accumulated amortization of tools and dies",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1746": {
    "description": "Construction and excavating equipment",
    "qboCode": "FAEQUIP",
    "type": "Property, plant and equipment",
    "detailType": "Machinery and equipment"
  },
  "1747": {
    "description": "Accumulated amortization of construction and",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1748": {
    "description": "Forestry and logging equipment",
    "qboCode": "FAEQUIP",
    "type": "Property, plant and equipment",
    "detailType": "Machinery and equipment"
  },
  "1749": {
    "description": "Accumulated amortization of forestry and logging",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1750": {
    "description": "Fishing gear and nets",
    "qboCode": "FAEQUIP",
    "type": "Property, plant and equipment",
    "detailType": "Machinery and equipment"
  },
  "1751": {
    "description": "Accumulated amortization of fishing gear  and nets",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1752": {
    "description": "Mining equipment",
    "qboCode": "FAEQUIP",
    "type": "Property, plant and equipment",
    "detailType": "Machinery and equipment"
  },
  "1753": {
    "description": "Accumulated amortization of mining equipment",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1754": {
    "description": "Oil and gas systems",
    "qboCode": "FAEQUIP",
    "type": "Property, plant and equipment",
    "detailType": "Machinery and equipment"
  },
  "1755": {
    "description": "Accumulated amortization of oil and gas systems",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1756": {
    "description": "Production equipment for resource industries",
    "qboCode": "FAEQUIP",
    "type": "Property, plant and equipment",
    "detailType": "Machinery and equipment"
  },
  "1757": {
    "description": "Accumulated amortization of production",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1758": {
    "description": "Production equipment for other than resource",
    "qboCode": "FAEQUIP",
    "type": "Property, plant and equipment",
    "detailType": "Machinery and equipment"
  },
  "1759": {
    "description": "Accumulated amortization of production",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1760": {
    "description": "Exploration equipment",
    "qboCode": "FAEQUIP",
    "type": "Property, plant and equipment",
    "detailType": "Machinery and equipment"
  },
  "1761": {
    "description": "Accumulated amortization of exploration",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1762": {
    "description": "Shipping equipment",
    "qboCode": "FAEQUIP",
    "type": "Property, plant and equipment",
    "detailType": "Machinery and equipment"
  },
  "1763": {
    "description": "Accumulated amortization of shipping equipment",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1764": {
    "description": "Ships and boats",
    "qboCode": "FAEQUIP",
    "type": "Property, plant and equipment",
    "detailType": "Machinery and equipment"
  },
  "1765": {
    "description": "Accumulated amortization of ships and boats",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1766": {
    "description": "Aircraft",
    "qboCode": "FAEQUIP",
    "type": "Property, plant and equipment",
    "detailType": "Machinery and equipment"
  },
  "1767": {
    "description": "Accumulated amortization of aircraft",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1768": {
    "description": "Signs",
    "qboCode": "FA",
    "type": "Property, plant and equipment",
    "detailType": "Depletable assets"
  },
  "1769": {
    "description": "Accumulated amortization of signs",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1770": {
    "description": "Small tools",
    "qboCode": "FA",
    "type": "Property, plant and equipment",
    "detailType": "Depletable assets"
  },
  "1771": {
    "description": "Accumulated amortization of small tools",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1772": {
    "description": "Radio and communication equipment",
    "qboCode": "FA",
    "type": "Property, plant and equipment",
    "detailType": "Depletable assets"
  },
  "1773": {
    "description": "Accumulated amortization of radio and",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1774": {
    "description": "Computer equipment/software",
    "qboCode": "FA",
    "type": "Property, plant and equipment",
    "detailType": "Depletable assets"
  },
  "1775": {
    "description": "Accumulated amortization of computer",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1776": {
    "description": "Musical instruments",
    "qboCode": "FA",
    "type": "Property, plant and equipment",
    "detailType": "Depletable assets"
  },
  "1777": {
    "description": "Accumulated amortization of musical instruments",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1778": {
    "description": "Satellites",
    "qboCode": "FA",
    "type": "Property, plant and equipment",
    "detailType": "Depletable assets"
  },
  "1779": {
    "description": "Accumulated amortization of satellites",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1780": {
    "description": "Earth stations",
    "qboCode": "FA",
    "type": "Property, plant and equipment",
    "detailType": "Depletable assets"
  },
  "1781": {
    "description": "Accumulated amortization of earth stations",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1782": {
    "description": "Machinery and equipment under construction",
    "qboCode": "FAEQUIP",
    "type": "Property, plant and equipment",
    "detailType": "Machinery and equipment"
  },
  "1783": {
    "description": "Transportation equipment",
    "qboCode": "FAEQUIP",
    "type": "Property, plant and equipment",
    "detailType": "Machinery and equipment"
  },
  "1784": {
    "description": "Accumulated amortization of transportation",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1785": {
    "description": "Other machinery and equipment",
    "qboCode": "FAEQUIP",
    "type": "Property, plant and equipment",
    "detailType": "Machinery and equipment"
  },
  "1786": {
    "description": "Accumulated amortization of other machinery and",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1787": {
    "description": "Furniture and fixtures",
    "qboCode": "FAFURN",
    "type": "Property, plant and equipment",
    "detailType": "Furniture and fixtures"
  },
  "1788": {
    "description": "Accumulated amortization of furniture and",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1900": {
    "description": "Other tangible capital assets",
    "qboCode": "LTA",
    "type": "Long-term Assets",
    "detailType": "Other long-term assets"
  },
  "1901": {
    "description": "Accumulated amortization of other tangible",
    "qboCode": "LTA",
    "type": "Long-term Assets",
    "detailType": "Other long-term assets"
  },
  "1902": {
    "description": "Logging roads",
    "qboCode": "FA",
    "type": "Property, plant and equipment",
    "detailType": "Depletable assets"
  },
  "1903": {
    "description": "Accumulated amortization of logging roads",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1904": {
    "description": "Asphalt and parking areas",
    "qboCode": "FA",
    "type": "Property, plant and equipment",
    "detailType": "Depletable assets"
  },
  "1905": {
    "description": "Accumulated amortization of asphalt and parking",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1906": {
    "description": "Wharves",
    "qboCode": "FA",
    "type": "Property, plant and equipment",
    "detailType": "Depletable assets"
  },
  "1907": {
    "description": "Accumulated amortization of wharves",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1908": {
    "description": "Fences",
    "qboCode": "FA",
    "type": "Property, plant and equipment",
    "detailType": "Depletable assets"
  },
  "1909": {
    "description": "Accumulated amortization of fences",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1910": {
    "description": "Capital leases - Buildings",
    "qboCode": "FA",
    "type": "Property, plant and equipment",
    "detailType": "Depletable assets"
  },
  "1911": {
    "description": "Accumulated amortization of capital leases -",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1912": {
    "description": "Capital leases - Equipment",
    "qboCode": "FA",
    "type": "Property, plant and equipment",
    "detailType": "Depletable assets"
  },
  "1913": {
    "description": "Accumulated amortization of capital leases -",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1914": {
    "description": "Capital leases - Vehicles",
    "qboCode": "FA",
    "type": "Property, plant and equipment",
    "detailType": "Depletable assets"
  },
  "1915": {
    "description": "Accumulated amortization of capital leases -",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1916": {
    "description": "Capital leases - Others",
    "qboCode": "FA",
    "type": "Property, plant and equipment",
    "detailType": "Depletable assets"
  },
  "1917": {
    "description": "Accumulated amortization of capital leases -",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1918": {
    "description": "Leasehold improvements",
    "qboCode": "FALEASEHOLD",
    "type": "Property, plant and equipment",
    "detailType": "Leasehold improvements"
  },
  "1919": {
    "description": "Accumulated amortization of leasehold",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "1920": {
    "description": "Other capital assets under construction",
    "qboCode": "FA",
    "type": "Property, plant and equipment",
    "detailType": "Depletable assets"
  },
  "1921": {
    "description": "Campsites",
    "qboCode": "FA",
    "type": "Property, plant and equipment",
    "detailType": "Depletable assets"
  },
  "1922": {
    "description": "Accumulated amortization of campsites",
    "qboCode": "FAACCUMAMORT",
    "type": "Property, plant and equipment",
    "detailType": "Accumulated amortization"
  },
  "2008": {
    "description": "Total tangible capital assets",
    "qboCode": "LTA",
    "type": "Long-term Assets",
    "detailType": "Other long-term assets"
  },
  "2009": {
    "description": "Total accumulated amortization of tangible",
    "qboCode": "LTA",
    "type": "Long-term Assets",
    "detailType": "Other long-term assets"
  },
  "2010": {
    "description": "Intangible assets",
    "qboCode": "LTAOTHINTANG",
    "type": "Long-term Assets",
    "detailType": "Other intangible assets"
  },
  "2011": {
    "description": "Accumulated amortization of intangible assets",
    "qboCode": "LTAMORT",
    "type": "Long-term Assets",
    "detailType": "Accumulated amortization of other assets"
  },
  "2012": {
    "description": "Goodwill",
    "qboCode": "LTGOODWILL",
    "type": "Long-term Assets",
    "detailType": "Goodwill"
  },
  "2013": {
    "description": "Accumulated amortization of goodwill",
    "qboCode": "LTAMORT",
    "type": "Long-term Assets",
    "detailType": "Accumulated amortization of other assets"
  },
  "2014": {
    "description": "Quota",
    "qboCode": "LTAOTHINTANG",
    "type": "Long-term Assets",
    "detailType": "Other intangible assets"
  },
  "2015": {
    "description": "Accumulated amortization of quota",
    "qboCode": "LTAMORT",
    "type": "Long-term Assets",
    "detailType": "Accumulated amortization of other assets"
  },
  "2016": {
    "description": "Licences",
    "qboCode": "LTAOTHINTANG",
    "type": "Long-term Assets",
    "detailType": "Other intangible assets"
  },
  "2017": {
    "description": "Accumulated amortization of licences",
    "qboCode": "LTAMORT",
    "type": "Long-term Assets",
    "detailType": "Accumulated amortization of other assets"
  },
  "2018": {
    "description": "Incorporation costs",
    "qboCode": "LTAOTHINTANG",
    "type": "Long-term Assets",
    "detailType": "Other intangible assets"
  },
  "2019": {
    "description": "Accumulated amortization of incorporation costs",
    "qboCode": "LTAMORT",
    "type": "Long-term Assets",
    "detailType": "Accumulated amortization of other assets"
  },
  "2020": {
    "description": "Trademarks/patents",
    "qboCode": "LTAOTHINTANG",
    "type": "Long-term Assets",
    "detailType": "Other intangible assets"
  },
  "2021": {
    "description": "Accumulated amortization of trademarks/patents",
    "qboCode": "LTAMORT",
    "type": "Long-term Assets",
    "detailType": "Accumulated amortization of other assets"
  },
  "2022": {
    "description": "Customer lists",
    "qboCode": "LTAOTHINTANG",
    "type": "Long-term Assets",
    "detailType": "Other intangible assets"
  },
  "2023": {
    "description": "Accumulated amortization of customer lists",
    "qboCode": "LTAMORT",
    "type": "Long-term Assets",
    "detailType": "Accumulated amortization of other assets"
  },
  "2024": {
    "description": "Rights",
    "qboCode": "LTAOTHINTANG",
    "type": "Long-term Assets",
    "detailType": "Other intangible assets"
  },
  "2025": {
    "description": "Accumulated amortization of rights",
    "qboCode": "LTAMORT",
    "type": "Long-term Assets",
    "detailType": "Accumulated amortization of other assets"
  },
  "2026": {
    "description": "Research and development",
    "qboCode": "LTAOTHINTANG",
    "type": "Long-term Assets",
    "detailType": "Other intangible assets"
  },
  "2027": {
    "description": "Accumulated amortization of research and",
    "qboCode": "LTAMORT",
    "type": "Long-term Assets",
    "detailType": "Accumulated amortization of other assets"
  },
  "2070": {
    "description": "Resource rights",
    "qboCode": "LTAOTHINTANG",
    "type": "Long-term Assets",
    "detailType": "Other intangible assets"
  },
  "2071": {
    "description": "Accumulated amortization of resource rights",
    "qboCode": "LTAMORT",
    "type": "Long-term Assets",
    "detailType": "Accumulated amortization of other assets"
  },
  "2072": {
    "description": "Timber rights",
    "qboCode": "LTAOTHINTANG",
    "type": "Long-term Assets",
    "detailType": "Other intangible assets"
  },
  "2073": {
    "description": "Accumulated amortization of timber rights",
    "qboCode": "LTAMORT",
    "type": "Long-term Assets",
    "detailType": "Accumulated amortization of other assets"
  },
  "2074": {
    "description": "Mining rights",
    "qboCode": "LTAOTHINTANG",
    "type": "Long-term Assets",
    "detailType": "Other intangible assets"
  },
  "2075": {
    "description": "Accumulated amortization of mining rights",
    "qboCode": "LTAMORT",
    "type": "Long-term Assets",
    "detailType": "Accumulated amortization of other assets"
  },
  "2076": {
    "description": "Oil and gas rights",
    "qboCode": "LTAOTHINTANG",
    "type": "Long-term Assets",
    "detailType": "Other intangible assets"
  },
  "2077": {
    "description": "Accumulated amortization of oil and gas rights",
    "qboCode": "LTAMORT",
    "type": "Long-term Assets",
    "detailType": "Accumulated amortization of other assets"
  },
  "2178": {
    "description": "Total intangible capital assets",
    "qboCode": "LTAOTHINTANG",
    "type": "Long-term Assets",
    "detailType": "Other intangible assets"
  },
  "2179": {
    "description": "Total accumulated amortization of intangible",
    "qboCode": "LTAMORT",
    "type": "Long-term Assets",
    "detailType": "Accumulated amortization of other assets"
  },
  "2180": {
    "description": "Due from shareholder(s)/director(s)",
    "qboCode": "CURSHARELOAN",
    "type": "Current assets",
    "detailType": "Loans to Shareholders"
  },
  "2181": {
    "description": "Due from individual shareholder(s)",
    "qboCode": "CURSHARELOAN",
    "type": "Current assets",
    "detailType": "Loans to Shareholders"
  },
  "2182": {
    "description": "Due from corporate shareholder(s)",
    "qboCode": "CURSHARELOAN",
    "type": "Current assets",
    "detailType": "Loans to Shareholders"
  },
  "2183": {
    "description": "Due from director(s)",
    "qboCode": "CUROFFICERLOAN",
    "type": "Current assets",
    "detailType": "Loans to officers"
  },
  "2190": {
    "description": "Due from members",
    "qboCode": "CUROTHERLOAN",
    "type": "Current assets",
    "detailType": "Loans to others"
  },
  "2200": {
    "description": "Investment in joint venture(s)/partnership(s)",
    "qboCode": "LTAINVEST",
    "type": "Long-term Assets",
    "detailType": "Investments"
  },
  "2210": {
    "description": "Due from member(s)/general partner(s)",
    "qboCode": "CURSHARELOAN",
    "type": "Current assets",
    "detailType": "Loans to Shareholders"
  },
  "2211": {
    "description": "Due from limited partners",
    "qboCode": "CURSHARELOAN",
    "type": "Current assets",
    "detailType": "Loans to Shareholders"
  },
  "2212": {
    "description": "Due from members that are partnerships",
    "qboCode": "CURSHARELOAN",
    "type": "Current assets",
    "detailType": "Loans to Shareholders"
  },
  "2213": {
    "description": "Due from general partners",
    "qboCode": "CURSHARELOAN",
    "type": "Current assets",
    "detailType": "Loans to Shareholders"
  },
  "2214": {
    "description": "Due from specified members who are not limited",
    "qboCode": "CUROTHERLOAN",
    "type": "Current assets",
    "detailType": "Loans to others"
  },
  "2220": {
    "description": "Due from joint venture(s)/partnership(s) (item for",
    "qboCode": "CUROTHERLOAN",
    "type": "Current assets",
    "detailType": "Loans to others"
  },
  "2240": {
    "description": "Due from/investment in related parties",
    "qboCode": "CUROTHERLOAN",
    "type": "Current assets",
    "detailType": "Loans to others"
  },
  "2241": {
    "description": "Due from/investment in Canadian related parties",
    "qboCode": "CUROTHERLOAN",
    "type": "Current assets",
    "detailType": "Loans to others"
  },
  "2242": {
    "description": "Shares in Canadian related corporations",
    "qboCode": "LTAINVEST",
    "type": "Long-term Assets",
    "detailType": "Investments"
  },
  "2243": {
    "description": "Loans/advances to Canadian related corporations",
    "qboCode": "CUROTHERLOAN",
    "type": "Current assets",
    "detailType": "Loans to others"
  },
  "2244": {
    "description": "Investment in Canadian related corporations at",
    "qboCode": "LTAINVEST",
    "type": "Long-term Assets",
    "detailType": "Investments"
  },
  "2245": {
    "description": "Investment in Canadian related corporations at",
    "qboCode": "LTAINVEST",
    "type": "Long-term Assets",
    "detailType": "Investments"
  },
  "2246": {
    "description": "Due from/investment in foreign related parties",
    "qboCode": "CUROTHERLOAN",
    "type": "Current assets",
    "detailType": "Loans to others"
  },
  "2247": {
    "description": "Shares in foreign related corporations",
    "qboCode": "LTAINVEST",
    "type": "Long-term Assets",
    "detailType": "Investments"
  },
  "2248": {
    "description": "Loans/advances to foreign related corporations",
    "qboCode": "LTAINVEST",
    "type": "Long-term Assets",
    "detailType": "Investments"
  },
  "2249": {
    "description": "Investment in foreign related corporations at cost",
    "qboCode": "LTAINVEST",
    "type": "Long-term Assets",
    "detailType": "Investments"
  },
  "2250": {
    "description": "Investment in foreign related corporations at",
    "qboCode": "LTAINVEST",
    "type": "Long-term Assets",
    "detailType": "Investments"
  },
  "2280": {
    "description": "Investment in co-tenancy",
    "qboCode": "LTAINVEST",
    "type": "Long-term Assets",
    "detailType": "Investments"
  },
  "2300": {
    "description": "Long-term investments",
    "qboCode": "LTAINVEST",
    "type": "Long-term Assets",
    "detailType": "Investments"
  },
  "2301": {
    "description": "Foreign shares",
    "qboCode": "LTAINVEST",
    "type": "Long-term Assets",
    "detailType": "Investments"
  },
  "2302": {
    "description": "Other types of foreign investments",
    "qboCode": "LTAINVEST",
    "type": "Long-term Assets",
    "detailType": "Investments"
  },
  "2303": {
    "description": "Canadian shares",
    "qboCode": "LTAINVEST",
    "type": "Long-term Assets",
    "detailType": "Investments"
  },
  "2304": {
    "description": "Government of Canada debt",
    "qboCode": "LTAINVEST",
    "type": "Long-term Assets",
    "detailType": "Investments"
  },
  "2305": {
    "description": "Canadian, provincial, and municipal government",
    "qboCode": "LTAINVEST",
    "type": "Long-term Assets",
    "detailType": "Investments"
  },
  "2306": {
    "description": "Canadian corporate bonds and debentures",
    "qboCode": "LTAINVEST",
    "type": "Long-term Assets",
    "detailType": "Investments"
  },
  "2307": {
    "description": "Debt securities",
    "qboCode": "LTAINVEST",
    "type": "Long-term Assets",
    "detailType": "Investments"
  },
  "2308": {
    "description": "Equity securities",
    "qboCode": "LTAINVEST",
    "type": "Long-term Assets",
    "detailType": "Investments"
  },
  "2309": {
    "description": "Securities purchased under resale agreements",
    "qboCode": "LTAINVEST",
    "type": "Long-term Assets",
    "detailType": "Investments"
  },
  "2310": {
    "description": "Central credit union shares",
    "qboCode": "LTAINVEST",
    "type": "Long-term Assets",
    "detailType": "Investments"
  },
  "2311": {
    "description": "Other Canadian long-term investments",
    "qboCode": "LTAINVEST",
    "type": "Long-term Assets",
    "detailType": "Investments"
  },
  "2360": {
    "description": "Long-term loans",
    "qboCode": "LTA",
    "type": "Long-term Assets",
    "detailType": "Other long-term assets"
  },
  "2361": {
    "description": "Mortgages",
    "qboCode": "LTA",
    "type": "Long-term Assets",
    "detailType": "Other long-term assets"
  },
  "2362": {
    "description": "Personal and credit card loans",
    "qboCode": "LTA",
    "type": "Long-term Assets",
    "detailType": "Other long-term assets"
  },
  "2363": {
    "description": "Business and government loans",
    "qboCode": "LTA",
    "type": "Long-term Assets",
    "detailType": "Other long-term assets"
  },
  "2364": {
    "description": "Line of credit",
    "qboCode": "LTA",
    "type": "Long-term Assets",
    "detailType": "Other long-term assets"
  },
  "2420": {
    "description": "Other long-term assets",
    "qboCode": "LTA",
    "type": "Long-term Assets",
    "detailType": "Other long-term assets"
  },
  "2421": {
    "description": "Future (deferred) income taxes",
    "qboCode": "LTADEFTAX",
    "type": "Long-term Assets",
    "detailType": "Deferred tax"
  },
  "2422": {
    "description": "Deferred pension charges",
    "qboCode": "LTA",
    "type": "Long-term Assets",
    "detailType": "Other long-term assets"
  },
  "2423": {
    "description": "Deferred unrealized exchange losses",
    "qboCode": "LTA",
    "type": "Long-term Assets",
    "detailType": "Other long-term assets"
  },
  "2424": {
    "description": "Other deferred items/charges",
    "qboCode": "LTA",
    "type": "Long-term Assets",
    "detailType": "Other long-term assets"
  },
  "2425": {
    "description": "Accumulated amortization of deferred charges",
    "qboCode": "LTAMORT",
    "type": "Long-term Assets",
    "detailType": "Accumulated amortization of other assets"
  },
  "2426": {
    "description": "Reserve fund",
    "qboCode": "LTA",
    "type": "Long-term Assets",
    "detailType": "Other long-term assets"
  },
  "2427": {
    "description": "Cash surrender value of life insurance",
    "qboCode": "LTA",
    "type": "Long-term Assets",
    "detailType": "Other long-term assets"
  },
  "2589": {
    "description": "Total long-term assets",
    "qboCode": "LTA",
    "type": "Long-term Assets",
    "detailType": "Other long-term assets"
  },
  "2590": {
    "description": "Assets held in trust",
    "qboCode": "LTA",
    "type": "Long-term Assets",
    "detailType": "Other long-term assets"
  },
  "2599": {
    "description": "Total assets",
    "qboCode": "LTA",
    "type": "Long-term Assets",
    "detailType": "Other long-term assets"
  },
  "2600": {
    "description": "Bank overdraft",
    "qboCode": "LIABLINECREDIT",
    "type": "Other Current Liabilities",
    "detailType": "Line of credit"
  },
  "2620": {
    "description": "Amounts payable and accrued liabilities",
    "qboCode": "CURLIAB",
    "type": "Other Current Liabilities",
    "detailType": "Current liabilities"
  },
  "2621": {
    "description": "Trade payables",
    "qboCode": "CURLIAB",
    "type": "Other Current Liabilities",
    "detailType": "Current liabilities"
  },
  "2622": {
    "description": "Trade payables to related parties",
    "qboCode": "CURLIAB",
    "type": "Other Current Liabilities",
    "detailType": "Current liabilities"
  },
  "2623": {
    "description": "Holdbacks payable",
    "qboCode": "CURLIAB",
    "type": "Other Current Liabilities",
    "detailType": "Current liabilities"
  },
  "2624": {
    "description": "Wages payable",
    "qboCode": "LIABPAYROLL",
    "type": "Other Current Liabilities",
    "detailType": "Payroll liabilities"
  },
  "2625": {
    "description": "Management fees payable",
    "qboCode": "LIABPAYROLL",
    "type": "Other Current Liabilities",
    "detailType": "Payroll liabilities"
  },
  "2626": {
    "description": "Bonuses payable",
    "qboCode": "LIABPAYROLL",
    "type": "Other Current Liabilities",
    "detailType": "Payroll liabilities"
  },
  "2627": {
    "description": "Employee deductions payable",
    "qboCode": "LIABPAYROLL",
    "type": "Other Current Liabilities",
    "detailType": "Payroll liabilities"
  },
  "2628": {
    "description": "Withholding taxes payable",
    "qboCode": "LIABPAYROLL",
    "type": "Other Current Liabilities",
    "detailType": "Payroll liabilities"
  },
  "2629": {
    "description": "Interest payable",
    "qboCode": "LIABINTEREST",
    "type": "Other Current Liabilities",
    "detailType": "Interest payables"
  },
  "2630": {
    "description": "Amounts payable to members of NPOs",
    "qboCode": "CURLIAB",
    "type": "Other Current Liabilities",
    "detailType": "Current liabilities"
  },
  "2680": {
    "description": "Taxes payable",
    "qboCode": "LIABTAX",
    "type": "Other Current Liabilities",
    "detailType": "Current tax liability"
  },
  "2700": {
    "description": "Short-term debt",
    "qboCode": "LIABLOAN",
    "type": "Other Current Liabilities",
    "detailType": "Loan Payable"
  },
  "2701": {
    "description": "Loans from Canadian banks",
    "qboCode": "LIABLOAN",
    "type": "Other Current Liabilities",
    "detailType": "Loan Payable"
  },
  "2702": {
    "description": "Liability for securities sold short",
    "qboCode": "CURLIAB",
    "type": "Other Current Liabilities",
    "detailType": "Current liabilities"
  },
  "2703": {
    "description": "Liability for securities sold under repurchase",
    "qboCode": "CURLIAB",
    "type": "Other Current Liabilities",
    "detailType": "Current liabilities"
  },
  "2704": {
    "description": "Gold and silver certificates",
    "qboCode": "CURLIAB",
    "type": "Other Current Liabilities",
    "detailType": "Current liabilities"
  },
  "2705": {
    "description": "Cheques and other items in transit",
    "qboCode": "CURLIAB",
    "type": "Other Current Liabilities",
    "detailType": "Current liabilities"
  },
  "2706": {
    "description": "Lien notes",
    "qboCode": "CURLIAB",
    "type": "Other Current Liabilities",
    "detailType": "Current liabilities"
  },
  "2707": {
    "description": "Credit card loans",
    "qboCode": "CC",
    "type": "Credit Card",
    "detailType": "Credit Card"
  },
  "2770": {
    "description": "Deferred income",
    "qboCode": "CURLIAB",
    "type": "Other Current Liabilities",
    "detailType": "Current liabilities"
  },
  "2780": {
    "description": "Due to shareholder(s)/director(s)",
    "qboCode": "LIABSHTERMRELATED",
    "type": "Other Current Liabilities",
    "detailType": "Short term borrowings from related parties"
  },
  "2781": {
    "description": "Due to individual shareholder(s)",
    "qboCode": "LIABSHTERMRELATED",
    "type": "Other Current Liabilities",
    "detailType": "Short term borrowings from related parties"
  },
  "2782": {
    "description": "Due to corporate shareholder(s)",
    "qboCode": "LIABSHTERMRELATED",
    "type": "Other Current Liabilities",
    "detailType": "Short term borrowings from related parties"
  },
  "2783": {
    "description": "Due to director(s)",
    "qboCode": "LIABSHTERMRELATED",
    "type": "Other Current Liabilities",
    "detailType": "Short term borrowings from related parties"
  },
  "2790": {
    "description": "Due to member(s)/general partner(s)",
    "qboCode": "LIABSHTERMRELATED",
    "type": "Other Current Liabilities",
    "detailType": "Short term borrowings from related parties"
  },
  "2791": {
    "description": "Due to limited partners",
    "qboCode": "LIABSHTERMRELATED",
    "type": "Other Current Liabilities",
    "detailType": "Short term borrowings from related parties"
  },
  "2792": {
    "description": "Due to members that are partnerships",
    "qboCode": "LIABSHTERMRELATED",
    "type": "Other Current Liabilities",
    "detailType": "Short term borrowings from related parties"
  },
  "2793": {
    "description": "Due to general partners",
    "qboCode": "LIABSHTERMRELATED",
    "type": "Other Current Liabilities",
    "detailType": "Short term borrowings from related parties"
  },
  "2794": {
    "description": "Due to specified members who are not limited",
    "qboCode": "LIABSHTERMRELATED",
    "type": "Other Current Liabilities",
    "detailType": "Short term borrowings from related parties"
  },
  "2840": {
    "description": "Due to joint venture(s)/partnership(s) (item for",
    "qboCode": "LIABSHTERMRELATED",
    "type": "Other Current Liabilities",
    "detailType": "Short term borrowings from related parties"
  },
  "2860": {
    "description": "Due to related parties",
    "qboCode": "LIABSHTERMRELATED",
    "type": "Other Current Liabilities",
    "detailType": "Short term borrowings from related parties"
  },
  "2861": {
    "description": "Demand notes due to related parties",
    "qboCode": "LIABSHTERMRELATED",
    "type": "Other Current Liabilities",
    "detailType": "Short term borrowings from related parties"
  },
  "2862": {
    "description": "Interest payable to related parties",
    "qboCode": "LIABSHTERMRELATED",
    "type": "Other Current Liabilities",
    "detailType": "Short term borrowings from related parties"
  },
  "2863": {
    "description": "Advances due to related parties",
    "qboCode": "LIABSHTERMRELATED",
    "type": "Other Current Liabilities",
    "detailType": "Short term borrowings from related parties"
  },
  "2920": {
    "description": "Current portion of long-term liability",
    "qboCode": "LIABLOAN",
    "type": "Other Current Liabilities",
    "detailType": "Loan Payable"
  },
  "2940": {
    "description": "Bankers\u2019 acceptances",
    "qboCode": "LIABLOAN",
    "type": "Other Current Liabilities",
    "detailType": "Loan Payable"
  },
  "2960": {
    "description": "Other current liabilities",
    "qboCode": "CURLIAB",
    "type": "Other Current Liabilities",
    "detailType": "Current liabilities"
  },
  "2961": {
    "description": "Deposits received",
    "qboCode": "CURLIAB",
    "type": "Other Current Liabilities",
    "detailType": "Current liabilities"
  },
  "2962": {
    "description": "Dividends payable",
    "qboCode": "CURLIAB",
    "type": "Other Current Liabilities",
    "detailType": "Current liabilities"
  },
  "2963": {
    "description": "Future (deferred) income taxes",
    "qboCode": "LIABTAX",
    "type": "Other Current Liabilities",
    "detailType": "Current tax liability"
  },
  "2964": {
    "description": "Reserves for guarantees, warranties, or indemnities",
    "qboCode": "LIABWARRANTY",
    "type": "Other Current Liabilities",
    "detailType": "Provision for warranty obligations"
  },
  "2965": {
    "description": "General provisions/reserves",
    "qboCode": "CURLIAB",
    "type": "Other Current Liabilities",
    "detailType": "Current liabilities"
  },
  "2966": {
    "description": "Crew shares",
    "qboCode": "CURLIAB",
    "type": "Other Current Liabilities",
    "detailType": "Current liabilities"
  },
  "3139": {
    "description": "Total current liabilities",
    "qboCode": "CURLIAB",
    "type": "Other Current Liabilities",
    "detailType": "Current liabilities"
  },
  "3140": {
    "description": "Long-term debt",
    "qboCode": "LTLIAB",
    "type": "Long-term liabilities",
    "detailType": "Other long term liabilities"
  },
  "3141": {
    "description": "Mortgages",
    "qboCode": "LTLOAN",
    "type": "Long-term liabilities",
    "detailType": "Bank loans"
  },
  "3142": {
    "description": "Farm Credit Corporation loan",
    "qboCode": "LTLOAN",
    "type": "Long-term liabilities",
    "detailType": "Bank loans"
  },
  "3143": {
    "description": "Chartered bank loan",
    "qboCode": "LTLOAN",
    "type": "Long-term liabilities",
    "detailType": "Bank loans"
  },
  "3144": {
    "description": "Credit Union/Caisse Populaire loan",
    "qboCode": "LTLOAN",
    "type": "Long-term liabilities",
    "detailType": "Bank loans"
  },
  "3145": {
    "description": "Provincial or territorial government loan",
    "qboCode": "LTLOAN",
    "type": "Long-term liabilities",
    "detailType": "Bank loans"
  },
  "3146": {
    "description": "Supply company loan",
    "qboCode": "LTLOAN",
    "type": "Long-term liabilities",
    "detailType": "Bank loans"
  },
  "3147": {
    "description": "Private loan",
    "qboCode": "LTLOAN",
    "type": "Long-term liabilities",
    "detailType": "Bank loans"
  },
  "3148": {
    "description": "Central, league, and federation loans",
    "qboCode": "LTLOAN",
    "type": "Long-term liabilities",
    "detailType": "Bank loans"
  },
  "3149": {
    "description": "Line of credit",
    "qboCode": "LTLOAN",
    "type": "Long-term liabilities",
    "detailType": "Bank loans"
  },
  "3150": {
    "description": "Liability for securities sold short",
    "qboCode": "LTLIAB",
    "type": "Long-term liabilities",
    "detailType": "Other long term liabilities"
  },
  "3151": {
    "description": "Liability for securities sold under repurchase",
    "qboCode": "LTLIAB",
    "type": "Long-term liabilities",
    "detailType": "Other long term liabilities"
  },
  "3152": {
    "description": "Lien notes",
    "qboCode": "LTLNOTE",
    "type": "Long-term liabilities",
    "detailType": "Notes payable"
  },
  "3200": {
    "description": "Deposit liabilities of financial institutions",
    "qboCode": "LTLIAB",
    "type": "Long-term liabilities",
    "detailType": "Other long term liabilities"
  },
  "3210": {
    "description": "Bonds and debentures",
    "qboCode": "LTLNOTE",
    "type": "Long-term liabilities",
    "detailType": "Notes payable"
  },
  "3220": {
    "description": "Deferred income",
    "qboCode": "LTLDEFERINC",
    "type": "Long-term liabilities",
    "detailType": "Accruals and deferred income"
  },
  "3240": {
    "description": "Future (deferred) income taxes",
    "qboCode": "LTLIAB",
    "type": "Long-term liabilities",
    "detailType": "Other long term liabilities"
  },
  "3260": {
    "description": "Due to shareholder(s)/director(s)",
    "qboCode": "LTLSHNOTE",
    "type": "Long-term liabilities",
    "detailType": "Shareholder notes payable"
  },
  "3261": {
    "description": "Due to individual shareholder(s)",
    "qboCode": "LTLSHNOTE",
    "type": "Long-term liabilities",
    "detailType": "Shareholder notes payable"
  },
  "3262": {
    "description": "Due to corporate shareholder(s)",
    "qboCode": "LTLSHNOTE",
    "type": "Long-term liabilities",
    "detailType": "Shareholder notes payable"
  },
  "3263": {
    "description": "Due to director(s)",
    "qboCode": "LTLSHNOTE",
    "type": "Long-term liabilities",
    "detailType": "Shareholder notes payable"
  },
  "3270": {
    "description": "Due to members",
    "qboCode": "LTLSHNOTE",
    "type": "Long-term liabilities",
    "detailType": "Shareholder notes payable"
  },
  "3280": {
    "description": "Due to joint venture(s)/partnership(s) (item for",
    "qboCode": "LTLSHNOTE",
    "type": "Long-term liabilities",
    "detailType": "Shareholder notes payable"
  },
  "3291": {
    "description": "Due to member(s)/general partner(s)",
    "qboCode": "LTLSHNOTE",
    "type": "Long-term liabilities",
    "detailType": "Shareholder notes payable"
  },
  "3292": {
    "description": "Due to limited partners",
    "qboCode": "LTLSHNOTE",
    "type": "Long-term liabilities",
    "detailType": "Shareholder notes payable"
  },
  "3293": {
    "description": "Due to members that are partnerships",
    "qboCode": "LTLSHNOTE",
    "type": "Long-term liabilities",
    "detailType": "Shareholder notes payable"
  },
  "3294": {
    "description": "Due to general partners",
    "qboCode": "LTLSHNOTE",
    "type": "Long-term liabilities",
    "detailType": "Shareholder notes payable"
  },
  "3295": {
    "description": "Due to specified members who are not limited",
    "qboCode": "LTLSHNOTE",
    "type": "Long-term liabilities",
    "detailType": "Shareholder notes payable"
  },
  "3300": {
    "description": "Due to related parties",
    "qboCode": "LTLSHNOTE",
    "type": "Long-term liabilities",
    "detailType": "Shareholder notes payable"
  },
  "3301": {
    "description": "Amounts owing to related Canadian parties",
    "qboCode": "LTLSHNOTE",
    "type": "Long-term liabilities",
    "detailType": "Shareholder notes payable"
  },
  "3302": {
    "description": "Amounts owing to related foreign parties",
    "qboCode": "LTLSHNOTE",
    "type": "Long-term liabilities",
    "detailType": "Shareholder notes payable"
  },
  "3320": {
    "description": "Other long-term liabilities",
    "qboCode": "LTLIAB",
    "type": "Long-term liabilities",
    "detailType": "Other long term liabilities"
  },
  "3321": {
    "description": "Long-term obligations/commitments/capital",
    "qboCode": "LTLIAB",
    "type": "Long-term liabilities",
    "detailType": "Other long term liabilities"
  },
  "3322": {
    "description": "Reserves for guarantees, warranties, or indemnities",
    "qboCode": "LTLIAB",
    "type": "Long-term liabilities",
    "detailType": "Other long term liabilities"
  },
  "3323": {
    "description": "Provision for site restoration",
    "qboCode": "LTLIAB",
    "type": "Long-term liabilities",
    "detailType": "Other long term liabilities"
  },
  "3324": {
    "description": "Contributions to qualifying environmental trust",
    "qboCode": "LTLIAB",
    "type": "Long-term liabilities",
    "detailType": "Other long term liabilities"
  },
  "3325": {
    "description": "General provisions/reserves",
    "qboCode": "LTLIAB",
    "type": "Long-term liabilities",
    "detailType": "Other long term liabilities"
  },
  "3326": {
    "description": "Preference shares restated",
    "qboCode": "LTLIAB",
    "type": "Long-term liabilities",
    "detailType": "Other long term liabilities"
  },
  "3327": {
    "description": "Member allocations (item for use by corporations)",
    "qboCode": "LTLIAB",
    "type": "Long-term liabilities",
    "detailType": "Other long term liabilities"
  },
  "3328": {
    "description": "Deferred revenue from incomplete contracts",
    "qboCode": "LTLDEFERINC",
    "type": "Long-term liabilities",
    "detailType": "Accruals and deferred income"
  },
  "3450": {
    "description": "Total long-term liabilities",
    "qboCode": "LTLIAB",
    "type": "Long-term liabilities",
    "detailType": "Other long term liabilities"
  },
  "3460": {
    "description": "Subordinated debt",
    "qboCode": "LTLIAB",
    "type": "Long-term liabilities",
    "detailType": "Other long term liabilities"
  },
  "3470": {
    "description": "Amounts held in trust",
    "qboCode": "LTLIAB",
    "type": "Long-term liabilities",
    "detailType": "Other long term liabilities"
  },
  "3499": {
    "description": "Total liabilities",
    "qboCode": "LTLIAB",
    "type": "Long-term liabilities",
    "detailType": "Other long term liabilities"
  },
  "3500": {
    "description": "Common shares",
    "qboCode": "EQSTOCK",
    "type": "Equity",
    "detailType": "Common stock"
  },
  "3520": {
    "description": "Preferred shares",
    "qboCode": "EQPREFSTOCK",
    "type": "Equity",
    "detailType": "Preferred Stock"
  },
  "3540": {
    "description": "Contributed and other surplus",
    "qboCode": "EQSURPLUS",
    "type": "Equity",
    "detailType": "Paid-in capital or surplus"
  },
  "3541": {
    "description": "Contributed surplus",
    "qboCode": "EQSURPLUS",
    "type": "Equity",
    "detailType": "Paid-in capital or surplus"
  },
  "3542": {
    "description": "Appraisal surplus",
    "qboCode": "EQSURPLUS",
    "type": "Equity",
    "detailType": "Paid-in capital or surplus"
  },
  "3543": {
    "description": "General reserve",
    "qboCode": "EQOE",
    "type": "Equity",
    "detailType": "Owner's equity"
  },
  "3570": {
    "description": "Head office account",
    "qboCode": "EQOE",
    "type": "Equity",
    "detailType": "Owner's equity"
  },
  "3580": {
    "description": "Accumulated other comprehensive income",
    "qboCode": "EQOE",
    "type": "Equity",
    "detailType": "Owner's equity"
  },
  "3590": {
    "description": "General partners\u2019 capital (cost of partnership",
    "qboCode": "EQCONTRIBUTIONS",
    "type": "Equity",
    "detailType": "Partner Contributions"
  },
  "3591": {
    "description": "Limited partners\u2019 capital (cost of partnership interest)",
    "qboCode": "EQCONTRIBUTIONS",
    "type": "Equity",
    "detailType": "Partner Contributions"
  },
  "3592": {
    "description": "Contributions during the year (item for use by",
    "qboCode": "EQCONTRIBUTIONS",
    "type": "Equity",
    "detailType": "Partner Contributions"
  },
  "3600": {
    "description": "RETAINED EARNINGS - CW/deficit",
    "qboCode": "EQOE",
    "type": "Equity",
    "detailType": "Owner's equity"
  },
  "3620": {
    "description": "Total shareholder equity",
    "qboCode": "EQOE",
    "type": "Equity",
    "detailType": "Owner's equity"
  },
  "3630": {
    "description": "Total partners\u2019 capital (item for use by",
    "qboCode": "EQOE",
    "type": "Equity",
    "detailType": "Owner's equity"
  },
  "3640": {
    "description": "Total liabilities and shareholder equity",
    "qboCode": "EQOE",
    "type": "Equity",
    "detailType": "Owner's equity"
  },
  "3650": {
    "description": "Total liabilities and partners\u2019 capital (item for use",
    "qboCode": "EQOE",
    "type": "Equity",
    "detailType": "Owner's equity"
  },
  "3660": {
    "description": "RETAINED EARNINGS - CW/deficit - Start",
    "qboCode": "EQOE",
    "type": "Equity",
    "detailType": "Owner's equity"
  },
  "3680": {
    "description": "Net income/loss",
    "qboCode": "EQOE",
    "type": "Equity",
    "detailType": "Owner's equity"
  },
  "3690": {
    "description": "Capital contributed (item for use by partnerships)",
    "qboCode": "EQCONTRIBUTIONS",
    "type": "Equity",
    "detailType": "Partner Contributions"
  },
  "3700": {
    "description": "Dividends declared",
    "qboCode": "EQOE",
    "type": "Equity",
    "detailType": "Owner's equity"
  },
  "3701": {
    "description": "Cash dividends",
    "qboCode": "EQOE",
    "type": "Equity",
    "detailType": "Owner's equity"
  },
  "3702": {
    "description": "Patronage dividends",
    "qboCode": "EQOE",
    "type": "Equity",
    "detailType": "Owner's equity"
  },
  "3720": {
    "description": "Prior period adjustments",
    "qboCode": "EQOE",
    "type": "Equity",
    "detailType": "Owner's equity"
  },
  "3740": {
    "description": "Other items affecting RETAINED EARNINGS - CW",
    "qboCode": "EQOE",
    "type": "Equity",
    "detailType": "Owner's equity"
  },
  "3741": {
    "description": "Share redemptions",
    "qboCode": "EQOE",
    "type": "Equity",
    "detailType": "Owner's equity"
  },
  "3742": {
    "description": "Special reserves",
    "qboCode": "EQOE",
    "type": "Equity",
    "detailType": "Owner's equity"
  },
  "3743": {
    "description": "Currency adjustments",
    "qboCode": "EQOE",
    "type": "Equity",
    "detailType": "Owner's equity"
  },
  "3744": {
    "description": "Unusual revenue items",
    "qboCode": "EQOE",
    "type": "Equity",
    "detailType": "Owner's equity"
  },
  "3745": {
    "description": "Interfund transfer",
    "qboCode": "EQOE",
    "type": "Equity",
    "detailType": "Owner's equity"
  },
  "3750": {
    "description": "Drawings (item for use by partnerships)",
    "qboCode": "EQOE",
    "type": "Equity",
    "detailType": "Owner's equity"
  },
  "3849": {
    "description": "RETAINED EARNINGS - CW/deficit - End",
    "qboCode": "EQOE",
    "type": "Equity",
    "detailType": "Owner's equity"
  },
  "7000": {
    "description": "Revaluation surplus",
    "qboCode": "EQOE",
    "type": "Equity",
    "detailType": "Owner's equity"
  },
  "7002": {
    "description": "Defined benefit gains/losses",
    "qboCode": "EQOE",
    "type": "Equity",
    "detailType": "Owner's equity"
  },
  "7004": {
    "description": "Foreign operation translation gains/losses",
    "qboCode": "EQOE",
    "type": "Equity",
    "detailType": "Owner's equity"
  },
  "7006": {
    "description": "Equity instruments gains/losses",
    "qboCode": "EQOE",
    "type": "Equity",
    "detailType": "Owner's equity"
  },
  "7008": {
    "description": "Cash flow hedge effective portion gains/losses",
    "qboCode": "EQOE",
    "type": "Equity",
    "detailType": "Owner's equity"
  },
  "7010": {
    "description": "Income tax relating to components of other",
    "qboCode": "EQOE",
    "type": "Equity",
    "detailType": "Owner's equity"
  },
  "7020": {
    "description": "Miscellaneous other comprehensive income",
    "qboCode": "EQOE",
    "type": "Equity",
    "detailType": "Owner's equity"
  },
  "8000": {
    "description": "Trade sales of goods and services",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8020": {
    "description": "Sales of goods and services to related parties",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8030": {
    "description": "Interdivisional sales",
    "qboCode": "OI",
    "type": "Other income",
    "detailType": "Income"
  },
  "8040": {
    "description": "Sales from resource properties",
    "qboCode": "OI",
    "type": "Other income",
    "detailType": "Income"
  },
  "8041": {
    "description": "Petroleum and natural gas sales",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8042": {
    "description": "Petroleum and natural gas sales to related  parties",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8043": {
    "description": "Gas marketing",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8044": {
    "description": "Processing revenue",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8045": {
    "description": "Pipeline revenue",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8046": {
    "description": "Seismic sales",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8047": {
    "description": "Mining revenue",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8048": {
    "description": "Coal revenue",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8049": {
    "description": "Oil sands revenue",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8050": {
    "description": "Royalty income",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8051": {
    "description": "Oil and gas partnership/joint venture income/loss",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8052": {
    "description": "Mining partnership/joint venture income/loss",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8053": {
    "description": "Other production revenue",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8089": {
    "description": "Total sales of goods and services",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8090": {
    "description": "Investment revenue",
    "qboCode": "OIINVEST",
    "type": "Other income",
    "detailType": "Other investment income"
  },
  "8091": {
    "description": "Interest from foreign sources",
    "qboCode": "OIINTEREST",
    "type": "Other income",
    "detailType": "Interest earned"
  },
  "8092": {
    "description": "Interest from Canadian bonds and debentures",
    "qboCode": "OIINTEREST",
    "type": "Other income",
    "detailType": "Interest earned"
  },
  "8093": {
    "description": "Interest from Canadian mortgage loans",
    "qboCode": "OIINTEREST",
    "type": "Other income",
    "detailType": "Interest earned"
  },
  "8094": {
    "description": "Interest from other Canadian sources",
    "qboCode": "OIINTEREST",
    "type": "Other income",
    "detailType": "Interest earned"
  },
  "8095": {
    "description": "Dividend income",
    "qboCode": "OIDIVIDEND",
    "type": "Other income",
    "detailType": "Dividend income"
  },
  "8096": {
    "description": "Dividends from Canadian sources",
    "qboCode": "OIDIVIDEND",
    "type": "Other income",
    "detailType": "Dividend income"
  },
  "8097": {
    "description": "Dividends from foreign sources",
    "qboCode": "OIDIVIDEND",
    "type": "Other income",
    "detailType": "Dividend income"
  },
  "8100": {
    "description": "Interest income (financial institutions)",
    "qboCode": "OIINTEREST",
    "type": "Other income",
    "detailType": "Interest earned"
  },
  "8101": {
    "description": "Loan interest",
    "qboCode": "OIINTEREST",
    "type": "Other income",
    "detailType": "Interest earned"
  },
  "8102": {
    "description": "Securities interest",
    "qboCode": "OIINTEREST",
    "type": "Other income",
    "detailType": "Interest earned"
  },
  "8103": {
    "description": "Deposits with banks interest",
    "qboCode": "OIINTEREST",
    "type": "Other income",
    "detailType": "Interest earned"
  },
  "8120": {
    "description": "Commission revenue",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8121": {
    "description": "Commission income on real estate transactions",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8140": {
    "description": "Rental revenue",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8141": {
    "description": "Real estate rental revenue",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8142": {
    "description": "Film rental revenue",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8150": {
    "description": "Vehicle leasing",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8160": {
    "description": "Fishing revenue",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8161": {
    "description": "Fish products",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8162": {
    "description": "Other marine products",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8163": {
    "description": "Fishing grants, credits, and rebates",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8164": {
    "description": "Fishing subsidies",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8165": {
    "description": "Compensation for loss of fishing income or",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8166": {
    "description": "Sharesman income",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8210": {
    "description": "Realized gains/losses on disposal of assets",
    "qboCode": "OIGAINLOSSFA",
    "type": "Other income",
    "detailType": "Gain/loss on sale of fixed assets"
  },
  "8211": {
    "description": "Realized gains/losses on sale of investments",
    "qboCode": "OIGAINLOSSINVEST",
    "type": "Other income",
    "detailType": "Gain/loss on sale of investments"
  },
  "8212": {
    "description": "Realized gains/losses on sale of resource",
    "qboCode": "OIGAINLOSSINVEST",
    "type": "Other income",
    "detailType": "Gain/loss on sale of investments"
  },
  "8220": {
    "description": "NPO amounts received",
    "qboCode": "INCNONPROFIT",
    "type": "Income",
    "detailType": "Non-profit income"
  },
  "8221": {
    "description": "Membership fees",
    "qboCode": "INCSERVICE",
    "type": "Income",
    "detailType": "Service/Fee Income"
  },
  "8222": {
    "description": "Assessments",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8223": {
    "description": "Gifts",
    "qboCode": "OI",
    "type": "Other income",
    "detailType": "Income"
  },
  "8224": {
    "description": "Gross sales and revenues from organizational",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8230": {
    "description": "Other revenue",
    "qboCode": "OI",
    "type": "Other income",
    "detailType": "Income"
  },
  "8231": {
    "description": "Foreign exchange gains/losses",
    "qboCode": "OI",
    "type": "Other income",
    "detailType": "Income"
  },
  "8233": {
    "description": "Income/loss of other divisions",
    "qboCode": "OI",
    "type": "Other income",
    "detailType": "Income"
  },
  "8234": {
    "description": "Income/loss of joint ventures",
    "qboCode": "OI",
    "type": "Other income",
    "detailType": "Income"
  },
  "8235": {
    "description": "Income/loss of partnerships",
    "qboCode": "OI",
    "type": "Other income",
    "detailType": "Income"
  },
  "8236": {
    "description": "Realization of deferred revenues",
    "qboCode": "OI",
    "type": "Other income",
    "detailType": "Income"
  },
  "8237": {
    "description": "Royalty income other than resource",
    "qboCode": "OI",
    "type": "Other income",
    "detailType": "Income"
  },
  "8238": {
    "description": "Alberta royalty tax credits",
    "qboCode": "OI",
    "type": "Other income",
    "detailType": "Income"
  },
  "8239": {
    "description": "Management and administration fees",
    "qboCode": "OI",
    "type": "Other income",
    "detailType": "Income"
  },
  "8240": {
    "description": "Telecommunications revenue",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8241": {
    "description": "Consulting fees",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8242": {
    "description": "Subsidies and grants",
    "qboCode": "OI",
    "type": "Other income",
    "detailType": "Income"
  },
  "8243": {
    "description": "Sale of by-products",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8244": {
    "description": "Deposit services",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8245": {
    "description": "Credit services",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8246": {
    "description": "Card services",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8247": {
    "description": "Patronage dividends",
    "qboCode": "OIDIVIDEND",
    "type": "Other income",
    "detailType": "Dividend income"
  },
  "8248": {
    "description": "Insurance recoveries",
    "qboCode": "OI",
    "type": "Other income",
    "detailType": "Income"
  },
  "8249": {
    "description": "Expense recoveries",
    "qboCode": "OI",
    "type": "Other income",
    "detailType": "Income"
  },
  "8250": {
    "description": "Bad debt recoveries",
    "qboCode": "OI",
    "type": "Other income",
    "detailType": "Income"
  },
  "8299": {
    "description": "Total revenue",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "8300": {
    "description": "Opening inventory",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8301": {
    "description": "Opening inventory - Finished goods",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8302": {
    "description": "Opening inventory - Raw materials",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8303": {
    "description": "Opening inventory - Goods in process",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8320": {
    "description": "Purchases/cost of materials",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8340": {
    "description": "Direct wages",
    "qboCode": "COGSLAB",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of labour - COS"
  },
  "8350": {
    "description": "Benefits on direct wages",
    "qboCode": "COGSLAB",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of labour - COS"
  },
  "8360": {
    "description": "Trades and sub-contracts",
    "qboCode": "COGSLAB",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of labour - COS"
  },
  "8370": {
    "description": "Production costs other than resource",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8400": {
    "description": "Resource production costs",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8401": {
    "description": "Pipeline operations",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8402": {
    "description": "Drilling",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8403": {
    "description": "Site restoration costs",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8404": {
    "description": "Gross overriding royalty",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8405": {
    "description": "Freehold royalties",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8406": {
    "description": "Other producing properties rental",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8407": {
    "description": "Prospect/geological",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8408": {
    "description": "Well operating, fuel and equipment",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8409": {
    "description": "Well abandonment and dry holes",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8410": {
    "description": "Other lease rentals",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8411": {
    "description": "Exploration expenses",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8412": {
    "description": "Development expenses",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8435": {
    "description": "Crown charges",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8436": {
    "description": "Crown royalties",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8437": {
    "description": "Crown lease rentals",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8438": {
    "description": "Freehold mineral tax",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8439": {
    "description": "Mining taxes",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8440": {
    "description": "Oil sand leases",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8441": {
    "description": "Saskatchewan resource surcharge",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8450": {
    "description": "Other direct costs",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8451": {
    "description": "Equipment hire and operation",
    "qboCode": "COGSLAB",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of labour - COS"
  },
  "8452": {
    "description": "Log yard",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8453": {
    "description": "Forestry costs",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8454": {
    "description": "Logging road costs",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8455": {
    "description": "Stumpage costs",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8456": {
    "description": "Royalty costs",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8457": {
    "description": "Freight-in and duty",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8458": {
    "description": "Inventory write-down",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8459": {
    "description": "Direct cost amortization of tangible assets",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8460": {
    "description": "Direct cost amortization of natural resource assets",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8461": {
    "description": "Overhead expenses allocated to cost of sales",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8500": {
    "description": "Closing inventory",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8501": {
    "description": "Closing inventory - Finished goods",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8502": {
    "description": "Closing inventory - Raw materials",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8503": {
    "description": "Closing inventory - Goods in process",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8518": {
    "description": "Cost of sales",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8519": {
    "description": "Gross profit/loss",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "8520": {
    "description": "Advertising and promotion",
    "qboCode": "EXPADVERTISING",
    "type": "Expenses",
    "detailType": "Advertising/promotional"
  },
  "8521": {
    "description": "Advertising",
    "qboCode": "EXPADVERTISING",
    "type": "Expenses",
    "detailType": "Advertising/promotional"
  },
  "8522": {
    "description": "Donations",
    "qboCode": "EXPDONATION",
    "type": "Expenses",
    "detailType": "Charitable contributions"
  },
  "8523": {
    "description": "Meals and entertainment",
    "qboCode": "EXPMEAL",
    "type": "Expenses",
    "detailType": "Meals and entertainment"
  },
  "8524": {
    "description": "Promotion",
    "qboCode": "EXPADVERTISING",
    "type": "Expenses",
    "detailType": "Advertising/promotional"
  },
  "8570": {
    "description": "Amortization of intangible assets",
    "qboCode": "OEAMORT",
    "type": "Other Expense",
    "detailType": "Amortization"
  },
  "8571": {
    "description": "Goodwill impairment loss",
    "qboCode": "OE",
    "type": "Other Expense",
    "detailType": "Other miscellaneous expense"
  },
  "8590": {
    "description": "Bad debt expense",
    "qboCode": "EXPBADDEBT",
    "type": "Expenses",
    "detailType": "Bad debts"
  },
  "8610": {
    "description": "Loan losses",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "8611": {
    "description": "Provision for loan losses",
    "qboCode": "EXPBADDEBT",
    "type": "Expenses",
    "detailType": "Bad debts"
  },
  "8620": {
    "description": "Employee benefits",
    "qboCode": "EXPLAB",
    "type": "Expenses",
    "detailType": "Cost of labour"
  },
  "8621": {
    "description": "Group insurance benefits",
    "qboCode": "EXPLAB",
    "type": "Expenses",
    "detailType": "Cost of labour"
  },
  "8622": {
    "description": "Employer\u2019s portion of employee benefits",
    "qboCode": "EXPLAB",
    "type": "Expenses",
    "detailType": "Cost of labour"
  },
  "8623": {
    "description": "Contributions to deferred income plans",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "8650": {
    "description": "Amortization of natural resource assets",
    "qboCode": "OEAMORT",
    "type": "Other Expense",
    "detailType": "Amortization"
  },
  "8670": {
    "description": "Amortization of tangible assets",
    "qboCode": "OEAMORT",
    "type": "Other Expense",
    "detailType": "Amortization"
  },
  "8690": {
    "description": "Insurance",
    "qboCode": "EXPINS",
    "type": "Expenses",
    "detailType": "Insurance"
  },
  "8691": {
    "description": "Life insurance on executives",
    "qboCode": "EXPLAB",
    "type": "Expenses",
    "detailType": "Cost of labour"
  },
  "8710": {
    "description": "Interest and bank charges",
    "qboCode": "EXPBANKCHARGE",
    "type": "Expenses",
    "detailType": "Bank charges"
  },
  "8711": {
    "description": "Interest on short-term debt",
    "qboCode": "EXPINTEREST",
    "type": "Expenses",
    "detailType": "Interest paid"
  },
  "8712": {
    "description": "Interest on bonds and debentures",
    "qboCode": "EXPINTEREST",
    "type": "Expenses",
    "detailType": "Interest paid"
  },
  "8713": {
    "description": "Interest on mortgages",
    "qboCode": "EXPINTEREST",
    "type": "Expenses",
    "detailType": "Interest paid"
  },
  "8714": {
    "description": "Interest on long-term debt",
    "qboCode": "EXPINTEREST",
    "type": "Expenses",
    "detailType": "Interest paid"
  },
  "8715": {
    "description": "Bank charges",
    "qboCode": "EXPBANKCHARGE",
    "type": "Expenses",
    "detailType": "Bank charges"
  },
  "8716": {
    "description": "Credit card charges",
    "qboCode": "EXPBANKCHARGE",
    "type": "Expenses",
    "detailType": "Bank charges"
  },
  "8717": {
    "description": "Collection and credit costs",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "8740": {
    "description": "Interest paid (financial institutions)",
    "qboCode": "EXPINTEREST",
    "type": "Expenses",
    "detailType": "Interest paid"
  },
  "8741": {
    "description": "Interest paid on deposits",
    "qboCode": "EXPINTEREST",
    "type": "Expenses",
    "detailType": "Interest paid"
  },
  "8742": {
    "description": "Interest paid on bonds and debentures",
    "qboCode": "EXPINTEREST",
    "type": "Expenses",
    "detailType": "Interest paid"
  },
  "8760": {
    "description": "Business taxes, licences, and memberships",
    "qboCode": "EXPDUES",
    "type": "Expenses",
    "detailType": "Dues and subscriptions"
  },
  "8761": {
    "description": "Memberships",
    "qboCode": "EXPDUES",
    "type": "Expenses",
    "detailType": "Dues and subscriptions"
  },
  "8762": {
    "description": "Business taxes",
    "qboCode": "EXPTAXES",
    "type": "Expenses",
    "detailType": "Taxes paid"
  },
  "8763": {
    "description": "Franchise fees",
    "qboCode": "EXPDUES",
    "type": "Expenses",
    "detailType": "Dues and subscriptions"
  },
  "8764": {
    "description": "Government fees",
    "qboCode": "EXPDUES",
    "type": "Expenses",
    "detailType": "Dues and subscriptions"
  },
  "8790": {
    "description": "Nova Scotia tax on large corporations",
    "qboCode": "EXPTAXES",
    "type": "Expenses",
    "detailType": "Taxes paid"
  },
  "8810": {
    "description": "Office expenses",
    "qboCode": "EXPOFFICE",
    "type": "Expenses",
    "detailType": "Office/General Administrative Expenses"
  },
  "8811": {
    "description": "Office stationery and supplies",
    "qboCode": "EXPOFFICE",
    "type": "Expenses",
    "detailType": "Office/General Administrative Expenses"
  },
  "8812": {
    "description": "Office utilities",
    "qboCode": "EXPOFFICE",
    "type": "Expenses",
    "detailType": "Office/General Administrative Expenses"
  },
  "8813": {
    "description": "Data processing",
    "qboCode": "EXPOFFICE",
    "type": "Expenses",
    "detailType": "Office/General Administrative Expenses"
  },
  "8860": {
    "description": "Professional fees",
    "qboCode": "EXPPROFESSIONAL",
    "type": "Expenses",
    "detailType": "Legal and professional fees"
  },
  "8861": {
    "description": "Legal fees",
    "qboCode": "EXPPROFESSIONAL",
    "type": "Expenses",
    "detailType": "Legal and professional fees"
  },
  "8862": {
    "description": "Accounting fees",
    "qboCode": "EXPPROFESSIONAL",
    "type": "Expenses",
    "detailType": "Legal and professional fees"
  },
  "8863": {
    "description": "Consulting fees",
    "qboCode": "EXPPROFESSIONAL",
    "type": "Expenses",
    "detailType": "Legal and professional fees"
  },
  "8864": {
    "description": "Architect fees",
    "qboCode": "EXPPROFESSIONAL",
    "type": "Expenses",
    "detailType": "Legal and professional fees"
  },
  "8866": {
    "description": "Laboratory fees",
    "qboCode": "EXPPROFESSIONAL",
    "type": "Expenses",
    "detailType": "Legal and professional fees"
  },
  "8867": {
    "description": "Medical fees",
    "qboCode": "EXPPROFESSIONAL",
    "type": "Expenses",
    "detailType": "Legal and professional fees"
  },
  "8868": {
    "description": "Veterinary fees",
    "qboCode": "EXPPROFESSIONAL",
    "type": "Expenses",
    "detailType": "Legal and professional fees"
  },
  "8869": {
    "description": "Brokerage fees",
    "qboCode": "EXPSHIP",
    "type": "Expenses",
    "detailType": "Shipping, Freight, and Delivery"
  },
  "8870": {
    "description": "Transfer fees",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "8871": {
    "description": "Management and administration fees",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "8872": {
    "description": "Refining and assay",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "8873": {
    "description": "Registrar and transfer agent fees",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "8874": {
    "description": "Restructuring costs",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "8875": {
    "description": "Security commission fees",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "8876": {
    "description": "Training expense",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "8877": {
    "description": "Studio and recording",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "8910": {
    "description": "Rental",
    "qboCode": "EXPRENT",
    "type": "Expenses",
    "detailType": "Rent or lease of buildings"
  },
  "8911": {
    "description": "Real estate rental",
    "qboCode": "EXPRENT",
    "type": "Expenses",
    "detailType": "Rent or lease of buildings"
  },
  "8912": {
    "description": "Occupancy costs",
    "qboCode": "EXPRENT",
    "type": "Expenses",
    "detailType": "Rent or lease of buildings"
  },
  "8913": {
    "description": "Condominium fees",
    "qboCode": "EXPRENT",
    "type": "Expenses",
    "detailType": "Rent or lease of buildings"
  },
  "8914": {
    "description": "Equipment rental",
    "qboCode": "EXPEQUIPRENT",
    "type": "Expenses",
    "detailType": "Equipment rental"
  },
  "8915": {
    "description": "Motor vehicle rentals",
    "qboCode": "EXPEQUIPRENT",
    "type": "Expenses",
    "detailType": "Equipment rental"
  },
  "8916": {
    "description": "Moorage (boat)",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "8917": {
    "description": "Storage",
    "qboCode": "EXPUTILITIES",
    "type": "Expenses",
    "detailType": "Utilities"
  },
  "8918": {
    "description": "Quota rental",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "8960": {
    "description": "Repairs and maintenance",
    "qboCode": "EXPREPAIR",
    "type": "Expenses",
    "detailType": "Repair and maintenance"
  },
  "8961": {
    "description": "Repairs and maintenance - Buildings",
    "qboCode": "EXPREPAIR",
    "type": "Expenses",
    "detailType": "Repair and maintenance"
  },
  "8962": {
    "description": "Repairs and maintenance - Vehicles",
    "qboCode": "EXPAUTO",
    "type": "Expenses",
    "detailType": "Auto"
  },
  "8963": {
    "description": "Repairs and maintenance - Boats",
    "qboCode": "EXPREPAIR",
    "type": "Expenses",
    "detailType": "Repair and maintenance"
  },
  "8964": {
    "description": "Repairs and maintenance - Machinery and",
    "qboCode": "EXPREPAIR",
    "type": "Expenses",
    "detailType": "Repair and maintenance"
  },
  "9010": {
    "description": "Other repairs and maintenance",
    "qboCode": "EXPREPAIR",
    "type": "Expenses",
    "detailType": "Repair and maintenance"
  },
  "9011": {
    "description": "Machine shop expense",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9012": {
    "description": "Road costs",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9013": {
    "description": "Security",
    "qboCode": "EXPUTILITIES",
    "type": "Expenses",
    "detailType": "Utilities"
  },
  "9014": {
    "description": "Garbage removal",
    "qboCode": "EXPUTILITIES",
    "type": "Expenses",
    "detailType": "Utilities"
  },
  "9060": {
    "description": "Salaries and wages",
    "qboCode": "EXPLAB",
    "type": "Expenses",
    "detailType": "Cost of labour"
  },
  "9061": {
    "description": "Commissions",
    "qboCode": "EXPLAB",
    "type": "Expenses",
    "detailType": "Cost of labour"
  },
  "9062": {
    "description": "Crew share",
    "qboCode": "EXPLAB",
    "type": "Expenses",
    "detailType": "Cost of labour"
  },
  "9063": {
    "description": "Bonuses",
    "qboCode": "EXPLAB",
    "type": "Expenses",
    "detailType": "Cost of labour"
  },
  "9064": {
    "description": "Directors fees",
    "qboCode": "EXPLAB",
    "type": "Expenses",
    "detailType": "Cost of labour"
  },
  "9065": {
    "description": "Management salaries",
    "qboCode": "EXPLAB",
    "type": "Expenses",
    "detailType": "Cost of labour"
  },
  "9066": {
    "description": "Employee salaries",
    "qboCode": "EXPLAB",
    "type": "Expenses",
    "detailType": "Cost of labour"
  },
  "9110": {
    "description": "Sub-contracts",
    "qboCode": "EXPLAB",
    "type": "Expenses",
    "detailType": "Cost of labour"
  },
  "9130": {
    "description": "Supplies",
    "qboCode": "EXPSUPPLY",
    "type": "Expenses",
    "detailType": "Supplies"
  },
  "9131": {
    "description": "Small tools",
    "qboCode": "EXPSUPPLY",
    "type": "Expenses",
    "detailType": "Supplies"
  },
  "9132": {
    "description": "Shop expense",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9133": {
    "description": "Uniforms",
    "qboCode": "EXPLAB",
    "type": "Expenses",
    "detailType": "Cost of labour"
  },
  "9134": {
    "description": "Laundry",
    "qboCode": "EXPLAB",
    "type": "Expenses",
    "detailType": "Cost of labour"
  },
  "9135": {
    "description": "Food and catering",
    "qboCode": "EXPMEAL",
    "type": "Expenses",
    "detailType": "Meals and entertainment"
  },
  "9136": {
    "description": "Fishing gear",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9137": {
    "description": "Nets and traps",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9138": {
    "description": "Salt, bait, and ice",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9139": {
    "description": "Camp supplies",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9150": {
    "description": "Computer-related expenses",
    "qboCode": "EXPOFFICE",
    "type": "Expenses",
    "detailType": "Office/General Administrative Expenses"
  },
  "9151": {
    "description": "Upgrade",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9152": {
    "description": "Internet",
    "qboCode": "EXPOFFICE",
    "type": "Expenses",
    "detailType": "Office/General Administrative Expenses"
  },
  "9180": {
    "description": "Property taxes",
    "qboCode": "EXPTAXES",
    "type": "Expenses",
    "detailType": "Taxes paid"
  },
  "9200": {
    "description": "Travel expenses",
    "qboCode": "EXPTRAVEL",
    "type": "Expenses",
    "detailType": "Travel"
  },
  "9201": {
    "description": "Meetings and conventions",
    "qboCode": "EXPDUES",
    "type": "Expenses",
    "detailType": "Dues and subscriptions"
  },
  "9220": {
    "description": "Utilities",
    "qboCode": "EXPUTILITIES",
    "type": "Expenses",
    "detailType": "Utilities"
  },
  "9221": {
    "description": "Electricity",
    "qboCode": "EXPUTILITIES",
    "type": "Expenses",
    "detailType": "Utilities"
  },
  "9222": {
    "description": "Water",
    "qboCode": "EXPUTILITIES",
    "type": "Expenses",
    "detailType": "Utilities"
  },
  "9223": {
    "description": "Heat",
    "qboCode": "EXPUTILITIES",
    "type": "Expenses",
    "detailType": "Utilities"
  },
  "9224": {
    "description": "Fuel costs",
    "qboCode": "EXPUTILITIES",
    "type": "Expenses",
    "detailType": "Utilities"
  },
  "9225": {
    "description": "Telephone and telecommunications",
    "qboCode": "EXPUTILITIES",
    "type": "Expenses",
    "detailType": "Utilities"
  },
  "9270": {
    "description": "Other expenses",
    "qboCode": "OE",
    "type": "Other Expense",
    "detailType": "Other miscellaneous expense"
  },
  "9271": {
    "description": "Cash over/short",
    "qboCode": "OE",
    "type": "Other Expense",
    "detailType": "Other miscellaneous expense"
  },
  "9272": {
    "description": "Reimbursement of parent company expense",
    "qboCode": "OE",
    "type": "Other Expense",
    "detailType": "Other miscellaneous expense"
  },
  "9273": {
    "description": "Selling expenses",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9274": {
    "description": "Shipping and warehouse expense",
    "qboCode": "EXPSHIP",
    "type": "Expenses",
    "detailType": "Shipping, Freight, and Delivery"
  },
  "9275": {
    "description": "Delivery, freight and express",
    "qboCode": "EXPSHIP",
    "type": "Expenses",
    "detailType": "Shipping, Freight, and Delivery"
  },
  "9276": {
    "description": "Warranty expenses",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9277": {
    "description": "Royalty expenses - Resident",
    "qboCode": "OE",
    "type": "Other Expense",
    "detailType": "Other miscellaneous expense"
  },
  "9278": {
    "description": "Royalty expenses - Non-resident",
    "qboCode": "OE",
    "type": "Other Expense",
    "detailType": "Other miscellaneous expense"
  },
  "9279": {
    "description": "Dumping charges",
    "qboCode": "EXPUTILITIES",
    "type": "Expenses",
    "detailType": "Utilities"
  },
  "9280": {
    "description": "Land fill fees",
    "qboCode": "EXPUTILITIES",
    "type": "Expenses",
    "detailType": "Utilities"
  },
  "9281": {
    "description": "Vehicle expenses",
    "qboCode": "EXPAUTO",
    "type": "Expenses",
    "detailType": "Auto"
  },
  "9282": {
    "description": "Research and development",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9283": {
    "description": "Withholding taxes",
    "qboCode": "EXPTAXES",
    "type": "Expenses",
    "detailType": "Taxes paid"
  },
  "9284": {
    "description": "General and administrative expenses",
    "qboCode": "EXPOFFICE",
    "type": "Expenses",
    "detailType": "Office/General Administrative Expenses"
  },
  "9285": {
    "description": "Interdivisional expenses",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9286": {
    "description": "Interfund transfer",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9367": {
    "description": "Total operating expenses",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9368": {
    "description": "Total expenses",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9369": {
    "description": "Net non-farming income",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9370": {
    "description": "Grains and oilseeds",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9371": {
    "description": "Wheat",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9372": {
    "description": "Oats",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9373": {
    "description": "Barley",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9374": {
    "description": "Mixed grains",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9375": {
    "description": "Corn",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9376": {
    "description": "Canola",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9377": {
    "description": "Flaxseed",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9378": {
    "description": "Soya beans",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9379": {
    "description": "Wheat Board payments",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9420": {
    "description": "Other crop revenues",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9421": {
    "description": "Fruit",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9422": {
    "description": "Potatoes",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9423": {
    "description": "Vegetables",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9424": {
    "description": "Tobacco",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9425": {
    "description": "Greenhouse and nursery products",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9426": {
    "description": "Forage crops",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9470": {
    "description": "Livestock and animal products revenue",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9471": {
    "description": "Cattle",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9472": {
    "description": "Swine",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9474": {
    "description": "Sheep and lambs",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9475": {
    "description": "Pregnant mare urine (PMU)",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9476": {
    "description": "Milk and cream (excluding dairy subsidies)",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9477": {
    "description": "Eggs for consumption",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9478": {
    "description": "Hatching eggs",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9479": {
    "description": "Aquaculture (hatching and raising)",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9480": {
    "description": "Horses (breeding and meat)",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9520": {
    "description": "Other commodities",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9521": {
    "description": "Maple products",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9522": {
    "description": "Artificial insemination",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9523": {
    "description": "Semen production",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9524": {
    "description": "Embryo production",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9540": {
    "description": "Program payment revenues",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9541": {
    "description": "Dairy subsidies",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9542": {
    "description": "Crop insurance",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9544": {
    "description": "Disaster Assistance Program payments",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9545": {
    "description": "AgriStability and AgriInvest benefit",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9546": {
    "description": "Production insurance premium benefit",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9570": {
    "description": "Rebates",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9571": {
    "description": "Rebates - Fuel",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9572": {
    "description": "Rebates - Interest",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9573": {
    "description": "Rebates - Property taxes",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9600": {
    "description": "Other farm revenues/losses",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9601": {
    "description": "Custom or contract work",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9602": {
    "description": "Wood sales",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9603": {
    "description": "Horse racing",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9604": {
    "description": "Insurance proceeds",
    "qboCode": "OI",
    "type": "Other income",
    "detailType": "Income"
  },
  "9605": {
    "description": "Patronage dividends",
    "qboCode": "OIDIVIDEND",
    "type": "Other income",
    "detailType": "Dividend income"
  },
  "9606": {
    "description": "Rental income",
    "qboCode": "OI",
    "type": "Other income",
    "detailType": "Income"
  },
  "9607": {
    "description": "Interest income",
    "qboCode": "OIINVEST",
    "type": "Other income",
    "detailType": "Other investment income"
  },
  "9608": {
    "description": "Dividend income",
    "qboCode": "OIDIVIDEND",
    "type": "Other income",
    "detailType": "Dividend income"
  },
  "9609": {
    "description": "Gains/losses on disposal of assets",
    "qboCode": "OIGAINLOSSFA",
    "type": "Other income",
    "detailType": "Gain/loss on sale of fixed assets"
  },
  "9610": {
    "description": "Gravel",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9611": {
    "description": "Trucking",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9612": {
    "description": "Resale of commodities purchased",
    "qboCode": "OI",
    "type": "Other income",
    "detailType": "Income"
  },
  "9613": {
    "description": "Leases (gas, oil, well, surface, etc.)",
    "qboCode": "OI",
    "type": "Other income",
    "detailType": "Income"
  },
  "9614": {
    "description": "Machine rentals",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9615": {
    "description": "Farming partnership income/loss",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9616": {
    "description": "Farming joint venture income/loss",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9617": {
    "description": "Custom feeding",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9650": {
    "description": "Non-farming income",
    "qboCode": "OI",
    "type": "Other income",
    "detailType": "Income"
  },
  "9659": {
    "description": "Total farm revenue",
    "qboCode": "INC",
    "type": "Income",
    "detailType": "Other Primary Income"
  },
  "9660": {
    "description": "Crop expenses",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "9661": {
    "description": "Containers, twine, and baling wire",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "9662": {
    "description": "Fertilizers and lime",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "9663": {
    "description": "Pesticides",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "9664": {
    "description": "Seeds and plants",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "9710": {
    "description": "Livestock expenses",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "9711": {
    "description": "Feed, supplements, straw, and bedding",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "9712": {
    "description": "Livestock purchases",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "9713": {
    "description": "Veterinary fees, medicine, and breeding fees",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "9714": {
    "description": "Minerals and salts",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "9760": {
    "description": "Machinery expenses",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "9761": {
    "description": "Machinery insurance",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "9762": {
    "description": "Machinery licences",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "9763": {
    "description": "Machinery repairs",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "9764": {
    "description": "Machinery fuel",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "9765": {
    "description": "Machinery lease",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "9790": {
    "description": "General farm expenses",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9791": {
    "description": "Amortization of tangible assets",
    "qboCode": "OEAMORT",
    "type": "Other Expense",
    "detailType": "Amortization"
  },
  "9792": {
    "description": "Advertising, marketing costs, and promotion",
    "qboCode": "EXPADVERTISING",
    "type": "Expenses",
    "detailType": "Advertising/promotional"
  },
  "9793": {
    "description": "Bad debt",
    "qboCode": "EXPBADDEBT",
    "type": "Expenses",
    "detailType": "Bad debts"
  },
  "9794": {
    "description": "Benefits related to employee salaries",
    "qboCode": "EXPLAB",
    "type": "Expenses",
    "detailType": "Cost of labour"
  },
  "9795": {
    "description": "Building repairs and maintenance",
    "qboCode": "EXPREPAIR",
    "type": "Expenses",
    "detailType": "Repair and maintenance"
  },
  "9796": {
    "description": "Clearing, levelling, and draining land",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9798": {
    "description": null,
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9803": {
    "description": "Insurance program overpayment recapture",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9804": {
    "description": "Other insurance premiums",
    "qboCode": "EXPINS",
    "type": "Expenses",
    "detailType": "Insurance"
  },
  "9805": {
    "description": "Interest and bank charges",
    "qboCode": "EXPBANKCHARGE",
    "type": "Expenses",
    "detailType": "Bank charges"
  },
  "9806": {
    "description": "Marketing board fees",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9807": {
    "description": "Memberships/subscription fees",
    "qboCode": "EXPDUES",
    "type": "Expenses",
    "detailType": "Dues and subscriptions"
  },
  "9808": {
    "description": "Office expenses",
    "qboCode": "EXPOFFICE",
    "type": "Expenses",
    "detailType": "Office/General Administrative Expenses"
  },
  "9809": {
    "description": "Professional fees",
    "qboCode": "EXPPROFESSIONAL",
    "type": "Expenses",
    "detailType": "Legal and professional fees"
  },
  "9810": {
    "description": "Property taxes",
    "qboCode": "EXPTAXES",
    "type": "Expenses",
    "detailType": "Taxes paid"
  },
  "9811": {
    "description": "Rent - Land and buildings",
    "qboCode": "EXPRENT",
    "type": "Expenses",
    "detailType": "Rent or lease of buildings"
  },
  "9812": {
    "description": "Rent - Machinery",
    "qboCode": "EXPEQUIPRENT",
    "type": "Expenses",
    "detailType": "Equipment rental"
  },
  "9813": {
    "description": "Other rental expenses",
    "qboCode": "EXPEQUIPRENT",
    "type": "Expenses",
    "detailType": "Equipment rental"
  },
  "9814": {
    "description": "Salaries and wages",
    "qboCode": "EXPLAB",
    "type": "Expenses",
    "detailType": "Cost of labour"
  },
  "9815": {
    "description": "Salaries and wages other than for spouse or",
    "qboCode": "EXPLAB",
    "type": "Expenses",
    "detailType": "Cost of labour"
  },
  "9816": {
    "description": "Salaries and wages paid to dependants",
    "qboCode": "EXPLAB",
    "type": "Expenses",
    "detailType": "Cost of labour"
  },
  "9817": {
    "description": "Selling costs",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9818": {
    "description": "Supplies",
    "qboCode": "EXPSUPPLY",
    "type": "Expenses",
    "detailType": "Supplies"
  },
  "9819": {
    "description": "Motor vehicle expenses",
    "qboCode": "EXPAUTO",
    "type": "Expenses",
    "detailType": "Auto"
  },
  "9820": {
    "description": "Small tools",
    "qboCode": "EXPSHIP",
    "type": "Expenses",
    "detailType": "Shipping, Freight, and Delivery"
  },
  "9821": {
    "description": "Soil testing",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9822": {
    "description": "Storage/drying",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9823": {
    "description": "Licences/permits",
    "qboCode": "EXPDUES",
    "type": "Expenses",
    "detailType": "Dues and subscriptions"
  },
  "9824": {
    "description": "Telephone",
    "qboCode": "EXPOFFICE",
    "type": "Expenses",
    "detailType": "Office/General Administrative Expenses"
  },
  "9825": {
    "description": "Quota rental (tobacco, dairy)",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9826": {
    "description": "Gravel",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9827": {
    "description": "Purchases of commodities resold",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9828": {
    "description": "Salaries and wages paid to spouse",
    "qboCode": "EXPLAB",
    "type": "Expenses",
    "detailType": "Cost of labour"
  },
  "9829": {
    "description": "Motor vehicle interest and leasing costs",
    "qboCode": "EXPAUTO",
    "type": "Expenses",
    "detailType": "Auto"
  },
  "9830": {
    "description": "Prepared feed",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9831": {
    "description": "Custom feed",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9832": {
    "description": "Amortization of intangible assets",
    "qboCode": "OEAMORT",
    "type": "Other Expense",
    "detailType": "Amortization"
  },
  "9833": {
    "description": "Amortization of milk quota",
    "qboCode": "OEAMORT",
    "type": "Other Expense",
    "detailType": "Amortization"
  },
  "9834": {
    "description": "Travel expenses",
    "qboCode": "EXPTRAVEL",
    "type": "Expenses",
    "detailType": "Travel"
  },
  "9835": {
    "description": "Capital/business taxes",
    "qboCode": "EXPTAXES",
    "type": "Expenses",
    "detailType": "Taxes paid"
  },
  "9836": {
    "description": "Commissions and levies",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9850": {
    "description": "Non-farming expenses",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9870": {
    "description": "Net inventory adjustment",
    "qboCode": "COGS",
    "type": "Cost of Goods Sold",
    "detailType": "Cost of goods sold"
  },
  "9898": {
    "description": "Total farm expenses",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9899": {
    "description": "Net farm income",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9970": {
    "description": "Net income/loss before taxes and extraordinary",
    "qboCode": "EXP",
    "type": "Expenses",
    "detailType": "Other miscellaneous service cost"
  },
  "9975": {
    "description": "Extraordinary item(s)",
    "qboCode": "OE",
    "type": "Other Expense",
    "detailType": "Other miscellaneous expense"
  },
  "9976": {
    "description": "Legal settlements",
    "qboCode": "OE",
    "type": "Other Expense",
    "detailType": "Other miscellaneous expense"
  },
  "9980": {
    "description": "Unrealized gains/losses",
    "qboCode": "OEEXCHANGE",
    "type": "Other Expense",
    "detailType": "Exchange Gain or Loss"
  },
  "9985": {
    "description": "Unusual items",
    "qboCode": "OE",
    "type": "Other Expense",
    "detailType": "Other miscellaneous expense"
  },
  "9990": {
    "description": "Current income taxes",
    "qboCode": "OE",
    "type": "Other Expense",
    "detailType": "Other miscellaneous expense"
  },
  "9995": {
    "description": "Future (deferred) income tax provision",
    "qboCode": "OE",
    "type": "Other Expense",
    "detailType": "Other miscellaneous expense"
  },
  "9998": {
    "description": "Total-other comprehensive income",
    "qboCode": "OE",
    "type": "Other Expense",
    "detailType": "Other miscellaneous expense"
  },
  "9999": {
    "description": "Net income/loss after taxes and extraordinary",
    "qboCode": "OE",
    "type": "Other Expense",
    "detailType": "Other miscellaneous expense"
  }
};

export default GIFI_MAP;
