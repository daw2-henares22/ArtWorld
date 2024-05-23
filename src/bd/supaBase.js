
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qgycshlhhkjczxnjpwxi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFneWNzaGxoaGtqY3p4bmpwd3hpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0OTM4NDAsImV4cCI6MjAzMjA2OTg0MH0.rb3kvAkG8GLIiPiXmQmLjaF6JokTQUR4RQpIQzFY_vc'
export const supabase = createClient(supabaseUrl, supabaseKey)