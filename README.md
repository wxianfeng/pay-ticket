# pay-ticket
pay ticket by BitCoin

## init Step By Step

  1. install node modules
  ```
  >npm install
  ```
  
  2. config db
  ```
  modify database.json
  ```
  
  3. create db
  ```
  >mysql -uroot -p
  >create database pay_production
  ```
  
  4. create tables
  ```
  >db-migrate up -e production
  ```

  5. config mail server && domain
  ```
  >cp config/config.js.sample config/config.js
  modify config.js
  ```

  6. import address && import code
  ```
  first config address_path and code_path in config.js

  >./import_address
  >./import_code
  ```
  
  7. start Server
  ```
  >forever start index

  if forever not command not find
  >cd App.root/node_modules/forever && npm link
  ```
  now you can visit: http://localhost:3000
  
  8. config crontab
  ```
  *     *    *   *    *   /path/to/check_pay # every 10minutes execute 1 time
  *     1    *   *    *   /path/export_csv  # every day 1:00AM execute
  ```

That's ALL, Enjoy it!
