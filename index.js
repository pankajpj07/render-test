const express = require("express");
let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: false,
  },
  {
    content: "Someting is not working",
    important: false,
    id: 4,
  },
  {
    content: "There is something we can discuss right now",
    important: false,
    id: 5,
  },
  {
    content: "Nothing to discuss",
    important: false,
    id: 6,
  },
  {
    content: "Something is working",
    important: false,
    id: 7,
  },
  {
    content: "Something",
    important: false,
    id: 8,
  },
  {
    content: "Pankaj",
    important: false,
    id: 9,
  },
  {
    content: "Let's see if this time it works or not",
    important: true,
    id: 10,
  },
];
const app = express();
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};
app.use(express.json());
app.use(requestLogger);

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.post("/api/notes", (req, res) => {
  const note = req.body;
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;
  note.id = maxId + 1;
  notes.push(note);
  res.json(note);
});

app.put("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const newNote = req.body;
  notes = notes.map((note) => (note.id !== id ? note : newNote));
  res.json(newNote);
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log("something is working on port", PORT));
