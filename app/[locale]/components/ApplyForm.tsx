"use client";

import { useState } from "react";

type Props = {
  labels: {
    title: string;
    name: string;
    email: string;
    phone: string;
    city: string;
    experience: string;
    submit: string;
    note: string;
  };
};

const sanitizeText = (value: string) =>
  value.replace(/[<>]/g, "").replace(/\s+/g, " ").trim();

export default function ApplyForm({ labels }: Props) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    experience: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormState((prev) => ({
      ...prev,
      [name]: sanitizeText(value),
    }));
  };

  return (
    <form
      className="mt-8 grid gap-5 rounded-3xl bg-white/80 p-6 shadow-[0_30px_80px_rgba(17,18,20,0.12)] backdrop-blur"
      aria-label={labels.title}
      method="post"
    >
      <div className="grid gap-2">
        <label className="text-sm font-semibold" htmlFor="name">
          {labels.name}
        </label>
        <input
          className="h-12 rounded-2xl border border-black/10 bg-white px-4 text-sm"
          id="name"
          name="name"
          autoComplete="name"
          maxLength={60}
          minLength={2}
          required
          value={formState.name}
          onChange={handleChange}
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-semibold" htmlFor="email">
          {labels.email}
        </label>
        <input
          className="h-12 rounded-2xl border border-black/10 bg-white px-4 text-sm"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={80}
          required
          value={formState.email}
          onChange={handleChange}
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-semibold" htmlFor="phone">
          {labels.phone}
        </label>
        <input
          className="h-12 rounded-2xl border border-black/10 bg-white px-4 text-sm"
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={20}
          pattern="[0-9+()\\-\\s]{7,20}"
          required
          value={formState.phone}
          onChange={handleChange}
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-semibold" htmlFor="city">
          {labels.city}
        </label>
        <input
          className="h-12 rounded-2xl border border-black/10 bg-white px-4 text-sm"
          id="city"
          name="city"
          autoComplete="address-level2"
          maxLength={50}
          required
          value={formState.city}
          onChange={handleChange}
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-semibold" htmlFor="experience">
          {labels.experience}
        </label>
        <textarea
          className="min-h-[120px] rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
          id="experience"
          name="experience"
          maxLength={400}
          value={formState.experience}
          onChange={handleChange}
        />
      </div>
      <button
        className="mt-2 h-12 rounded-full bg-[#FF7200] px-6 text-sm font-semibold text-white transition hover:-translate-y-px hover:bg-black"
        type="submit"
      >
        {labels.submit}
      </button>
      <p className="text-xs text-black/70">{labels.note}</p>
    </form>
  );
}
