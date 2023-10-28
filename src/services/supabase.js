import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ekzrhsnyjzkaewhkicgf.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrenJoc255anprYWV3aGtpY2dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgxNzAwNDUsImV4cCI6MjAxMzc0NjA0NX0.Uhn4kV9g57IiRxdFsUPktjSQ3pn4g9uh3CFL1E5n9RA";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;