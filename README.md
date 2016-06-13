# pay-ticket
pay ticket by BitCoin

## init Step By Step

  1. install node modules
  ```
  npm install
  ```
  
  2. config db
  ```
  config database.json
  ```
  
  3. create db
  ```
  mysql -uroot -p
  create database pay-ticket_production
  ```
  
  4. create tables
  ```
  db-migrate up -e production
  ```
  
  5. start Server
  ```
  node index
  ```
  now you can visit: http://localhost:3000
  
  6. config crontab
  ```
  *     *    *   *    *   /path/to/check_pay # every 10minutes execute 1 time
  *     1    *   *    *   /path/export_csv  # every day 1:00AM execute
  ```

That's ALL, Enjoy it!
