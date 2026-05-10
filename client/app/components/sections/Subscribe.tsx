"use client";
import { subscribeAction } from "@/app/data/actions";
import { SubscribeProps } from "@/app/types";
import { useActionState } from "react";

const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  errorMessage: null,
  successMessage: null,
};

export function Subscribe({
  headline,
  content,
  placeholder,
  buttonText,
}: Readonly<SubscribeProps>) {
  const [formState, formAction] = useActionState(
    subscribeAction,
    INITIAL_STATE,
  );

  console.log(formState, "this is our form state coming from useActionState");
  const zodErrors = formState?.zodErrors?.email;
  const strapiErrors = formState?.strapiErrors?.message;

  const errorMessage =
    strapiErrors ||
    (zodErrors ? zodErrors[0] : null) ||
    formState?.errorMessage;
  const successMessage = formState?.successMessage;

  return (
    <section className="bg-orange-100 max-w-7xl mx-auto p-10 flex flex-col md:flex-row items-center gap-10 mb-20 rounded-xl relative">
      <div className="flex-3 flex flex-col gap-4">
        <h4 className="text-3xl">{headline}</h4>
        <p className="copy">{content}</p>
      </div>
      <form
        className="flex-2 flex flex-col sm:flex-row w-full md:w-auto relative"
        action={formAction}
      >
        <input
          name="email"
          type="text"
          placeholder={placeholder}
          className="bg-white border-2 border-gray-400 py-3 px-5 flex-1 focus:outline-none focus:ring-2 focus:ring-turquoise-500"
        />
        <button
          type="submit"
          className="bg-turquoise text-white py-3 px-8 uppercase"
        >
          {buttonText}
        </button>
        {(errorMessage || successMessage) && (
          <div
            className={`absolute top-16 left-0 right-0 text-center p-4 text-white ${errorMessage ? "bg-red-500" : "bg-green-500"}`}
          >
            {errorMessage || successMessage}
          </div>
        )}
      </form>
    </section>
  );
}
