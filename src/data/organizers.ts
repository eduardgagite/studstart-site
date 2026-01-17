export type Organizer = {
  id: string;
  name: string;
  role: string;
  photo: string;
};

export const organizerRoles = [
  "Куратор",
  "Организатор",
  "Волонтер",
  "Спикер",
];

export const organizers: Organizer[] = Array.from({ length: 20 }).map((_, index) => ({
  id: `org-${index + 1}`,
  name: `Имя Фамилия ${index + 1}`,
  role: organizerRoles[index % organizerRoles.length],
  photo: "/images/placeholder-avatar.svg",
}));
