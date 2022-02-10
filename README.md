# Kakeibo on the Go: a simple budget app for everyone

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
this project uses the Material UI react framework

## Kakeibo explained
Kakeibo is a century old japanese budget method built on the principles of logging your expenses and journaling a short response after every budget cycle "week/bi-weekly/month/year etc". All transactions are sorted into one of four categories for simplicity (need, want, culture, and unexpected) Through reflection and journaling the user gets a better understanding of how each purchase affects their overall budget and saving goals. Kakeibo is a great method for first time budgeters or fearful budgeters because the first month of use is simply recording and then afterwards one begins the reflection process. This app is designed to encompass the most basic functions of Kakeibo in a digital format. Future plans include monthly base budget features as well as a mobile component for entering transactions quickly and at the point of purchase. 


## Functions

### Logging in User
register new user with registration form. current authentication protocol is not secure and is not passsword protected

existing users will log in by email

### Adding transactions
 logged in users can add a transaction from the main page and view their latest 25 transactions in a responsive table

### Analysis and New Journal Entry 
 Under the "analyze" component a user can filter their transactions by date and/or category. The user can then author a journal entry about the displayed transactions. when the journal is saved, ONLY the transactions currently diplayed in the table will be attached for it. Therefore when the user views the journal entry later in detail from the journal entry table, only the selected transactions will appear in the journal entry. 

 ### Future Components
 future components will include a monthly budget builder and large purchase estimation tool, and hopefully one day a mobile component to make entering transactions on the fly much easier. 

