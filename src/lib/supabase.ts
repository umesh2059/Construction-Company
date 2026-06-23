import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lybttluflgqmqtzdmhwv.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5YnR0bHVmbGdxbXF0emRtaHd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4ODI0MjAsImV4cCI6MjA5NzQ1ODQyMH0.o4D73iFa0p2Ql4-PsCVLbiKwPT5Il2S3LYkKtwSGU-U";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);