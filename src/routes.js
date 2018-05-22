import Home from './components/Home.vue';
import Chat from './components/Chat.vue';
import SetPreferences from './components/SetPreferences.vue';
import About from './components/About.vue';
import Leaderboard from './components/Leaderboard.vue';
import Articles from './components/Articles.vue';

export const routes = [
  { path: '', component: Home },
  { path: '/chat', component: Chat },
  { path: '/setPreferences', component: SetPreferences },
  { path: '/about', component: About },
  { path: '/leaderboard', component: Leaderboard },
  { path: '/articles', component: Articles },
];
