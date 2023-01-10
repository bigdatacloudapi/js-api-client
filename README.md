# BigDataCloud Javascript API Client


A frontend Javascript client for connecting to the API services provided by [BigDataCloud](https://www.bigdatacloud.com)
This client works in plain Vanilla Javascript and also adds easy access if jQuery is available.



## What API services does [BigDataCloud](https://www.bigdatacloud.com) offer?

BigDataCloud offers a range of extremely useful and fast APIs that can be utilised in both backend and frontend scenarios.
From validating customer input live to the next generation of IP Geolocation technology, BigDataCloud has an API suitable to your needs.

For a full list of APIs, visit our [documentation area](https://www.bigdatacloud.com/docs).

You can access any and all BigDataCloud APIs with a free API Key.
To get your API Key, just access your account and retrieve it from your [Account Dashboard](https://www.bigdatacloud.com/account).
If you are not yet a customer, it is completely free to join.



## Documentation

For documentation specific to this api client, please read below.
For more specific documentation to the APIs available, including endpoints, request and response data, please visit our [documentation area](https://www.bigdatacloud.com/docs/ip-geolocation).



## Language Support

BigDataCloud APIs now offer Locality information in a number of languages.
Please see the example below for how to set the API language.
[Click here For a list of all supported languages, and their respective codes.](https://www.bigdatacloud.com/supported-languages)



## Authentication / Identification

To use this API client you must have a BigDataCloud API Key.
To get your personal key, please access your account and retrieve it from your [Account Dashboard](https://www.bigdatacloud.com/account).
If you are not yet a customer, it is completely free to join.

Provide this key when initiating the api client, and it will be included in all requests to the BigDataCloud API Server.
If using the jQuery quick caller, you can provide the key in each request by appending the key parameter to the request payload.
See the examples below.



## Manual Installation

1. Download the included javascript file and place it in a publically accessible location
2. Include the script tag `<script src="bigdatacloud_api_client.js" type="text/javascript"></script>` before your code execution
3. If using jQuery, include the script after the jQuery declaration
4. Initiate the API Client and make the required calls



## CDN Installation

1. Include the CDN script tag `<script src="https://cdn.jsdelivr.net/gh/bigdatacloudapi/js-api-client@latest/bigdatacloud_api_client.min.js" type="text/javascript"></script>` before your code execution
2. If using jQuery, include the script after the jQuery declaration
3. Initiate the API Client and make the required calls



## Example usage

```javascript
<script src="https://cdn.jsdelivr.net/gh/bigdatacloudapi/js-api-client@latest/bigdatacloud_api_client.min.js" type="text/javascript"></script>
<script type="text/javascript">

	var apiKey='XXX'; // Your api key found at: https://www.bigdatacloud.com/account

    //vanilla implementation
    var client=new BDCApiClient(apiKey);

    /* You can set the default api language as needed */
    client.localityLanguage='es';

    client.call(
        /* api endpoint */
        'ip-geolocation-full',

        /* api query parameters */
        {
            'ip':'8.8.8.8',
            /* You can override the default api language on a per-query basis
            *  This is an optional parameter on all API calls */
            'localityLanguage':'zh'
        },
        function(jsonResult) {
            console.log('Vanilla result',jsonResult);
        },
        function(err,code) {
            console.log('Vanilla error',err,code);
        }
    );


    //jQuery implementation
    if (typeof jQuery != 'undefined') {
        (function($) {
            $.BDCApi('ip-geolocation-full',{
                data:{
                    ip:'8.8.8.8',
                    key:apiKey,
                    localityLanguage:'en'
                },
                success:function(jsonResult) {
                    console.log('jQuery result',jsonResult);
                },
                error:function(error,code) {
                    console.error('jQuery eror',error,code);
                }
            });
        })(jQuery);
    }

</script>
```


## Example output

```javascript
{
    "ip": "8.8.8.8",
    "country": {
        "isoAlpha2": "US",
        "isoAlpha3": "USA",
        "m49Code": 840,
        "isoName": "United States of America (the)",
        "isoAdminLanguages": [
            {
                "isoAlpha3": "eng",
                "isoAlpha2": "en",
                "isoName": "English"
            }
        ],
        "unRegion": "Americas/Northern America",
        "currency": {
            "numericCode": 840,
            "code": "USD",
            "name": "US Dollar",
            "minorUnits": 2
        },
        "wbRegion": {
            "id": "NAC",
            "iso2Code": "XU",
            "value": "North America"
        },
        "wbIncomeLevel": {
            "id": "HIC",
            "iso2Code": "XD",
            "value": "High income"
        },
        "callingCode": "1",
        "countryFlagEmoji": "🇺🇸"
    },
    "location": {
        "isoPrincipalSubdivision": "California",
        "isoPrincipalSubdivisionCode": "US-CA",
        "city": "Mountain View",
        "postcode": "94043",
        "latitude": 37.42,
        "longitude": -122.09,
        "timeZone": {
            "ianaTimeId": "America/Los_Angeles",
            "displayName": "(UTC-08:00) Pacific Time (US & Canada)",
            "effectiveTimeZoneFull": "Pacific Daylight Time",
            "effectiveTimeZoneShort": "PDT",
            "UtcOffsetSeconds": -25200,
            "UtcOffset": "-07",
            "isDaylightSavingTime": true,
            "localTime": "2019-04-06T04:06:39.1691744"
        }
    },
    "lastUpdated": "2019-04-06T09:09:36.1877959Z",
    "network": {
        "registry": "ARIN",
        "registryStatus": "assigned",
        "registeredCountry": "US",
        "registeredCountryName": "United States of America (the)",
        "organisation": "Google LLC",
        "isReachableGlobally": true,
        "isBogon": false,
        "bgpPrefix": "8.8.8.0/24",
        "bgpPrefixNetworkAddress": "8.8.8.0",
        "bgpPrefixLastAddress": "8.8.8.255",
        "totalAddresses": 256,
        "carriers": [
            {
                "asn": "AS15169",
                "asnNumeric": 15169,
                "organisation": "Google LLC",
                "name": "GOOGLE",
                "registry": "ARIN",
                "registeredCountry": "US",
                "registeredCountryName": "United States of America (the)",
                "registrationDate": "2000-03-30",
                "registrationLastChange": "2012-02-25",
                "totalIpv4Addresses": 8698103,
                "totalIpv4Prefixes": 435,
                "totalIpv4BogonPrefixes": 0,
                "rank": 53,
                "rankText": "#53 out of 62,872"
            }
        ],
        "viaCarriers": [
            {
                "asn": "AS7018",
                "asnNumeric": 7018,
                "organisation": "ATT Services Inc.",
                "registeredCountry": "US",
                "registeredCountryName": "United States of America (the)",
                "rank": 2
            },
       		/*........*/
            {
                "asn": "AS31019",
                "asnNumeric": 31019,
                "organisation": "Paulus M. Hoogsteder trading as Meanie",
                "registeredCountry": "NL",
                "registeredCountryName": "Netherlands (the)",
                "rank": 51153
            }
        ]
    },
    "confidence": "low",
    "confidenceArea": [
        {
            "latitude": 18.0256672,
            "longitude": -66.5275345
        },
        /*........*/
        {
            "latitude": 18.0256672,
            "longitude": -66.5275345
        }
    ],
    "securityThreat": "unknown",
    "hazardReport": {
        "isKnownAsTorServer": false,
        "isKnownAsProxy": false,
        "isKnownAsMailServer": false,
        "isKnownAsPublicRouter": false,
        "isBogon": false,
        "isUnreachable": false
    }
}
```
