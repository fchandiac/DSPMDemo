export default function PanicButtonPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <h1>Botón de Pánico</h1>
      <button style={{ padding: "2rem 4rem", fontSize: "2rem", background: "red", color: "white", border: "none", borderRadius: "1rem", cursor: "pointer" }}>
        ¡PRESIONAR!
      </button>
    </div>
  );
}
