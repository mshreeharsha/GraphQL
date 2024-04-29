let UserList = [
  {
    id: "1",
    name: "David Warner",
    username: "pushpa",
    age: 36,
    nationality: "AUSTRALIA",
    favouriteMovies:["1"]
  },
  {
    id: "2",
    name: "Rohit Sharma",
    username: "hitman45",
    age: 34,
    nationality: "INDIA",
    friends:["3","4"],
    favouriteMovies:["2","4"]
  },
  {
    id: "3",
    name: "Rinku Singh",
    username: "rinku",
    age: 25,
    nationality: "INDIA",
    friends:["4"],
    favouriteMovies:["5"]
  },
  {
    id: "4",
    name: "Virat Kohli",
    username: "king",
    age: 35,
    nationality: "INDIA",
    friends:["3"],
    favouriteMovies:["3","5"]
  },
  {
    id: "5",
    name: "Chris Gayle",
    username: "Boss",
    age: 42,
    nationality: "JAMICA"
  },
];

let MovieList = [
    {
        id:"1",
        title: "Animal",
        yearOfRelease: 2023,
        inTheaters: false,
        languages: ["Hindi","Telugu","Kannada"]
    },
    {
        id:"2",
        title: "Dunki",
        yearOfRelease: 2023,
        inTheaters: true,
        languages: ["Hindi"]
    },
    {
        id:"3",
        title: "Sam Bahadur",
        yearOfRelease: 2023,
        inTheaters: false,
        languages: ["Hindi"]
    },
    {
        id:"4",
        title: "Salaar",
        yearOfRelease: 2023,
        inTheaters: true,
        languages: ["Hindi","Telugu","Kannada","Tamil","Malayalum"]
    },
    {
        id:"5",
        title: "Bade Miyan Chote Miya",
        yearOfRelease: 2024,
        inTheaters: true,
        languages: ["Hindi"]
    },
]

export default {UserList,MovieList}
