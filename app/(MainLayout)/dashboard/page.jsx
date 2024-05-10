import { Suspense } from 'react';
import styles from './dashboard.module.css'
import UserProfile from '@/components/userProfile/userProfile';
import UserEvents from '@/components/userEvents/userEvents';
import AttendingEvents from '@/components/attendingEvents/attendingEvents';
import ExploreEvents from '@/components/exploreEvents/exploreEvents';

const DashboardPage = async () => {

  return (
    <div className={styles.container}>
      <div className={styles.rightCol}>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <UserProfile/>
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <UserEvents/>
          </Suspense>
        </div>
      </div>
      <div className={styles.leftCol}>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <AttendingEvents/>
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <ExploreEvents/>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;