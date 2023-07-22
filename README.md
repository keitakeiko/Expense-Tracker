# Expense Tracker

This is Expense Tracker, which can helps user to check the periodic expenditure, maybe lowers costs, in other words, make more money.

## Features

Expense tracker allows user to accomplish the purpose via the following features:

1. Creates a personal account to see user's own expenditure.
2. Uses create, edit or remove function to builds expense list.
3. Filtering tool to browse records by category or month.

## Developing tools

- Node.js
- Express
- Express-handlebars
- Body-parser
- Express-session
- Passport
- Passport-local
- Passport-facebook
- Mongoose
- Connect-flash
- Bcryptjs
- Method-override
- Dayjs
- Dotenv
- Bootstrap

## Installing

1. Clone this repository to your local computer

```
 $git clone https://github.com/keitakeiko/Expense-Tracker.git
```

2. Changing the path into the directory you downloaded

```
 $cd Expense-Tracker
```

3. Install npm

```
 $npm install
```

4. create a folder, which is named .env. And set your own MONGODB_URI.

```
MONGODB_URI=XXX
```

5. Run record and category seeder

```
 $npm run seed
```

6. Run the development server

```
 $npm run dev
```

7. Once the following message shows in console, you may visit http://localhost:3000/ in your explorer to browse the website

```
 Express is running on http://localhost:3000
```
