import { CreateEventParams } from "@/types"
import { connectToDatabase } from "@/lib/database"
import User from "@/lib/database/models/user.model"
import { handleError } from "@/lib/utils"
import Event from '@/lib/database/models/event.model'

// CREATE
export const createEvent = async ({ userId, event, path }: CreateEventParams) => {
    try {
     await connectToDatabase()
      
      const organizer = await User.findById(userId);
      
      if (!organizer) {
        throw new Error('Organizer not found')
      }

      const newEvent = await Event.create({
         ...event,
         category: event.categoryId,
         organizer: userId
      });
      
  
      return JSON.parse(JSON.stringify(newEvent))
    } catch (error) {
      handleError(error)
    }
  }