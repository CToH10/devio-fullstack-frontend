'use client'
import { Field } from "../Field"

export const SearchBar = () => {
  return <section className="searchBar flex flex-col gap-4 w-full max-w-72 md:max-w-96 lg:self-start">
    <Field
      id="search"
      label="Seja bem vindo!"
      placeholder="O que você procura?"
      labelClass="text-size_3_32"
      onChange={(e) => console.log(e.target.value)
      } />
  </section>
}
