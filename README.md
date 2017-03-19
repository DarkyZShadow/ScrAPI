# ScrAPI
Web Company Scrapper

# The API

There are two routes on the API :
  - '/company' (POST/PUT)
  - '/bot' (POST)
  
### /company
  - POST : -> Used to find informations in Mongo and send to Front
  ```javascript
    {
      "id":"SIRET or SIREN or NAME"
    }
  ```
  returns an object with found data (data:), and missing data (missing:)
  
  - PUT : -> Used to insert or update data in Mongo
  ```javascript
    {
      SIREN:        91351153,
      NIC:          02165,
      nomen_long:   "Scrapi",
      employees:  [
        {
			post:     	"PDG",
          	fullname: 	"Maria Api",
          	linkedin: 	"http://linkedin.com/",
          	mail:     	"maria.api@scrapi.com",
	  		from:		"Paris"
        },
        {
          	post:     	"DRH"
         	fullname: 	"Pierre Api",
          	linkedin: 	"http://linkedin.com/",
          	mail:     	"pierre.api@scrapi.com"
	  		from:		"Paris"
        }
      ]
    }
  ```
  
### /bot
  - POST : -> Used to start bot in "zombie mode" and fill Mongo
  ```javascript
  [
    {
      "SIREN":"000000000",
      "NIC": "11111"
    },
    {
      "SIREN":"000000000",
      "NIC": "11111"
    },
    {
      "SIREN":"000000000",
      "NIC": "11111"
    }
  ]
  ```
