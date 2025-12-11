import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const userId = "c5896c18-af09-437e-8f7f-81325fb647f5";
const movies = [
  {
    title: "The Matrix",
    overview:
      "A hacker discovers the shocking truth about a simulated reality and joins a rebellion.",
    releaseYear: 1999,
    genres: ["Action", "Sci-Fi"],
    runtime: 136,
    posterUrl: "https://example.com/matrix.jpg",
    createdBy: userId,
  },
  {
    title: "Inception",
    overview:
      "A skilled thief infiltrates dreams to steal secrets but faces the mission of planting an idea.",
    releaseYear: 2010,
    genres: ["Sci-Fi", "Thriller"],
    runtime: 148,
    posterUrl: "https://example.com/inception.jpg",
    createdBy: userId,
  },
  {
    title: "Interstellar",
    overview:
      "A group of astronauts travel through a wormhole in search of a new home for humanity.",
    releaseYear: 2014,
    genres: ["Sci-Fi", "Adventure"],
    runtime: 169,
    posterUrl: "https://example.com/interstellar.jpg",
    createdBy: userId,
  },
  {
    title: "The Dark Knight",
    overview:
      "Batman faces his greatest psychological and physical challenge in the form of the Joker.",
    releaseYear: 2008,
    genres: ["Action", "Crime"],
    runtime: 152,
    posterUrl: "https://example.com/darkknight.jpg",
    createdBy: userId,
  },
  {
    title: "Avatar",
    overview:
      "A wounded marine travels to Pandora and becomes part of an alien tribe.",
    releaseYear: 2009,
    genres: ["Sci-Fi", "Adventure"],
    runtime: 162,
    posterUrl: "https://example.com/avatar.jpg",
    createdBy: userId,
  },
  {
    title: "Gladiator",
    overview:
      "A betrayed Roman general seeks revenge against the corrupt emperor who murdered his family.",
    releaseYear: 2000,
    genres: ["Action", "Drama"],
    runtime: 155,
    posterUrl: "https://example.com/gladiator.jpg",
    createdBy: userId,
  },
  {
    title: "The Shawshank Redemption",
    overview:
      "Two imprisoned men bond over years, finding solace and redemption.",
    releaseYear: 1994,
    genres: ["Drama"],
    runtime: 142,
    posterUrl: "https://example.com/shawshank.jpg",
    createdBy: userId,
  },
  {
    title: "Fight Club",
    overview:
      "A depressed man meets a mysterious soap salesman and forms an underground fight club.",
    releaseYear: 1999,
    genres: ["Drama", "Thriller"],
    runtime: 139,
    posterUrl: "https://example.com/fightclub.jpg",
    createdBy: userId,
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    overview: "A young hobbit embarks on a journey to destroy a powerful ring.",
    releaseYear: 2001,
    genres: ["Fantasy", "Adventure"],
    runtime: 178,
    posterUrl: "https://example.com/lotr1.jpg",
    createdBy: userId,
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    overview: "The fate of Middle-earth hangs as ultimate battles unfold.",
    releaseYear: 2003,
    genres: ["Fantasy", "Adventure"],
    runtime: 201,
    posterUrl: "https://example.com/lotr3.jpg",
    createdBy: userId,
  },
  {
    title: "Titanic",
    overview:
      "A wealthy woman and a young artist fall in love aboard the ill-fated Titanic.",
    releaseYear: 1997,
    genres: ["Drama", "Romance"],
    runtime: 195,
    posterUrl: "https://example.com/titanic.jpg",
    createdBy: userId,
  },
  {
    title: "The Social Network",
    overview:
      "The story of the creation of Facebook and the lawsuits that followed.",
    releaseYear: 2010,
    genres: ["Drama", "Biography"],
    runtime: 120,
    posterUrl: "https://example.com/socialnetwork.jpg",
    createdBy: userId,
  },
  {
    title: "Dune",
    overview:
      "A gifted young man must travel to a dangerous desert planet to secure the future of his people.",
    releaseYear: 2021,
    genres: ["Sci-Fi", "Adventure"],
    runtime: 155,
    posterUrl: "https://example.com/dune.jpg",
    createdBy: userId,
  },
  {
    title: "John Wick",
    overview:
      "A retired hitman seeks revenge after losing everything he cared for.",
    releaseYear: 2014,
    genres: ["Action", "Crime"],
    runtime: 101,
    posterUrl: "https://example.com/johnwick.jpg",
    createdBy: userId,
  },
  {
    title: "Whiplash",
    overview:
      "A young drummer faces a ruthless instructor while chasing greatness.",
    releaseYear: 2014,
    genres: ["Drama", "Music"],
    runtime: 106,
    posterUrl: "https://example.com/whiplash.jpg",
    createdBy: userId,
  },
];

const main = async () => {
  console.log("start seeding data ...");
  for (const movie of movies) {
    await prisma.movie.create({
      data: movie,
    });
    console.log(`created movie :${movie.title}`);
  }
  console.log("seeding completed ... :)");
};
main()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
