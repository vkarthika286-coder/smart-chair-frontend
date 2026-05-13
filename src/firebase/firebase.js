import { initializeApp } from "firebase/app"

import {
  getDatabase
} from "firebase/database"

const firebaseConfig = {

  apiKey: "AIzaSyDx9-TEvF_lb7txUOrzGm3hffUnOuT9xPo",

  authDomain:
    "smart-chair-dashboard.firebaseapp.com",

  databaseURL:
    "https://smart-chair-dashboard-default-rtdb.firebaseio.com",

  projectId:
    "smart-chair-dashboard",

  storageBucket:
    "smart-chair-dashboard.firebasestorage.app",

  messagingSenderId:
    "153175179155",

  appId:
    "1:153175179155:web:b0097260eb6a8e9fa57266"

}

const app =
  initializeApp(firebaseConfig)

export const database =
  getDatabase(app)