function detectMood(message) {
  const lower = message.toLowerCase();

  if (lower.includes("sad") || lower.includes("depressed")) return "sad";
  if (lower.includes("happy") || lower.includes("excited")) return "happy";
  if (lower.includes("angry") || lower.includes("frustrated")) return "angry";
  if (lower.includes("anxious") || lower.includes("nervous")) return "anxious";

  return "neutral";
}

module.exports = detectMood;
