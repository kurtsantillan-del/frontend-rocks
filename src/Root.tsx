import React, { useState } from "react";

// --- 1. Definizione dell'Interfaccia (Tutte le tue variabili) ---
export interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  types: string[];
  hp: number;
  attacks: { 
    name: string; 
    damage: number | string; 
    description: string 
  }[];
  weakness: string;
  rarity: "★" | "••" | "♦";
  stage?: string; // Es: "Base", "Fase 1"
  weight?: string; // es. "6.9 kg"
  height?: string; // es. "0.7 m"
  cardType?: string; // es. "Base", "Stadio 1", "EX"
}

// --- 2. Mappa dei Colori Dinamici (Stile GCC) ---
const typeStyles: Record<string, { bg: string; border: string; accent: string }> = {
  electric: { bg: "from-[#fdd835] to-[#fbc02d]", border: "border-yellow-400", accent: "bg-yellow-100" },
  fire: { bg: "from-[#ff5f6d] to-[#ffc371]", border: "border-red-500", accent: "bg-red-100" },
  water: { bg: "from-[#2193b0] to-[#6dd5ed]", border: "border-blue-400", accent: "bg-blue-100" },
  grass: { bg: "from-[#11998e] to-[#38ef7d]", border: "border-green-500", accent: "bg-green-100" },
  psychic: { bg: "from-[#834d9b] to-[#d04ed6]", border: "border-purple-500", accent: "bg-purple-100" },
  normal: { bg: "from-[#bdc3c7] to-[#2c3e50]", border: "border-gray-400", accent: "bg-gray-100" },
};

// --- 3. Componente Card Unificato ---
export const PokemonCard: React.FC<PokemonCardProps> = (props) => {
  const [showInfo, setShowInfo] = useState(false);
  const mainType = props.types[0].toLowerCase();
  const style = typeStyles[mainType] || typeStyles.normal;

  return (
    <div className="group perspective-1000">
      <div className={`
        relative w-[340px] h-[480px] p-4 rounded-[20px] 
        shadow-[0_15px_35px_rgba(0,0,0,0.5)] 
        border-[10px] border-yellow-500
        bg-gradient-to-b ${style.bg}
        transition-all duration-500 ease-out
        hover:rotate-x-6 hover:rotate-y-6 hover:shadow-yellow-500/50
        cursor-pointer overflow-hidden
      `}>
        
        {/* Effetto Olografico (Luce che passa) */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-gradient-to-tr from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

        {/* Header: Nome e HP */}
        <div className="flex justify-between items-start px-1 mb-1">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-tighter opacity-70">
              {props.stage || "Base"}
            </span>
            <h2 className="text-2xl font-black italic tracking-tighter text-slate-800 leading-none">
              {props.name}
            </h2>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-red-600 font-black text-xl leading-none">
              <small className="text-xs mr-0.5">HP</small>{props.hp}
            </span>
            <div className={`w-6 h-6 rounded-full shadow-sm border border-black/20 ${style.border.replace('border-', 'bg-')}`} title={mainType} />
          </div>
        </div>

        {/* Immagine Pokémon */}
        <div className="relative w-full h-48 bg-white border-[4px] border-zinc-800 rounded-sm shadow-[inset_0_0_10px_rgba(0,0,0,0.2)] flex items-center justify-center overflow-hidden">
           {/* Sfondo decorativo interno */}
          <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${style.bg}`} />
          <img
            src={props.image}
            alt={props.name}
            className="relative z-10 w-40 h-40 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Sezione Attacchi */}
        <div className="mt-4 space-y-3">
          {props.attacks.map((atk, index) => (
            <div key={index} className={`p-2 rounded-lg border-b border-black/10 ${style.accent} bg-opacity-50`}>
              <div className="flex justify-between items-center font-bold text-sm text-slate-900 uppercase">
                <div className="flex gap-1 items-center">
                  <span className="w-3 h-3 rounded-full bg-slate-400 inline-block mr-1" />
                  {atk.name}
                </div>
                <span className="text-lg">{atk.damage}</span>
              </div>
              <p className="text-[11px] leading-tight text-slate-700 mt-1 italic">
                {atk.description}
              </p>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-[10px] font-bold text-slate-800 uppercase tracking-widest border-t border-black/20 pt-2">
          <span>Debolezza: {props.weakness}</span>
          <span className="text-lg leading-none">{props.rarity}</span>
        </div>

        {/* Numero ID piccolo */}
        <span className="absolute bottom-1 right-4 text-[8px] font-mono opacity-50">
          #{props.id}/151
        </span>

        {/* Pulsante Info - spostato per non sovrapporsi all'HP */}
        <button
          onClick={(e) => { e.stopPropagation(); setShowInfo(true); }}
          className="absolute bottom-14 left-4 bg-white/90 text-xs px-2 py-1 rounded-md font-bold text-slate-800 shadow-sm border border-black/10 hover:scale-105 transition-transform z-40"
          aria-label={`Info ${props.name}`}
        >
          Info
        </button>

        {/* Modal/Panel Info */}
        {showInfo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/60" onClick={() => setShowInfo(false)} />
            <div onClick={(e) => e.stopPropagation()} className="relative z-60 max-w-lg w-full bg-white rounded-lg p-6 shadow-2xl text-slate-900">
              <button onClick={() => setShowInfo(false)} className="absolute top-3 left-3 bg-slate-100 px-3 py-1 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-200 z-50">Chiudi</button>
              <div className="flex justify-start items-start gap-4">
                <div className="flex items-center gap-4">
                  <img src={props.image} alt={props.name} className="w-20 h-20 object-contain" />
                  <div className="pr-4">
                    <h3 className="text-2xl font-extrabold">{props.name} {props.stage ? `- ${props.stage}` : ""}</h3>
                    <div className="text-sm text-slate-600">Tipo: {props.types.join(", ")}</div>
                    <div className="text-sm text-slate-600">HP: {props.hp}</div>
                    <div className="text-sm text-slate-600">Debolezza: {props.weakness}</div>
                    <div className="text-sm text-slate-600">Altezza: {props.height || "—"} • Peso: {props.weight || "—"}</div>
                    <div className="text-sm text-slate-600">Tipo di carta: {props.cardType || "—"}</div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-bold">Attacchi</h4>
                <ul className="mt-2 space-y-2 text-sm text-slate-700">
                  {props.attacks.map((a, i) => (
                    <li key={i} className="p-2 bg-slate-50 rounded-md border border-black/5">
                      <div className="flex justify-between font-semibold">{a.name}<span>{a.damage}</span></div>
                      <div className="text-xs italic mt-1">{a.description}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- 4. Root di Test ---
export function Root() {
  const pokemons: PokemonCardProps[] = [
    { id: 25, name: "Pikachu", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png", types: ["electric"], hp: 60, weakness: "Terra", rarity: "★", cardType: "Base", weight: "6.0 kg", height: "0.4 m", attacks: [{ name: "Tuono", damage: 30, description: "Lancia una scarica elettrica contro l'avversario." }] },
    { id: 6, name: "Charizard", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png", types: ["fire", "flying"], hp: 78, weakness: "Acqua", rarity: "♦", cardType: "Base", weight: "90.5 kg", height: "1.7 m", attacks: [{ name: "Turbofuoco", damage: 100, description: "Brucia tutto ciò che incontra." }] },
    { id: 1, name: "Bulbasaur", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png", types: ["grass", "poison"], hp: 45, weakness: "Fuoco", rarity: "★", cardType: "Base", weight: "6.9 kg", height: "0.7 m", attacks: [{ name: "Lacerazione", damage: 20, description: "Affetta l'avversario con foglie affilate." }] },
    { id: 7, name: "Squirtle", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png", types: ["water"], hp: 44, weakness: "Erba", rarity: "★", cardType: "Base", weight: "9.0 kg", height: "0.5 m", attacks: [{ name: "Pistola Acqua", damage: 20, description: "Spara getti d'acqua." }] },
    { id: 39, name: "Jigglypuff", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png", types: ["normal", "fairy"], hp: 90, weakness: "Lotta", rarity: "★", cardType: "Base", weight: "5.5 kg", height: "0.5 m", attacks: [{ name: "Canto", damage: 0, description: "Addormenta l'avversario." }] },
    { id: 52, name: "Meowth", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/52.png", types: ["normal"], hp: 40, weakness: "Lotta", rarity: "••", cardType: "Base", weight: "4.2 kg", height: "0.4 m", attacks: [{ name: "Graffio", damage: 15, description: "Grazia con artigli affilati." }] },
    { id: 133, name: "Eevee", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png", types: ["normal"], hp: 55, weakness: "Lottta", rarity: "★", cardType: "Base", weight: "6.5 kg", height: "0.3 m", attacks: [{ name: "Adattamento", damage: 0, description: "Si adatta alle condizioni." }] },
    { id: 143, name: "Snorlax", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png", types: ["normal"], hp: 160, weakness: "Lotta", rarity: "♦", cardType: "Base", weight: "460.0 kg", height: "2.1 m", attacks: [{ name: "Riposo Pesante", damage: 90, description: "Si riposa e poi attacca con forza." }] },
    { id: 150, name: "Mewtwo", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png", types: ["psychic"], hp: 130, weakness: "Buio", rarity: "♦", cardType: "Base", weight: "122.0 kg", height: "2.0 m", attacks: [{ name: "Psichico", damage: 120, description: "Potente attacco psichico." }] },
    { id: 151, name: "Mew", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png", types: ["psychic"], hp: 100, weakness: "Buio", rarity: "♦", cardType: "Base", weight: "4.0 kg", height: "0.4 m", attacks: [{ name: "Misterioso", damage: 0, description: "Attacco imprevisto con effetti strani." }] },
    { id: 94, name: "Gengar", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png", types: ["ghost", "poison"], hp: 120, weakness: "Psico", rarity: "♦", cardType: "Base", weight: "40.5 kg", height: "1.5 m", attacks: [{ name: "Ombra", damage: 80, description: "Attacco spettrale che confonde." }] },
    { id: 149, name: "Dragonite", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png", types: ["dragon", "flying"], hp: 150, weakness: "Ghiaccio", rarity: "♦", cardType: "Base", weight: "210.0 kg", height: "2.2 m", attacks: [{ name: "Drago Colpo", damage: 130, description: "Un attacco draconico devastante." }] },
    { id: 131, name: "Lapras", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/131.png", types: ["water", "ice"], hp: 130, weakness: "Erba", rarity: "♦", cardType: "Base", weight: "220.0 kg", height: "2.5 m", attacks: [{ name: "Idroonda", damage: 90, description: "Inonda il campo con acqua potente." }] },
    { id: 129, name: "Magikarp", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/129.png", types: ["water"], hp: 20, weakness: "Erba", rarity: "••", cardType: "Base", weight: "10.0 kg", height: "0.9 m", attacks: [{ name: "Scroscio", damage: 10, description: "Un colpo debole ma rapido." }] },
    { id: 130, name: "Gyarados", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png", types: ["water", "flying"], hp: 150, weakness: "Elettro", rarity: "♦", cardType: "Base", weight: "235.0 kg", height: "6.5 m", attacks: [{ name: "Idrocolpo", damage: 120, description: "Colpo d'acqua devastante." }] },
    { id: 95, name: "Onix", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/95.png", types: ["rock", "ground"], hp: 90, weakness: "Acqua", rarity: "••", cardType: "Base", weight: "210.0 kg", height: "8.8 m", attacks: [{ name: "Trapanroccia", damage: 60, description: "Infligge danni perforanti." }] },
    { id: 54, name: "Psyduck", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png", types: ["water"], hp: 80, weakness: "Erba", rarity: "★", cardType: "Base", weight: "19.6 kg", height: "0.8 m", attacks: [{ name: "Confusione", damage: 50, description: "Colpi che confondono l'avversario." }] },
    { id: 37, name: "Vulpix", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/37.png", types: ["fire"], hp: 38, weakness: "Acqua", rarity: "••", cardType: "Base", weight: "9.9 kg", height: "0.6 m", attacks: [{ name: "Bruciapelo", damage: 25, description: "Una piccola fiamma che brucia." }] },
    { id: 135, name: "Jolteon", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/135.png", types: ["electric"], hp: 65, weakness: "Terra", rarity: "★", cardType: "Base", weight: "24.5 kg", height: "0.8 m", attacks: [{ name: "Fulmine", damage: 90, description: "Scarica elettrica concentrata." }] },
    { id: 136, name: "Flareon", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/136.png", types: ["fire"], hp: 65, weakness: "Acqua", rarity: "★", cardType: "Base", weight: "25.0 kg", height: "0.9 m", attacks: [{ name: "Pirofiamma", damage: 90, description: "Una fiamma intensa che avvolge." }] },
  ];

  return (
    <div className="min-h-screen bg-[#1e1e2f] flex flex-wrap gap-8 items-center justify-center p-10">
      {pokemons.map((p) => (
        <PokemonCard key={p.id} {...p} />
      ))}
    </div>
  );
}