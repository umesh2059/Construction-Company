import type { project as Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: 1,
    title: "Smart City Project",
    location: "Bangalore",
    status: "Ongoing",
    description: "A comprehensive smart city initiative integrating IoT, sustainable infrastructure, and advanced urban planning to create a future-ready metropolitan experience.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
  },
  {
    id: 2,
    title: "Commercial Tower",
    location: "Mumbai",
    status: "Completed",
    description: "A 25-storey premium commercial tower featuring state-of-the-art office spaces, retail outlets, and modern amenities in the heart of Mumbai's business district.",
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80",
  },
  {
    id: 3,
    title: "Highway Expansion",
    location: "Delhi",
    status: "Planning",
    description: "A major highway expansion project aimed at decongesting city traffic by adding elevated corridors, service roads, and smart traffic management systems.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb68c7b4f?w=800&q=80",
  },
];
