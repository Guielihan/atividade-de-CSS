(function () {
  const targets = document.querySelectorAll("[data-glow]");
  const form = document.getElementById("friend-form");
  const result = document.getElementById("friend-result");

  const knownFriends = [
    { id: "673638791", username: "oper4listeles" },
    { id: "6736303791", username: "6736303791" },
  ];

  function setVars(el, ev) {
    const rect = el.getBoundingClientRect();
    const x = ((ev.clientX - rect.left) / rect.width) * 100;
    const y = ((ev.clientY - rect.top) / rect.height) * 100;

    el.style.setProperty("--mx", x.toFixed(2) + "%");
    el.style.setProperty("--my", y.toFixed(2) + "%");
  }

  function normalize(value) {
    return value.replace(/^@/, "").trim().toLowerCase();
  }

  function matchForward(text) {
    const idMatch = text.match(/\b(\d{6,})\b/);
    if (!idMatch) return null;
    const id = idMatch[1];
    return knownFriends.find((friend) => friend.id === id) || null;
  }

  function showResult(message, ok) {
    if (!result) return;
    result.textContent = message;
    result.style.color = ok ? "#0b7a0b" : "#b00020";
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    if (!result) return;

    const formData = new FormData(ev.target);
    const friendId = normalize(formData.get("friendId") || "");
    const username = normalize(formData.get("friendUsername") || "");
    const forwarded = (formData.get("forwardedMessage") || "").trim();

    let friend = null;

    if (friendId) {
      friend = knownFriends.find((item) => item.id === friendId);
    }

    if (!friend && username) {
      friend = knownFriends.find((item) => item.username === username);
    }

    if (!friend && forwarded) {
      friend = matchForward(forwarded);
    }

    if (friend) {
      showResult("Amigo identificado com sucesso!", true);
    } else {
      showResult(
        "Nenhum amigo foi identificado. Confira o ID, username ou encaminhamento informado.",
        false
      );
    }
  }

  targets.forEach((el) => {
    el.addEventListener("mousemove", (ev) => setVars(el, ev));
    el.addEventListener("mouseenter", (ev) => setVars(el, ev));
  });

  if (form) {
    form.addEventListener("submit", handleSubmit);
  }
})();
