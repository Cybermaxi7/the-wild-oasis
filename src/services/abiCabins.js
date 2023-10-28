import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded");
    }
    return data;
}

export async function createCabin(newCabin) {
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        "/",
        ""
    );
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // https://ekzrhsnyjzkaewhkicgf.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
    // 1. Create Cabin
    const { data, error } = await supabase
        .from("cabins")
        .insert([{ ...newCabin, image: imagePath }])
        .select();

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be updated");
    }

    // 2. Upload Image

    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);

    // 3. Delete the cabin if there was an error uploading the image
    if (storageError) {
        await supabase.from("cabins").delete().eq("id", data.id);
        console.error(storageError);
        throw new Error(
            "Cabin image could not be uploaded and the cabin was not created"
        );
    }
    return data;
}

export async function deleteCabin(id) {
    const { error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be deleted");
    }
}
