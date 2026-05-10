"use client";
import { useActionState } from "react";

import { StrapiImage } from "./StrapiImage";
import { SubmitButton } from "./SubmitButton";
import { Block } from "../types";
import { eventsSubscribeAction } from "../data/actions";
import { SectionRenderer } from "./SectionRenderer";
import { formatDate } from "../utils/format-date";

const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  errorMessage: null,
  successMessage: null,
  formData: null,
};

interface TextInputProps {
  id: string;
  label: string;
  name: string;
  type?: string;
  error?: string;
  defaultValue?: string;
}

function TextInput({
  id,
  label,
  name,
  type = "text",
  error,
  defaultValue,
}: TextInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xl font-semibold text-slate-700 mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className="w-full rounded-2xl border border-slate-300 bg-slate-100 px-4 py-3 text-xl text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        defaultValue={defaultValue}
      />
      {error && (
        <p className="mt-2 bg-red-500 px-3 py-2 text-sm text-white flex flex-col gap-4">
          {error}
        </p>
      )}
    </div>
  );
}

export function EventSignupForm({
  blocks,
  eventId,
  startDate,
  price,
  image,
}: {
  blocks: Block[];
  eventId: string;
  startDate?: string;
  price?: string;
  image?: {
    url: string;
    alt: string;
  };
}) {
  const [formState, formAction] = useActionState(
    eventsSubscribeAction,
    INITIAL_STATE,
  );

  const zodErrors = formState?.zodErrors;
  const strapiErrors = formState?.strapiErrors?.message;
  const successMessage = formState?.successMessage;

  return (
    <section className="grid gap-20 md:grid-cols-2">
      <div className="space-y-6">
        <SectionRenderer blocks={blocks} />
      </div>

      <div className="flex flex-col gap-8">
        <form
          className="space-y-6 rounded-[28px] bg-white p-6 shadow-inner"
          action={formAction}
        >
          {image && (
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <StrapiImage
                src={image.url}
                alt={image.alt}
                height={200}
                width={200}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput
              id="firstName"
              label="First Name"
              name="firstName"
              error={zodErrors?.firstName}
              defaultValue={formState?.formData?.firstName ?? ""}
            />
            <TextInput
              id="lastName"
              label="Last Name"
              name="lastName"
              error={zodErrors?.lastName}
              defaultValue={formState?.formData?.lastName ?? ""}
            />
          </div>
          <TextInput
            id="email"
            label="Email"
            name="email"
            type="email"
            error={zodErrors?.email}
            defaultValue={formState?.formData?.email ?? ""}
          />
          <TextInput
            id="phone"
            label="Phone"
            name="telephone"
            type="text"
            error={zodErrors?.telephone}
            defaultValue={formState?.formData?.telephone ?? ""}
          />
          <input hidden type="text" name="eventId" defaultValue={eventId} />
          <SubmitButton
            text="Sign Up"
            className="w-full rounded-2xl bg-teal-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-teal-700"
          />
          {strapiErrors && (
            <p className=" bg-red-500 px-4 py-3 text-sm text-white shadow-sm flex flex-col gap-4">
              {strapiErrors}
            </p>
          )}
          {successMessage && (
            <p className=" bg-green-500 px-4 py-3 text-sm text-white shadow-sm">
              {successMessage}
            </p>
          )}
        </form>

        <div className="flex flex-col gap-3">
          {startDate && (
          <p className="rounded-2xl bg-slate-100 p-4 text-xl text-slate-700">
            <span className="font-semibold">Start Date:</span>{" "}
            {formatDate(startDate)}
          </p>
        )}
        {price && (
          <p className="rounded-2xl bg-slate-100 p-4 text-xl text-slate-700">
            <span className="font-semibold">Price:</span> ${price}
          </p>
        )}
        </div>
      </div>
    </section>
  );
}
