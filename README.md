### Deals B3k3n Test for Frontend Engineer - Fadhil Muhammad Rafi'

#### Steps to open the app in local:
1. Use node version 16.13.0
2. Enter command `yarn start` at the terminal opened in project directory

#### Steps to open the app in production:
1. Open http://deals-b3k3n.surge.sh

On both local and production, please open `http://cors-anywhere.herokuapp.com/corsdemo` and click `Request temporary access to demo server` button
![image](https://user-images.githubusercontent.com/52844918/198316400-e2ffacb6-598d-4327-95d1-1ecaa3b8b889.png)

Above step is needed to trigger CORS anywhere server as reverse proxy so it can redirect the request to the API URL without CORS issues.
It is because the API URL provided can only be fetched from the same domain, otherwise it runs into CORS issue.
