let UserList = [
  {
    id: "1",
    name: "David Warner",
    username: "pushpa",
    age: 36,
    nationality: "AUSTRALIA",
    favouriteMovies:["Animal","Dunki"]
  },
  {
    id: "2",
    name: "Rohit Sharma",
    username: "hitman45",
    age: 34,
    nationality: "INDIA",
    friends:["3","4"],
    favouriteMovies:["Dunki","Salaar"]
  },
  {
    id: "3",
    name: "Rinku Singh",
    username: "rinku",
    age: 25,
    nationality: "INDIA",
    friends:["4"],
    favouriteMovies:["Bade Miyan Chote Miya"]
  },
  {
    id: "4",
    name: "Virat Kohli",
    username: "king",
    age: 35,
    nationality: "INDIA",
    friends:["3"],
    favouriteMovies:["Sam Bahadur","Bade Miyan Chote Miya"]
  },
  {
    id: "5",
    name: "Chris Gayle",
    username: "Boss",
    age: 42,
    nationality: "JAMICA",
    favouriteMovies:["Animal","Dunki","Bade Miyan Chote Miya","Salaar"]
  },
];

let MovieList = [
    {
        id:"1",
        title: "Animal",
        yearOfRelease: 2023,
        inTheater: false,
        languages: ["Hindi","Telugu","Kannada"]
    },
    {
        id:"2",
        title: "Dunki",
        yearOfRelease: 2023,
        inTheater: true,
        languages: ["Hindi"]
    },
    {
        id:"3",
        title: "Sam Bahadur",
        yearOfRelease: 2023,
        inTheater: false,
        languages: ["Hindi"]
    },
    {
        id:"4",
        title: "Salaar",
        yearOfRelease: 2023,
        inTheater: true,
        languages: ["Hindi","Telugu","Kannada","Tamil","Malayalum"]
    },
    {
        id:"5",
        title: "Bade Miyan Chote Miya",
        yearOfRelease: 2024,
        inTheater: true,
        languages: ["Hindi"]
    },
]

export default {UserList,MovieList}
