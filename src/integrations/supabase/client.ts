// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://thhwslbolpfftbztazic.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoaHdzbGJvbHBmZnRienRhemljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MTkwODQsImV4cCI6MjA2MDk5NTA4NH0.vVk0jIjJcxWV0E08tuL2XR8hxXAzb2M4O1qyZD4z4ek";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);