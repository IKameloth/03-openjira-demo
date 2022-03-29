interface SeedData {
    entries: SeedEntry[]
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number
}

export const seedData = {
  entries: [
    {
      description: "Esto es una descripcion default 1",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description: "Esto es una descripcion default 2",
      status: "in-progress",
      createdAt: Date.now() - 1000000,
    },
    {
      description: "Esto es una descripcion default 3",
      status: "finished",
      createdAt: Date.now() - 100000,
    },
  ],
};
