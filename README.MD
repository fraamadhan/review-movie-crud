# Movie Review

### CRUD MOVIE REVIEW BASED CLI ARGS

<p>A short explanation, this simple application simulates how crud works in node js and the JSON file act as a database. </p>

## Requirements

<ol>
    <li>Node JS v20.15.1^</li>
    <li>NPM v10.7^</li>
    <li>Git</li>
</ol>

## Installation

1. Clone the repository
2. Install the dependencies

```bash
npm install
```

3. Run the application using `node app`

## Notes

> For the phone number field, please use Indonesia local phone number.

### Tutorial how to give an input for this application

1. Create

```bash
node app add --name="John Doe" --email=johndoe@gmail.com --phoneNumber=0812139219 --review="The Lord of The Rings is a good movie with beautiful in it!"
```

2. Get All Data

```bash
node app list
```

2. Get All Data By Email or Name

```bash
node app detail --name="John Doe" OR --email=johndoe@gmail.com //optional if you want to use email or name, choose one
```

3. Delete Data By Name

```bash
node app delete --name="John Doe"
```

4. Update data by name

```bash
node app update --name="John Doe" --phoneNumber="0897171717"
```
