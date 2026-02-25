"use server";
import { LoginFormSchema, RegisterFormSchema } from "../app/lib/definitions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function setAuthCookies(access: string, refresh: string) {
  const cookieStore = await cookies();
  const isProduction = process.env.NODE_ENV === "production";

  cookieStore.set("access_token", access, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  });

  cookieStore.set("refresh_token", refresh, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function registerAction(formData: FormData): Promise<void> {
  const API_BASE_URL = process.env.API_BASE_URL;

  const validatedFields = RegisterFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
  });
  if (!validatedFields.success) {
    return;
  }

  const response = await fetch(`${API_BASE_URL}/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedFields.data),
    cache: "no-store",
  });

  if (!response.ok) {
    return;
  }

  const loginAfterRegisterResponse = await fetch(`${API_BASE_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: validatedFields.data.username,
      password: validatedFields.data.password,
    }),
    cache: "no-store",
  });

  if (!loginAfterRegisterResponse.ok) {
    return;
  }

  const tokens = await loginAfterRegisterResponse.json();
  if (!tokens?.access || !tokens?.refresh) {
    return;
  }

  await setAuthCookies(tokens.access, tokens.refresh);
  redirect("/");
}

export async function loginAction(formData: FormData): Promise<void> {
  const API_BASE_URL = process.env.API_BASE_URL;

  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  })
  if (!validatedFields.success) {
    return;
  }

  const response = await fetch(`${API_BASE_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: validatedFields.data.username,email: validatedFields.data.email,password: validatedFields.data.password }),
    cache: "no-store",
  });
  if (!response.ok) {
    return;
  }

  const data = await response.json();
  if (!data?.access || !data?.refresh) {
    return;
  }

  await setAuthCookies(data.access, data.refresh);
  
  redirect("/");
}