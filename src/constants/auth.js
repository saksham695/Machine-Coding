export const MOCK_USERS = [
  {
    id: "u1",
    username: "deepanshu",
    password: "deepanshu",
    name: "Deepanshu",
    age: 42,
    gender: "male",
    bio: "CEO of a startup, loves to code and travel, loves to read books",
    interests: ["Books", "Hiking", "Art", "Yoga"],
    photo: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=800&q=80&auto=format&fit=crop"
  },
  {
    id: "u2",
    username: "Manas",
    password: "Manas",
    name: "Rohan",
    age: 29,
    gender: "male",
    bio: "Product designer. Trekking, typography, tea.",
    interests: ["Trekking", "Design", "Tea", "Photography"],
    photo: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=800&q=80&auto=format&fit=crop"
  }
];

export function validateLogin(username, password) {
  return (
    MOCK_USERS.find(
      (u) => u.username.toLowerCase() === String(username).toLowerCase() && u.password === password
    ) || null
  );
} 