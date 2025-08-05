import { MetadataRoute } from 'next'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Event } from '@/lib/types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = 'https://finflow-knjbt.web.app';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${siteUrl}/analysis`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  try {
    const eventsCollectionRef = collection(db, "events");
    const querySnapshot = await getDocs(eventsCollectionRef);
    const eventsRoutes = querySnapshot.docs.map(doc => {
      const event = doc.data() as Event;
      // We don't have a last modified date for events, so we'll use the current date
      // In a real app, you would store a timestamp on the event document
      return {
        url: `${siteUrl}/events/${doc.id}`,
        lastModified: new Date(), 
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      };
    });
    
    return [...staticRoutes, ...eventsRoutes];
  } catch (error) {
    console.error("Failed to generate sitemap for events:", error);
    return staticRoutes;
  }
}
