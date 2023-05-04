import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import "../components/Home/pokedex/styles/pokeInfo.css";
import "../components/Home/pokedex/styles/pokeCard.css";
import pokedex from "../../public/pokedex.png";

const PokeInfo = () => {
  const { name } = useParams();

  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;

  const [pokemon, getPokemonByName, hasError] = useFetch(url);

  useEffect(() => {
    getPokemonByName();
  }, [name]);

  console.log(pokemon);

  return (
    <div className="dad-style">
      {hasError ? (
        <h1>This pokemon doesnt exist!!</h1>
      ) : (
        <>
          <header className="title-info">
            <img src={pokedex} alt="" />
          </header>
          <div className="style-img">
            <img
              className={`style-bg bg-${pokemon?.types[0].type.name}`}
              src={pokemon?.sprites.other["official-artwork"].front_default}
              alt=""
            />
          </div>
          <div className="style-head">
            <span className={`style-id color-${pokemon?.types[0].type.name}`}  >#{pokemon?.id}</span>
            <h2 className={`style-name color-${pokemon?.types[0].type.name}`}>{pokemon?.name}</h2>
          </div>
            <hr />
          <div className="style-items">
            <span>
              Height <p className={`color-${pokemon?.types[0].type.name}`} >{pokemon?.height}</p>
            </span>
            <span>
              Weight <p className={`color-${pokemon?.types[0].type.name}`} >{pokemon?.weight}</p>
            </span>
          </div>
          <div>
            <section className="style-section">
              <div className="style-types">
                <h2>Types</h2>
                <ul className={`style-ul bg-${pokemon?.types[0].type.name}`}>
                  {pokemon?.types.map((objType) => (
                    <li key={objType.type.url}>{objType.type.name}</li>
                  ))}
                </ul>
              </div>
              <div className="style-types">
                <h2>Ability</h2>
                <ul className="style-ul">
                  {pokemon?.abilities.map((objAbi) => (
                    <li key={objAbi.ability.url}>{objAbi.ability.name}</li>
                  ))}
                </ul>
              </div>
              <hr className="style-hr" />
            </section>
           
            <ul className="stats-style">
              Stats
              {pokemon?.stats.map((objStat) => (
                <li
                  className="stats-li"
                  key={objStat.stat.url}
                  style={{
                    background: `linear-gradient(90deg, rgb(230, 144, 30) 0px, rgb(252, 214, 118) ${objStat.base_stat}%, rgb(231, 231, 231) ${objStat.base_stat}%, rgb(231, 231, 231) 100%)`,
                  }}
                >
                  <span className="pokemon-stats_label">
                    {objStat.stat.name}
                  </span>
                  <span
                    className={`pokemon-stats_value color-${pokemon?.types[0].type.name}`}
                  >
                    {objStat.base_stat}
                  </span>
                </li>
              ))}
            </ul>
            <section className="style-moves">
              <h3 className="style-special_moves"> Special Moves</h3>
              <ul className="special-style">
                {pokemon?.moves.map((objMove) => (
                  <li className="move-style" key={objMove.move.url}>
                    {objMove.move.name}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </>
      )}
    </div>
  );
};

export default PokeInfo;
