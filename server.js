var cors = require("cors");
const jsonServer = require("json-server");
const auth = require("json-server-auth");
const faker = require("faker");
const app = jsonServer.create();

faker.locale = "pt_BR";

const rules = auth.rewriter({
  "/users*": "/666/users$1",
  "/products*": "/640/products$1",
});

// const generateData = () => {
//   let data = { users: [] };
//   for (let i = 1; i <= 20; i++) {
//     data.users.push({
//       id: i,
//       firstName: faker.name.firstName(),
//       lastName: faker.name.lastName(),
//       email: faker.internet.email(),
//       avatarUrl: faker.image.avatar(),
//     });
//   }
//   return data;
// };

const generateData = () => {
  let data = {
    posts: [],
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
  for (let i = 1; i <= 200; i++) {
    data.posts.push({
      id: i,
      title: faker.lorem.sentence(),
      time: Math.floor(Math.random() * 6 + 1),
      imageUrl: `https://placeimg.com/640/480/tech?random=${Math.round(
        Math.random() * 1000
      )}`,
      author: {
        name: faker.name.findName(),
        avatarUrl: faker.internet.avatar(),
        job: faker.name.jobTitle(),
        company: faker.company.companyName(),
      },
    });
  }
  return data;
};

const router = jsonServer.router(generateData());
const port = process.env.PORT || 3001;

app.db = router.db;

app.use(cors());
app.use(rules);
app.use(auth);
app.use(router);
app.listen(port);

console.log("Server is running on port:", port);
