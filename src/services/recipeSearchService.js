import { supabase } from "../lib/supabase";

export async function getRecips() {
  const { data, error } = await supabase
    .from("recipes")
    .select(`
      id,
      image_url,
      title,
      description,
      servings,
      cooking_time,
      difficulty
      `)
      .order("created_at",{ ascending: false});
      
      if (error){
        throw error;
      }

      return data ?? [];
}
