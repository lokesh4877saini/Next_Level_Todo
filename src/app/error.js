"use client";

export default function Error({ error, reset }) {
  return (
    <div>
      <h2> <b>Hello</b> I am from Add to Do <br/></h2>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
