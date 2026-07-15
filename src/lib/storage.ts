import { supabase } from "./supabase";

const BUCKET = "construction-images";

export async function uploadImage(
  file: File,
  folder: string = "general"
): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

  const { error } = await supabase.storage.from(BUCKET).upload(fileName, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw new Error(error.message);

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
  return urlData.publicUrl;
}

export async function deleteImage(url: string): Promise<void> {
  const path = url.split(`${BUCKET}/`)[1];
  if (!path) return;
  await supabase.storage.from(BUCKET).remove([path]);
}
