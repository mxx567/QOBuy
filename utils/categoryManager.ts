import { useState } from "react";
import { supabase } from "./supabase";


export async function getSubCategories() {
    const { data,error } = await supabase.from('subcategories').select("*");
    if(error){
        console.log(error.message)
    }
    else{
        if(data){
            return data;
        }
    }
    return null
}


export async function getCategories() {
    const { data,error } = await supabase.from('categories').select("*");
    if(error){
        console.log(error.message)
    }
    else{
        if(data){
            return data;
        }
    }
    return null
}