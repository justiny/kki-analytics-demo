const data = [
  {
    userId: 'user1@example.com',
    clickEvents: 10,
    navClicks: 5,
    videoClicks: 20,
    accordionClicks: 2,
    tutorialClicks: 7,
  },
  {
    userId: 'user2@example.com',
    clickEvents: 15,
    navClicks: 8,
    videoClicks: 25,
    accordionClicks: 3,
    tutorialClicks: 9,
  },
  {
    userId: 'user3@example.com',
    clickEvents: 12,
    navClicks: 7,
    videoClicks: 30,
    accordionClicks: 4,
    tutorialClicks: 6,
  },
  {
    userId: 'user4@example.com',
    clickEvents: 20,
    navClicks: 10,
    videoClicks: 35,
    accordionClicks: 5,
    tutorialClicks: 8,
  },
  {
    userId: 'user5@example.com',
    clickEvents: 25,
    navClicks: 12,
    videoClicks: 40,
    accordionClicks: 6,
    tutorialClicks: 10,
  },
  {
    userId: 'user6@example.com',
    clickEvents: 18,
    navClicks: 9,
    videoClicks: 45,
    accordionClicks: 7,
    tutorialClicks: 11,
  },
  {
    userId: 'user7@example.com',
    clickEvents: 30,
    navClicks: 15,
    videoClicks: 50,
    accordionClicks: 8,
    tutorialClicks: 12,
  },
  {
    userId: 'user8@example.com',
    clickEvents: 35,
    navClicks: 18,
    videoClicks: 55,
    accordionClicks: 9,
    tutorialClicks: 13,
  },
  {
    userId: 'user9@example.com',
    clickEvents: 40,
    navClicks: 20,
    videoClicks: 60,
    accordionClicks: 10,
    tutorialClicks: 14,
  },
  {
    userId: 'user10@example.com',
    clickEvents: 45,
    navClicks: 22,
    videoClicks: 65,
    accordionClicks: 11,
    tutorialClicks: 15,
  },
  {
    userId: 'user11@example.com',
    clickEvents: 50,
    navClicks: 25,
    videoClicks: 70,
    accordionClicks: 12,
    tutorialClicks: 16,
  },
  {
    userId: 'user12@example.com',
    clickEvents: 55,
    navClicks: 27,
    videoClicks: 75,
    accordionClicks: 13,
    tutorialClicks: 17,
  },
  {
    userId: 'user13@example.com',
    clickEvents: 60,
    navClicks: 30,
    videoClicks: 80,
    accordionClicks: 14,
    tutorialClicks: 18,
  },
  {
    userId: 'user14@example.com',
    clickEvents: 65,
    navClicks: 32,
    videoClicks: 85,
    accordionClicks: 15,
    tutorialClicks: 19,
  },
  {
    userId: 'user15@example.com',
    clickEvents: 70,
    navClicks: 35,
    videoClicks: 90,
    accordionClicks: 16,
    tutorialClicks: 20,
  },
  {
    userId: 'user16@example.com',
    clickEvents: 75,
    navClicks: 37,
    videoClicks: 95,
    accordionClicks: 17,
    tutorialClicks: 21,
  },
  {
    userId: 'user17@example.com',
    clickEvents: 80,
    navClicks: 40,
    videoClicks: 100,
    accordionClicks: 18,
    tutorialClicks: 22,
  },
  {
    userId: 'user18@example.com',
    clickEvents: 85,
    navClicks: 42,
    videoClicks: 105,
    accordionClicks: 19,
    tutorialClicks: 23,
  },
  {
    userId: 'user19@example.com',
    clickEvents: 90,
    navClicks: 45,
    videoClicks: 110,
    accordionClicks: 20,
    tutorialClicks: 24,
  },
  {
    userId: 'hvcostco@aol.com',
    clickEvents: 95,
    navClicks: 47,
    videoClicks: 115,
    accordionClicks: 21,
    tutorialClicks: 25,
  },
];

function randomizeId() {
  const dataCopy = [...data];
  const names = [
    'johnS',
    'jane-wentworth',
    'havery-dent',
    'smith-jones',
    'alex-thomas',
    'sarah39jda',
    'pauldk_122',
    'linda_runs',
  ]; // Add more names as needed

  // loop over the data and randomize the userId
  for (let i = 0; i < dataCopy.length; i++) {
    const randomName = names[Math.floor(Math.random() * names.length)];
    dataCopy[i].userId = `${randomName}@example.com`;
  }
  return dataCopy;
}

export const clicksClientData = randomizeId();
