"use server";

export async function signUp(formData) {
  try {
  } catch (error) {
    console.error("Error createing user: ", error);

    return {
      success: false,
      messgae: "Failed to create an account",
    };
  }
}

export async function submitLoginForm(previousState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  console.log(email, password);

  return "error!";
}
