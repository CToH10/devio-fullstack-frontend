import { Categories } from '@/components/Categories';
import { SearchBar } from '@/components/SearchBar';

export default function Home() {
  return (
    <>
      <SearchBar />
      <Categories />

      <button type="button" className="btn-big btn-green">
        Adicionar ao pedido
      </button>

      <button type="button" className="btn-big btn-green-outline">
        Adicionar ao pedido
      </button>

      <button type="button" className="btn-medium btn-green">
        Click me
      </button>

      <button type="button" className="btn-small btn-green-light">
        +
      </button>

      <button type="button" className="btn-small btn-red-light">
        +
      </button>

      <input type="text" placeholder="I'm hooked on a feeling" />

      <input type="email" placeholder="I'm hooked on a feeling" />

      <textarea
        name=""
        id=""
        cols={30}
        rows={10}
        className="input-style resize-none"
        placeholder="Adicione uma observação ao pedido"
      />
    </>
  );
}
