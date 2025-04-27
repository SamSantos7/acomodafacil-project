
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(https://kdsgpfenfscwibhocper.supabase.co, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkc2dwZmVuZnNjd2liaG9jcGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyODg2MDIsImV4cCI6MjA2MDg2NDYwMn0.9rmxySLTBU5Hx_sU8RTqDt9uygszaCcVTtjZR6PJ38Y)
