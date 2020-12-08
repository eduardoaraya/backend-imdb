'use strict';

const data = [
  {
    name: 'Thor: Ragnarok (2017)',
    genre: 'Action, Adventure, Comedy',
    description: 'Imprisoned on the planet Sakaar, Thor must race against time to return to Asgard and stop Ragnarök, the destruction of his world, at the hands of the powerful and ruthless villain Hela.',
    directors: 'Taika Waititi',
    actors: 'Chris Hemsworth, Tom Hiddleston, Cate Blanchett',
    link_video: 'https://youtu.be/ue80QwXMRHg',
    link_picture: 'https://upload.wikimedia.org/wikipedia/pt/7/7d/Thor_Ragnarok_poster.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Batman: O Cavaleiro das Trevas (2008)',
    genre: 'Action, Crime, Drama ',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    directors: 'Christopher Nolan',
    actors: ' Christian Bale, Heath Ledger, Aaron Eckhart',
    link_video: 'https://youtu.be/a-PVBsmiB0Y',
    link_picture: 'https://upload.wikimedia.org/wikipedia/pt/thumb/d/d1/The_Dark_Knight.jpg/250px-The_Dark_Knight.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Matrix (1999)',
    genre: 'Action',
    description: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.',
    directors: 'Lana Wachowski',
    actors: 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss',
    link_video: 'https://youtu.be/2KnZac176Hs',
    link_picture: 'https://img.ibxk.com.br/2019/03/29/matrix-29123652555016.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('movies', data);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('movies', null, {});
  }
};
