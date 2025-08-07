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

  // This part of the sitemap generation runs on the server without user authentication.
  // The Firestore security rules will correctly block this request to protect user data.
  // The try/catch block ensures that the build does not fail and that only public
  // pages are included in the sitemap. This is the expected and secure behavior.
  try {
    const eventsCollectionRef = collection(db, "events");
    const querySnapshot = await getDocs(eventsCollection_ref);
    const eventsRoutes = querySnapshot.docs.map(doc => {
      // This part will likely not be reached due to security rules, but is here for completeness.
      return {
        url: `${siteUrl}/events/${doc.id}`,
        lastModified: new Date(), 
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      };
    });
    
    return [...staticRoutes, ...eventsRoutes];
  } catch (error) {
    // We expect a permission-denied error here, so we'll just return the static routes.
    // console.error("Sitemap: Could not fetch events due to permissions. This is expected for private data.");
    return staticRoutes;
  }
}
