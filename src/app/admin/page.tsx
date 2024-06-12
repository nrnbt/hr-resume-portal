'use server'
 
import { redirect } from 'next/navigation'
 
const Home = async() => {
  try {
    // Call database
  } catch (error) {
    // Handle errors
  }
 
  redirect(`/admin/users`)
}

export default Home