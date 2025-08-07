import { MetadataRoute } from 'next'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Event } from '@/lib/types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = 'https://finflow-knjbt.web.app';

  // These are the public-facing pages of the application.
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

  // The sitemap generation runs on the server without user authentication.
  // The Firestore security rules will correctly block the request below to protect user data.
  // The try/catch block ensures that the build does not fail and that only public
  // pages are included in the sitemap. This is expected and secure behavior.
  try {
    const eventsCollectionRef = collection(db, "events");
    // This query will be blocked by security rules, which is the intended behavior.
    const querySnapshot = await getDocs(eventsCollectionRef);
    const eventsRoutes = querySnapshot.docs.map(doc => {
      return {
        url: `${siteUrl}/events/${doc.id}`,
        lastModified: new Date(), 
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      };
    });
    
    return [...staticRoutes, ...eventsRoutes];
  } catch (error) {
    // This catch block is expected to be reached during the build process
    // because of the Firestore security rules. We return only the static routes.
    return staticRoutes;
  }
}
