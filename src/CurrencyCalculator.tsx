import { FC, useEffect, useState } from 'react';
import './CurrencyCalculator.scss';
import axios from 'axios';

type CurrencyCalculatorProps = {}

export const CurrencyCalculator: FC<CurrencyCalculatorProps> = () => {

  const currencyList = {
    AED: "United Arab miraterham", AFN: "Afghan Afghani", ALL: "Albanian Lek", AMD: "Armenian Dram", ANG: "Netherlands Antillean Guilder", AOA: "Angolan Kwanza", ARS: "Argentine Peso", AUD: "Australian Dollar", AWG: "Aruban Florin", AZN: "Azerbaijani Manat", BAM: "Bosnia-Herzegovina Convertible Mark", BBD: "Barbadian Dollar", BDT: "Bangladeshi Taka", BGN: "Bulgarian Lev", BHD: "Bahraini Dinar", BIF: "Burundian Franc", BMD: "Bermudan Dollar", BND: "Brunei Dollar", BOB: "Bolivian Boliviano", BRL: "Brazilian Real", BSD: "Bahamian Dollar", BTC: "Bitcoin", BTN: "Bhutanese Ngultrum", BWP: "Botswanan Pula", BYN: "New Belarusian Ruble", BYR: "Belarusian Ruble", BZD: "Belize Dollar", CAD: "Canadian Dollar", CDF: "Congolese Franc", CHF: "Swiss Franc", CLF: "Chilean Unit of Account (UF)", CLP: "Chilean Peso", CNY: "Chinese Yuan", COP: "Colombian Peso", CRC: "Costa Rican Colón", CUC: "Cuban Convertible Peso", CUP: "Cuban Peso", CVE: "Cape Verdean Escudo", CZK: "Czech Republic Koruna", DJF: "Djiboutian Franc", DKK: "Danish Krone", DOP: "Dominican Peso", DZD: "Algerian Dinar", EGP: "Egyptian Pound", ERN: "Eritrean Nakfa", ETB: "Ethiopian Birr", EUR: "Euro", FJD: "Fijian Dollar", FKP: "Falkland Islands Pound", GBP: "British Pound Sterling", GEL: "Georgian Lari", GGP: "Guernsey Pound", GHS: "Ghanaian Cedi", GIP: "Gibraltar Pound", GMD: "Gambian Dalasi", GNF: "Guinean Franc", GTQ: "Guatemalan Quetzal", GYD: "Guyanaese Dollar", HKD: "Hong Kong Dollar", HNL: "Honduran Lempira", HRK: "Croatian Kuna", HTG: "Haitian Gourde", HUF: "Hungarian Forint", IDR: "Indonesian Rupiah", ILS: "Israeli New Sheqel", IMP: "Manx pound", INR: "Indian Rupee", IQD: "Iraqi Dinar", IRR: "Iranian Rial", ISK: "Icelandic Króna", JEP: "Jersey Pound", JMD: "Jamaican Dollar", JOD: "Jordanian Dinar", JPY: "Japanese Yen", KES: "Kenyan Shilling", KGS: "Kyrgystani Som", KHR: "Cambodian Riel", KMF: "Comorian Franc", KPW: "North Korean Won", KRW: "South Korean Won", KWD: "Kuwaiti Dinar", KYD: "Cayman Islands Dollar", KZT: "Kazakhstani Tenge", LAK: "Laotian Kip", LBP: "Lebanese Pound", LKR: "Sri Lankan Rupee", LRD: "Liberian Dollar", LSL: "Lesotho Loti", LTL: "Lithuanian Litas", LVL: "Latvian Lats", LYD: "Libyan Dinar", MAD: "Moroccan Dirham", MDL: "Moldovan Leu", MGA: "Malagasy Ariary", MKD: "Macedonian Denar", MMK: "Myanma Kyat", MNT: "Mongolian Tugrik", MOP: "Macanese Pataca", MRO: "Mauritanian Ouguiya", MUR: "Mauritian Rupee", MVR: "Maldivian Rufiyaa", MWK: "Malawian Kwacha", MXN: "Mexican Peso", MYR: "Malaysian Ringgit", MZN: "Mozambican Metical", NAD: "Namibian Dollar", NGN: "Nigerian Naira", NIO: "Nicaraguan Córdoba", NOK: "Norwegian Krone", NPR: "Nepalese Rupee", NZD: "New Zealand Dollar", OMR: "Omani Rial", PAB: "Panamanian Balboa", PEN: "Peruvian Nuevo Sol", PGK: "Papua New Guinean Kina", PHP: "Philippine Peso", PKR: "Pakistani Rupee", PLN: "Polish Zloty", PYG: "Paraguayan Guarani", QAR: "Qatari Rial", RON: "Romanian Leu", RSD: "Serbian Dinar", RUB: "Russian Ruble", RWF: "Rwandan Franc", SAR: "Saudi Riyal", SBD: "Solomon Islands Dollar", SCR: "Seychellois Rupee", SDG: "Sudanese Pound", SEK: "Swedish Krona", SGD: "Singapore Dollar", SHP: "Saint Helena Pound", SLE: "Sierra Leonean Leone", SLL: "Sierra Leonean Leone", SOS: "Somali Shilling", SRD: "Surinamese Dollar", SSP: "South Sudanese Pound", STD: "São Tomé and Príncipe Dobra", SVC: "Salvadoran Colón", SYP: "Syrian Pound", SZL: "Swazi Lilangeni", THB: "Thai Baht", TJS: "Tajikistani Somoni", TMT: "Turkmenistani Manat", TND: "Tunisian Dinar", TOP: "Tongan Paʻanga", TRY: "Turkish Lira", TTD: "Trinidad and Tobago Dollar", TWD: "New Taiwan Dollar", TZS: "Tanzanian Shilling", UAH: "Ukrainian Hryvnia", UGX: "Ugandan Shilling", USD: "United States Dollar", UYU: "Uruguayan Peso", UZS: "Uzbekistan Som", VEF: "Venezuelan Bolívar Fuerte", VES: "Sovereign Bolivar", VND: "Vietnamese Dong", VUV: "Vanuatu Vatu", WST: "Samoan Tala", XAF: "CFA Franc BEAC", XAG: "Silver (troy ounce)", XAU: "Gold (troy ounce)", XCD: "East Caribbean Dollar", XDR: "Special Drawing Rights", XOF: "CFA Franc BCEAO", XPF: "CFP Franc", YER: "Yemeni Rial", ZAR: "South African Rand", ZMK: "Zambian Kwacha (pre-2013)", ZMW: "Zambian Kwacha", ZWL: "Zimbabwean Dollar"
  }

  const [currency, setCurrency] = useState(0)
  const [amount, setAmount] = useState("")
  const [chosenInCurrency, setChosenInCurrency] = useState('USD')
  const [chosenOutCurrency, setChosenOutCurrency] = useState('UAH')
  const [buttonTrue, setButtonTrue] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const getData = () => {
    axios.get(`https://api.apilayer.com/currency_data/convert?to=${chosenOutCurrency}&from=${chosenInCurrency}&amount=${amount}`, {
      headers: {
        'apikey': process.env.REACT_APP_API_KEY
      }
    }).then((response: any) => {
      setCurrency(response["data"]["result"].toFixed(2))
    }
    )
  }

  const reverse = () => {
    const left = chosenInCurrency
    const right = chosenOutCurrency
    setChosenInCurrency(right)
    setChosenOutCurrency(left)
  }

  useEffect(
    () => {
      if (buttonTrue && (amount === "" || amount === "e")) {
        setErrorMessage("Type a number")
        setButtonTrue(false)
      }
      else if (buttonTrue && amount.length > 11) {
        setErrorMessage("The amount cannot be longer than 11 symbols")
        setButtonTrue(false)
      }
      else if (buttonTrue && errorMessage === '') {
        getData()
        setButtonTrue(false)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [buttonTrue, errorMessage]
  )
  return (
    <div role='main'>
      <div role="grid">
        <div className='amount'>
          <label>Amount
            <input
              className={errorMessage ? "errorInput" : "input"}
              type='number'
              id="amount"
              placeholder={chosenInCurrency}
              onChange={(event) => { setAmount(event.target.value); setErrorMessage('') }}
              value={amount}
            >
            </input>
          </label>
          <div className={errorMessage ? "error" : "noError"} >
            {errorMessage}
          </div>
        </div>
        <div className="currencies" >
          <select
            id="in"
            value={chosenInCurrency}
            onChange={(event) => setChosenInCurrency(event.target.value as string)}
          >
            {Object.entries(currencyList).map(el => {
              return <option
                key={el[0]}
                value={el[0]}>{el[1]}</option>
            })
            }
          </select>
          <button className='reverse' onClick={() => { reverse(); setButtonTrue(true) }}><svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.99255 12.9841C4.44027 12.9841 3.99255 13.4318 3.99255 13.9841C3.99255 14.3415 4.18004 14.6551 4.46202 14.8319L7.14964 17.5195C7.54016 17.9101 8.17333 17.9101 8.56385 17.5195C8.95438 17.129 8.95438 16.4958 8.56385 16.1053L7.44263 14.9841H14.9926C15.5448 14.9841 15.9926 14.5364 15.9926 13.9841C15.9926 13.4318 15.5448 12.9841 14.9926 12.9841L5.042 12.9841C5.03288 12.984 5.02376 12.984 5.01464 12.9841H4.99255Z"
              fill="currentColor"
            />
            <path
              d="M19.0074 11.0159C19.5597 11.0159 20.0074 10.5682 20.0074 10.0159C20.0074 9.6585 19.82 9.3449 19.538 9.16807L16.8504 6.48045C16.4598 6.08993 15.8267 6.08993 15.4361 6.48045C15.0456 6.87098 15.0456 7.50414 15.4361 7.89467L16.5574 9.01589L9.00745 9.01589C8.45516 9.01589 8.00745 9.46361 8.00745 10.0159C8.00745 10.5682 8.45516 11.0159 9.00745 11.0159L18.958 11.0159C18.9671 11.016 18.9762 11.016 18.9854 11.0159H19.0074Z"
              fill="currentColor"
            />
          </svg></button>
          <select
            id="out"
            value={chosenOutCurrency}
            onChange={(event) => setChosenOutCurrency(event.target.value as string)}
          >
            {Object.entries(currencyList).map(el => {
              return <option
                key={el[0]}
                value={el[0]}>{el[1]}</option>
            })
            }
          </select>
        </div>
        <div className='buttonDiv'>
          <button className='result'
            onClick={() => { setButtonTrue(true) }}>Count</button>
        </div>
        <p className={(currency === 0) ? "resultBefore" : "resultAfter"}>
          {currency} {chosenOutCurrency}
        </p>
      </div>
    </div>
  );
}