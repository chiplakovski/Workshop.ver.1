// Supabase project connection.
//
// The "anon public" key is meant to be public — it is rate-limited and every
// table is protected by the Row Level Security policies defined in
// supabase/schema.sql, so this key alone cannot read or write data beyond
// what those policies allow. Never put the "service_role" key here or
// anywhere in this repo — that one bypasses all security rules.
//
// Fill these in following SETUP.md step 1-2.
const SUPABASE_URL = "https://waqyxcphlkzzbnxgfibt.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhcXl4Y3BobGt6emJueGdmaWJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3MTI4MDQsImV4cCI6MjEwNDI4ODgwNH0.3evzIHD_9qx07RBZZgOQg8kgBsccEUulp-9P53vs_zE";
