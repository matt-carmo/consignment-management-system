"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useState } from "react";
import api from "../lib/api/fetcher";

export default function Login() {

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleLogin = async () => {
      const res = await api.post('/auth/login', form)
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token)
        window.location.href = '/'
      }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Entre com sua conta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input onChange={(e) => setForm({...form, email: e.target.value})} id="email" type="email" placeholder="seu@email.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input onChange={(e) =>setForm({...form, password: e.target.value})} id="password" type="password" placeholder="••••••••" />
          </div>
          <Button type="button" onClick={handleLogin} className="w-full mt-2">Entrar</Button>
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <a href="#">Esqueceu a senha?</a>
            <a href="#">Criar conta</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
