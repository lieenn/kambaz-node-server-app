export default function Hello(app) {
  app.get("/hello", (req, res) => {
    res.send("<h1> Hello World! <h1>");
  });
  app.get("/home", (req, res) => {
    res.send("Welcome to the home page");
  });
  app.get("/", (req, res) => {
    res.send("Welcome to Full Stack Development!");
  });
}
