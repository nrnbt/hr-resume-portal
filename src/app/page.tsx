'use server'
 
import { redirect } from 'next/navigation'
 
const Home = async() => {
  try {
    // Call database
  } catch (error) {
    // Handle errors
  }
 
  redirect(`/resume`)
}

export default Home