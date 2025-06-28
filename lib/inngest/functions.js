import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { name: "Hello World Function" },
  { event: "test/hello.world" },
  async ({ event }) => {
    console.log("Event received:", event);
    return { message: "Hello from Inngest!" };
  }
);

export const yourFunctions = [helloWorld];
