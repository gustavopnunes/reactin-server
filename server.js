var cors = require("cors");
const jsonServer = require("json-server");
const auth = require("json-server-auth");
const faker = require("faker-br");
const app = jsonServer.create();

const rules = auth.rewriter({
  "/users*": "/664/users$1",
  "/posts*": "/664/posts$1",
});

const generateData = () => {
  let data = {
    users: [
      {
        id: 1,
        email: "dev@mail.com",
        password:
          "$2a$10$f66IrtZ6A9k/Fkwqc/P2jOG2eMZdXbNhuGfpzQ0bsJD8g/rI9EEaG",
        firstName: "Gustavo",
        lastName: "Nunes",
        avatarUrl: "https://i.ibb.co/Lt9N2hB/software-developer-copy.png",
        job: "Desenvolvedor Front End",
        company: "Provi",
        firstLogin: false,
      },
    ],
  };
  return data;
};

console.log(generateData());

const router = jsonServer.router(generateData());
const port = process.env.PORT || 3001;

app.db = router.db;

app.use(cors());
app.use(rules);
app.use(auth);
app.use(router);
app.listen(port);

console.log("Server is running on port:", port);
